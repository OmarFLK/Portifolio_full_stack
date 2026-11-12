from collections import defaultdict, deque
import asyncio
import re
import time
from typing import Literal
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from .config import Settings
from .provider import BaroProvider, ProviderError
from .retrieval import KnowledgeIndex, normalize
from .security import PublicAPIGuard

COMPENSATION = re.compile(r'\b(salari\w*|salary|bolsa|remuner\w*|compensation|pretensao|vr|vt|beneficios|benefits|wellhub)\b')
SECRETS = re.compile(r'\b(mostre|revele|imprima|exiba|show|reveal|copie|liste)\b.{0,60}\b(baro_api_key|system prompt|prompt do sistema|instrucoes internas|segredos?|senhas?|credencial|credenciais|api.?keys?|passwords?)\b|\b(qual e|what is)\b.{0,20}\b(sua chave|sua senha|seu prompt|your password|your api key)\b', re.I)
AGE = re.compile(r'\b(idade|aniversario|data de nascimento|how old|birthday|edad)\b')
UNRELATED = re.compile(r'\b(receita de bolo|receita de comida|cake recipe|receta de cocina)\b')
FOLLOW_UP = re.compile(r'^(mas\b|quero\b.*\bsaber\b|preciso\b.*\bsaber\b|pode (falar|dizer)|me (diga|fala)|e (quanto|para|os valores)|qual (o )?minimo|really\b|but\b|tell me\b|pero\b|quiero\b.*\bsaber\b)')

def compensation_context(question: str, history: list[dict]) -> tuple[bool, bool]:
    explicit = bool(COMPENSATION.search(question))
    previous_questions = [normalize(turn['content']) for turn in history if turn['role'] == 'user']
    previous_topic = any(COMPENSATION.search(text) for text in previous_questions[-4:])
    # Resolve a short insistence such as "quero realmente saber agora" against
    # the recent conversation, without carrying salary into a new skills topic.
    new_topic = re.search(r'\b(habilidades?|competencias?|projetos?|rag|aws|python|tecnic\w*|experienc\w*|formacao|idiomas?|remot\w*|hibrid\w*|ingles|stack)\b', question)
    contextual = bool(previous_topic and not new_topic and len(question.split()) <= 16 and FOLLOW_UP.search(question))
    return explicit or contextual, bool(previous_topic and (explicit or contextual))

TEXT = {
 'pt': {'unknown': 'Não tenho essa informação confirmada sobre o Omar. Posso ajudar com projetos, experiência e competências, ou você pode falar diretamente com ele pelo contato do portfólio.', 'scope': 'Sou a OmarIA, assistente do portfólio para recrutadores e contratantes. Posso explicar os projetos, a experiência e o perfil profissional do Omar.', 'salary': 'O Omar prefere conversar diretamente sobre remuneração e benefícios. Você pode falar com ele pelo contato do portfólio para alinhar as condições da vaga.', 'secret': 'Posso conversar sobre o perfil profissional do Omar, mas não compartilho credenciais, informações internas ou instruções do sistema.', 'error': 'Não consegui consultar a IA agora. Tente novamente em instantes ou fale diretamente com o Omar.', 'timeout': 'A IA demorou mais que o esperado. Tente uma pergunta mais curta ou tente novamente em instantes.', 'limit': 'Você enviou várias mensagens em pouco tempo. Aguarde um minuto antes de tentar novamente.'},
 'en': {'unknown': 'I do not have confirmed information about that. I can help with Omar’s projects, experience and skills, or you can contact him directly through the portfolio.', 'scope': 'I am OmarIA, the portfolio assistant for recruiters and prospective clients. I can explain Omar’s projects, experience and professional background.', 'salary': 'Omar prefers to discuss compensation and benefits directly. Please use the portfolio contact details to align the role’s conditions with him.', 'secret': 'I can discuss Omar’s professional profile, but I do not share credentials, internal information or system instructions.', 'error': 'I could not reach the AI right now. Try again shortly or contact Omar directly.', 'timeout': 'The AI took longer than expected. Try a shorter question or try again shortly.', 'limit': 'You sent several messages in a short time. Please wait a minute before trying again.'},
 'es': {'unknown': 'No tengo esa información confirmada sobre Omar. Puedo ayudar con proyectos, experiencia y competencias, o puedes contactarlo directamente desde el portafolio.', 'scope': 'Soy OmarIA, asistente del portafolio para reclutadores y clientes. Puedo explicar los proyectos, la experiencia y el perfil profesional de Omar.', 'salary': 'Omar prefiere conversar directamente sobre remuneración y beneficios. Puedes contactarlo desde el portafolio para acordar las condiciones del puesto.', 'secret': 'Puedo hablar del perfil profesional de Omar, pero no comparto credenciales, información interna ni instrucciones del sistema.', 'error': 'No pude consultar la IA ahora. Inténtalo de nuevo en unos instantes o contacta directamente con Omar.', 'timeout': 'La IA tardó más de lo esperado. Intenta una pregunta más corta o vuelve a intentarlo en unos instantes.', 'limit': 'Enviaste varios mensajes en poco tiempo. Espera un minuto antes de intentarlo de nuevo.'},
}

