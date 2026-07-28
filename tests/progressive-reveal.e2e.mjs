import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:3000/';

async function visualState(locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return { opacity: Number(style.opacity), transform: style.transform };
  });
}

async function expectProgressiveReveal(page, locator, label) {
  const before = await visualState(locator);
  assert.ok(before.opacity <= 0.05, `${label}: debe comenzar fuera de viewport casi transparente, recibido ${before.opacity}`);
  assert.match(before.transform, /matrix\([^)]*,\s*20\)|matrix3d\(/, `${label}: debe comenzar desplazado 20px, recibido ${before.transform}`);

  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const after = await visualState(locator);
  assert.ok(after.opacity >= 0.99, `${label}: debe terminar opaco, recibido ${after.opacity}`);
  assert.equal(after.transform, 'none', `${label}: debe terminar sin transform`);
}

test('problems connector and financial clarity reveal progressively to their final opaque state', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
    await page.goto(URL, { waitUntil: 'networkidle' });

    const connector = page.getByRole('heading', { name: 'From confusion to financial clarity' }).locator('..');
    await expectProgressiveReveal(page, connector, 'problems connector');

    await page.evaluate(() => scrollTo(0, 0));
    const clarity = page.locator('section[aria-labelledby="clarity-title"] > div > div');
    await expectProgressiveReveal(page, clarity, 'financial clarity');
  } finally {
    await browser.close();
  }
});

test('reduced motion exposes financial clarity immediately without opacity or transform', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(URL, { waitUntil: 'networkidle' });
    const clarity = page.locator('section[aria-labelledby="clarity-title"] > div > div');
    const state = await visualState(clarity);
    assert.equal(state.opacity, 1);
    assert.equal(state.transform, 'none');
  } finally {
    await browser.close();
  }
});
