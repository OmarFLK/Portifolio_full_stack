import { expect, test } from '@playwright/test';

test('scrolling after an anchor click keeps only the current navigation item highlighted', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const compact = (page.viewportSize()?.width ?? 0) < 900;
  const menu = page.getByRole('button', { name: 'Abrir menu' });
  if (compact) await menu.click();
  const projectLink = page.locator('nav:visible a[href="#projects"]');
  await projectLink.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.locator('header nav').first().locator('[aria-current="location"]'),
  ).toHaveAttribute('href', '#projects');
  // Leave the pointer/focus on the last clicked entry while moving away from that section.
  await page
    .locator('#experience')
    .evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expect(
    page.locator('header nav').first().locator('[aria-current="location"]'),
  ).toHaveAttribute('href', '#experience');
  if (compact) await menu.click();
  const nav = page.locator('nav:visible');
  await expect(nav.locator('[aria-current="location"]')).toHaveCount(1);
  await expect(nav.locator('[aria-current="location"]')).toHaveAttribute('href', '#experience');
  if (!compact) {
    const highlighted = () =>
      nav.locator('a').evaluateAll((links) =>
        links
          .filter((link) => {
            const transform = getComputedStyle(link, '::after').transform;
            return transform !== 'none' && new DOMMatrixReadOnly(transform).a > 0.99;
          })
          .map((link) => link.getAttribute('href')),
      );
    await expect.poll(highlighted).toEqual(['#experience']);
    await projectLink.focus();
    await expect.poll(highlighted).toEqual(['#experience']);
  }
});

test('mobile institutions occupy three separate aligned rows', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 768, 'This layout applies to mobile screens.');
  await page.goto('/');
  const institutions = page.locator('#hero [class*="heroFooter"] > span');
  await expect(institutions).toHaveText([
    'OneBox / DNE',
    'Mauá Júnior',
    'Instituto Mauá de Tecnologia',
  ]);
  const positions = await institutions.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { x: rect.x, y: rect.y, height: rect.height };
    }),
  );
  for (let i = 1; i < positions.length; i++) {
    expect(Math.abs(positions[i].x - positions[0].x)).toBeLessThan(1);
    expect(positions[i].y).toBeGreaterThanOrEqual(positions[i - 1].y + positions[i - 1].height);
  }
});

test('personal logo is used throughout the portfolio and browser icons', async ({
  page,
  request,
}) => {
  await page.goto('/');
  const logos = page.locator('img[src="/assets/brand/logo-512.png"]');
  await expect(logos).toHaveCount(3);
  expect(
    await logos.evaluateAll((images) =>
      images.every(
        (image) =>
          (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 512,
      ),
    ),
  ).toBe(true);
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
    'href',
    '/favicon.svg?v=brand-s',
  );
  const favicon = await request.get('/favicon.svg?v=brand-s');
  expect(favicon.status()).toBe(200);
  expect(await favicon.text()).toContain('data:image/png;base64,');
  const manifest = (await (await request.get('/site.webmanifest')).json()) as {
    icons: { src: string }[];
  };
  expect(manifest.icons.map((icon: { src: string }) => icon.src)).toContain(
    '/assets/brand/logo-192.png',
  );
  await page.goto('/omaria');
  await expect(page.locator('header img[src="/assets/brand/logo-512.png"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
