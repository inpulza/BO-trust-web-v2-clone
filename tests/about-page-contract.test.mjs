import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

const requiredCopy = [
  'Financial clarity and precision for confident growth.',
  'Trusted by community leaders',
  'Building lasting financial clarity through accuracy, trust, and long-term partnership.',
  'Our mission',
  'Our vision',
  'Growth across multiple sectors',
  'We’re more than just accountants – We’re strategic partners',
  'James Whitmore',
  'Lukas Fischer',
  'Emily Carter',
  'Chloe Nguyen',
];

test('About route composes the measured page with shared shell', () => {
  assert.equal(existsSync(resolve(root, 'app/about/page.tsx')), true);
  const route = read('app/about/page.tsx');
  assert.match(route, /<Navbar\s*\/>/);
  assert.match(route, /<AboutPage\s*\/>/);
  assert.match(route, /<ContactNewsletter\s*\/>/);
  assert.match(route, /<Footer\s*\/>/);
});

test('About page preserves measured content and local assets', () => {
  const source = read('components/AboutPage.tsx');
  const renderedCopy = source.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  for (const copy of requiredCopy) assert.ok(renderedCopy.includes(copy), `missing About copy: ${copy}`);
  assert.doesNotMatch(source, /framerusercontent|data-framer|\.framer-/i);
  assert.equal((source.match(/about-team-/g) ?? []).length, 4);
  assert.match(source, /Array\.from\(\{ length: 6 \}/);
  assert.equal((source.match(/about-industry-/g) ?? []).length, 5);
});
