import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const component = await readFile(new URL('../components/ProblemsSolutions.tsx', import.meta.url), 'utf8');
const css = (await readFile(new URL('../components/ProblemsSolutions.module.css', import.meta.url), 'utf8')).replace(/\s+/g, ' ');

test('ProblemsSolutions renders the three measured connector pieces', () => {
  assert.match(component, /data-connector-line="left"/);
  assert.match(component, /data-connector-line="center"/);
  assert.match(component, /data-connector-line="right"/);
});

test('ProblemsSolutions paints Source dashed brackets instead of a generic full-width line', () => {
  assert.match(css, /\.leftLine\s*\{[^}]*border-top:\s*1px dashed #a29691\s*;[^}]*border-right:\s*1px dashed #a29691\s*;[^}]*border-bottom:\s*1px dashed #a29691\s*;[^}]*border-radius:\s*0 10px 10px 0\s*;/);
  assert.match(css, /\.centerLine\s*\{[^}]*border-bottom:\s*1px dashed #a29691\s*;/);
  assert.match(css, /\.rightLine\s*\{[^}]*border-top:\s*1px dashed #a29691\s*;[^}]*border-left:\s*1px dashed #a29691\s*;[^}]*border-bottom:\s*1px dashed #a29691\s*;[^}]*border-radius:\s*10px 0 0 10px\s*;/);
  assert.doesNotMatch(css, /\.connector::before/);
});