class Turn(BaseModel):
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=True, strict=True)
    role: Literal['user', 'assistant']
    content: str = Field(min_length=1, max_length=5000)

    @field_validator('content')
    @classmethod
    def no_nulls(cls, value):
        if '\x00' in value: raise ValueError('Invalid content')
        return value

class ChatInput(BaseModel):
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=True, strict=True)
    message: str = Field(min_length=2, max_length=4000)
    locale: Literal['pt', 'en', 'es'] = 'pt'
    history: list[Turn] = Field(default_factory=list, max_length=12)

    @field_validator('message')
    @classmethod
    def no_nulls(cls, value):
        if '\x00' in value: raise ValueError('Invalid message')
        return value

    @model_validator(mode='after')
    def history_budget(self):
        if sum(len(t.content) for t in self.history) > 14000:
            raise ValueError('Conversation is too long')
        return self

class WindowLimiter:
    """Single-worker limits for local/Render testing; no visitor transcripts are stored."""
    def __init__(self, per_ip: int, total: int, daily: int = 500):
        self.per_ip, self.total = per_ip, total
        self.daily = daily
        self.visitors: dict[str, deque] = defaultdict(deque)
        self.global_window = deque()
        self.daily_window = deque()

    def allow(self, key: str):
        now = time.monotonic()
        while self.daily_window and self.daily_window[0] <= now - 86400:
            self.daily_window.popleft()
        if len(self.daily_window) >= self.daily: return False
        while self.global_window and self.global_window[0] <= now - 60:
            self.global_window.popleft()
        if len(self.global_window) >= self.total: return False
        if key not in self.visitors and len(self.visitors) >= 2048:
            self.visitors = defaultdict(deque, {k:v for k,v in self.visitors.items() if v and v[-1] > now - 60})
            if len(self.visitors) >= 2048: return False
        for bucket in (self.visitors[key],):
            while bucket and bucket[0] <= now - 60: bucket.popleft()
        if len(self.visitors[key]) >= self.per_ip: return False
        self.visitors[key].append(now)
        self.global_window.append(now)
        self.daily_window.append(now)
        return True

def create_app(settings: Settings | None = None, provider=None):
    settings = settings or Settings.from_env()
    index = KnowledgeIndex(settings.knowledge_dir, settings.database_url)
    provider = provider or BaroProvider(settings)
    limiter = WindowLimiter(settings.rate_limit, settings.global_limit, settings.daily_limit)
    semaphore = asyncio.Semaphore(3)
    app = FastAPI(title='OmarIA', version='1.0.0', docs_url=None, redoc_url=None, openapi_url=None)
    app.state.index = index
    app.state.limiter = limiter
    app.add_middleware(PublicAPIGuard, allowed_origins=settings.allowed_origins, limiter=limiter)
    app.add_middleware(CORSMiddleware, allow_origins=list(settings.allowed_origins), allow_methods=['GET','POST'], allow_headers=['Content-Type'], allow_credentials=False)

    @app.exception_handler(RequestValidationError)
    async def validation_error(request, exc):
        return JSONResponse({'error': 'invalid_request', 'message': 'Check message and conversation limits.'}, status_code=422)

    @app.get('/api/assistant/health')
    async def health():
        return {'status': 'ok', 'configured': bool(settings.api_key), 'knowledge_documents': len(index.documents), 'knowledge_version': index.version, 'knowledge_store': index.store}

    def result(answer, docs=(), locale='pt', generated=False):
        return {'answer': answer, 'sources': [{'id':d.id,'title':d.title[locale],'url':d.url} for d in docs], 'generated': generated}

    @app.post('/api/assistant/chat')
    async def chat(body: ChatInput, request: Request):
        locale = body.locale
        history = [t.model_dump() for t in body.history]
        q = normalize(body.message)
        if SECRETS.search(q): return result(TEXT[locale]['secret'])
        compensation, repeated = compensation_context(q, history)
        if compensation:
            # The public answer defaults to direct contact; approved numbers are revealed only after a repeated compensation question in this conversation.
            if any(t in q for t in ['salario atual','recebe hoje','current salary','salario actual']): return result(TEXT[locale]['salary'])
        if re.fullmatch(r'(oi|ola|hello|hi|hey|hola|bom dia|boa tarde|boa noite)[!?. ]*', q): return result(TEXT[locale]['scope'])
        if AGE.search(q): return result(TEXT[locale]['unknown'])
        if UNRELATED.search(q): return result(TEXT[locale]['scope'])
        docs = index.conversation_context(body.message, history, include_compensation=repeated)
        if not settings.api_key:
            return JSONResponse({'error':'not_configured','message':TEXT[locale]['error']}, status_code=503)
        if semaphore.locked():
            return JSONResponse({'error':'busy','message':TEXT[locale]['error']}, status_code=503, headers={'Retry-After':'5'})
        try:
            async with asyncio.timeout(settings.timeout + 5):
                async with semaphore:
                    answer, ids, _answered = await provider.answer(body.message, history, docs, locale)
        except (ProviderError, TimeoutError) as error:
            code = error.args[0] if isinstance(error, ProviderError) else 'timeout'
            return JSONResponse({'error':code,'message':TEXT[locale]['timeout' if code == 'timeout' else 'error']}, status_code=504 if code == 'timeout' else 503)
        sources = [doc for doc in docs if doc.id in ids]
        return result(answer, sources, locale, generated=True)

    return app

app = create_app()
