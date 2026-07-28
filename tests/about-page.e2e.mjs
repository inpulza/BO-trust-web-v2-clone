import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = process.env.ABOUT_URL ?? 'http://127.0.0.1:3011/about';

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  test(`About is complete and usable at ${viewport.width}×${viewport.height}`, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewportSize: viewport });
      const response = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      assert.equal(response?.status(), 200);
      await page.getByRole('heading', { level: 1, name: 'Financial clarity and precision for confident growth.' }).waitFor();
      await page.getByRole('heading', { level: 2, name: 'Growth across multiple sectors' }).scrollIntoViewIfNeeded();
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);

      const state = await page.evaluate(() => ({
        active: document.querySelector('nav[aria-label="Main navigation"] a[aria-current="page"]')?.textContent?.trim(),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        broken: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
        signatures: document.documentElement.innerHTML.match(/data-framer-|framerusercontent|\.framer-/gi)?.length ?? 0,
      }));

      assert.equal(state.active, 'About');
      assert.ok(state.overflow <= 1, `horizontal overflow: ${state.overflow}px`);
      assert.deepEqual(state.broken, []);
      assert.equal(state.signatures, 0);
    } finally {
      await browser.close();
    }
  });
}
