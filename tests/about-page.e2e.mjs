import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = process.env.ABOUT_URL ?? `${process.env.PREVIEW_URL ?? 'http://127.0.0.1:3001'}/about`;
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
];
const expectedSections = {
  390: [1173.6, 141.6, 1303.7, 593.8, 2402.8, 700.9],
  768: [1578.3, 141.6, 1482.9, 512.4, 3834, 858.9],
  1024: [844.7, 191.6, 1572.7, 371.2, 1960.5, 468],
  1440: [1073.2, 224, 826.4, 388.4, 981.8, 576],
  1920: [1096.7, 224, 826.4, 388.4, 943.8, 576],
  2560: [1096.7, 224, 826.4, 388.4, 943.8, 576],
};

for (const viewport of viewports) {
  test(`About is complete and usable at ${viewport.width}×${viewport.height}`, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport });
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
        sectionHeights: [...document.querySelectorAll('main > div > section, main > section')].map((section) => section.getBoundingClientRect().height),
      }));

      assert.equal(state.active, 'About');
      assert.ok(state.overflow <= 1, `horizontal overflow: ${state.overflow}px`);
      assert.deepEqual(state.broken, []);
      assert.equal(state.signatures, 0);
      assert.equal(state.sectionHeights.length, 6);
      state.sectionHeights.forEach((height, index) => {
        assert.ok(Math.abs(height - expectedSections[viewport.width][index]) <= 0.5, `section ${index + 1}: ${height}px`);
      });
    } finally {
      await browser.close();
    }
  });
}
