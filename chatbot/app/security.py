"""Bound public requests before parsing JSON or invoking the model."""
from starlette.datastructures import Headers, MutableHeaders
from starlette.middleware.body_limit import RequestBodyLimitMiddleware
from starlette.responses import JSONResponse

MAX_BODY_BYTES = 32000


class PublicAPIGuard:
    def __init__(self, app, allowed_origins, limiter):
        # Count actual bytes, including chunked requests and dishonest lengths.
        self.app = RequestBodyLimitMiddleware(app, max_body_size=MAX_BODY_BYTES)
        self.allowed_origins = allowed_origins
        self.limiter = limiter

    async def __call__(self, scope, receive, send):
        if scope['type'] != 'http':
            return await self.app(scope, receive, send)

        async def protected_send(message):
            if message['type'] == 'http.response.start':
                headers = MutableHeaders(scope=message)
                headers['Cache-Control'] = 'no-store'
                headers['X-Content-Type-Options'] = 'nosniff'
                headers['X-Frame-Options'] = 'DENY'
                headers['Referrer-Policy'] = 'no-referrer'
                headers['Content-Security-Policy'] = "default-src 'none'; frame-ancestors 'none'"
            await send(message)

        async def reject(error, status, headers=None):
            response = JSONResponse({'error': error}, status_code=status, headers=headers)
            await response(scope, receive, protected_send)

        if scope['method'] == 'POST':
            headers = Headers(scope=scope)
            origin = headers.get('origin')
            if origin and origin not in self.allowed_origins:
                return await reject('origin_not_allowed', 403)
            try:
                length = int(headers.get('content-length', '0'))
                if length < 0:
                    raise ValueError
            except ValueError:
                return await reject('invalid_body', 400)
            if length > MAX_BODY_BYTES:
                return await reject('body_too_large', 413)
            if headers.get('content-type', '').split(';', 1)[0].strip().lower() != 'application/json':
                return await reject('unsupported_media_type', 415)
            if scope['path'] == '/api/assistant/chat':
                # Use the ASGI server's client address, never arbitrary forwarded headers.
                client = scope.get('client')
                if not self.limiter.allow(client[0] if client else 'unknown'):
                    if len(self.limiter.daily_window) >= self.limiter.daily:
                        return await reject('daily_limit', 429, {'Retry-After': '86400'})
                    return await reject('rate_limited', 429, {'Retry-After': '60'})
        await self.app(scope, receive, protected_send)
