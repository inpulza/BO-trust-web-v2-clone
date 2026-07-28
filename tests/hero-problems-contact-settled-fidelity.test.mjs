import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const hero = (await readFile(new URL('../components/Hero.module.css', import.meta.url), 'utf8')).replace(/\s+/g, ' ');
const problems = (await readFile(new URL('../components/ProblemsSolutions.module.css', import.meta.url), 'utf8')).replace(/\s+/g, ' ');
const contact = (await readFile(new URL('../components/ContactNewsletter.module.css', import.meta.url), 'utf8')).replace(/\s+/g, ' ');
const contactComponent = await readFile(new URL('../components/ContactNewsletter.tsx', import.meta.url), 'utf8');
const heroComponent = await readFile(new URL('../components/Hero.tsx', import.meta.url), 'utf8');

function mediaBlock(source, query) {
  const start = source.indexOf(query);
  assert.notEqual(start, -1, `missing media query ${query}`);
  const open = source.indexOf('{', start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(open + 1, index);
  }
  throw new Error(`unclosed media query ${query}`);
}

test('Hero uses the measured chip spacing and bottom content alignment at every branch', () => {
  assert.match(hero, /\.hero\s*\{[^}]*align-items:\s*flex-end\s*;/);
  assert.match(hero, /\.tags\s*\{[^}]*gap:\s*12px\s*;/);
  assert.match(mediaBlock(hero, '@media (min-width: 810px)'), /\.tags\s*\{[^}]*gap:\s*20px\s*;/);
});

test('Hero uses the six-viewport ablation title scale without changing Motion markup', () => {
  assert.match(hero, /\.content h1\s*\{[^}]*font-size:\s*calc\(\(100vw - 24px\) \/ 7\.8137\)\s*;[^}]*line-height:\s*\.95\s*;/);
  const desktop = mediaBlock(hero, '@media (min-width: 810px)');
  assert.match(desktop, /\.content h1\s*\{[^}]*font-size:\s*calc\(\(100vw - 60px\) \/ 7\.8137\)\s*;[^}]*line-height:\s*1\.14\s*;/);
});

test('Problems/Solutions preserves the measured layered connector geometry', () => {
  assert.match(problems, /\.connector \.node\s*\{[^}]*width:\s*100px\s*;[^}]*height:\s*100px\s*;[^}]*border:\s*1px solid #feea9d\s*;[^}]*box-sizing:\s*content-box\s*;[^}]*background:\s*#151413\s*;/);

  const desktop = mediaBlock(problems, '@media (min-width: 810px)');
  assert.match(desktop, /\.section\s*\{[^}]*height:\s*auto\s*;[^}]*min-height:\s*713\.84375px\s*;/);
  assert.match(desktop, /\.container\s*\{[^}]*height:\s*auto\s*;[^}]*flex:\s*initial\s*;[^}]*transform:\s*translateY\(20px\)\s*;/);
  assert.match(desktop, /\.problem\s*\{[^}]*padding:\s*76px 30px 30px\s*;/);
  assert.match(desktop, /\.solution\s*\{[^}]*margin-top:\s*0\s*;/);
  assert.match(problems, /\.leftLine, \.centerLine, \.rightLine\s*\{[^}]*opacity:\s*\.5\s*;/);
  assert.match(desktop, /\.leftLine\s*\{[^}]*left:\s*-20px\s*;[^}]*top:\s*149\.65625px\s*;/);
  assert.match(desktop, /\.centerLine\s*\{[^}]*left:\s*20px\s*;[^}]*right:\s*20px\s*;[^}]*top:\s*239\.15625px\s*;/);
  assert.match(desktop, /\.rightLine\s*\{[^}]*right:\s*-20px\s*;[^}]*top:\s*149\.65625px\s*;/);
  assert.match(desktop, /\.connector \.node\s*\{[^}]*top:\s*183\.65625px\s*;[^}]*width:\s*110px\s*;[^}]*height:\s*110px\s*;/);
  assert.match(desktop, /\.connector h2\s*\{[^}]*top:\s*295\.65625px\s*;[^}]*width:\s*180px\s*;/);

  const wide = mediaBlock(problems, '@media (min-width: 1200px)');
  assert.match(wide, /\.leftLine\s*\{[^}]*left:\s*-50px\s*;[^}]*top:\s*98\.40625px\s*;/);
  assert.match(wide, /\.centerLine\s*\{[^}]*left:\s*-9px\s*;[^}]*right:\s*-9px\s*;[^}]*top:\s*187\.90625px\s*;/);
  assert.match(wide, /\.rightLine\s*\{[^}]*right:\s*-50px\s*;[^}]*top:\s*98\.40625px\s*;/);
  assert.match(wide, /\.connector \.node\s*\{[^}]*top:\s*122\.40625px\s*;[^}]*width:\s*130px\s*;[^}]*height:\s*130px\s*;/);
  assert.match(wide, /\.connector h2\s*\{[^}]*top:\s*274\.40625px\s*;[^}]*width:\s*200px\s*;/);
});

