import { mkdir } from 'node:fs/promises';
import { test } from '@playwright/test';

const sectionalEvidenceProjects = new Set([
  'mobile-375',
  'mobile-390',
  'tablet-1024',
  'desktop-1280',
  'desktop-1366',
  'desktop',
  'desktop-1600',
  'wide',
]);

const sectionalTargets = [
  { name: 'hero', selector: '#hero', block: 'start' },
  { name: 'hero-copy', selector: '[data-hero-lead]', block: 'center' },
  { name: 'about', selector: '#about', block: 'center' },
  { name: 'projects-start', selector: '#projects', block: 'start' },
  { name: 'verithaz', selector: '[data-project-id="verithaz"]', block: 'center' },
  { name: 'vira-price', selector: '[data-project-id="vira-price"]', block: 'center' },
  { name: 'lead-enrichment', selector: '[data-project-id="lead-enrichment"]', block: 'center' },
  { name: 'educore', selector: '[data-project-id="educore"]', block: 'center' },
  {
    name: 'open-source-lab',
    selector: '[data-project-id="open-source-lab"]',
    block: 'center',
  },
  { name: 'results', selector: '#resultados', block: 'start' },
  { name: 'experience', selector: '#experience', block: 'center' },
  { name: 'skills', selector: '#skills', block: 'center' },
  { name: 'education', selector: '#education', block: 'center' },
  { name: 'contact', selector: '#contact', block: 'center' },
] as const;

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

test('captures sectional star and Results evidence', async ({ page }, testInfo) => {
  test.skip(
    !sectionalEvidenceProjects.has(testInfo.project.name),
    'The briefing requests sectional evidence at six exact viewport sizes.',
  );

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await mkdir('artifacts/star-results', { recursive: true });

  const viewport = page.viewportSize();
  const dimensions = viewport ? `${viewport.width}x${viewport.height}` : 'responsive';

  for (const target of sectionalTargets) {
    await page
      .locator(target.selector)
      .evaluate((element, block) => element.scrollIntoView({ block }), target.block);
    await page.waitForTimeout(1100);

    await page.screenshot({
      path: `artifacts/star-results/${testInfo.project.name}-${dimensions}-${target.name}.png`,
      fullPage: false,
    });
  }
});
