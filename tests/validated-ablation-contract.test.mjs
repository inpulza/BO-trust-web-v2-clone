import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const compact = (source) => source.replace(/\s+/g, ' ');

test('FinancialClarity applies the validated compact layout without changing its sticky desktop stage', async () => {
  const css = compact(await readFile(new URL('../components/FinancialClarity.module.css', import.meta.url), 'utf8'));

  assert.match(css, /@media\s*\(max-width:\s*1199\.98px\)[^{]*\{[\s\S]*?\.content\s*\{[^}]*justify-content:\s*flex-start\s*;[\s\S]*?\.metric\s*\{[^}]*gap:\s*10px\s*;[\s\S]*?\.messages\s+span\s*\{[^}]*width:\s*max-content/);
  assert.match(css, /@media\s*\(max-width:\s*1023\.98px\)[^{]*\{[\s\S]*?\.content\s*>\s*\.icon\s*\{[^}]*margin-top:\s*0\s*;[^}]*margin-bottom:\s*-20px\s*;[\s\S]*?\.metrics\s*\{[^}]*gap:\s*30px\s*;[\s\S]*?\.messages\s*\{[^}]*margin-top:\s*0\s*;[\s\S]*?\.messages\s+span\s*\{[^}]*padding:\s*8px\s+16px/);
  assert.match(css, /@media\s*\(max-width:\s*767\.98px\)[^{]*\{[\s\S]*?\.messages\s*\{[^}]*display:\s*flex\s*;[^}]*flex-direction:\s*column\s*;[^}]*align-items:\s*center/);
  assert.match(css, /@media\s*\(min-width:\s*1024px\)\s*and\s*\(max-width:\s*1199\.98px\)[^{]*\{[\s\S]*?\.content\s*>\s*\.icon\s*\{[^}]*margin-top:\s*0\s*;[^}]*margin-bottom:\s*-30px\s*;[\s\S]*?\.messages\s+span\s*\{[^}]*padding:\s*12px\s+24px/);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[^{]*\{[\s\S]*?\.content\s*\{[^}]*position:\s*sticky\s*;[^}]*top:\s*0\s*;/);
});

test('Industries applies the validated responsive geometry while preserving its reveal contract', async () => {
  const css = compact(await readFile(new URL('../components/Industries.module.css', import.meta.url), 'utf8'));
  const component = await readFile(new URL('../components/Industries.tsx', import.meta.url), 'utf8');

  assert.match(css, /\.bullets\s+img\s*\{[^}]*width:\s*22px\s*;[^}]*height:\s*22px\s*;[^}]*flex-basis:\s*22px/);
  assert.match(css, /@media\s*\(max-width:\s*767\.98px\)[^{]*\{[\s\S]*?\.copy\s+h3\s*\{[^}]*margin-bottom:\s*20px\s*;[\s\S]*?\.bullets\s*\{[^}]*margin-top:\s*10px\s*;[^}]*margin-bottom:\s*21\.609375px/);
  assert.match(css, /@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1023\.98px\)[^{]*\{[\s\S]*?\.top\s*\{[^}]*min-height:\s*205\.1875px\s*;[\s\S]*?\.bottom\s*\{[^}]*height:\s*859\.046875px\s*;[\s\S]*?\.copy\s+h3\s*\{[^}]*margin-bottom:\s*20px\s*;[\s\S]*?\.bullets\s*\{[^}]*margin-top:\s*12\.40625px\s*;[^}]*margin-bottom:\s*23px/);
  assert.match(css, /@media\s*\(min-width:\s*1024px\)\s*and\s*\(max-width:\s*1199\.98px\)[^{]*\{[\s\S]*?\.details\s*\{[^}]*position:\s*relative\s*;[^}]*display:\s*block\s*;[\s\S]*?\.copy\s+h3\s*\{[^}]*margin-bottom:\s*20px\s*;[\s\S]*?\.bullets\s*\{[^}]*position:\s*absolute\s*;[^}]*top:\s*242px\s*;[^}]*left:\s*0\s*;[^}]*width:\s*100%\s*;[\s\S]*?\.kpi\s*\{[^}]*position:\s*absolute\s*;[^}]*bottom:\s*0\s*;[^}]*left:\s*0\s*;[^}]*width:\s*100%/);
  assert.match(component, /<motion\.div[\s\S]*?className=\{styles\.content\}[\s\S]*?whileInView=\{\{ opacity: 1, y: 0 \}\}/);
});

test('FinancialSolutions applies the validated fourth-card paint and tablet title scale without disturbing sticky cards', async () => {
  const css = compact(await readFile(new URL('../components/FinancialSolutions.module.css', import.meta.url), 'utf8'));

  assert.match(css, /\.card4\s+\.icon\s*\{[^}]*background:\s*#151413/);
  assert.match(css, /@media\s*\(min-width:\s*810px\)\s*and\s*\(max-width:\s*1199\.98px\)[^{]*\{[\s\S]*?\.summary\s+h3\s*\{[^}]*font-size:\s*20px\s*;[^}]*line-height:\s*24px/);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[^{]*\{[\s\S]*?\.card,\s*\.card2\s*\{[^}]*position:\s*sticky\s*;[^}]*top:\s*100px\s*;/);
});
