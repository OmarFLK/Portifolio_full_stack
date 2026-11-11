import { expect, test, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

async function mockAI(page: Page) {
  await page.route('**/api/assistant/**', async (route) => {
    if (route.request().url().endsWith('/health')) {
      await route.fulfill({ json: { status: 'ok', configured: true, knowledge_documents: 29 } });
      return;
    }
    const body: unknown = route.request().postDataJSON();
    expect(body).toBeTruthy();
    if (!body || typeof body !== 'object') throw new Error('Expected a JSON request');
    expect(Object.keys(body).sort()).toEqual(['history', 'locale', 'message']);
    await route.fulfill({
      json: {
        answer:
          'No estágio na OneBox/DNE, Omar otimizou queries SQL e reduziu o login de 55 para 15 segundos.',
        sources: [
          { id: 'result-onebox-login', title: 'Login · OneBox / DNE', url: '/#resultados' },
        ],
        generated: true,
      },
    });
  });
}

test('recruiter can paste a longer job description into the conversation', async ({ page }) => {
  const description = 'Vaga júnior com Python, FastAPI, PostgreSQL e AWS. '.repeat(45);
  let received = '';
  await page.route('**/api/assistant/health', (route) =>
    route.fulfill({ json: { configured: true } }),
  );
  await page.route('**/api/assistant/chat', (route) => {
    const body = route.request().postDataJSON() as { message: string };
    received = body.message;
    return route.fulfill({
      json: {
        answer:
          'Podemos relacionar a vaga aos projetos e à experiência do estágio. Qual o foco principal da equipe?',
        sources: [],
        generated: true,
      },
    });
  });
  await page.goto('/omaria');
  await expect(page.getByRole('textbox')).toHaveAttribute('maxlength', '4000');
  await page.getByRole('textbox').fill(description);
  await page.getByRole('button', { name: 'Enviar pergunta' }).click();
  await expect(page.getByText(/Qual o foco principal da equipe/)).toBeVisible();
  expect(received).toBe(description.trim());
});

test('successful contact and compensation answers link directly to WhatsApp in both views', async ({
  page,
}) => {
  await page.route('**/api/assistant/health', (route) =>
    route.fulfill({ json: { configured: true } }),
  );
  await page.route('**/api/assistant/chat', (route) =>
    route.fulfill({
      json: {
        answer:
          'Omar prefere conversar diretamente sobre remuneração e benefícios para alinhar as condições da vaga.',
        sources: [
          { id: 'career-preferences', title: 'Preferências profissionais', url: '/#contact' },
        ],
        generated: true,
      },
    }),
  );
  await page.goto('/');
  await page.getByRole('button', { name: 'Falar com OmarIA', exact: true }).click();
  await page.getByRole('textbox').fill('Qual a remuneração desejada?');
  await page.getByRole('button', { name: 'Enviar pergunta' }).click();
  const contact = page.getByRole('link', { name: 'Falar com o Omar', exact: true });
  await expect(contact).toHaveAttribute('href', 'https://wa.me/5511948485194');
  await expect(contact).toHaveAttribute('target', '_blank');
  await expect(page.getByRole('button', { name: 'Tentar novamente' })).toHaveCount(0);
  await page.getByRole('link', { name: 'Abrir página completa' }).click();
  await expect(contact).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contato direto' })).toHaveAttribute(
    'href',
    'https://wa.me/5511948485194',
  );
});

