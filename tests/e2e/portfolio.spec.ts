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
  const consoleErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

  if (isCompact(page)) {
    await openMobileMenu(page);
  }

  const projectsAnchor = page.locator('nav:visible a[href="#projects"]');
  await expect(projectsAnchor).toBeVisible();
  await expect(projectsAnchor).toHaveAttribute('href', '#projects');
  await expect(page.locator('nav:visible a[href="#resultados"]')).toHaveAttribute(
    'href',
    '#resultados',
  );
  expect(
    await page
      .locator('#projects [data-project-id]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('data-project-id')),
      ),
  ).toEqual(['verithaz', 'vira-price', 'lead-enrichment', 'educore', 'open-source-lab']);
  await expect(page.getByText('Sistema de Reservas para Restaurantes')).toHaveCount(0);
  await expect(page.getByText(/FinCore/i)).toHaveCount(0);

  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1))
    .toBe(true);

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
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
    page.getByRole('heading', { level: 3, name: 'Verithaz — Investigative AI' }),
  ).toBeVisible();
  await expect(
    page.getByText(/help retailers manage supplier lists with less friction/i),
  ).toBeAttached();
  await expect(
    page.getByRole('heading', { level: 2, name: 'Results that created real impact' }),
  ).toBeVisible();
});

test('Spanish translation includes the complete Results section', async ({ page }, testInfo) => {
  test.skip(
    !['mobile-390', 'desktop'].includes(testInfo.project.name),
    'Language completeness is covered on one mobile and one desktop viewport.',
  );

  await page.goto('/');

  if (isCompact(page)) {
    await openMobileMenu(page);
  }

  await page.locator('button[lang="es"]:visible').click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Resultados que generaron impacto real',
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      'Aproximadamente setenta mil reales brasileños ahorrados en gastos de inteligencia artificial.',
    ),
  ).toBeAttached();
  await expect(
    page.getByRole('heading', { level: 3, name: 'Verithaz — IA Investigativa' }),
  ).toBeAttached();
  await expect(
    page.getByText(/gestionar sus listas de proveedores con menos fricción/i),
  ).toBeAttached();
});

test('Hero status card stays below the lead instead of covering it', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const leadBox = await page.locator('[data-hero-lead]').boundingBox();
  const statusBox = await page.locator('#hero aside[aria-label]').boundingBox();

  expect(leadBox).not.toBeNull();
  expect(statusBox).not.toBeNull();
  expect(statusBox?.y ?? 0).toBeGreaterThanOrEqual((leadBox?.y ?? 0) + (leadBox?.height ?? 0) + 16);
});

