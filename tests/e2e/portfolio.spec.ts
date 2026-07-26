import { expect, test, type Page } from '@playwright/test';

function isCompact(page: Page): boolean {
  return (page.viewportSize()?.width ?? 0) < 900;
}

async function openMobileMenu(page: Page) {
  const menuButton = page.locator('button[aria-controls="mobile-menu"]');
  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();
}

test('renders the semantic shell without page errors or horizontal overflow', async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

  if (isCompact(page)) {
    await openMobileMenu(page);
  }

  const projectsAnchor = page.locator('nav:visible a[href="#projects"]');
  await expect(projectsAnchor).toBeVisible();
  await expect(projectsAnchor).toHaveAttribute('href', '#projects');

  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1))
    .toBe(true);

  expect(pageErrors).toEqual([]);
});

test('mobile menu is operable and restores focus after Escape', async ({ page }) => {
  await page.goto('/');

  if (!isCompact(page)) {
    await expect(page.locator('nav:visible a[href="#projects"]')).toBeVisible();
    return;
  }

  await openMobileMenu(page);
  await page.keyboard.press('Escape');

  const menuButton = page.getByRole('button', { name: 'Abrir menu' });
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toBeFocused();
});

test('language switch updates the document and visible content', async ({ page }) => {
  await page.goto('/');

  if (isCompact(page)) {
    await openMobileMenu(page);
  }

  await page.locator('button[lang="en"]:visible').click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 2, name: 'Selected projects' })).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 3, name: 'Lead Enrichment Automation' }),
  ).toBeVisible();
});

test('reduced motion does not initialize the WebGL scene', async ({ page }) => {
  const requestedUrls: string[] = [];
  page.on('request', (request) => requestedUrls.push(request.url()));
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('canvas')).toHaveCount(0);
  expect(
    requestedUrls.some((url) =>
      /DesktopStarScene|desktop-3d|three|desktop-scroll|lenis|motion/i.test(url),
    ),
  ).toBe(false);
});

test('compact clients do not request desktop 3D code', async ({ page }) => {
  const requestedUrls: string[] = [];
  page.on('request', (request) => requestedUrls.push(request.url()));

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  if ((page.viewportSize()?.width ?? 0) >= 1280) {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    return;
  }

  const desktopRequests = requestedUrls.filter((url) =>
    /DesktopStarScene|desktop-3d|three|desktop-scroll|lenis|motion/i.test(url),
  );
  expect(desktopRequests).toEqual([]);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('eligible desktop clients load the progressive motion and 3D island', async ({
  page,
}, testInfo) => {
  test.skip(
    (page.viewportSize()?.width ?? 0) < 1280,
    'The enhancement island is intentionally desktop-only.',
  );

  const requestedUrls: string[] = [];
  page.on('request', (request) => requestedUrls.push(request.url()));

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('canvas')).toHaveCount(1);
  expect(requestedUrls.some((url) => /desktop-3d|DesktopStarScene/i.test(url))).toBe(true);
  expect(requestedUrls.some((url) => /motion|EditorialMotion/i.test(url))).toBe(true);
  expect(requestedUrls.some((url) => /desktop-scroll|lenis/i.test(url))).toBe(true);
  expect(testInfo.project.name).toMatch(/desktop|wide/);
});

test('in-page navigation, resume files and on-demand media are functional', async ({
  page,
  request,
}, testInfo) => {
  test.skip(
    !['mobile-390', 'desktop'].includes(testInfo.project.name),
    'Covered on one mobile and one desktop viewport.',
  );

  await page.goto('/');

  if (isCompact(page)) {
    await openMobileMenu(page);
  }

  await page.locator('nav:visible a[href="#projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();

  for (const resumePath of ['/Curriculo_OmarSaliba_PT-BR.pdf', '/Curriculo_OmarSaliba_ENG.pdf']) {
    const response = await request.get(resumePath);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('application/pdf');
  }

  const mediaTrigger = page.getByRole('button', { name: 'Ver demonstração' }).first();
  await mediaTrigger.scrollIntoViewIfNeeded();
  await mediaTrigger.click();

  const dialog = page.getByRole('dialog', { name: 'Demonstração do projeto' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('video source')).toHaveAttribute('src', /\.mp4$/);

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(dialog.locator('video')).toHaveCount(0);
  await expect(mediaTrigger).toBeFocused();

  const externalLinks = page.locator('a[target="_blank"]');
  expect(await externalLinks.count()).toBeGreaterThan(0);

  for (const link of await externalLinks.all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\//);
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }
});
