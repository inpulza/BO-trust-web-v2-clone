import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../scripts/capture-settled-sections.mjs', import.meta.url), 'utf8').catch(() => '');

test('settled section capture produces isolated element evidence for 13 × 6 × 2', () => {
  assert.match(source, /selectedSections\.length \* selectedViewports\.length \* TARGETS\.length/);
  assert.match(source, /process\.env\.CAPTURE_SECTIONS/);
  assert.match(source, /process\.env\.CAPTURE_VIEWPORTS/);
  assert.match(source, /settled-sections-targeted-manifest\.json/);
  assert.match(source, /locator\.screenshot/);
  assert.match(source, /for \(let y = entryY; y <= exitY; y \+= sweepStep\)/);
  assert.match(source, /await page\.evaluate\(y => scrollTo\(0, y\), entryY\)/);
  assert.match(source, /waitForTimeout\(1000\)/);
  assert.match(source, /Get it for FREE/);
  assert.match(source, /Made in Framer/);
  assert.match(source, /section\.id !== 'navbar'/);
  assert.doesNotMatch(source, /querySelectorAll\('nav'\)/);
  assert.match(source, /getComputedStyle\(node\)\.position === 'fixed'/);
  assert.match(source, /!node\.contains\(root\)/);
  assert.match(source, /section\.id !== 'navbar'/);
  assert.match(source, /section\.id === 'testimonials'/);
  assert.match(source, /Michael Turner/);
  assert.match(source, /document\.elementsFromPoint/);
  assert.match(source, /page\.evaluate\(y => scrollTo\(0, y\), documentY\)/);
  assert.match(source, /waitForTimeout\(700\)/);
  assert.match(source, /settled-sections-manifest\.json/);
});
