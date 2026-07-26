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
    expect(screen.getByRole('link', { name: 'Resultados' })).toHaveAttribute('href', '#resultados');
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Resultados que viraram impacto real',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Aproximadamente setenta mil reais economizados em gastos com inteligência artificial.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Semanas de trabalho manual poupadas.')).toBeInTheDocument();

    [
      'Verithaz — IA Investigativa',
      'Vira Price',
      'Automação de Enriquecimento de Leads',
      'EduCore — Gestão Acadêmica',
      'OpenSource Lab',
    ].forEach((projectName) => {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: projectName,
        }),
      ).toBeInTheDocument();
    });

    expect(
      Array.from(document.querySelectorAll('#projects [data-project-id]')).map((element) =>
        element.getAttribute('data-project-id'),
      ),
    ).toEqual(['verithaz', 'vira-price', 'lead-enrichment', 'educore', 'open-source-lab']);
    expect(screen.queryByText('Sistema de Reservas para Restaurantes')).not.toBeInTheDocument();
    expect(screen.queryByText('FinCore — Plataforma Financeira')).not.toBeInTheDocument();
    expect(
      screen.getByText(
        'IMT Data Preparation and Visualization for Business Analytics — 40h · 1º semestre de 2026',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('IMT Engenharia de Software na Prática — 40h · 1º semestre de 2026'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'IMT A Bolsa de Valores no Brasil e seus ativos financeiros — 40h · 1º semestre de 2026',
      ),
    ).toBeInTheDocument();

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
        name: 'Verithaz — Investigative AI',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/strategies of eristic dialectic described by Arthur Schopenhauer/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', {
        name: 'Primary navigation',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Results that created real impact',
      }),
    ).toBeInTheDocument();
  });

  it('switches the complete results content to Spanish', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'ES — Español' }));

    expect(document.documentElement).toHaveAttribute('lang', 'es');
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Resultados que generaron impacto real',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Aproximadamente setenta mil reales brasileños ahorrados en gastos de inteligencia artificial.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Verithaz — IA Investigativa',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/gestionar sus listas de proveedores con menos fricción/i),
    ).toBeInTheDocument();
  });
});
