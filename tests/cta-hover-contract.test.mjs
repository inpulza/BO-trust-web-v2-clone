import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const globals = read('app/globals.css');
const navbar = read('components/Navbar.module.css');
const about = read('components/AboutPage.module.css');
const footer = read('components/Footer.module.css');
const newsletter = read('components/ContactNewsletter.module.css');
const financialClarity = read('components/FinancialClarity.module.css');
const processCss = read('components/Process.module.css');
const consultation = read('components/ConsultationCta.module.css');
const contact = read('components/ContactPage.module.css');
const caseIndex = read('components/CaseStudyIndex.module.css');
const caseStudies = read('components/CaseStudies.module.css');
const caseDetail = read('components/CaseStudyDetail.module.css');
const service = read('components/ServiceStaticPage.module.css');

test('interactive controls share a reduced-motion-safe color transition', () => {
  assert.match(globals, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)[\s\S]*?:is\(a,button\)\s*\{[^}]*transition:\s*background-color 180ms ease,\s*color 180ms ease,\s*border-color 180ms ease/s);
  assert.match(globals, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?:is\(a,button\)\s*\{[^}]*transition-duration:\s*0\.01ms/s);
});

test('About and shared shell preserve Source hover colors', () => {
  assert.match(navbar, /\.cta:hover\s*\{[^}]*background:\s*#f55107/s);
  assert.match(about, /\.heroAction>a:hover\s*\{[^}]*background:\s*#feea9d/s);
  assert.match(about, /\.primaryCta:hover\s*\{[^}]*background:\s*#f55107/s);
  assert.match(newsletter, /\.newsletter button:hover:not\(:disabled\)\s*\{[^}]*background:\s*#59524f/s);
  assert.match(footer, /\.cta:hover\s*\{[^}]*background:\s*#59524f/s);
});

test('primary CTAs across routes use the same black orange white hover system', () => {
  assert.match(financialClarity, /\.cta:hover\s*\{[^}]*background:\s*#f55107/s);
  assert.match(processCss, /\.cta:hover\s*\{[^}]*background:\s*#59524f/s);
  assert.match(consultation, /\.copy a:hover\s*\{[^}]*background:\s*#59524f/s);
  assert.match(contact, /\.contactPanel button:hover:not\(:disabled\)\s*\{[^}]*background:\s*#59524f/s);
  assert.match(caseIndex, /\.more button:hover\s*\{[^}]*background:\s*#f55107/s);
  assert.match(caseStudies, /\.solutionBody>a:hover\s*\{[^}]*background:\s*#59524f/s);
  assert.match(caseDetail, /\.relatedHead>a:hover\s*\{[^}]*background:\s*#f55107/s);
  assert.match(service, /\.about a:hover,\s*\.cta a:hover\s*\{[^}]*background:\s*#59524f/s);
  assert.match(service, /\.pricing \.plan\s*>\s*a:hover\s*\{[^}]*background:\s*#f55107/s);
  assert.match(service, /\.pricing \.payroll\s*>\s*a:hover\s*\{[^}]*background:\s*#feea9d/s);
});
