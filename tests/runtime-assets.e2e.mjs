import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const viewports = [
  [390, 844], [768, 1024], [1024, 900], [1440, 900], [1920, 1080], [2560, 1440],
];

test('all local media load and no source-builder requests escape at six viewports', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height } });
      const failed = [];
      const badResponses = [];
      const forbidden = [];
      page.on('requestfailed', request => {
        const benignNextAbort = request.failure()?.errorText === 'net::ERR_ABORTED' && /\/_next\/static\/chunks\//.test(request.url());
        if (!benignNextAbort) failed.push(`${request.method()} ${request.url()} ${request.failure()?.errorText}`);
      });
      page.on('response', response => {
        if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
        if (/framerusercontent\.com|events\.framer\.com|framer\.com\/edit/i.test(response.url())) forbidden.push(response.url());
      });
      await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
      const broken = await page.locator('img').evaluateAll(images => images
        .filter(image => !image.complete || image.naturalWidth === 0)
        .map(image => image.getAttribute('src')));
      assert.deepEqual(failed, [], `${width}: failed requests`);
      assert.deepEqual(badResponses, [], `${width}: bad responses`);
      assert.deepEqual(forbidden, [], `${width}: forbidden origin requests`);
      assert.deepEqual(broken, [], `${width}: broken images`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
