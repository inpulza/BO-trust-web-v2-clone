import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:3000/';

async function state(locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform);
    return { opacity: Number(style.opacity), transform: style.transform, y: matrix.m42 };
  });
}

async function expectFinal(locator, label) {
  const value = await state(locator);
  assert.ok(value.opacity >= 0.99, `${label}: opacity final esperada 1, recibida ${value.opacity}`);
  assert.equal(value.transform, 'none', `${label}: transform final esperado none, recibido ${value.transform}`);
}

async function openPage(browser, { width = 1440, reducedMotion = 'no-preference', waitUntil = 'domcontentloaded', freezeRaf = false } = {}) {
  const page = await browser.newPage({ viewport: { width, height: 600 }, reducedMotion });
  if (freezeRaf) {
    await page.addInitScript(() => {
      const nativeRaf = window.requestAnimationFrame.bind(window);
      let frozen = true;
      let queued = [];
      window.requestAnimationFrame = (callback) => frozen ? queued.push(callback) : nativeRaf(callback);
      window.__releaseMotionFrames = () => {
        frozen = false;
        const callbacks = queued;
        queued = [];
        callbacks.forEach((callback) => nativeRaf(callback));
      };
    });
  }
  await page.goto(URL, { waitUntil });
  return page;
}

test('Hero revela título, visual y chips con el stagger medido y termina antes de 800ms', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await openPage(browser, { waitUntil: 'networkidle', freezeRaf: true });
    const hero = page.locator('section[aria-labelledby="hero-title"]');
    const title = hero.getByRole('heading', { name: 'Financial Growth' });
    const visual = hero.locator('[data-hero-visual]');
    const chips = ['Bookkeeping', 'Financial planning', 'Tax consulting', 'Risk management'].map((name) => hero.getByText(name, { exact: true }));

    const initial = await Promise.all(chips.map(state));
    for (let index = 1; index < initial.length; index += 1) {
      assert.ok(initial[index - 1].opacity > initial[index].opacity, `chips t0: opacidad escalonada ${initial.map(({ opacity }) => opacity).join('/')}`);
      assert.ok(initial[index - 1].y < initial[index].y, `chips t0: desplazamiento escalonado ${initial.map(({ y }) => y).join('/')}`);
    }
    assert.ok(initial[0].opacity >= 0.25 && initial[0].opacity <= 0.75, `Bookkeeping t0 cercano a .48, recibido ${initial[0].opacity}`);
    assert.ok(initial[3].opacity <= 0.08, `Risk t0 cercano a 0, recibido ${initial[3].opacity}`);
    assert.ok(initial[0].y >= 5 && initial[0].y <= 15, `Bookkeeping t0 cercano a y10, recibido ${initial[0].y}`);
    assert.ok(initial[3].y >= 17 && initial[3].y <= 21, `Risk t0 cercano a y20, recibido ${initial[3].y}`);

    await page.evaluate(() => window.__releaseMotionFrames());
    await page.waitForTimeout(150);
    const middle = await Promise.all([state(title), state(visual), ...chips.map(state)]);
    assert.ok(middle[0].opacity > 0.05 && middle[0].opacity < 1, `título @180ms debe estar en reveal, recibido ${middle[0].opacity}`);
    assert.ok(middle[1].opacity > 0.05 && middle[1].opacity < 1, `visual @180ms debe estar en reveal, recibido ${middle[1].opacity}`);

    await page.waitForTimeout(620);
    await expectFinal(title, 'hero título');
    await expectFinal(visual, 'hero visual');
    for (const [index, chip] of chips.entries()) await expectFinal(chip, `hero chip ${index + 1}`);
  } finally {
    await browser.close();
  }
});

test('Problems/Solutions móvil revela Problem, Center y Solution sin opacidad permanente', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [index, reveal] of ['problem', 'center', 'solution'].entries()) {
      const page = await openPage(browser, { width: 390, waitUntil: 'networkidle' });
      const node = page.locator(`[data-reveal="${reveal}"]`);
      const initial = await state(node);
      assert.ok(initial.opacity <= 0.05, `móvil nodo ${index + 1}: inicia transparente, recibido ${initial.opacity}`);
      assert.ok(initial.y >= 19 && initial.y <= 21, `móvil nodo ${index + 1}: inicia en y20, recibido ${initial.y}`);
      await node.evaluate((element) => element.scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(220);
      const middle = await state(node);
      assert.ok(middle.opacity > 0.05 && middle.opacity < 0.99, `móvil nodo ${index + 1}: estado intermedio, recibido ${middle.opacity}`);
      await page.waitForTimeout(700);
      await expectFinal(node, `móvil nodo ${index + 1}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('Center desktop usa 0/y20, progresa y termina 1/none', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await openPage(browser, { width: 1440, waitUntil: 'networkidle' });
    const center = page.locator('[data-reveal="center"]');
    const initial = await state(center);
    assert.ok(initial.opacity <= 0.05, `center desktop inicial opacity 0, recibida ${initial.opacity}`);
    assert.ok(initial.y >= 19 && initial.y <= 21, `center desktop inicial y20, recibida ${initial.y}`);
    await center.evaluate((element) => element.scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(220);
    const middle = await state(center);
    assert.ok(middle.opacity > 0.05 && middle.opacity < 0.99, `center desktop intermedio, recibida ${middle.opacity}`);
    await page.waitForTimeout(700);
    await expectFinal(center, 'center desktop');
  } finally {
    await browser.close();
  }
});

test('reduced motion expone Hero y Problems/Solutions inmediatamente en 1/none', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [390, 1440]) {
      const page = await openPage(browser, { width, reducedMotion: 'reduce', waitUntil: 'networkidle' });
      const hero = page.locator('section[aria-labelledby="hero-title"]');
      const nodes = [
        hero.getByRole('heading', { name: 'Financial Growth' }),
        hero.locator('[data-hero-visual]'),
        ...['Bookkeeping', 'Financial planning', 'Tax consulting', 'Risk management'].map((name) => hero.getByText(name, { exact: true })),
        ...['problem', 'center', 'solution'].map((name) => page.locator(`[data-reveal="${name}"]`)),
      ];
      for (const [index, node] of nodes.entries()) await expectFinal(node, `reduced @${width} nodo ${index + 1}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
