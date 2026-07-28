import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:3000/';

for (const width of [390, 768, 1024]) {
  test(`Process Step 3 conserva la superficie gris y copy blanco en ${width}px`, async () => {
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage({ viewport: { width, height: width === 768 ? 1024 : 900 } });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const steps = page.locator('section[aria-labelledby="process-title"] li');
      const styles = await steps.evaluateAll(nodes => nodes.map(node => {
        const heading = node.querySelector('h3');
        const paragraph = node.querySelector('p');
        return [
          getComputedStyle(node).backgroundColor,
          heading ? getComputedStyle(heading).color : null,
          paragraph ? getComputedStyle(paragraph).color : null,
        ];
      }));
      assert.deepEqual(styles, [
        ['rgb(232, 228, 214)', 'rgb(21, 20, 19)', 'rgb(38, 35, 34)'],
        ['rgb(255, 255, 255)', 'rgb(21, 20, 19)', 'rgb(89, 82, 79)'],
        ['rgb(38, 35, 34)', 'rgb(255, 255, 255)', 'rgb(218, 216, 208)'],
      ]);
    } finally {
      await browser.close();
    }
  });
}
