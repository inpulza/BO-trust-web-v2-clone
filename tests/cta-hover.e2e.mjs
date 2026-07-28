import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:3002';
const colors = {
  black: 'rgb(21, 20, 19)',
  orange: 'rgb(245, 81, 7)',
  white: 'rgb(255, 255, 255)',
  yellow: 'rgb(254, 234, 157)',
  gray: 'rgb(89, 82, 79)',
};

async function expectHover(page, locator, before, after) {
  const viewport = page.viewportSize();
  await page.mouse.move((viewport?.width ?? 1440) - 1, 0);
  await page.waitForTimeout(220);
  await locator.scrollIntoViewIfNeeded();
  assert.equal(await locator.evaluate((node) => getComputedStyle(node).backgroundColor), before);
  await locator.hover();
  await page.waitForTimeout(220);
  assert.equal(await locator.evaluate((node) => getComputedStyle(node).backgroundColor), after);
  await page.mouse.move(0, 0);
  await page.waitForTimeout(20);
}

test('About preserves Source CTA hover colors', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${base}/about`, { waitUntil: 'networkidle' });
    await expectHover(page, page.getByRole('link', { name: 'Get started', exact: true }), colors.black, colors.orange);
    await expectHover(page, page.getByRole('link', { name: 'Book a consultation' }), colors.white, colors.yellow);
    await expectHover(page, page.getByRole('link', { name: 'See our expertise' }), colors.black, colors.orange);
    await expectHover(page, page.getByRole('link', { name: 'Join our team' }), colors.black, colors.orange);
    await expectHover(page, page.getByRole('link', { name: "Let's get started" }).last(), colors.orange, colors.gray);
  } finally {
    await browser.close();
  }
});

test('primary CTA hover system is active across the website', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(base, { waitUntil: 'networkidle' });
    await expectHover(page, page.getByRole('link', { name: 'Talk to your advisors' }), colors.black, colors.orange);
    await expectHover(page, page.getByRole('link', { name: 'View full case study' }), colors.orange, colors.gray);

    await page.goto(`${base}/contact`, { waitUntil: 'networkidle' });
    await expectHover(page, page.getByRole('button', { name: 'Send message' }), colors.orange, colors.gray);

    await page.goto(`${base}/service-static`, { waitUntil: 'networkidle' });
    await expectHover(page, page.getByRole('link', { name: 'Book a free consulation' }), colors.orange, colors.gray);
    await expectHover(page, page.locator('main a').filter({ hasText: 'Get started →' }).first(), colors.black, colors.orange);

    await page.goto(`${base}/case-study`, { waitUntil: 'networkidle' });
    await expectHover(page, page.getByRole('button', { name: 'Load more' }), colors.black, colors.orange);

    await page.goto(`${base}/case-study/cutting-costs-for-a-multi-location-retail-chain`, { waitUntil: 'networkidle' });
    await expectHover(page, page.getByRole('link', { name: 'See all case studies' }), colors.black, colors.orange);
  } finally {
    await browser.close();
  }
});
