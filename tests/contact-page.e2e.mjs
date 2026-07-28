import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = process.env.CONTACT_URL ?? 'http://127.0.0.1:3001/contact';
const viewports = [
  [390, 844, 3281], [768, 1024, 3371], [1024, 900, 2258],
  [1440, 900, 2395], [1920, 1080, 2378], [2560, 1440, 2378],
];

for (const [width, height, sourceHeight] of viewports) {
  test(`Contact matches its interaction contract at ${width}×${height}`, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width, height } });
      const response = await page.goto(URL, { waitUntil: 'domcontentloaded' });
      assert.equal(response?.status(), 200);
      await page.getByRole('heading', { level: 1, name: 'Contact us' }).waitFor();

      const form = page.locator('form');
      await form.getByRole('button', { name: 'Send message' }).click();
      assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('name')), 'Name');
      assert.equal(await form.locator('input[name="Name"]').evaluate((input) => input.validationMessage), 'Please fill out this field.');
      await form.locator('input[type="email"]').fill('x');
      assert.equal(await form.locator('input[type="email"]').evaluate((input) => input.validity.typeMismatch), true);
      await form.locator('input[type="email"]').fill('');

      const firstFaq = page.getByRole('button', { name: 'What types of businesses do you work with?' });
      await firstFaq.scrollIntoViewIfNeeded();
      const faqBefore = await firstFaq.boundingBox();
      const textBefore = await firstFaq.textContent();
      await firstFaq.click();
      const faqAfter = await firstFaq.boundingBox();
      assert.equal(await firstFaq.getAttribute('aria-pressed'), 'true');
      assert.equal(await firstFaq.getAttribute('aria-expanded'), null);
      assert.equal(await firstFaq.textContent(), textBefore);
      assert.ok(Math.abs((faqAfter?.height ?? 0) - (faqBefore?.height ?? 0)) < 1);

      if (width <= 1024) {
        await page.evaluate(() => scrollTo(0, 0));
        const opener = page.locator('button[aria-controls="mobile-navigation"]');
        await opener.click();
        assert.equal(await opener.getAttribute('aria-expanded'), 'true');
        const panel = await page.locator('#mobile-navigation').boundingBox();
        assert.ok(panel);
        assert.ok(Math.abs(panel.width - (width === 1024 ? 820 : width - 24)) < 1);
        await page.getByRole('button', { name: 'Close navigation menu' }).first().click();
      }

      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      const state = await page.evaluate(() => ({
        active: document.querySelector('nav[aria-label="Main navigation"] a[aria-current="page"]')?.textContent?.trim(),
        height: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        broken: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
        signatures: document.documentElement.innerHTML.match(/data-framer-|framerusercontent|\.framer-/gi)?.length ?? 0,
      }));
      console.log(`${width}×${height} sourceHeight=${sourceHeight} cloneHeight=${state.height} delta=${state.height - sourceHeight}`);
      assert.equal(state.active, 'Contact');
      assert.ok(Math.abs(state.height - sourceHeight) <= 300, `page height delta ${state.height - sourceHeight}px`);
      assert.ok(state.overflow <= 1, `horizontal overflow: ${state.overflow}px`);
      assert.deepEqual(state.broken, []);
      assert.equal(state.signatures, 0);
    } finally {
      await browser.close();
    }
  });
}