test('smiling launcher opens a keyboard-accessible chat and restores focus', async ({ page }) => {
  await mockAI(page);
  await page.goto('/');
  const launcher = page.getByRole('button', { name: /Falar com OmarIA/ });
  const initial = await launcher.boundingBox();
  expect(initial).not.toBeNull();
  expect(Math.abs(initial!.width - initial!.height)).toBeLessThan(1);
  await expect(launcher).toHaveCSS('border-radius', '50%');
  await launcher.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Sua pergunta para a OmarIA' })).toBeFocused();
  await page.getByRole('button', { name: /Que resultados ele entregou/ }).click();
  await expect(dialog.getByText(/reduziu o login de 55 para 15 segundos/)).toBeVisible();
  await expect(dialog.getByRole('link', { name: /Login · OneBox/ })).toHaveAttribute(
    'href',
    '/#resultados',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await mkdir('artifacts/omaria', { recursive: true });
  await dialog.screenshot({ path: `artifacts/omaria/popup-${page.viewportSize()?.width}.png` });
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(launcher).toBeFocused();
});

test('dedicated page retains this tab conversation and separates locales', async ({ page }) => {
  await mockAI(page);
  await page.goto('/');
  await page.getByRole('button', { name: /Falar com OmarIA/ }).click();
  await page.getByRole('textbox').fill('Qual resultado ele teve no estágio?');
  await page.getByRole('button', { name: 'Enviar pergunta' }).click();
  await expect(page.getByText(/reduziu o login de 55 para 15 segundos/)).toBeVisible();
  await page.getByRole('link', { name: 'Abrir página completa' }).click();
  await expect(page).toHaveURL(/\/omaria$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('OmarIA');
  await expect(page.getByText(/reduziu o login de 55 para 15 segundos/)).toBeVisible();
  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByText(/reduziu o login de 55 para 15 segundos/)).toHaveCount(0);
  await expect(page.getByRole('textbox')).toHaveAttribute('placeholder', 'Ask about Omar…');
  await page.getByRole('button', { name: 'Português' }).click();
  await expect(page.getByText(/reduziu o login de 55 para 15 segundos/)).toBeVisible();
  await mkdir('artifacts/omaria', { recursive: true });
  await page.screenshot({
    path: `artifacts/omaria/page-${page.viewportSize()?.width}.png`,
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Nova conversa' }).click();
  await expect(page.getByText(/reduziu o login de 55 para 15 segundos/)).toHaveCount(0);
  await page.reload();
  await expect(page.getByText(/reduziu o login de 55 para 15 segundos/)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('network errors are recoverable and answer text is never interpreted as HTML', async ({
  page,
}) => {
  await page.route('**/api/assistant/health', (route) =>
    route.fulfill({ json: { configured: true } }),
  );
  let calls = 0;
  await page.route('**/api/assistant/chat', async (route) => {
    calls += 1;
    if (calls === 2) {
      const body = route.request().postDataJSON() as { message: string };
      expect(body.message).toBe('Me fale do Omar');
    }
    if (calls === 1)
      await route.fulfill({
        status: 503,
        json: { message: 'A IA está indisponível. Tente novamente.' },
      });
    else
      await route.fulfill({
        json: {
          answer: '<img src=x onerror=alert(1)> Resultado confirmado.',
          sources: [{ id: 'bad', title: 'Fonte insegura', url: 'javascript:alert(1)' }],
          generated: true,
        },
      });
  });
  await page.goto('/omaria');
  const input = page.getByRole('textbox');
  await input.fill('Me fale do Omar');
  await page.getByRole('button', { name: 'Enviar pergunta' }).click();
  await expect(
    page.getByText(
      'Não consegui conectar com a OmarIA. Tente novamente em instantes ou use o contato do portfólio.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Falar com o Omar' })).toHaveAttribute(
    'href',
    'https://wa.me/5511948485194',
  );
  await expect(page.getByRole('link', { name: 'Falar com o Omar' })).toHaveAttribute(
    'target',
    '_blank',
  );
  await expect(page.getByRole('button', { name: 'Tentar novamente' })).toBeVisible();
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByText('<img src=x onerror=alert(1)> Resultado confirmado.')).toBeVisible();
  await expect(page.locator('img[src="x"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Fonte insegura' })).toHaveCount(0);
});

test('round chat stays in the portfolio corner at every scroll position', async ({ page }) => {
  await mockAI(page);
  await page.goto('/');
  const bubble = page.getByRole('button', { name: /Falar com OmarIA/ });
  for (const target of ['#hero', '#projects', '#contact']) {
    await page.locator(target).scrollIntoViewIfNeeded();
    await expect(bubble).toBeInViewport();
    const rect = await bubble.boundingBox();
    const viewport = page.viewportSize()!;
    expect(rect!.x + rect!.width).toBeLessThanOrEqual(viewport.width);
    expect(rect!.y + rect!.height).toBeLessThanOrEqual(viewport.height);
    expect(viewport.width - rect!.x - rect!.width).toBeLessThan(30);
    expect(viewport.height - rect!.y - rect!.height).toBeLessThan(30);
  }
  await bubble.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.getByRole('textbox').fill('Qual a experiência do Omar com RAG?');
  await page.getByRole('button', { name: 'Enviar pergunta' }).click();
  await expect(dialog.getByText(/reduziu o login/)).toBeVisible();
});

test('new conversation aborts a pending answer without bringing it back', async ({ page }) => {
  await page.route('**/api/assistant/health', (route) =>
    route.fulfill({ json: { configured: true } }),
  );
  await page.route('**/api/assistant/chat', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    await route.fulfill({ json: { answer: 'Resposta antiga.', sources: [] } }).catch(() => {});
  });
  await page.goto('/omaria');
  await page.getByRole('textbox').fill('Quais projetos ele tem?');
  await page.getByRole('button', { name: 'Enviar pergunta' }).click();
  await expect(page.getByRole('button', { name: 'Interromper resposta' })).toBeVisible();
  await page.getByRole('button', { name: 'Nova conversa' }).click();
  await expect(page.getByRole('button', { name: 'Enviar pergunta' })).toBeVisible();
  await page.waitForTimeout(900);
  await expect(page.getByText('Resposta antiga.')).toHaveCount(0);
});
