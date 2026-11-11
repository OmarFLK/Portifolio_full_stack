import { expect, test } from '@playwright/test';

test('selected work, navigation, CV and language remain usable at every viewport', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.locator('#projects article')).toHaveCount(6);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(
    await page
      .locator('[data-result-metric]')
      .evaluateAll((elements) =>
        elements.every((element) => getComputedStyle(element).opacity === '1'),
      ),
  ).toBe(true);
  for (const heading of await page.locator('h2').all()) {
    expect(await heading.evaluate((el) => getComputedStyle(el).color)).toBe('rgb(248, 243, 244)');
  }
  const compact = (page.viewportSize()?.width ?? 0) < 900;
  const menu = page.getByRole('button', { name: 'Abrir menu' });
  if (compact) {
    await menu.click();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await page.locator('nav:visible a[href="#projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  if (compact) await expect(menu).toHaveAttribute('aria-expanded', 'false');
  const response = await page.request.get('/Curriculo_Omar_Saliba.pdf');
  expect(response.status()).toBe(200);
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  if (compact) await menu.click();
  await page.getByRole('button', { name: 'EN — English' }).filter({ visible: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'MAUA AI — Mobility analyst' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('reduced motion preserves content and disables ambient animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    await page
      .locator('[class*="orbit"] > span')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  await page.locator('#resultados').scrollIntoViewIfNeeded();
  await expect(page.getByText('3 dias → 1h')).toBeVisible();
  expect(
    await page
      .locator('[data-result-metric]')
      .evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === '1')),
  ).toBe(true);
});
