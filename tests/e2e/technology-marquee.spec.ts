import { expect, test } from '@playwright/test';
import { technologyLogos } from '../../src/data/technologies';

test('technology ribbon moves continuously, joins seamlessly and can pause', async ({ page }) => {
  await page.goto('/');
  const ribbon = page.locator('[data-technology-marquee]');
  const track = ribbon.locator('[class*="track"]');
  await expect(ribbon).toBeVisible();
  await ribbon.scrollIntoViewIfNeeded();
  await expect(ribbon).toBeInViewport();
  const before = await track.evaluate((el) => getComputedStyle(el).transform);
  await expect.poll(() => track.evaluate((el) => getComputedStyle(el).transform)).not.toBe(before);
  const geometry = await track.evaluate((element) => {
    const animation = element.getAnimations()[0]!;
    const duration = Number(animation.effect!.getTiming().duration);
    const groups = element.children;
    animation.pause();
    animation.currentTime = 0;
    const start = groups[0]!.getBoundingClientRect().left;
    animation.currentTime = duration - 0.1;
    const end = groups[1]!.getBoundingClientRect().left;
    animation.currentTime = 0;
    animation.play();
    return {
      start,
      end,
      iterations: animation.effect!.getTiming().iterations,
      widthA: groups[0]!.getBoundingClientRect().width,
      widthB: groups[1]!.getBoundingClientRect().width,
    };
  });
  expect(Math.abs(geometry.start - geometry.end)).toBeLessThan(1);
  expect(geometry.widthA).toBe(geometry.widthB);
  expect(geometry.iterations).toBe(Infinity);
  await page.getByRole('button', { name: 'Pausar faixa de tecnologias' }).click();
  await expect(track).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Retomar faixa de tecnologias' }).click();
  await expect(track).toHaveCSS('animation-play-state', 'running');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('every brand symbol is served locally as an SVG', async ({ request }) => {
  for (const [, slug] of technologyLogos) {
    const response = await request.get(`/assets/logos/${slug}.svg`);
    expect(response.status(), slug).toBe(200);
    expect(await response.text(), slug).toContain('<svg');
  }
});

test('motion preference stops the ribbon and preserves one readable sequence', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const ribbon = page.locator('[data-technology-marquee]');
  await expect(ribbon.locator('[class*="track"]')).toHaveCSS('animation-name', 'none');
  await expect(ribbon.locator('[class*="group"]').nth(1)).toBeHidden();
  await expect(page.getByRole('button', { name: 'Pausar faixa de tecnologias' })).toBeHidden();
});
