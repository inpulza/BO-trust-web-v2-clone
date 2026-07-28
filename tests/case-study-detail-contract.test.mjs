import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('Measured case detail route composes shared shell and conversion units', () => {
  const route = read('app/case-study/cutting-costs-for-a-multi-location-retail-chain/page.tsx');
  for (const name of ['Navbar', 'CaseStudyDetail', 'ContactNewsletter', 'Footer']) assert.match(route, new RegExp(`<${name}`));
});

test('Case detail preserves exact source contradictions and local media', () => {
  const source = read('components/CaseStudyDetail.tsx');
  for (const text of [
    'Cutting costs for a multi-location retail chain', 'Tier 1 & Tier 2 USA cities',
    'over 20 stores across India', 'Archived cost reduction', 'Compliance across',
    'Ethan Walker', 'Other case studies', 'See all case studies',
  ]) assert.ok(source.includes(text), `missing detail copy: ${text}`);
  assert.doesNotMatch(source, /framerusercontent|data-framer|\.framer-/i);
  for (const file of ['hero.jpg','client-logo.svg','challenges.jpg','avatar.jpg','related-restructuring.jpg','related-tax.jpg']) {
    assert.ok(existsSync(resolve(root, `public/assets/case-detail-${file}`)), `missing detail asset ${file}`);
  }
});
