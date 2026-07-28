import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = rel => readFileSync(resolve(root, rel), 'utf8');

test('Next.js App Router clean-owned scaffold exists', () => {
  const pkg = JSON.parse(read('package.json'));
  for (const dependency of ['next', 'react', 'react-dom', 'lenis', 'framer-motion']) {
    assert.ok(pkg.dependencies?.[dependency], `missing dependency ${dependency}`);
  }
  assert.match(pkg.scripts?.dev ?? '', /next dev/);
  assert.match(pkg.scripts?.build ?? '', /next build/);
  assert.match(pkg.scripts?.start ?? '', /next start/);
  assert.equal(pkg.type, 'module');
  const typescriptMajor = Number((pkg.devDependencies?.typescript ?? '').match(/\d+/)?.[0]);
  assert.ok(typescriptMajor >= 5 && typescriptMajor <= 6, `Next build requires compatible TypeScript, got ${pkg.devDependencies?.typescript}`);
  const tsconfig = JSON.parse(read('tsconfig.json'));
  assert.equal(tsconfig.compilerOptions?.baseUrl, undefined, 'baseUrl is deprecated in TypeScript 6');
  assert.deepEqual(tsconfig.compilerOptions?.paths?.['@/*'], ['./*']);
  for (const file of ['next.config.mjs', 'app/layout.tsx', 'app/page.tsx', 'app/globals.css']) {
    assert.ok(existsSync(resolve(root, file)), `missing ${file}`);
  }
});

test('owned source does not contain Framer Sites signatures', () => {
  const sourceFiles = ['app/layout.tsx', 'app/page.tsx', 'app/globals.css'].filter(file => existsSync(resolve(root, file)));
  const forbidden = [/data-framer-/i, /class(Name)?=["'`][^"'`]*framer-/i, /__framer/i, /framerusercontent\.com/i, /Made in Framer/i, /Framer Sites/i];
  for (const file of sourceFiles) {
    const source = read(file);
    for (const pattern of forbidden) assert.doesNotMatch(source, pattern, `${file} contains ${pattern}`);
  }
});
