import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = process.env.BASE_URL ?? 'http://127.0.0.1:3000/';
const widths = [390, 768, 1440];

async function visualState(locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform);
    return { opacity: Number(style.opacity), transform: style.transform, y: matrix.m42 };
  });
}

function assertInitial(state, label) {
  assert.ok(state.opacity <= 0.05, `${label}: opacity inicial esperada 0, recibida ${state.opacity}`);
  assert.ok(state.y >= 19 && state.y <= 21, `${label}: translateY inicial esperado 20px, recibido ${state.y}px (${state.transform})`);
}

function assertProgress(state, { label, opacity, y }) {
  assert.ok(state.opacity >= opacity[0] && state.opacity <= opacity[1], `${label}: opacity a 400ms fuera de ${opacity.join('–')}, recibida ${state.opacity}`);
  assert.ok(state.y >= y[0] && state.y <= y[1], `${label}: translateY a 400ms fuera de ${y.join('–')}px, recibido ${state.y}px (${state.transform})`);
}

function assertFinal(state, label) {
  assert.ok(state.opacity >= 0.99, `${label}: opacity final esperada 1, recibida ${state.opacity}`);
  assert.equal(state.transform, 'none', `${label}: transform final esperado none, recibido ${state.transform}`);
}

async function resetToTop(page) {
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(50);
}

test('Consultation CTA revela su wrap progresivamente en 390, 768 y 1440', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 600 }, reducedMotion: 'no-preference' });
      await page.goto(URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(100);
      const wrap = page.locator('section[aria-labelledby="consultation-title"] > div');

      assertInitial(await visualState(wrap), `Consultation wrap @${width}px`);
      await wrap.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      assertProgress(await visualState(wrap), { label: `Consultation wrap @${width}px`, opacity: [0.4, 0.82], y: [3.5, 13] });
      await page.waitForTimeout(400);
      assertFinal(await visualState(wrap), `Consultation wrap @${width}px`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('Financial Solutions revela título y lista con delay adicional en 390, 768 y 1440', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 600 }, reducedMotion: 'no-preference' });
      await page.goto(URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(100);
      await resetToTop(page);

      const section = page.locator('section[aria-labelledby="solutions-title"]');
      const title = section.getByRole('heading', { name: 'Financial solutions' });
      const list = section.locator(':scope > div > div');
      assertInitial(await visualState(title), `Financial title @${width}px`);
      assertInitial(await visualState(list), `Financial list @${width}px`);

      await title.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      const titleMiddle = await visualState(title);
      const listMiddle = await visualState(list);
      assertProgress(titleMiddle, { label: `Financial title @${width}px`, opacity: [0.34, 0.78], y: [4, 14] });
      assertProgress(listMiddle, { label: `Financial list @${width}px`, opacity: [0.2, 0.62], y: [7, 17] });
      assert.ok(titleMiddle.opacity > listMiddle.opacity + 0.08, `Financial @${width}px: el título debe adelantar a la lista (${titleMiddle.opacity} vs ${listMiddle.opacity})`);

      await page.waitForTimeout(400);
      assertFinal(await visualState(title), `Financial title @${width}px`);
      assertFinal(await visualState(list), `Financial list @${width}px`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('reduced motion muestra Consultation CTA y Financial Solutions inmediatamente', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 600 }, reducedMotion: 'reduce' });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const consultation = page.locator('section[aria-labelledby="consultation-title"] > div');
      const financial = page.locator('section[aria-labelledby="solutions-title"]');
      assertFinal(await visualState(consultation), `Consultation reduced @${width}px`);
      assertFinal(await visualState(financial.getByRole('heading', { name: 'Financial solutions' })), `Financial title reduced @${width}px`);
      assertFinal(await visualState(financial.locator(':scope > div > div')), `Financial list reduced @${width}px`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
