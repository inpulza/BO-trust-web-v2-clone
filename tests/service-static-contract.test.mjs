import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('Service Static route uses measured page and shared shell', () => {
  const route = read('app/service-static/page.tsx');
  for (const name of ['Navbar', 'ServiceStaticPage', 'Footer']) assert.match(route, new RegExp(`<${name}`));
});

test('Service preserves exact sections, static pricing and local media', () => {
  const source = read('components/ServiceStaticPage.tsx');
  for (const text of [
    'Strategic financial planning', 'Book a free consulation', 'The financial challenges most businesses struggle to overcome',
    'How our financial planning works', 'Restructuring a retail chain’s finances', 'Choose the right package for your growth',
    'Starter plan', 'Growth plan', 'Enterprise plan', 'Contact to sales', '$49', '$79', '$109',
  ]) assert.ok(source.includes(text), `missing service copy: ${text}`);
  assert.match(source, /Monthly/); assert.match(source, /Yearly/);
  assert.doesNotMatch(source, /annualPrice|yearlyPrice|framerusercontent|data-framer|\.framer-/i);
  for (const file of ['hero.jpg','about.jpg','cta.jpg','client-logo.svg','plan-starter.svg','plan-growth.svg','plan-enterprise.svg']) {
    assert.ok(existsSync(resolve(root, `public/assets/service-${file}`)), `missing service asset ${file}`);
  }
});
