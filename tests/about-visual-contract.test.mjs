import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const component = read('components/AboutPage.tsx');
const css = read('components/AboutPage.module.css');
const contactCss = read('components/ContactNewsletter.module.css');

test('About hero uses stacked mobile rows and restores the measured desktop overlay', () => {
  assert.match(component, /Let’s bring clarity to your finances\./);
  assert.doesNotMatch(component, /Let’s bring clarity<br\s*\/>to your finances\./);
  assert.match(css, /\.heroMain\s*\{[^}]*display:\s*grid[^}]*grid-template-rows:/s);
  assert.match(css, /\.heroAction\s*\{[^}]*background:\s*#262322/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.heroMain\s*\{[^}]*display:\s*block[^}]*position:\s*relative/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.heroAction\s*\{[^}]*position:\s*absolute[^}]*bottom:\s*0/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.heroPhoto\s*\{[^}]*filter:\s*brightness\(\.76\)/s);
  assert.match(component, /styles\.phoneBreak/g);
  assert.match(component, /styles\.desktopBreak/g);
  assert.match(css, /@media\s*\(max-width:\s*599px\)[\s\S]*?\.phoneBreak\s*\{[^}]*display:\s*initial/s);
  assert.match(css, /@media\s*\(max-width:\s*809px\)[\s\S]*?\.heroAction\s*\{[^}]*grid-template-columns:\s*1fr[^}]*grid-template-rows:\s*40px auto 46\.4px/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.heroGrid\s*\{[^}]*grid-template-columns:\s*2\.022fr 1fr/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.desktopBreak\s*\{[^}]*display:\s*initial/s);
});

test('About hero encodes the measured 768 and desktop section contracts', () => {
  assert.match(css, /@media\s*\(min-width:\s*600px\)\s*and\s*\(max-width:\s*809px\)[\s\S]*?\.hero\s*\{[^}]*height:\s*1578\.328px/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.hero\s*\{[^}]*height:\s*1073\.203px/s);
  assert.match(css, /\.heroAction>a\s*\{[^}]*width:\s*211\.6px/s);
  assert.match(css, /\.heroAction>a\s*\{[^}]*gap:\s*10px[^}]*white-space:\s*nowrap/s);
});

test('Trusted rail uses the measured section heights without inherited top padding', () => {
  assert.match(css, /\.trusted\s*\{[^}]*height:\s*141\.6px/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.trusted\s*\{[^}]*height:\s*191\.6px/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.trusted\s*\{[^}]*height:\s*224px/s);
});

test('Mission preserves the authored vision list and four distinct statistic treatments', () => {
  for (const item of [
    'Built on clarity, driven by long-term partnership',
    'The purpose behind our financial guidance',
    'Where our journey meets your growth',
    'Committed to clarity and stability',
  ]) assert.match(component, new RegExp(item));
  assert.match(component, /className=\{styles\.visionList\}/);
  assert.doesNotMatch(component, /styles\.visionMarks/);
  assert.match(css, /\.missionCopy h2,\.teamIntro h2\s*\{[^}]*font-weight:\s*700/s);
  assert.match(css, /\.stats article:nth-child\(2\)[^{]*\{[^}]*background:\s*#feea9d/s);
  assert.match(css, /\.stats article:nth-child\(4\)[^{]*\{[^}]*background:\s*#151413/s);
  assert.match(css, /\.stats article:nth-child\(4\)[\s\S]*?\.stats article:nth-child\(4\) strong\{[^}]*color:\s*#f55107/s);
  assert.match(css, /\.stats strong\s*\{[^}]*font-size:\s*26px/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.stats strong\s*\{[^}]*font-size:\s*34px/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.stats strong\s*\{[^}]*font-size:\s*40px/s);
});

test('Mission encodes the measured outer heights at all responsive topologies', () => {
  assert.match(css, /\.mission\s*\{[^}]*height:\s*1303\.7px/s);
  assert.match(css, /@media\s*\(min-width:\s*600px\)[\s\S]*?\.mission\s*\{[^}]*height:\s*1482\.9px/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.mission\s*\{[^}]*height:\s*1572\.7px/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.mission\s*\{[^}]*height:\s*826\.4px/s);
});

test('Industries keeps the three authored rows, center hub, and structural placeholders', () => {
  for (const className of ['industryRow1', 'industryRow2', 'industryRow3', 'industryPlaceholder', 'industryHub']) {
    assert.match(component, new RegExp(`styles\\.${className}`));
  }
  assert.match(css, /\.industryRow2\s*\{[^}]*grid-template-columns:\s*2fr 1fr 2fr/s);
  assert.match(css, /\.industryHub\s*\{[^}]*background:\s*#feea9d/s);
  assert.match(css, /\.industryPlaceholder\s*\{[^}]*background:\s*#e8e4d6/s);
  assert.match(css, /\.industryMap\s*\{[^}]*align-items:\s*stretch/s);
  assert.match(css, /\.industryCard\s*\{[^}]*font:\s*700 18px\/21\.6px 'Open Sauce Sans'/s);
});

test('Industries uses Source outer heights and the 1260px desktop container', () => {
  assert.match(css, /\.industries\s*\{[^}]*height:\s*593\.8px/s);
  assert.match(css, /@media\s*\(min-width:\s*600px\)[\s\S]*?\.industries\s*\{[^}]*height:\s*512\.4px/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.industries\s*\{[^}]*height:\s*371\.2px/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.industries\s*\{[^}]*max-width:\s*1260px[^}]*height:\s*388\.4px/s);
});

test('Team preserves Source ordering, black CTA, gaps, and measured outer heights', () => {
  assert.match(component, /className=\{styles\.featuredMember\}[\s\S]*className=\{styles\.teamContent\}/);
  assert.match(css, /\.team\s*\{[^}]*height:\s*2402\.8px[^}]*padding-top:\s*70px[^}]*padding-bottom:\s*70px/s);
  assert.match(css, /\.teamContent\s*\{[^}]*order:\s*-1/s);
  assert.match(css, /\.primaryCta\s*\{[^}]*background:\s*#151413/s);
  assert.match(css, /@media\s*\(min-width:\s*600px\)[\s\S]*?\.team\s*\{[^}]*height:\s*3834px/s);
  assert.match(css, /@media\s*\(min-width:\s*810px\)[\s\S]*?\.team\s*\{[^}]*height:\s*1960\.5px/s);
  assert.match(css, /@media\s*\(min-width:\s*1200px\)[\s\S]*?\.team\s*\{[^}]*height:\s*981\.8px/s);
  assert.match(css, /@media\s*\(min-width:\s*1500px\)[\s\S]*?\.team\s*\{[^}]*height:\s*943\.8px/s);
});

test('About shared CTA closes at the Source 468px tablet height', () => {
  assert.match(contactCss, /@media\s*\(min-width:\s*1024px\)[\s\S]*?\.section\s*\{[^}]*height:\s*468px[^}]*padding-bottom:\s*100px/s);
});
