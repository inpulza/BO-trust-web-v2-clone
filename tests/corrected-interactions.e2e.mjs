import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:3000/';
const closeTo = (actual, expected, tolerance = 2) => Math.abs(actual - expected) <= tolerance;

test('corrected interactive details match their focused contracts', async (t) => {
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });

  assert.equal(await page.getByText('View detail', { exact: true }).count(), 0);

  const connector = page.getByRole('heading', { name: 'From confusion to financial clarity' }).locator('..');
  await connector.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const connectorStyles = await connector.locator('[data-connector-line]').evaluateAll((lines) => lines.map((line) => {
    const style = getComputedStyle(line);
    return {
      name: line.getAttribute('data-connector-line'),
      top: style.borderTopStyle,
      right: style.borderRightStyle,
      bottom: style.borderBottomStyle,
      left: style.borderLeftStyle,
      color: style.borderBottomColor,
      radius: style.borderRadius,
      opacity: style.opacity,
    };
  }));
  assert.deepEqual(connectorStyles.map((line) => line.name), ['left', 'center', 'right']);
  assert.deepEqual(connectorStyles[0], { name: 'left', top: 'dashed', right: 'dashed', bottom: 'dashed', left: 'none', color: 'rgb(162, 150, 145)', radius: '0px 10px 10px 0px', opacity: '0.5' });
  assert.equal(connectorStyles[1].bottom, 'dashed');
  assert.deepEqual(connectorStyles[2], { name: 'right', top: 'dashed', right: 'none', bottom: 'dashed', left: 'dashed', color: 'rgb(162, 150, 145)', radius: '10px 0px 0px 10px', opacity: '0.5' });

  const clarityHeading = page.getByRole('heading', { name: 'The financial clarity your business needs to grow with confidence.' });
  const claritySection = clarityHeading.locator('xpath=ancestor::section');
  const clarityGeometry = await claritySection.evaluate((section) => ({ top: section.getBoundingClientRect().top + scrollY, height: section.getBoundingClientRect().height }));
  const claritySamples = [];
  for (const ratio of [0.2, 0.3, 0.4, 0.5, 0.6, 0.7]) {
    const targetY = clarityGeometry.top - 900 + ratio * (clarityGeometry.height + 900);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), targetY);
    await page.waitForTimeout(180);
    claritySamples.push(await claritySection.evaluate((section) => {
      const heading = section.querySelector('h2');
      const content = heading?.parentElement;
      const metrics = section.querySelector('[aria-label="Company metrics"]');
      const cta = section.querySelector('a');
      const tags = [...section.querySelectorAll('[data-clarity-message]')];
      return {
        contentTop: content?.getBoundingClientRect().top,
        headingTop: heading?.getBoundingClientRect().top,
        metricsTop: metrics?.getBoundingClientRect().top,
        ctaTop: cta?.getBoundingClientRect().top,
        visible: tags.filter((tag) => Number(getComputedStyle(tag).opacity) > 0.95).length,
        opacities: tags.map((tag) => Number(getComputedStyle(tag).opacity)),
      };
    }));
  }
  for (const sample of claritySamples.slice(1, 5)) assert.ok(closeTo(sample.contentTop, 0, 2), `sticky top=${sample.contentTop}`);
  assert.ok(claritySamples.every((sample, index, all) => index === 0 || sample.visible >= all[index - 1].visible), 'clarity tags must accumulate monotonically');
  assert.equal(claritySamples[0].visible, 0);
  assert.ok(claritySamples.at(-1).visible >= 5);
  assert.ok(closeTo(claritySamples[2].headingTop, claritySamples[4].headingTop, 1));
  assert.ok(claritySamples[2].ctaTop < claritySamples[2].metricsTop, 'CTA must remain above the metrics row');

  const processSection = page.getByRole('heading', { name: /A simple path to financial clarity/ }).locator('xpath=ancestor::section');
  await processSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const cards = processSection.locator('ol > li');
  const widths = async () => cards.evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().width)));
  assert.deepEqual(await widths(), [528, 169, 170]);
  await cards.nth(1).hover();
  await page.waitForTimeout(550);
  assert.deepEqual(await widths(), [170, 528, 170]);
  await cards.nth(2).hover();
  await page.waitForTimeout(550);
  assert.deepEqual(await widths(), [170, 169, 528]);
  assert.deepEqual(await cards.evaluateAll((items) => items.map((item) => item.getAttribute('data-active'))), ['false', 'false', 'true']);
});
