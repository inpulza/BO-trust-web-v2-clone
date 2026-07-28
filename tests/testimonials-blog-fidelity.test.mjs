import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('Testimonials usa la superficie crema opaca medida para la tarjeta activa', () => {
  const css = read('components/Testimonials.module.css');
  const cardRule = css.match(/\.card\s*\{([^}]*)\}/s)?.[1] ?? '';

  assert.match(cardRule, /background:\s*#f4f2e8\s*;/i);
  assert.doesNotMatch(cardRule, /rgba\(255\s*,\s*255\s*,\s*251\s*,\s*\.72\)/i);
});

test('Testimonials activa sus reveals al 5% para asentarse en los desktop bajos', () => {
  const source = read('components/Testimonials.tsx');
  const amounts = [...source.matchAll(/viewport=\{\{ once: true, amount: ([\d.]+) \}\}/g)]
    .map((match) => Number(match[1]));

  assert.deepEqual(amounts, [0.05, 0.05, 0.05]);
});

test('Blog Insights centra el título también en los viewports de una columna', () => {
  const css = read('components/BlogInsights.module.css');
  const headingRule = css.match(/\.inner\s*>\s*h2\s*\{([^}]*)\}/s)?.[1] ?? '';

  assert.match(headingRule, /text-align:\s*center\s*;/i);
});

test('Blog Insights activa cada tarjeta con la franja visible del 5% medida por el arnés', () => {
  const source = read('components/BlogInsights.tsx');
  const amounts = [...source.matchAll(/viewport=\{\{ once: true, amount: ([\d.]+) \}\}/g)]
    .map((match) => Number(match[1]));

  assert.deepEqual(amounts, [0.2, 0.05]);
});

test('Blog Insights reproduce la altura raster medida de las imágenes a 1024px', () => {
  const css = read('components/BlogInsights.module.css');
  const desktop = css.match(/@media \(min-width:\s*1024px\)\s*\{([\s\S]*?)@media \(min-width:\s*1440px\)/)?.[1] ?? '';
  assert.match(desktop, /\.card\s*>\s*img\s*\{[^}]*height:\s*177px\s*;/i);
});
