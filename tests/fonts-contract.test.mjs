import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const fonts = [
  'SB2OEB6IKZPRR6JT4GFJ2TFT6HBB6AZN.woff2', 'NIQ54PVBBIWVK3PFSOIOUJSXIJ5WTNDP.woff2',
  'HCZ5OQRTYQOAVSHRS6UOFWUZ5CGI6JRO.woff2', 'H7W54QQR2V6KL5KMDA2PD2KSQRCZHPRE.woff2',
  '3ZLMEXZEQPLTEPMHTQDAUXP5ZZXCZAEN.woff2', '6FVUUVSLJPCCVHIJND4LQZIT4MFZBXYJ.woff2',
  'VvQsG6v03iEur3JMvHc8uDrkGo.woff2', '14ekUNlj0vS79oF2mPCC9M9Rng.woff2',
  '3WfnZksKV9qFKlmPOweqZdumjg.woff2', 'O2R7AhA6wjBk0GHLJl0N8fqxN0.woff2',
];

test('measured project fonts are local and declared without origin CDN', () => {
  for (const font of fonts) assert.ok(existsSync(resolve(root, 'public/fonts', font)), `missing ${font}`);
  const css = readFileSync(resolve(root, 'app/globals.css'), 'utf8');
  assert.match(css, /font-family:\s*["']General Sans["']/);
  assert.match(css, /font-family:\s*["']Open Sauce Sans["']/);
  assert.match(css, /body\s*\{[^}]*font-family:\s*"General Sans"/s);
  assert.match(css, /h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[^}]*font-family:\s*"Open Sauce Sans"/s);
  assert.doesNotMatch(css, /https?:\/\//);
  assert.doesNotMatch(css, /framerusercontent/i);
});
