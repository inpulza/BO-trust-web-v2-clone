import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const component = fs.readFileSync(new URL('../components/ServiceStaticPage.tsx', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../components/ServiceStaticPage.module.css', import.meta.url), 'utf8');

test('Service top sections preserve Source component structure', () => {
  assert.match(component, /service-hero-icon\.svg/);
  assert.match(component, /styles\.aboutIntro/);
  assert.match(component, /styles\.aboutMedia/);
  assert.match(component, /styles\.aboutBenefits/);
  assert.match(component, /styles\.statTop/);
  assert.match(component, /styles\.statBottom/);
  assert.match(component, /service-benefit-1\.svg/);
  assert.match(component, /service-benefit-2\.svg/);
  assert.match(component, /service-benefit-3\.svg/);
});

test('Service top sections encode Source paint containers', () => {
  assert.match(css, /\.heroIcon/);
  assert.match(css, /\.statsPanel/);
  assert.match(css, /\.statTop/);
  assert.match(css, /\.statBottom/);
});

test('Service middle sections preserve Source staggered steps and case composition', () => {
  assert.match(component, /styles\.stepsRows/);
  assert.match(component, /styles\.stepPlaceholder/);
  assert.match(component, /styles\.caseProof/);
  assert.match(component, /styles\.caseMedia/);
  assert.match(component, /styles\.caseLink/);
  assert.match(css, /\.stepsRow/);
  assert.match(css, /\.caseProof/);
  assert.match(css, /\.caseMedia/);
  assert.match(css, /\.caseLink/);
});

test('Service pricing preserves Source plan and payroll composition', () => {
  assert.match(component, /styles\.pricingContent/);
  assert.match(component, /styles\.planTitle/);
  assert.match(component, /styles\.planPrice/);
  assert.match(component, /styles\.payrollCopy/);
  assert.match(css, /\.pricingContent/);
  assert.match(css, /\.planTitle/);
  assert.match(css, /\.planPrice/);
  assert.match(css, /\.payrollCopy/);
});
