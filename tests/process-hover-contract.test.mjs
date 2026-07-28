import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const component = await readFile(new URL('../components/Process.tsx', import.meta.url), 'utf8');
const css = (await readFile(new URL('../components/Process.module.css', import.meta.url), 'utf8')).replace(/\s+/g, ' ');

test('Process keeps exactly one desktop step active and transfers it on hover', () => {
  assert.match(component, /useState\(0\)/);
  assert.match(component, /onPointerEnter=\{\(\) => setActiveStep\(index\)\}/);
  assert.match(component, /data-active=\{isActive\}/);
  assert.match(component, /<motion\.li/);
  assert.match(component, /layout/);
  assert.match(component, /duration:\s*0\.5/);
  assert.match(component, /\{isActive && <h3>/);
  assert.match(component, /\{isActive && <p>/);
  assert.doesNotMatch(component, /className=\{styles\.number\}/);
});

test('Process animates measured active and collapsed widths without resetting on mouseleave', () => {
  const desktop = css.slice(css.indexOf('@media (min-width: 1440px)'));
  assert.match(desktop, /\.step\s*\{[^}]*width:\s*170px\s*;[^}]*justify-content:\s*space-between\s*;/);
  assert.match(desktop, /\.step\[data-active='true'\]\s*\{[^}]*width:\s*528px\s*;/);
  assert.match(desktop, /\.step:not\(\[data-active='true'\]\)\s+\.stepImage\s*\{[^}]*position:\s*static\s*;[^}]*opacity:\s*1\s*;/);
  assert.doesNotMatch(desktop, /transition:\s*width/);
  assert.match(desktop, /@media\s*\(min-width:\s*1920px\)[^{]*\{[\s\S]*?\.step\[data-active='true'\]\s*\{[^}]*width:\s*552px\s*;/);
  assert.doesNotMatch(component, /onPointerLeave|onMouseLeave/);
});
