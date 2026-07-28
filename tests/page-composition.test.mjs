import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = readFileSync(resolve(import.meta.dirname, '../app/page.tsx'), 'utf8');
const ordered = [
  'Navbar', 'Hero', 'ProblemsSolutions', 'ConsultationCta', 'FinancialSolutions',
  'Industries', 'FinancialClarity', 'ContactNewsletter', 'CaseStudies',
  'Process', 'Testimonials', 'BlogInsights', 'Footer',
];

test('home composes all measured units in source order', () => {
  let cursor = -1;
  for (const component of ordered) {
    const next = source.indexOf(`<${component}`, cursor + 1);
    assert.ok(next > cursor, `${component} missing or out of order`);
    cursor = next;
  }
});

test('home provides a skip link and main landmark', () => {
  assert.match(source, /href=["']#content["']/);
  assert.match(source, /<main[^>]+id=["']content["']/);
});
