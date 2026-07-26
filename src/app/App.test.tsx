import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from './LocaleContext';
import { App } from './App';

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}));

vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

function renderApp() {
  return render(
    <LocaleProvider>
      <App />
    </LocaleProvider>,
  );
}

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = '';
  });

  it('renders the complete Portuguese portfolio and accessible navigation', () => {
    renderApp();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /IA, dados e software em movimento/i,
      }),
    ).toBeInTheDocument();

    const navigation = screen.getByRole('navigation', {
      name: 'Navegação principal',
    });
    expect(navigation).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveAttribute('href', '#projects');

    [
      'Automação de Enriquecimento de Leads',
      'Sistema de Reservas para Restaurantes',
      'OpenSource Lab',
      'EduCore — Gestão Acadêmica',
      'FinCore — Plataforma Financeira',
    ].forEach((projectName) => {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: projectName,
        }),
      ).toBeInTheDocument();
    });

    expect(screen.getByText('OneBox - DNE')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Estagiário em IA e Automação',
      }),
    ).toBeInTheDocument();
  });

  it('switches the content and document language from Portuguese to English', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'EN — English' }));

    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Selected projects',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Lead Enrichment Automation',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', {
        name: 'Primary navigation',
      }),
    ).toBeInTheDocument();
  });
});
