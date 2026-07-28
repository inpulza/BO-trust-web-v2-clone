import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:3001';
const viewports = [
  [390,844],[768,1024],[1024,900],[1440,900],[1920,1080],[2560,1440],
];
const expected = {
  '/service-static': [6237.375,6092.25,4487.188,4948.203,4948.203,4948.203],
  '/case-study': [3604.813,5020.813,2346.234,1613.219,1613.219,1613.219],
};

for (let i=0;i<viewports.length;i++) {
  const [width,height] = viewports[i];
  test(`Service/Cases ${width}x${height}`, async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width, height } });
    try {
      for (const route of ['/service-static','/case-study','/case-study/cutting-costs-for-a-multi-location-retail-chain']) {
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        assert.equal(response?.status(), 200, `${route} status`);
        await page.locator('footer').scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);
        const health = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - innerWidth,
          broken: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.getAttribute('src')),
          signatures: /framerusercontent|data-framer|framer\.website/i.test(document.documentElement.outerHTML),
          height: document.documentElement.scrollHeight,
        }));
        assert.ok(health.overflow <= 1, `${route} horizontal overflow ${health.overflow}`);
        assert.deepEqual(health.broken, [], `${route} broken images`);
        assert.equal(health.signatures, false, `${route} contains Source signatures`);
        if (route in expected) {
          const sourceHeight = expected[route][i];
          assert.ok(Math.abs(health.height-sourceHeight) <= 260, `${route} height ${health.height}, Source ${sourceHeight}`);
        }
      }

      await page.goto(base + '/service-static', { waitUntil:'networkidle' });
      assert.equal(await page.getByRole('radiogroup').count(), 0);
      assert.equal(await page.getByRole('radio').count(), 0);
      await page.getByText('Monthly', { exact:true }).waitFor();
      await page.getByText('Yearly', { exact:true }).waitFor();

      await page.goto(base + '/case-study', { waitUntil:'networkidle' });
      assert.equal(await page.locator('main a[href^="/case-study/"]').count(), 4);
      await page.getByRole('button', { name:'Load more' }).click();
      assert.equal(await page.locator('main a[href^="/case-study/"]').count(), 7);
      await page.getByText('That’s everything for now!').waitFor();
      const mainNavigation = page.getByLabel('Main navigation');
      if (await mainNavigation.locator('a[aria-current="page"]:visible').count() === 0) {
        await mainNavigation.getByRole('button', { name:'Open navigation menu' }).click();
      }
      const activeNavigationLink = mainNavigation.locator('a[aria-current="page"]:visible');
      assert.equal(await activeNavigationLink.textContent(), 'Case Studies');

      await page.goto(base + '/case-study/cutting-costs-for-a-multi-location-retail-chain', { waitUntil:'networkidle' });
      const email = page.locator('#newsletter-email');
      await email.scrollIntoViewIfNeeded();
      await page.getByRole('button', { name:'Subscribe now' }).click();
      assert.equal(await email.evaluate(el => el === document.activeElement && !el.checkValidity()), true);
      await email.fill('not-an-email');
      assert.equal(await email.evaluate(el => el.validity.typeMismatch), true);
    } finally { await browser.close(); }
  });
}
