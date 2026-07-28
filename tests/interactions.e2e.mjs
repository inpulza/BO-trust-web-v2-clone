import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

test('measured tabs, testimonial controls, newsletter state and sticky contract work', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    assert.ok(await skip.isVisible(), 'skip link must become visible for keyboard focus');
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#content');

    const healthcare = page.getByRole('tab', { name: 'Healthcare' });
    await healthcare.click();
    assert.equal(await healthcare.getAttribute('aria-selected'), 'true');
    assert.equal(await page.getByRole('tabpanel').getByRole('heading', { level: 3 }).textContent(), 'Healthcare');

    await page.getByRole('button', { name: 'Testimonio siguiente' }).click();
    await page.getByText('Testimonio 2 de 5: Daniel Carter').waitFor();

    const subscribe = page.getByRole('button', { name: 'Subscribe now' });
    const before = Number(await subscribe.evaluate(element => getComputedStyle(element).opacity));
    await page.getByRole('textbox', { name: /Get monthly strategies/ }).fill('hello@example.com');
    assert.equal(await subscribe.getAttribute('data-valid'), 'true');
    const after = Number(await subscribe.evaluate(element => getComputedStyle(element).opacity));
    assert.ok(after > before, `expected opacity to increase (${before} -> ${after})`);

    const clarityContent = page.locator('section[aria-labelledby="clarity-title"] > div > div');
    assert.equal(await clarityContent.evaluate(element => getComputedStyle(element).position), 'sticky');
  } finally {
    await page.close();
    await browser.close();
  }
});

test('el carrusel de testimonios navega circularmente por click y teclado', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
    const status = page.locator('p[aria-live="polite"]');
    const previous = page.getByRole('button', { name: 'Testimonio anterior' });
    const next = page.getByRole('button', { name: 'Testimonio siguiente' });

    await previous.click();
    assert.equal(await status.textContent(), 'Testimonio 5 de 5: Daniel Harper');

    await next.focus();
    await page.keyboard.press('Enter');
    assert.equal(await status.textContent(), 'Testimonio 1 de 5: Michael Turner');
  } finally {
    await page.close();
    await browser.close();
  }
});
