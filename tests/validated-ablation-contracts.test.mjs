import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

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

test('Consultation applies the validated mobile avatar border and accessible authored breaks', () => {
  const css = read('components/ConsultationCta.module.css');
  const source = read('components/ConsultationCta.tsx');
  const mobile = mediaBlock(css, '@media (max-width: 767.98px)');

  assert.match(mobile, /\.avatar\s*\{[^}]*border:\s*2px solid #fff\s*;[^}]*box-sizing:\s*border-box\s*;/s);
  assert.match(mobile, /\.mobileBreak\s*\{[^}]*display:\s*inline\s*;/s);
  assert.match(css, /\.mobileBreak\s*\{[^}]*display:\s*none\s*;/s);
  assert.equal((source.match(/className=\{styles\.mobileBreak\}/g) ?? []).length, 2);
  assert.equal((source.match(/aria-hidden="true"/g) ?? []).length, 3);
});

test('Contact applies only the validated mobile panel, controls, input and label-break contract', () => {
  const css = read('components/ContactNewsletter.module.css').replace(/\s+/g, ' ');
  const source = read('components/ContactNewsletter.tsx');
  const mobile = mediaBlock(css, '@media(max-width:767.98px)');
  const tablet = mediaBlock(css, '@media(min-width:768px)');

  assert.match(mobile, /\.ctas>div\s*\{[^}]*padding:\s*19px\s*(?:;|\})/);
  assert.match(mobile, /\.newsletter\s*\{[^}]*padding:\s*12px\s*;[^}]*justify-content:\s*flex-start\s*;[^}]*gap:\s*12px\s*(?:;|\})/);
  assert.match(mobile, /\.formControls\s*\{[^}]*gap:\s*10px\s*(?:;|\})/);
  assert.match(mobile, /\.newsletter input\s*\{[^}]*padding:\s*12px 16px\s*(?:;|\})/);
  assert.match(css, /\.tabletBreak\s*\{[^}]*display:\s*inline\s*(?:;|\})/);
  assert.match(tablet, /\.tabletBreak\s*\{[^}]*display:\s*none\s*(?:;|\})/);
  assert.equal((source.match(/className=\{styles\.tabletBreak\}/g) ?? []).length, 2);
  assert.equal((source.match(/<br className=\{styles\.tabletBreak\} aria-hidden="true"\s*\/>/g) ?? []).length, 2);
});

test('Blog applies the validated mobile copy inset and title offset', () => {
  const css = read('components/BlogInsights.module.css');
  const mobile = mediaBlock(css, '@media (max-width: 767.98px)');

  assert.match(mobile, /\.copy\s*\{[^}]*padding:\s*20px 10px 4px\s*;/s);
  assert.match(mobile, /\.card h3\s*\{[^}]*margin-top:\s*16px\s*;/s);
});

test('Process applies the validated typography, spacing and wide-layout corrections', () => {
  const css = read('components/Process.module.css');
  const title = css.match(/\.title\s*\{([^}]*)\}/s)?.[1] ?? '';
  const actions = css.match(/\.actions\s*\{([^}]*)\}/s)?.[1] ?? '';
  const label = css.match(/\.label\s*\{([^}]*)\}/s)?.[1] ?? '';
  const wide = mediaBlock(css, '@media (min-width: 1440px)');

  assert.match(title, /letter-spacing:\s*normal\s*;/);
  assert.match(actions, /gap:\s*10px\s*;/);
  assert.match(label, /margin-bottom:\s*10px\s*;/);
  assert.match(wide, /\.intro\s*\{[^}]*padding-top:\s*0\s*;/s);
  assert.match(wide, /\.step\[data-active='true'\] \.label\s*\{[^}]*margin-bottom:\s*10px\s*;/s);
});
