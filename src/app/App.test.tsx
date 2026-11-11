import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { LocaleProvider } from './LocaleContext';
import { App } from './App';

const renderApp = () =>
  render(
    <LocaleProvider>
      <App />
    </LocaleProvider>,
  );

describe('portfolio', () => {
  beforeEach(() => window.localStorage.clear());

  it('prioritizes selected work and offers the current CV', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Engenharia de IA.');
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(within(nav).getAllByRole('link')).toHaveLength(4);
    expect(screen.getByRole('link', { name: 'Ver projetos' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /Baixar currículo/ })).toHaveAttribute(
      'href',
      '/Curriculo_Omar_Saliba.pdf',
    );
    expect(document.querySelectorAll('#projects article')).toHaveLength(6);
    expect(
      screen.getByRole('heading', { name: 'Calculadora de precificação — Mauá Júnior' }),
    ).toBeInTheDocument();
    expect(screen.getByText('−72,7%')).toBeInTheDocument();
    expect(screen.getByText(/40 segundos a menos por acesso/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ERP · Avenida Tintas' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Tech Hub — IA e infraestrutura AWS' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Planejamento definido; implementação pendente/)).toBeInTheDocument();
    expect(document.querySelector('[data-project-id="avenida-tintas"] a')).toBeNull();
    expect(screen.getByText(/treinamento ainda não executado/)).toBeInTheDocument();
    expect(screen.getByText(/Não validado para uso clínico/)).toBeInTheDocument();
    expect(screen.getByText('B1 — Intermediário')).toBeInTheDocument();
  });

  it('switches project details and document language in both translations', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole('button', { name: 'EN — English' }));
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('heading', { name: 'MAUA AI — Mobility analyst' })).toBeInTheDocument();
    expect(screen.getByText(/training has not been run/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'ES — Español' }));
    expect(document.documentElement.lang).toBe('es');
    expect(
      screen.getByRole('heading', { name: 'SEMOB — Operación de transporte' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/entrenamiento aún no ejecutado/)).toBeInTheDocument();
  });

  it('closes navigation with Escape and restores the trigger focus', async () => {
    const user = userEvent.setup();
    renderApp();
    const trigger = document.querySelector<HTMLButtonElement>(
      'button[aria-controls="mobile-menu"]',
    )!;
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });
});
