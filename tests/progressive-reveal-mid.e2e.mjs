import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:3000/';
const widths = [390, 768, 1440];
const reveals = [
  ['Industries', 'section[aria-labelledby="industries-title"] > div > div'],
  ['ContactNewsletter', 'section[aria-label="Contact and newsletter"] > div'],
  ['CaseStudies', 'section[aria-labelledby="case-studies-title"] > div'],
];

async function visualState(locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform);
    return { opacity: Number(style.opacity), transform: style.transform, y: matrix.m42 };
  });
}

async function expectProgressiveReveal(page, selector, label) {
  await page.evaluate(() => scrollTo(0, 0));
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'attached' });

  const before = await visualState(locator);
  assert.ok(before.opacity <= 0.05, `${label}: opacity inicial esperada 0, recibida ${before.opacity}`);
  assert.ok(before.y >= 19 && before.y <= 21, `${label}: translateY inicial esperado 20px, recibido ${before.y}px (${before.transform})`);

  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const middle = await visualState(locator);
  assert.ok(middle.opacity > 0.15 && middle.opacity < 0.98, `${label}: a 400ms debe estar en progreso, recibida opacity ${middle.opacity}`);
  assert.ok(middle.y > 0.2 && middle.y < 18, `${label}: a 400ms debe conservar desplazamiento parcial, recibido ${middle.y}px (${middle.transform})`);

  await page.waitForTimeout(500);
  const after = await visualState(locator);
  assert.ok(after.opacity >= 0.99, `${label}: opacity final esperada 1, recibida ${after.opacity}`);
  assert.ok(Math.abs(after.y) < 0.01, `${label}: translateY final esperado 0px, recibido ${after.y}px (${after.transform})`);
}

test('Industries, ContactNewsletter y CaseStudies revelan progresivamente en 390, 768 y 1440', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 600 }, reducedMotion: 'no-preference' });
      await page.goto(URL, { waitUntil: 'networkidle' });
      for (const [name, selector] of reveals) {
        await expectProgressiveReveal(page, selector, `${name} @${width}px`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('reduced motion muestra los tres reveals opacos y sin transform inmediatamente en 390, 768 y 1440', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 600 }, reducedMotion: 'reduce' });
      await page.goto(URL, { waitUntil: 'networkidle' });
      for (const [name, selector] of reveals) {
        const state = await visualState(page.locator(selector));
        assert.equal(state.opacity, 1, `${name} @${width}px reduced: opacity inmediata`);
        assert.equal(state.transform, 'none', `${name} @${width}px reduced: sin transform`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
