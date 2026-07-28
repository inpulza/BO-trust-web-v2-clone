import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:3002';
const widths = [810, 840, 860, 874, 1200, 1210];

for (const width of widths) {
  test(`Service has no overflow or Stats overlap at ${width}px`, async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await page.goto(`${base}/service-static`, { waitUntil: 'networkidle' });
      const health = await page.evaluate(() => {
        const heading = [...document.querySelectorAll('h2')].find((node) => node.textContent?.startsWith('The financial challenges'));
        const stats = heading?.closest('section');
        const next = stats?.nextElementSibling;
        const articles = stats ? [...stats.querySelectorAll('article')] : [];
        const articleBottom = Math.max(...articles.map((node) => node.getBoundingClientRect().bottom));
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          statsBottom: stats?.getBoundingClientRect().bottom ?? 0,
          nextTop: next?.getBoundingClientRect().top ?? 0,
          articleBottom,
        };
      });
      assert.ok(health.overflow <= 1, `horizontal overflow ${health.overflow}px`);
      assert.ok(health.articleBottom <= health.statsBottom + 1, `stats content exceeds section by ${health.articleBottom - health.statsBottom}px`);
      assert.ok(health.articleBottom <= health.nextTop + 1, `stats overlap next section by ${health.articleBottom - health.nextTop}px`);
    } finally {
      await browser.close();
    }
  });
}

test('Billing period is presented without false radio semantics', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
  try {
    await page.goto(`${base}/service-static`, { waitUntil: 'networkidle' });
    assert.equal(await page.getByRole('radiogroup').count(), 0);
    assert.equal(await page.getByRole('radio').count(), 0);
    await page.getByText('Monthly', { exact: true }).waitFor();
    await page.getByText('Yearly', { exact: true }).waitFor();
  } finally {
    await browser.close();
  }
});
