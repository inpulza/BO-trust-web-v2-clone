import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const routedComponents = [
  'components/Navbar.tsx',
  'components/Footer.tsx',
  'components/Process.tsx',
  'components/FinancialSolutions.tsx',
  'components/FinancialClarity.tsx',
  'components/ContactNewsletter.tsx',
  'components/ConsultationCta.tsx',
  'components/CaseStudies.tsx',
  'components/BlogInsights.tsx',
];

test('internal navigation is root-absolute so nested routes never resolve relatively', () => {
  for (const path of routedComponents) {
    const source = read(path);
    assert.doesNotMatch(source, /(?:href=|href:\s*)["']\.\//, `${path} still contains a relative internal href`);
  }
});

test('shared navigation derives its active page from the live pathname', () => {
  const navbar = read('components/Navbar.tsx');
  const footer = read('components/Footer.tsx');

  assert.match(navbar, /usePathname/);
  assert.match(navbar, /isActive/);
  assert.doesNotMatch(navbar, /index\s*===\s*0/);
  assert.match(footer, /usePathname/);
  assert.match(footer, /isActive/);
  assert.doesNotMatch(footer, /label\s*===\s*['"]Home['"]/);
});