test('reduced motion does not initialize the WebGL scene', async ({ page }) => {
  const requestedUrls: string[] = [];
  page.on('request', (request) => requestedUrls.push(request.url()));
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(
    page.getByText(
      'Aproximadamente setenta mil reais economizados em gastos com inteligência artificial.',
    ),
  ).toBeAttached();
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

test('Results hash, scroll spy and metric semantics work together', async ({ page }, testInfo) => {
  test.skip(
    !['mobile-390', 'desktop'].includes(testInfo.project.name),
    'Hash refresh and scroll spy are covered on one mobile and one desktop viewport.',
  );

  await page.goto('/#resultados');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/#resultados$/);
  await expect(page.locator('#resultados')).toBeInViewport();

  if (isCompact(page)) {
    await openMobileMenu(page);
  }

  await expect(page.locator('nav:visible a[href="#resultados"]')).toHaveAttribute(
    'aria-current',
    'location',
  );

  await expect(page.locator('[data-result-id="ai-savings"] .sr-only')).toHaveText(
    'Aproximadamente setenta mil reais economizados em gastos com inteligência artificial.',
  );
  await expect(page.locator('[data-result-id="efficiency"] strong')).toHaveText('+15%');
  await expect(page.locator('[data-result-id="manual-weeks"] strong')).toHaveText('Semanas');
});

test('desktop star stays compact, clears dense projects and avoids protected content', async ({
  page,
}) => {
  test.skip(
    (page.viewportSize()?.width ?? 0) < 1280,
    'The semantic star choreography is desktop-only.',
  );

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const scene = page.locator('[data-star-scene]');
  await expect(scene).toHaveCount(1);

  const targets = [
    { selector: '#hero', block: 'start', maxSize: 300 },
    { selector: '#about', block: 'center', hiddenBelow: 1600, maxSize: 230 },
    {
      selector: '[data-project-id="verithaz"]',
      block: 'center',
      hidden: true,
      maxSize: 230,
    },
    {
      selector: '[data-project-id="open-source-lab"]',
      block: 'center',
      hidden: true,
      maxSize: 230,
    },
    { selector: '#resultados', block: 'start', maxSize: 230 },
    {
      selector: '[data-star-waypoint="results-metrics"]',
      block: 'center',
      hidden: true,
      maxSize: 230,
    },
    { selector: '#experience', block: 'center', hiddenBelow: 1700, maxSize: 230 },
    { selector: '#contact', block: 'center', hiddenBelow: 1800, maxSize: 230 },
  ];

  for (const target of targets) {
    await page
      .locator(target.selector)
      .evaluate((element, block) => element.scrollIntoView({ block }), target.block);
    await page.waitForTimeout(1100);

    const opacity = Number.parseFloat(
      await scene.evaluate((element) => getComputedStyle(element).opacity),
    );
    const sceneBox = await scene.boundingBox();

    expect(sceneBox).not.toBeNull();
    expect(Math.max(sceneBox?.width ?? 0, sceneBox?.height ?? 0)).toBeLessThanOrEqual(
      target.maxSize + 1,
    );

    const shouldBeHidden =
      target.hidden ||
      (target.hiddenBelow !== undefined && (page.viewportSize()?.width ?? 0) < target.hiddenBelow);

    if (shouldBeHidden) {
      expect(opacity).toBeLessThanOrEqual(0.02);
      continue;
    }

    if (opacity <= 0.02 || !sceneBox) {
      continue;
    }

    const protectedElements = page.locator(`${target.selector} [data-star-protected]`);

    for (const protectedElement of await protectedElements.all()) {
      const protectedBox = await protectedElement.boundingBox();

      if (!protectedBox) continue;

      const overlaps =
        sceneBox.x < protectedBox.x + protectedBox.width &&
        sceneBox.x + sceneBox.width > protectedBox.x &&
        sceneBox.y < protectedBox.y + protectedBox.height &&
        sceneBox.y + sceneBox.height > protectedBox.y;

      expect(overlaps, `${target.selector} overlaps protected content`).toBe(false);
    }
  }
});

test('wide star drifts with scroll before its section fade', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'wide', 'The 1920px gutter gives this motion a stable path.');

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const scene = page.locator('[data-star-scene]');
  await expect(scene).toHaveCount(1);

  const transition = await page.evaluate(() => {
    const about = document.querySelector('#about');
    const projects = document.querySelector('#projects');

    if (!about || !projects) return null;

    const aboutScroll = about.getBoundingClientRect().top + window.scrollY - innerHeight * 0.46;
    const projectsScroll =
      projects.getBoundingClientRect().top + window.scrollY - innerHeight * 0.58;
    const segmentDuration = Math.max(1, projectsScroll - aboutScroll);
    const transitionDuration = Math.min(segmentDuration, innerHeight * 0.34);
    const transitionStart = projectsScroll - transitionDuration;

    return {
      start: transitionStart + 2,
      moved: transitionStart + transitionDuration * 0.58,
      hidden: projectsScroll + 2,
    };
  });

  expect(transition).not.toBeNull();

  const readPose = async () =>
    scene.evaluate((element) => {
      const style = getComputedStyle(element);
      const matrix = new DOMMatrixReadOnly(style.transform);

      return {
        x: matrix.m41,
        y: matrix.m42,
        scale: Math.hypot(matrix.m11, matrix.m12),
        opacity: Number.parseFloat(style.opacity),
      };
    });

  const scrollAndRead = async (scrollY: number) => {
    await page.evaluate((nextScrollY) => window.scrollTo(0, nextScrollY), scrollY);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThanOrEqual(scrollY - 2);
    await page.waitForTimeout(100);
    return readPose();
  };

  const startPose = await scrollAndRead(transition?.start ?? 0);
  const movedPose = await scrollAndRead(transition?.moved ?? 0);
  const hiddenPose = await scrollAndRead(transition?.hidden ?? 0);

  expect(startPose.opacity).toBeGreaterThan(0.05);
  expect(Math.abs(movedPose.x - startPose.x)).toBeLessThanOrEqual(2);
  expect(Math.abs(movedPose.y - startPose.y)).toBeGreaterThanOrEqual(40);
  expect(movedPose.scale).toBeLessThan(startPose.scale);
  expect(Math.abs(movedPose.opacity - startPose.opacity)).toBeLessThanOrEqual(0.05);
  expect(hiddenPose.opacity).toBeLessThanOrEqual(0.02);
});

test('desktop enhancement unmounts and returns across the 1280px boundary', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Resize behavior is covered once.');

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('canvas')).toHaveCount(1);

  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.locator('canvas')).toHaveCount(0);

  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator('canvas')).toHaveCount(1);

  await page.setViewportSize({ width: 1600, height: 900 });
  await expect(page.locator('canvas')).toHaveCount(1);

  await page.setViewportSize({ width: 1366, height: 768 });
  await expect(page.locator('canvas')).toHaveCount(1);
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

  await page.locator('nav:visible a[href="#resultados"]').click();
  await expect(page).toHaveURL(/#resultados$/);
  await expect(page.locator('#resultados')).toBeInViewport();

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
