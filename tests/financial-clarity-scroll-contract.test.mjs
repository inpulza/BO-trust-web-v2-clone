import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const component = await readFile(new URL('../components/FinancialClarity.tsx', import.meta.url), 'utf8');
const css = (await readFile(new URL('../components/FinancialClarity.module.css', import.meta.url), 'utf8')).replace(/\s+/g, ' ');

test('FinancialClarity maps section scroll progress to six independent orbiting messages', () => {
  assert.match(component, /useScroll/);
  assert.match(component, /useTransform/);
  assert.match(component, /offset:\s*\['start end',\s*'end start'\]/);
  assert.match(component, /<motion\.span[^>]*data-clarity-message/);
  assert.match(component, /opacity/);
  assert.match(component, /scale/);
});

test('FinancialClarity keeps the measured desktop nucleus sticky and orbit layers absolute', () => {
  const desktop = css.slice(css.indexOf('@media(min-width:1200px)'));
  assert.match(desktop, /\.content\s*\{[^}]*position:\s*sticky\s*;[^}]*top:\s*0\s*;[^}]*width:\s*660px\s*;[^}]*height:\s*100vh\s*;/);
  assert.match(desktop, /\.metrics\s*\{[^}]*position:\s*absolute\s*;[^}]*display:\s*flex\s*;[^}]*flex-direction:\s*row\s*;/);
  assert.match(desktop, /\.messages\s*\{[^}]*position:\s*absolute\s*;[^}]*inset:\s*0\s*;/);
  assert.match(desktop, /\.messages span:nth-child\(5\)\s*\{[^}]*bottom:\s*350px\s*;/);
});
