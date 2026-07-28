import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const component = readFileSync(resolve(root, 'components/CaseStudies.tsx'), 'utf8');
const css = readFileSync(resolve(root, 'components/CaseStudies.module.css'), 'utf8')
  .replace(/\s+/g, ' ')
  .trim();

function rule(selector, declaration) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedDeclaration = declaration.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  assert.match(css, new RegExp(`${escapedSelector}\\{[^}]*${escapedDeclaration}`), `${selector} must include ${declaration}`);
}

function media(minWidth) {
  const marker = `@media(min-width:${minWidth}px){`;
  const start = css.indexOf(marker);
  assert.notEqual(start, -1, `missing ${marker}`);
  let depth = 1;
  let cursor = start + marker.length;
  while (depth && cursor < css.length) {
    if (css[cursor] === '{') depth += 1;
    if (css[cursor] === '}') depth -= 1;
    cursor += 1;
  }
  return css.slice(start + marker.length, cursor - 1);
}

test('CaseStudies preserves the measured progressive reveal and reduced-motion final state', () => {
  assert.match(component, /framer-motion/);
  assert.match(component, /initial=\{reduceMotion \? false : \{ opacity: 0, y: 20 \}\}/);
  assert.match(component, /whileInView=\{\{ opacity: 1, y: 0 \}\}/);
  assert.match(component, /duration: 0\.7, delay: 0\.1/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\.container\{opacity:1!important;transform:none!important\}\}/);
});

test('CaseStudies keeps the measured zero-offset section flow at every breakpoint', () => {
  rule('.container', 'padding:0 12px');
  rule('.container', 'gap:29px');
  assert.ok(media(768).includes('.container{gap:30px}'));
  assert.doesNotMatch(css, /\.container\{[^}]*padding:\s*(?:5px|29px|50px)\b/);
  assert.doesNotMatch(css, /@media\(min-width:768px\)\{\.container\{padding-top:/);
  assert.ok(media(1024).includes('.container{padding-right:20px;padding-left:20px;gap:40px}'));
  assert.ok(media(1440).includes('.container{padding-right:30px;padding-left:30px;gap:50px}'));
});

test('CaseStudies separates media-to-details spacing from title-to-client spacing', () => {
  assert.match(component, /className=\{styles\.caseDetails\}/);
  rule('.caseBody', 'padding:20px 20px 14px');
  rule('.caseDetails', 'gap:20px');
  assert.ok(media(1024).includes('.caseBody{padding:40px 40px 34px;gap:34px}'));
});

test('CaseStudies result rows reproduce measured icon grouping and vertical rhythm', () => {
  assert.equal((component.match(/className=\{styles\.resultValue\}/g) ?? []).length, 2);
  rule('.results>div', 'gap:20px;padding:16px 0');
  rule('.resultValue', 'gap:6px');
  assert.ok(media(1024).includes('.results>div{padding:20px 0}'));
  assert.ok(media(1024).includes('.results{flex:1}'));
});

test('CaseStudies preserves measured card bodies across desktop breakpoints', () => {
  assert.ok(media(1024).includes('.solutionBody{height:calc(100% - 62.40625px);padding:20px;gap:40px}'));
  assert.ok(media(1440).includes('.solutionBody{padding:40px;gap:40px}'));
  assert.ok(media(1920).includes('.cards{height:496.40625px}'));
});
