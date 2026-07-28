import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../components/FinancialSolutions.module.css', import.meta.url), 'utf8');
const component = await readFile(new URL('../components/FinancialSolutions.tsx', import.meta.url), 'utf8');

const compact = css.replace(/\s+/g, ' ');

test('FinancialSolutions settles every card after the measured reveal without changing card flow', () => {
  assert.doesNotMatch(compact, /\.card:not\(:first-child\)\s*\{[^}]*(?:opacity:\s*0|display:\s*none)\s*;/);
  assert.match(component, /<motion\.div[\s\S]*?className=\{styles\.cards\}[\s\S]*?initial=\{reduceMotion \? false : \{ opacity: 0, y: 20 \}\}[\s\S]*?whileInView=\{\{ opacity: 1, y: 0 \}\}/);
  assert.match(compact, /@media\s*\(prefers-reduced-motion:\s*reduce\)[^{]*\{[\s\S]*?\.container\s*>\s*h2,\s*\.cards\s*\{[^}]*opacity:\s*1\s*!important\s*;[^}]*transform:\s*none\s*!important\s*;/);
});

test('FinancialSolutions reproduces the measured icon tile and summary spacing', () => {
  assert.match(compact, /\.summary\s*\{[^}]*gap:\s*20px\s*;/);
  assert.match(compact, /\.icon\s*\{[^}]*box-sizing:\s*content-box\s*;[^}]*width:\s*24px\s*;[^}]*height:\s*24px\s*;[^}]*padding:\s*13px\s*;[^}]*margin:\s*0\s*;[^}]*border-radius:\s*6px\s*;[^}]*background:\s*#fffffb\s*;/);
  assert.match(component, /className=\{styles\.copy\}/);
});

test('FinancialSolutions reproduces measured compact-card type and vertical rhythm', () => {
  assert.match(compact, /@media\s*\(max-width:\s*809\.98px\)[^{]*\{[\s\S]*?\.summary\s+h3\s*\{[^}]*margin-bottom:\s*6px\s*;[^}]*font-size:\s*20px\s*;[^}]*line-height:\s*24px\s*;/);
  assert.match(compact, /@media\s*\(max-width:\s*809\.98px\)[^{]*\{[\s\S]*?\.summary\s+p\s*\{[^}]*font-size:\s*17px\s*;[^}]*line-height:\s*23\.8px\s*;/);
  assert.match(compact, /@media\s*\(max-width:\s*809\.98px\)[^{]*\{[\s\S]*?\.details\s+ul\s*\{[^}]*gap:\s*10px\s*;[\s\S]*?\.details\s+li\s*\{[^}]*font-size:\s*16px\s*;[^}]*line-height:\s*22\.4px\s*;[\s\S]*?\.details,\s*\.media\s*\{[^}]*transform:\s*translateY\(-10px\)\s*;/);
});

test('FinancialSolutions keeps sticky geometry desktop-only and deterministic', () => {
  assert.match(compact, /@media\s*\(min-width:\s*810px\)[^{]*\{[\s\S]*?\.card,\s*\.card2\s*\{[^}]*position:\s*sticky\s*;[^}]*top:\s*100px\s*;/);
  assert.match(compact, /@media\s*\(max-width:\s*809\.98px\)[^{]*\{[\s\S]*?\.card,\s*\.card2\s*\{[^}]*position:\s*static\s*;/);
});

test('FinancialSolutions uses the settled two-column card composition on sticky viewports', () => {
  assert.match(compact, /@media\s*\(min-width:\s*810px\)[^{]*\{[\s\S]*?\.card,\s*\.card2\s*\{[^}]*grid-template-columns:\s*590px\s+280px\s*;/);
  assert.match(compact, /@media\s*\(min-width:\s*810px\)[^{]*\{[\s\S]*?\.summary\s*\{[^}]*grid-column:\s*1\s*;[^}]*grid-row:\s*1\s*;[\s\S]*?\.details\s*\{[^}]*grid-column:\s*1\s*;[^}]*grid-row:\s*2\s*;[\s\S]*?\.media\s*\{[^}]*grid-column:\s*2\s*;[^}]*grid-row:\s*1\s*\/\s*span\s*2\s*;/);
  assert.match(compact, /@media\s*\(min-width:\s*1200px\)[^{]*\{[\s\S]*?\.card,\s*\.card2\s*\{[^}]*grid-template-columns:\s*560px\s+260px\s*;/);
});

test('FinancialSolutions does not invent a detail label absent from Source', () => {
  assert.doesNotMatch(component, /View detail/);
  assert.doesNotMatch(compact, /\.detail\s*\{/);
});
