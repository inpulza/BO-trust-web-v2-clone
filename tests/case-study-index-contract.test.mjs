import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('Case Study index route uses shared shell and measured component', () => {
  const route = read('app/case-study/page.tsx');
  for (const name of ['Navbar', 'CaseStudyIndex', 'Footer']) assert.match(route, new RegExp(`<${name}`));
});

test('Case Study index preserves seven measured cases and local assets', () => {
  const data = read('lib/case-studies.ts');
  const component = read('components/CaseStudyIndex.tsx');
  for (const text of [
    'Restructuring a retail chain’s finances', 'Cutting costs for a multi-location retail chain',
    'Tax planning for a tech startup', 'Operational strategy for a manufacturing firm',
    'M&A due diligence for a logistics client', 'Manufacturing efficiency boost',
    'Startup financial structure setup', 'Archived cost reduction', 'Compliance across',
  ]) assert.ok(data.includes(text), `missing exact case copy: ${text}`);
  assert.match(component, /slice\(0, 4\)/);
  assert.match(component, /Load more/);
  assert.match(component, /That’s everything for now!/);
  assert.doesNotMatch(data + component, /framerusercontent|data-framer|\.framer-/i);
  for (const file of ['restructuring','cost-cutting','tax-planning','process-optimization','ma','manufacturing','startup']) {
    assert.ok(existsSync(resolve(root, `public/assets/case-study-${file}.jpg`)), `missing case image ${file}`);
  }
});
