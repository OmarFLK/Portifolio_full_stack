import { mkdir } from 'node:fs/promises';
import { test } from '@playwright/test';

test('captures full-page visual evidence', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const sections = page.locator('main > section');
  for (let index = 0; index < (await sections.count()); index += 1) {
    await sections.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(90);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await mkdir('artifacts', { recursive: true });

  const viewport = page.viewportSize();
  const dimensions = viewport ? `${viewport.width}x${viewport.height}` : 'responsive';

  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-${dimensions}-full.png`,
    fullPage: true,
    animations: 'disabled',
  });
});