test('Problems/Solutions uses measured mobile and tablet stack geometry', () => {
  assert.match(problems, /\.section\s*\{[^}]*height:\s*1137\.6875px\s*;[^}]*min-height:\s*0\s*;/);
  assert.match(problems, /\.container\s*\{[^}]*height:\s*997\.6875px\s*;[^}]*flex:\s*none\s*;[^}]*gap:\s*0\s*;/);
  assert.match(problems, /\.problem\s*\{[^}]*height:\s*326\.84375px\s*;[^}]*padding:\s*20px 20px 50px\s*;/);
  assert.match(problems, /\.solution\s*\{[^}]*height:\s*395\.65625px\s*;[^}]*margin-top:\s*20px\s*;/);
  assert.match(problems, /\.connector\s*\{[^}]*flex:\s*0 0 245\.1875px\s*;[^}]*height:\s*245\.1875px\s*;/);

  const tablet = mediaBlock(problems, '@media (min-width: 768px) and (max-width: 809.98px)');
  assert.match(tablet, /\.section\s*\{[^}]*height:\s*1032\.03125px\s*;/);
  assert.match(tablet, /\.container\s*\{[^}]*height:\s*892\.03125px\s*;/);
  assert.match(tablet, /\.problem\s*\{[^}]*height:\s*304\.4375px\s*;/);
  assert.match(tablet, /\.solution\s*\{[^}]*height:\s*312\.40625px\s*;/);
});

test('Contact/Newsletter uses the settled inter-block gap and measured tablet stack height', () => {
  assert.match(contact, /\.container\s*\{[^}]*gap:\s*10px\s*(?:;|\})/);
  const tablet = mediaBlock(contact, '@media(min-width:768px)');
  assert.match(tablet, /\.hero\s*\{[^}]*height:\s*619\.46875px\s*;[^}]*flex-basis:\s*619\.46875px\s*(?:;|\})/);
  assert.match(tablet, /\.ctas\s*\{[^}]*height:\s*212\.59375px\s*(?:;|\})/);
});

test('Contact/Newsletter keeps the measured button height in stacks and width in horizontal layouts', () => {
  assert.match(contact, /\.newsletter button\s*\{[^}]*flex:\s*0\s+0\s+auto\s*;/);
  assert.match(mediaBlock(contact, '@media(min-width:1024px)'), /\.newsletter button\s*\{[^}]*flex-basis:\s*149\.40625px\s*(?:;|\})/);
});

test('Contact/Newsletter follows the measured newsletter columns at tablet and desktop widths', () => {
  const tablet = mediaBlock(contact, '@media(min-width:1024px)');
  assert.match(tablet, /\.newsletter label\s*\{[^}]*max-width:\s*327px\s*;[^}]*flex:\s*0\s+0\s+327px\s*(?:;|\})/);

  const desktop = mediaBlock(contact, '@media(min-width:1440px)');
  assert.match(desktop, /\.newsletter\s*\{[^}]*padding:\s*20px\s*(?:;|\})/);
  assert.match(desktop, /\.newsletter label\s*\{[^}]*max-width:\s*none\s*;[^}]*flex:\s*1\s+1\s+0%\s*(?:;|\})/);
});

test('Contact/Newsletter reproduces the measured 1024 text breaks and inset control shell', () => {
  assert.match(contactComponent, /strategies,<br className=\{styles\.tabletBreak\} aria-hidden="true"\s*\/>\s*tax updates, and business<br className=\{styles\.tabletBreak\} aria-hidden="true"\s*\/>\s*tips/);
  assert.match(contact, /\.tabletBreak\s*\{[^}]*display:\s*inline\s*(?:;|\})/);

  const mobileTablet = mediaBlock(contact, '@media(min-width:768px)');
  assert.match(mobileTablet, /\.tabletBreak\s*\{[^}]*display:\s*none\s*(?:;|\})/);

  const tablet = mediaBlock(contact, '@media(min-width:1024px)');
  assert.match(tablet, /\.tabletBreak\s*\{[^}]*display:\s*inline\s*(?:;|\})/);
  assert.match(tablet, /\.formControls\s*\{[^}]*padding:\s*10px\s*;[^}]*background:\s*#fff\s*;[^}]*border-radius:\s*10px\s*(?:;|\})/);
  assert.match(tablet, /\.newsletter input\s*\{[^}]*background:\s*transparent\s*(?:;|\})/);

  const desktop = mediaBlock(contact, '@media(min-width:1440px)');
  assert.match(desktop, /\.tabletBreak\s*\{[^}]*display:\s*none\s*(?:;|\})/);
});
