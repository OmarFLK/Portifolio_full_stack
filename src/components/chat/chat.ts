import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../data/portfolio';

export interface ChatSource {
  id: string;
  title: string;
  url: string;
}
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  failed?: boolean;
}
export const MAX_MESSAGE_LENGTH = 4000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function offersDirectContact(message: ChatMessage): boolean {
  return (
    message.role === 'assistant' &&
    (!!message.failed ||
      !!message.sources?.some((source) =>
        ['contact', 'career-preferences', 'approved-compensation'].includes(source.id),
      ) ||
      /contato|contacto|contact|remunera|sal[aá]ri|salary|bolsa|benef[ií]cios|benefits|compensation/i.test(
        message.content,
      ))
  );
}
export function safeSource(url: unknown): url is string {
  return (
    typeof url === 'string' &&
    !/[\s\p{Cc}]/u.test(url) &&
    (/^\/#[a-zA-Z0-9_-]+$/.test(url) ||
      /^\/Curriculo_[\w.-]+\.pdf$/.test(url) ||
      /^https:\/\/github\.com\/OmarFLK\//.test(url))
  );
}

export function parseSources(value: unknown): ChatSource[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (source: unknown): source is ChatSource =>
        isRecord(source) &&
        safeSource(source.url) &&
        typeof source.title === 'string' &&
        source.title.length <= 200 &&
        typeof source.id === 'string' &&
        source.id.length <= 100,
    )
    .slice(0, 7);
}

const base = (import.meta.env.VITE_CHAT_API_URL || '/api/assistant').replace(/\/$/, '');
const errors = {
  pt: {
    unavailable:
      'Não consegui conectar com a OmarIA. Tente novamente em instantes ou use o contato do portfólio.',
    timeout: 'A resposta demorou mais que o esperado. Tente novamente.',
    stopped: 'Resposta interrompida. Você pode reenviar a pergunta.',
    limited: 'Muitas perguntas em pouco tempo. Aguarde um minuto e tente novamente.',
    busy: 'A OmarIA está atendendo outras conversas. Tente novamente em instantes.',
    daily:
      'A OmarIA atingiu o limite temporário de consultas. Você pode falar diretamente com o Omar pelo botão abaixo.',
  },
  en: {
    unavailable:
      'I could not connect to OmarIA. Try again shortly or use the portfolio contact details.',
    timeout: 'The response took longer than expected. Please try again.',
    stopped: 'Response stopped. You can send the question again.',
    limited: 'Too many questions in a short time. Please wait a minute and try again.',
    busy: 'OmarIA is handling other conversations. Please try again shortly.',
    daily:
      'OmarIA has reached its temporary query limit. You can contact Omar directly using the button below.',
  },
  es: {
    unavailable:
      'No pude conectar con OmarIA. Inténtalo de nuevo o usa el contacto del portafolio.',
    timeout: 'La respuesta tardó más de lo esperado. Inténtalo de nuevo.',
    stopped: 'Respuesta interrumpida. Puedes reenviar la pregunta.',
    limited: 'Demasiadas preguntas en poco tiempo. Espera un minuto e inténtalo de nuevo.',
    busy: 'OmarIA está atendiendo otras conversaciones. Inténtalo de nuevo en unos instantes.',
    daily:
      'OmarIA alcanzó su límite temporal de consultas. Puedes contactar directamente con Omar con el botón de abajo.',
  },
};

function load(locale: Locale): ChatMessage[] {
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(`omaria-${locale}`) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored
      .filter(
        (m): m is ChatMessage =>
          isRecord(m) &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.length <= 5000,
      )
      .slice(-24)
      .map((m) => ({
        ...m,
        sources: parseSources(m.sources),
      }));
  } catch {
    return [];
  }
}

export function useConversation(locale: Locale) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => load(locale));
  const [busy, setBusy] = useState(false);
  const [connection, setConnection] = useState<'checking' | 'ready' | 'unavailable'>('checking');
  const request = useRef<AbortController | null>(null);
  const generation = useRef(0);

  useEffect(() => {
    try {
      sessionStorage.setItem(`omaria-${locale}`, JSON.stringify(messages.slice(-24)));
    } catch {
      /* Conversation remains available in memory. */
    }
  }, [messages, locale]);

  useEffect(() => {
    request.current?.abort();
    request.current = null;
    generation.current += 1;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      setConnection('unavailable');
      controller.abort();
    }, 60000);
    fetch(`${base}/health`, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        const body: unknown = await r.json();
        if (!controller.signal.aborted)
          setConnection(isRecord(body) && body.configured === true ? 'ready' : 'unavailable');
      })
      .catch(() => {
        if (!controller.signal.aborted) setConnection('unavailable');
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      controller.abort();
      request.current?.abort();
      generation.current += 1;
    };
  }, [locale]);

  const send = async (value: string) => {
    const message = value.trim();
    if (!message || message.length > MAX_MESSAGE_LENGTH || request.current) return;
    const controller = new AbortController();
    const id = ++generation.current;
    request.current = controller;
    setBusy(true);
    const history = messages
      .filter((m) => !m.failed)
      .slice(-12)
      .map(({ role, content }) => ({ role, content }));
    while (history.reduce((total, turn) => total + turn.content.length, 0) > 14000) history.shift();
    setMessages((previous) => [...previous, { role: 'user', content: message }]);
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 120000);
    try {
      const response = await fetch(`${base}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, locale, history }),
        signal: controller.signal,
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const code = isRecord(data) ? data.error : undefined;
        const message =
          code === 'rate_limited'
            ? errors[locale].limited
            : code === 'daily_limit'
              ? errors[locale].daily
              : code === 'busy'
                ? errors[locale].busy
                : code === 'timeout'
                  ? errors[locale].timeout
                  : errors[locale].unavailable;
        throw new Error(message);
      }
      if (
        !isRecord(data) ||
        typeof data.answer !== 'string' ||
        !data.answer.trim() ||
        data.answer.length > 5000 ||
        !Array.isArray(data.sources)
      )
        throw new Error(errors[locale].unavailable);
      if (id !== generation.current) return;
      const sources = parseSources(data.sources);
      const answer = data.answer;
      setMessages((previous) => [...previous, { role: 'assistant', content: answer, sources }]);
      setConnection('ready');
    } catch (error) {
      if (id !== generation.current) return;
      const content = controller.signal.aborted
        ? errors[locale][timedOut ? 'timeout' : 'stopped']
        : error instanceof Error &&
            !(error instanceof TypeError) &&
            !(error instanceof SyntaxError) &&
            error.message
          ? error.message
          : errors[locale].unavailable;
      setMessages((previous) => [...previous, { role: 'assistant', content, failed: true }]);
      if (!controller.signal.aborted) setConnection('unavailable');
    } finally {
      window.clearTimeout(timeout);
      if (id === generation.current) {
        request.current = null;
        setBusy(false);
      }
    }
  };

  const clear = () => {
    generation.current += 1;
    request.current?.abort();
    request.current = null;
    setBusy(false);
    setMessages([]);
    try {
      sessionStorage.removeItem(`omaria-${locale}`);
    } catch {
      /* Optional storage. */
    }
  };
  return { messages, busy, connection, send, clear, stop: () => request.current?.abort() };
}
