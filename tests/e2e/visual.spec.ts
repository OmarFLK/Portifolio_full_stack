import { mkdir } from 'node:fs/promises';
import { test } from '@playwright/test';

test('captures the redesign after entrance animations', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  for (const section of await page.locator('main > section').all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await mkdir('artifacts/redesign', { recursive: true });
  await page.screenshot({
    path: `artifacts/redesign/${testInfo.project.name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
});
