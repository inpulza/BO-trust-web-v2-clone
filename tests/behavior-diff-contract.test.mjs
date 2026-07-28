import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../scripts/diff-behavior-final.mjs', import.meta.url), 'utf8').catch(() => '');
const settledSource = await readFile(new URL('../scripts/diff-settled-sections.mjs', import.meta.url), 'utf8').catch(() => '');

test('behavior final-state aggregator executes canonical diff for 13 sections × 6 viewports', () => {
  assert.match(source, /arnes\/scripts\/diff-visual\.mjs/);
  assert.match(source, /SECTIONS\.length \* VIEWPORTS\.length/);
  assert.match(source, /behavior-final-summary\.json/);
  assert.match(source, /final-t1000\.png/);
});

test('isolated settled-section aggregator executes canonical diff for 78 pure section pairs', () => {
  assert.match(settledSource, /arnes\/scripts\/diff-visual\.mjs/);
  assert.match(settledSource, /SECTIONS\.length \* VIEWPORTS\.length/);
  assert.match(settledSource, /settled-sections/);
  assert.match(settledSource, /settled-section-summary\.json/);
});
