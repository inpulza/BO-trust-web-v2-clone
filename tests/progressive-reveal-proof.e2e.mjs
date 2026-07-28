import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:3000/';

async function visualState(locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform);
    return { opacity: Number(style.opacity), transform: style.transform, y: matrix.m42 };
  });
}

async function expectInitial(locator, label) {
  const state = await visualState(locator);
  assert.ok(state.opacity <= 0.05, `${label}: opacity inicial esperada 0, recibida ${state.opacity}`);
  assert.ok(state.y >= 19 && state.y <= 21, `${label}: translateY inicial esperado 20px, recibido ${state.y}px (${state.transform})`);
}

async function expectFinal(locator, label) {
  const state = await visualState(locator);
  assert.ok(state.opacity >= 0.99, `${label}: opacity final esperada 1, recibida ${state.opacity}`);
  assert.ok(Math.abs(state.y) < 0.01, `${label}: translateY final esperado 0px, recibido ${state.y}px (${state.transform})`);
}

async function revealPair(page, first, delayed, label) {
  await page.evaluate(() => scrollTo(0, 0));
  await expectInitial(first, `${label} izquierda`);
  await expectInitial(delayed, `${label} derecha`);

  await first.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const [firstMiddle, delayedMiddle] = await Promise.all([visualState(first), visualState(delayed)]);
  assert.ok(firstMiddle.opacity > 0.42 && firstMiddle.opacity < 0.82, `${label} izquierda @400ms: opacity cercana a .60, recibida ${firstMiddle.opacity}`);
  assert.ok(firstMiddle.y > 3 && firstMiddle.y < 13, `${label} izquierda @400ms: y cercano a 8px, recibido ${firstMiddle.y}px`);
  assert.ok(delayedMiddle.opacity > 0.15 && delayedMiddle.opacity < 0.52, `${label} derecha @400ms: opacity cercana a .30, recibida ${delayedMiddle.opacity}`);
  assert.ok(delayedMiddle.y > 9 && delayedMiddle.y < 18, `${label} derecha @400ms: y cercano a 14px, recibido ${delayedMiddle.y}px`);

  await page.waitForTimeout(500);
  await expectFinal(first, `${label} izquierda`);
  await expectFinal(delayed, `${label} derecha`);
}

test('Process y Testimonials reproducen el reveal principal y el reveal retrasado', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 600 }, reducedMotion: 'no-preference' });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(100);

    const process = page.locator('section[aria-labelledby="process-title"]');
    await revealPair(page, process.locator(':scope > div > div > div').first(), process.locator('ol'), 'Process');

    const testimonials = page.locator('section[aria-labelledby="testimonials-title"]');
    const layout = testimonials.locator(':scope > div > div');
    await revealPair(page, layout.locator(':scope > div').first(), layout.locator(':scope > div').nth(1), 'Testimonials');
    await page.waitForTimeout(300);
    await expectFinal(testimonials.locator('article').first(), 'Testimonials tarjeta interna');
  } finally {
    await browser.close();
  }
});

test('reduced motion muestra Process y Testimonials inmediatamente en estado final', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 600 }, reducedMotion: 'reduce' });
    await page.goto(URL, { waitUntil: 'networkidle' });

    const process = page.locator('section[aria-labelledby="process-title"]');
    const testimonials = page.locator('section[aria-labelledby="testimonials-title"]');
    const testimonialsLayout = testimonials.locator(':scope > div > div');
    const nodes = [
      process.locator(':scope > div > div > div').first(),
      process.locator('ol'),
      testimonialsLayout.locator(':scope > div').first(),
      testimonialsLayout.locator(':scope > div').nth(1),
      testimonials.locator('article').first(),
    ];
    for (const [index, node] of nodes.entries()) await expectFinal(node, `reduced node ${index + 1}`);
  } finally {
    await browser.close();
  }
});
