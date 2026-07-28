import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const processCss = read('components/Process.module.css');
const testimonialsCss = read('components/Testimonials.module.css');

test('Process replica la tipografía medida de título, etiquetas y pasos en los seis viewports', () => {
  const tablet = processCss.match(/@media \(min-width: 768px\) and \(max-width: 1023px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const baseTitle = processCss.match(/\.title\s*\{([^}]*)\}/s)?.[1] ?? '';
  const baseTitleSpan = processCss.match(/\.title span\s*\{([^}]*)\}/s)?.[1] ?? '';
  const baseLabel = processCss.match(/\.label\s*\{([^}]*)\}/s)?.[1] ?? '';
  const baseHeading = processCss.match(/\.step h3\s*\{([^}]*)\}/s)?.[1] ?? '';
  const baseParagraph = processCss.match(/\.step p\s*\{([^}]*)\}/s)?.[1] ?? '';
  const stickyDesktop = processCss.match(/@media \(min-width: 1024px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const wideDesktop = processCss.match(/@media \(min-width: 1440px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';

  assert.match(tablet, /\.step\s*\{[^}]*width:\s*100%\s*;[^}]*\}/s);
  assert.doesNotMatch(tablet, /max-width:\s*390px/i);
  assert.match(baseTitleSpan, /display:\s*inline\s*;/s);
  assert.match(tablet, /\.title span\s*\{[^}]*display:\s*inline\s*;[^}]*\}/s);
  assert.match(baseTitle, /font:\s*700\s+30px\/36px/i);
  assert.match(baseLabel, /font:\s*500\s+17px\/23\.8px/i);
  assert.match(baseHeading, /font:\s*700\s+22px\/26\.4px/i);
  assert.match(baseParagraph, /font:\s*500\s+16px\/22\.4px/i);
  assert.match(stickyDesktop, /\.step h3\s*\{[^}]*font-size:\s*26px\s*;[^}]*line-height:\s*31\.2px/s);
  assert.match(stickyDesktop, /\.label\s*\{[^}]*font-size:\s*18px\s*;[^}]*line-height:\s*25\.2px/s);
  assert.match(stickyDesktop, /\.stepImage\s*\{[^}]*width:\s*350px\s*;/s);
  assert.match(wideDesktop, /\.step\s*\{[^}]*padding:\s*40px\s*;[^}]*\}/s);
  assert.match(wideDesktop, /\.stepImage\s*\{[^}]*width:\s*352px\s*;/s);
  assert.match(wideDesktop, /\.step h3\s*\{[^}]*font-size:\s*28px\s*;[^}]*line-height:\s*33\.6px/s);
  assert.match(wideDesktop, /\.step:not\(\[data-active='true'\]\) \.stepImage\s*\{[^}]*position:\s*static\s*;[^}]*width:\s*352px\s*;[^}]*opacity:\s*1\s*;/s);
  assert.doesNotMatch(wideDesktop, /\.step:not\(\[data-active='true'\]\) \.stepImage\s*\{[^}]*position:\s*absolute/s);
  assert.doesNotMatch(wideDesktop, /\.step p\s*\{[^}]*font-size:/s);
});

test('Process equilibra copy y recupera la geometría fraccional del intro solo en móvil y tablet', () => {
  const mobile = processCss.match(/@media \(max-width: 1023px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const tablet = processCss.match(/@media \(min-width: 768px\) and \(max-width: 1023px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const baseIntro = processCss.match(/\.intro\s*\{([^}]*)\}/s)?.[1] ?? '';

  assert.match(baseIntro, /height:\s*337\.625px\s*;/s);
  assert.match(baseIntro, /flex:\s*0\s+0\s+337\.625px\s*;/s);
  assert.match(mobile, /\.lead,\s*\.step p\s*\{[^}]*text-wrap:\s*balance\s*;[^}]*\}/s);
  assert.match(mobile, /\.proof\s*\{[^}]*gap:\s*10px\s*;[^}]*\}/s);
  assert.match(tablet, /\.intro\s*\{[^}]*height:\s*256\.8125px\s*;[^}]*flex-basis:\s*256\.8125px\s*;[^}]*\}/s);
});

test('Testimonials alinea la tarjeta activa y su tipografía con la geometría settled medida', () => {
  const rail = testimonialsCss.match(/\.rail\s*\{([^}]*)\}/s)?.[1] ?? '';
  const card = testimonialsCss.match(/\.card\s*\{([^}]*)\}/s)?.[1] ?? '';
  const quote = testimonialsCss.match(/\.card blockquote\s*\{([^}]*)\}/s)?.[1] ?? '';
  const tablet = testimonialsCss.match(/@media \(min-width: 768px\) and \(max-width: 1023px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const desktop = testimonialsCss.match(/@media \(min-width: 1440px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';

  assert.match(rail, /align-items:\s*flex-start\s*;/i);
  assert.match(card, /height:\s*450px\s*;/i);
  assert.match(card, /gap:\s*20px\s*;/i);
  assert.match(quote, /color:\s*#262322\s*;/i);
  assert.match(quote, /font:\s*500\s+17px\/23\.8px/i);
  assert.match(quote, /text-wrap:\s*balance\s*;/i);
  assert.match(quote, /top:\s*2px\s*;/i);
  assert.match(testimonialsCss, /\.logos img\s*\{[^}]*filter:\s*none\s*;/s);
  assert.match(testimonialsCss, /\.card strong\s*\{[^}]*margin-bottom:\s*6px\s*;/s);
  assert.match(tablet, /\.carousel\s*\{[^}]*width:\s*460px\s*;/s);
  assert.match(tablet, /\.previous\s*\{[^}]*left:\s*-16px\s*;/s);
  assert.match(tablet, /\.next\s*\{[^}]*right:\s*-16px\s*;/s);
  assert.match(tablet, /\.partners h2\s*\{[^}]*max-width:\s*none\s*;/s);
  assert.match(tablet, /\.card strong,\s*\.card span\s*\{[^}]*top:\s*9\.390625px\s*;/s);
  assert.match(desktop, /\.viewport\s*\{[^}]*top:\s*0\s*;/s);
  assert.match(desktop, /\.card\s*\{[^}]*height:\s*570px\s*;[^}]*padding:\s*40px\s*;[^}]*gap:\s*40px\s*;[^}]*\}/s);
  assert.match(desktop, /\.card blockquote\s*\{[^}]*font-size:\s*18px\s*;[^}]*line-height:\s*25\.2px/s);
  assert.match(desktop, /\.card strong\s*\{[^}]*font-size:\s*20px\s*;[^}]*line-height:\s*24px/s);
});

test('sticky, reveals y navegación circular siguen presentes', () => {
  const processSource = read('components/Process.tsx');
  const testimonialsSource = read('components/Testimonials.tsx');

  assert.match(processCss, /\.intro\s*\{[^}]*position:\s*sticky\s*;[^}]*top:\s*108px/s);
  assert.equal((processSource.match(/whileInView=/g) ?? []).length, 2);
  assert.equal((testimonialsSource.match(/whileInView=/g) ?? []).length, 3);
  assert.match(testimonialsSource, /\(value - 1 \+ testimonials\.length\) % testimonials\.length/);
  assert.match(testimonialsSource, /\(value \+ 1\) % testimonials\.length/);
});
