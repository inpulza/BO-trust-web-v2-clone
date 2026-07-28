import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('Contact route composes the measured page and shared shell', () => {
  const route = read('app/contact/page.tsx');
  for (const component of ['Navbar', 'ContactPage', 'Footer']) assert.match(route, new RegExp(`<${component}`));
  assert.doesNotMatch(route, /ContactNewsletter/);
});

test('Contact preserves exact visible contract and local assets', () => {
  const source = read('components/ContactPage.tsx');
  for (const copy of [
    'Contact us', 'Whether you’re ready to improve your financial systems', 'Full name*',
    'Email address*', 'Phone number*', 'Subject*', 'Write your message here...',
    'Frequently asked questions', 'What types of businesses do you work with?',
    'Do you offer virtual consultations?',
  ]) assert.ok(source.includes(copy), `missing Contact copy: ${copy}`);
  assert.doesNotMatch(source, /framerusercontent|data-framer|\.framer-/i);
  assert.equal((source.match(/required/g) ?? []).length, 4);
  assert.match(source, /type="email"/);
  assert.match(source, /type="tel"/);
  assert.doesNotMatch(source, /accordionAnswer|faqAnswer|<details/i);
  for (const file of ['contact-phone.svg','contact-email.svg','contact-location.svg','contact-hours.svg','contact-form.jpg','contact-faq.jpg']) {
    assert.ok(existsSync(resolve(root, 'public/assets', file)), `missing localized asset ${file}`);
  }
});
