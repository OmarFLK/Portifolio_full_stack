import asyncio
import httpx
import pytest
from fastapi.testclient import TestClient
from app.config import Settings
from app.main import WindowLimiter, create_app


class SpyProvider:
    def __init__(self): self.calls = 0
    async def answer(self, *args):
        self.calls += 1
        return 'Resposta segura.', [], True


@pytest.mark.parametrize('declared_length', [None, '8'])
def test_actual_streamed_body_is_bounded_even_without_honest_length(declared_length):
    provider = SpyProvider()
    app = create_app(Settings(api_key='fake'), provider)
    async def run():
        async def chunks():
            for _ in range(4): yield b'x' * 10000
        headers = {'Content-Type': 'application/json'}
        if declared_length is not None: headers['Content-Length'] = declared_length
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app), base_url='http://test') as client:
            response = await client.post('/api/assistant/chat', content=chunks(), headers=headers)
            assert response.status_code == 413
            assert response.headers['cache-control'] == 'no-store'
    asyncio.run(run())
    assert provider.calls == 0


def test_json_only_and_no_validation_body_echo():
    provider = SpyProvider()
    with TestClient(create_app(Settings(api_key='fake'), provider)) as client:
        assert client.post('/api/assistant/chat', content='message=AWS', headers={'Content-Type': 'application/x-www-form-urlencoded'}).status_code == 415
        response = client.post('/api/assistant/chat', json={'message': 'test-private-input', 'secret_field': 'private-value'})
        assert response.status_code == 422 and 'private-value' not in response.text
        assert client.post('/api/assistant/chat', json={'message': 'AWS'}, headers={'content-length': '-1'}).status_code == 400
    assert provider.calls == 0


def test_invalid_requests_and_forwarded_header_spoofing_cannot_bypass_budget():
    with TestClient(create_app(Settings(api_key='fake', rate_limit=1), SpyProvider())) as client:
        assert client.post('/api/assistant/chat', content='invalid', headers={'content-type':'application/json', 'x-forwarded-for':'1.2.3.4'}).status_code == 422
        response = client.post('/api/assistant/chat', json={'message':'AWS'}, headers={'x-forwarded-for':'9.8.7.6'})
        assert response.status_code == 429 and response.headers['retry-after'] == '60'


def test_global_limit_does_not_accumulate_unlimited_visitor_keys():
    limiter = WindowLimiter(12, 1)
    assert limiter.allow('first')
    for i in range(5000): assert not limiter.allow(str(i))
    assert len(limiter.visitors) == 1


def test_expired_visitors_are_pruned_before_access(monkeypatch):
    current = [0.0]
    monkeypatch.setattr('app.main.time.monotonic', lambda: current[0])
    limiter = WindowLimiter(12, 10000, daily=10000)
    for i in range(2048): assert limiter.allow(str(i))
    current[0] = 61.0
    assert limiter.allow('new-visitor')
    assert len(limiter.visitors) == 1


def test_daily_budget_survives_minute_window_and_then_expires(monkeypatch):
    current = [0.0]
    monkeypatch.setattr('app.main.time.monotonic', lambda: current[0])
    limiter = WindowLimiter(12, 100, daily=1)
    assert limiter.allow('first')
    current[0] = 61.0
    assert not limiter.allow('second')
    current[0] = 86401.0
    assert limiter.allow('second')


def test_cors_and_security_headers_cover_errors():
    with TestClient(create_app(Settings(api_key='fake'), SpyProvider())) as client:
        response = client.post('/api/assistant/chat', json={'message':'x'}, headers={'Origin':'http://localhost:5173'})
        assert response.status_code == 422
        assert response.headers['access-control-allow-origin'] == 'http://localhost:5173'
        assert response.headers['cache-control'] == 'no-store'
        assert response.headers['x-content-type-options'] == 'nosniff'
        assert response.headers['x-frame-options'] == 'DENY'
        assert client.get('/docs').status_code == 404
        assert client.get('/openapi.json').status_code == 404


def test_busy_api_rejects_extra_generation_without_a_growing_queue():
    started = asyncio.Event()
    release = asyncio.Event()
    class SlowProvider:
        async def answer(self, *args):
            started.set()
            await release.wait()
            return 'Resposta.', [], True
    async def run():
        app = create_app(Settings(api_key='fake'), SlowProvider())
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app), base_url='http://test') as client:
            calls = [asyncio.create_task(client.post('/api/assistant/chat', json={'message':'AWS'})) for _ in range(3)]
            await started.wait()
            await asyncio.sleep(0)
            try:
                response = await client.post('/api/assistant/chat', json={'message':'Python'})
                assert response.status_code == 503 and response.json()['error'] == 'busy'
            finally:
                release.set()
                await asyncio.gather(*calls)
    asyncio.run(run())
