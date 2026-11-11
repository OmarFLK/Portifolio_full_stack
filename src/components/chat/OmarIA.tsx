import { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Maximize2,
  MessageCircle,
  RotateCcw,
  Send,
  Square,
  Trash2,
  X,
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLocale } from '../../app/locale';
import { localeNames, socialLinks, type Locale } from '../../data/portfolio';
import { MAX_MESSAGE_LENGTH, offersDirectContact, useConversation } from './chat';
import styles from './OmarIA.module.css';
import { BrandLogo } from '../ui/BrandLogo';

const copy = {
  pt: {
    launch: 'Falar com OmarIA',
    subtitle: 'A IA do Omar',
    title: 'Converse sobre quem vai construir com você.',
    intro:
      'Projetos, experiência, competências e oportunidades. Pergunte à OmarIA e conheça o trabalho do Omar com fontes do currículo e do portfólio.',
    welcome:
      'Oi! Sou a OmarIA, a IA do Omar. Ajudo recrutadores e contratantes a conhecer seus projetos, experiência e perfil profissional. O que você quer saber?',
    suggestions: [
      'Quais projetos de IA ele tem?',
      'Que resultados ele entregou?',
      'Qual a experiência com AWS?',
      'Que tipos de vaga ele busca?',
    ],
    placeholder: 'Pergunte sobre o Omar…',
    input: 'Sua pergunta para a OmarIA',
    send: 'Enviar pergunta',
    stop: 'Interromper resposta',
    clear: 'Nova conversa',
    close: 'Fechar conversa',
    full: 'Abrir página completa',
    sources: 'Fontes consultadas',
    loading: 'Consultando as informações do Omar…',
    checking: 'Conectando…',
    ready: 'Pronta para conversar',
    unavailable: 'Conexão indisponível no momento',
    back: 'Voltar ao portfólio',
    recruiter: 'PARA RECRUTADORES E CONTRATANTES',
    note: 'Respostas com base nas informações do Omar. Confirme condições de contratação diretamente com ele.',
    you: 'Você',
    empty: 'Perguntas para começar',
    contact: 'Contato direto',
    errorContact: 'Falar com o Omar',
    retry: 'Tentar novamente',
  },
  en: {
    launch: 'Talk to OmarIA',
    subtitle: 'Omar’s AI',
    title: 'Meet the person you could build with.',
    intro:
      'Projects, experience, skills and opportunities. Ask OmarIA about Omar’s work, with sources from his CV and portfolio.',
    welcome:
      'Hi! I’m OmarIA, Omar’s AI. I help recruiters and prospective clients explore his projects, experience and professional background. What would you like to know?',
    suggestions: [
      'Which AI projects has he built?',
      'What results has he delivered?',
      'What is his AWS experience?',
      'Which roles is he interested in?',
    ],
    placeholder: 'Ask about Omar…',
    input: 'Your question for OmarIA',
    send: 'Send question',
    stop: 'Stop response',
    clear: 'New conversation',
    close: 'Close conversation',
    full: 'Open full page',
    sources: 'Sources consulted',
    loading: 'Looking up Omar’s information…',
    checking: 'Connecting…',
    ready: 'Ready to chat',
    unavailable: 'Connection currently unavailable',
    back: 'Back to portfolio',
    recruiter: 'FOR RECRUITERS AND PROSPECTIVE CLIENTS',
    note: 'Answers use Omar’s professional information. Confirm hiring conditions directly with him.',
    you: 'You',
    empty: 'Start with a question',
    contact: 'Contact Omar',
    errorContact: 'Talk to Omar',
    retry: 'Try again',
  },
  es: {
    launch: 'Hablar con OmarIA',
    subtitle: 'La IA de Omar',
    title: 'Conoce a quien puede construir contigo.',
    intro:
      'Proyectos, experiencia, competencias y oportunidades. Pregunta a OmarIA sobre el trabajo de Omar, con fuentes de su currículo y portafolio.',
    welcome:
      '¡Hola! Soy OmarIA, la IA de Omar. Ayudo a reclutadores y clientes a conocer sus proyectos, experiencia y perfil profesional. ¿Qué quieres saber?',
    suggestions: [
      '¿Qué proyectos de IA tiene?',
      '¿Qué resultados ha logrado?',
      '¿Qué experiencia tiene con AWS?',
      '¿Qué puestos le interesan?',
    ],
    placeholder: 'Pregunta sobre Omar…',
    input: 'Tu pregunta para OmarIA',
    send: 'Enviar pregunta',
    stop: 'Interrumpir respuesta',
    clear: 'Nueva conversación',
    close: 'Cerrar conversación',
    full: 'Abrir página completa',
    sources: 'Fuentes consultadas',
    loading: 'Consultando la información de Omar…',
    checking: 'Conectando…',
    ready: 'Lista para conversar',
    unavailable: 'Conexión no disponible',
    back: 'Volver al portafolio',
    recruiter: 'PARA RECLUTADORES Y CLIENTES',
    note: 'Respuestas basadas en la información de Omar. Confirma las condiciones de contratación directamente con él.',
    you: 'Tú',
    empty: 'Preguntas para empezar',
    contact: 'Contacto directo',
    errorContact: 'Hablar con Omar',
    retry: 'Intentar de nuevo',
  },
};

