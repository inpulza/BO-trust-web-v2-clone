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

async function expectInitialState(locators, label) {
  const states = await Promise.all(locators.map(visualState));
  for (const [index, state] of states.entries()) {
    assert.ok(state.opacity <= 0.05, `${label} ${index + 1}: debe iniciar transparente, recibido ${state.opacity}`);
    assert.notEqual(state.transform, 'none', `${label} ${index + 1}: debe iniciar desplazado`);
  }
}

async function expectFinalState(locators, label) {
  const states = await Promise.all(locators.map(visualState));
  for (const [index, state] of states.entries()) {
    assert.ok(state.opacity >= 0.99, `${label} ${index + 1}: debe terminar opaco, recibido ${state.opacity}`);
    assert.equal(state.transform, 'none', `${label} ${index + 1}: debe terminar sin transform`);
  }
}

function blogNodes(page) {
  const section = page.locator('section[aria-labelledby="insights-title"]');
  return [section.getByRole('heading', { name: 'Latest blog & insights' }), ...[0, 1, 2].map((index) => section.locator('a').nth(index))];
}

function footerRegions(page) {
  const footer = page.locator('footer');
  return [
    footer.locator(':scope > div > div').nth(0),
    footer.locator(':scope > div > div').nth(1).locator(':scope > div').nth(0),
    footer.locator(':scope > div > div').nth(1).locator(':scope > div').nth(1),
  ];
}

async function openPage(browser, reducedMotion = 'no-preference') {
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 }, reducedMotion });
  await page.goto(URL, { waitUntil: 'networkidle' });
  // Deja que los efectos de hidratación registren sus IntersectionObserver antes del scroll sintético.
  await page.waitForTimeout(100);
  return page;
}

test('Blog Insights revela heading y tarjetas escalonados y finaliza completamente opaco', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await openPage(browser);
    const nodes = blogNodes(page);
    await expectInitialState(nodes, 'blog');

    await nodes[0].scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
    const progress = await Promise.all(nodes.map(async (node) => (await visualState(node)).opacity));
    assert.ok(progress[0] > progress[2], `blog: el heading debe adelantarse a la segunda tarjeta (${progress.join(', ')})`);
    assert.ok(progress[1] > progress[3], `blog: la primera tarjeta debe adelantarse a la tercera (${progress.join(', ')})`);

    await page.waitForTimeout(980);
    await expectFinalState(nodes, 'blog');
  } finally {
    await browser.close();
  }
});

test('Footer revela sus tres regiones escalonadas y finaliza completamente opaco', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await openPage(browser);
    const regions = footerRegions(page);
    await expectInitialState(regions, 'footer');

    await regions[0].scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
    const progress = await Promise.all(regions.map(async (region) => (await visualState(region)).opacity));
    assert.ok(progress[0] > progress[1], `footer: contactBand debe adelantarse a pagesCard (${progress.join(', ')})`);
    assert.ok(progress[1] > progress[2], `footer: pagesCard debe adelantarse a ctaCard (${progress.join(', ')})`);

    await page.waitForTimeout(980);
    await expectFinalState(regions, 'footer');
  } finally {
    await browser.close();
  }
});

test('reduced motion expone Blog Insights y Footer inmediatamente en su estado final', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await openPage(browser, 'reduce');
    await expectFinalState(blogNodes(page), 'blog reduced motion');
    await expectFinalState(footerRegions(page), 'footer reduced motion');
  } finally {
    await browser.close();
  }
});
