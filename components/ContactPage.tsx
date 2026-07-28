'use client';

import { useState } from 'react';
import styles from './ContactPage.module.css';

const ASSETS = '/assets';
const info = [
  { label: 'Phone', value: '+1 202 555 0147', href: 'tel:+12025550147', icon: 'contact-phone.svg' },
  { label: 'Email', value: 'support@yourbrand.com', href: 'mailto:support@yourbrand.com', icon: 'contact-email.svg' },
  { label: 'Location', value: 'Your Consulting Co. 120 business avenue, suite 500, New York, NY 10001, USA', href: 'https://www.google.com/maps/search/?api=1&query=120+business+avenue+New+York+NY+10001', icon: 'contact-location.svg' },
] as const;
const faqs = [
  'What types of businesses do you work with?',
  'Do I need to hire you monthly?',
  'Is my financial data safe with you?',
  'How do you price your services?',
  'Do you offer virtual consultations?',
] as const;

export default function ContactPage() {
  const [toggledFaq, setToggledFaq] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.intro}>
          <h1 id="contact-title">Contact us</h1>
          <p>Whether you’re ready to improve your financial systems, need clarity on compliance, or want expert advice on scaling your business</p>
        </div>
        <div className={styles.infoGrid}>
          {info.map((item) => (
            <article key={item.label}>
              <div className={styles.infoTitle}><span><img src={`${ASSETS}/${item.icon}`} alt="" /></span><h2>{item.label}</h2></div>
              <a href={item.href} target={item.label === 'Location' ? '_blank' : undefined} rel={item.label === 'Location' ? 'noreferrer' : undefined}>{item.value}</a>
            </article>
          ))}
          <article>
            <div className={styles.infoTitle}><span><img src={`${ASSETS}/contact-hours.svg`} alt="" /></span><h2>Business hours</h2></div>
            <div className={styles.hours}><p>Mon–Fri: 9:30 AM – 6:30 PM</p><p>Sat - Sun: Closed</p></div>
          </article>
        </div>
      </section>

      <section className={styles.contactPanel} aria-label="Send us a message">
        <form action="/contact" method="get">
          <label><span>Full name*</span><input name="Name" type="text" placeholder="Enter your full name" required /></label>
          <label><span>Email address*</span><input name="Email Address" type="email" placeholder="hello@yourbrand.com" required /></label>
          <label><span>Phone number*</span><input name="Phone Number" type="tel" placeholder="Your contact number" required /></label>
          <label><span>Subject*</span><input name="Subject" type="text" placeholder="How can we help you?" required /></label>
          <label className={styles.message}><span>Message</span><textarea name="Message" placeholder="Write your message here..." /></label>
          <button type="submit">Send message</button>
        </form>
        <img className={styles.contactImage} src={`${ASSETS}/contact-form.jpg`} alt="Welcoming consulting office reception" />
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.faqIntro}>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p>We’ve compiled answers to the most common questions clients ask about our business strategy consulting.</p>
        </div>
        <div className={styles.faqGrid}>
          <img src={`${ASSETS}/contact-faq.jpg`} alt="Consultants answering client questions" />
          <div className={styles.faqList}>
            {faqs.map((question, index) => (
              <button key={question} type="button" aria-pressed={toggledFaq === index} onClick={() => setToggledFaq((current) => current === index ? null : index)}>
                <span>{question}</span><i className={toggledFaq === index ? styles.minus : undefined} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