export function OmarFace({ className }: { className?: string }) {
  const gradient = useId();
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="12" y1="7" x2="51" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF798B" />
          <stop offset="0.48" stopColor="#DF1236" />
          <stop offset="1" stopColor="#790D2A" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="21" fill={`url(#${gradient})`} />
      <rect x="3.5" y="3.5" width="57" height="57" rx="20.5" stroke="#FFB2BD" strokeOpacity="0.4" />
      <path
        d="M16 14h25a10 10 0 0 1 10 10v13a10 10 0 0 1-10 10H29l-9 6v-7a10 10 0 0 1-9-10V24a10 10 0 0 1 5-10Z"
        fill="#FFF8F5"
      />
      <rect x="17" y="21" width="28" height="19" rx="8" fill="#32121F" />
      <path d="M24 27v3M38 27v3" stroke="#FFF8F5" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 34q3 3 6 0" stroke="#FF798B" strokeWidth="2" strokeLinecap="round" />
      <path
        d="m49 7 1.8 4.2L55 13l-4.2 1.8L49 19l-1.8-4.2L43 13l4.2-1.8L49 7Z"
        fill="#FFF8F5"
        stroke="#B01537"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Conversation({ fullPage = false, onClose }: { fullPage?: boolean; onClose?: () => void }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const { messages, busy, connection, send, clear, stop } = useConversation(locale);
  const [input, setInput] = useState('');
  const heading = useId();
  const inputId = useId();
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!fullPage) field.current?.focus();
  }, [fullPage]);
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [messages, busy]);
  const submit = (value = input) => {
    if (!value.trim() || busy) return;
    void send(value);
    setInput('');
    field.current?.focus();
  };
  return (
    <div className={styles.conversation} data-full-page={fullPage}>
      <header className={styles.chatHeader}>
        <OmarFace className={styles.face} />
        <div>
          <h2 id={heading}>
            OmarIA <span>{t.subtitle}</span>
          </h2>
          <p role="status" data-connection={connection}>
            {t[connection]}
          </p>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={clear} aria-label={t.clear} title={t.clear}>
            <Trash2 />
          </button>
          {!fullPage && (
            <a href="/omaria" aria-label={t.full} title={t.full}>
              <Maximize2 />
            </a>
          )}
          {onClose && (
            <button type="button" onClick={onClose} aria-label={t.close}>
              <X />
            </button>
          )}
        </div>
      </header>
      <div
        className={styles.messages}
        role="log"
        aria-label="OmarIA"
        aria-live="polite"
        aria-relevant="additions"
        tabIndex={0}
        data-lenis-prevent
      >
        <article className={styles.message} data-role="assistant">
          <strong>OmarIA</strong>
          <p>{t.welcome}</p>
        </article>
        {messages.length === 0 && (
          <div className={styles.suggestions}>
            <p>{t.empty}</p>
            {t.suggestions.map((q) => (
              <button key={q} type="button" onClick={() => submit(q)} disabled={busy}>
                {q}
                <ArrowUpRight aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
        {messages.map((message, index) => (
          <article
            className={styles.message}
            data-role={message.role}
            data-failed={message.failed || undefined}
            key={index}
          >
            <strong>{message.role === 'user' ? t.you : 'OmarIA'}</strong>
            <p>{message.content}</p>
            {offersDirectContact(message) && (
              <div className={styles.errorActions}>
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  {t.errorContact}
                  <ArrowUpRight aria-hidden="true" />
                </a>
                {message.failed && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      const question = messages
                        .slice(0, index)
                        .reverse()
                        .find((turn) => turn.role === 'user');
                      if (question) submit(question.content);
                    }}
                  >
                    <RotateCcw aria-hidden="true" />
                    {t.retry}
                  </button>
                )}
              </div>
            )}
            {!!message.sources?.length && (
              <div className={styles.sources}>
                <span>{t.sources}</span>
                {message.sources.map((source) => (
                  <a href={source.url} key={source.id} target="_blank" rel="noreferrer">
                    {source.title}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
        {busy && (
          <p className={styles.loading} role="status">
            <span />
            <span />
            <span />
            {t.loading}
          </p>
        )}
        <div ref={end} />
      </div>
      <form
        className={styles.composer}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          {t.input}
        </label>
        <textarea
          id={inputId}
          ref={field}
          value={input}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={2}
          placeholder={t.placeholder}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              submit();
            }
          }}
        />
        {busy ? (
          <button type="button" onClick={stop} aria-label={t.stop}>
            <Square />
          </button>
        ) : (
          <button type="submit" disabled={input.trim().length < 2} aria-label={t.send}>
            <Send />
          </button>
        )}
        <small>{t.note}</small>
      </form>
    </div>
  );
}

export function OmarIAWidget() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const openDialog = () => {
    dialog.current?.showModal();
    setOpen(true);
  };
  const closeDialog = () => dialog.current?.close();
  return createPortal(
    <>
      <button
        className={styles.launcher}
        ref={trigger}
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={t.launch}
      >
        <OmarFace />
        <span className="sr-only">{t.launch}</span>
      </button>
      <dialog
        className={styles.dialog}
        ref={dialog}
        aria-label={t.launch}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
      >
        {open && <Conversation key={locale} onClose={closeDialog} />}
      </dialog>
    </>,
    document.body,
  );
}

export function OmarIAPage() {
  const { locale, setLocale } = useLocale();
  const t = copy[locale];
  useEffect(() => {
    document.title = 'OmarIA — Omar Saliba';
  }, [locale]);
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <a href="/">
          <BrandLogo className={styles.pageLogo} />
          {t.back}
        </a>
        <div role="group" aria-label="Language">
          {(['pt', 'en', 'es'] as Locale[]).map((l) => (
            <button
              type="button"
              key={l}
              aria-label={localeNames[l]}
              aria-pressed={locale === l}
              onClick={() => setLocale(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <main className={styles.pageMain}>
        <section className={styles.intro}>
          <span>{t.recruiter}</span>
          <OmarFace className={styles.bigFace} />
          <h1>
            OmarIA<span>{t.title}</span>
          </h1>
          <p>{t.intro}</p>
          <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
            {t.contact}
            <ArrowUpRight />
          </a>
        </section>
        <section className={styles.pageChat} aria-label={t.launch}>
          <Conversation key={locale} fullPage />
        </section>
      </main>
    </div>
  );
}
