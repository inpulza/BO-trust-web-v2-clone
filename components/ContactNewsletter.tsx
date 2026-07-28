'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ContactNewsletter.module.css';

export default function ContactNewsletter() {
  const [email, setEmail] = useState('');
  const reduceMotion = useReducedMotion();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <section className={styles.section} aria-label="Contact and newsletter">
      <motion.div
        className={styles.container}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.hero}>
          <div className={styles.ctas}>
            <div><h2><span className={styles.mobileTitle}>Book a Consultation</span><span className={styles.tabletTitle}>Shedule now</span><span className={styles.desktopTitle}>Schedule a consultation</span></h2><a href="https://cal.com/">Book now</a></div>
            <div><h2>Request a proposal</h2><a href="/contact">Get proposal</a></div>
          </div>
          <video className={styles.video} autoPlay loop muted playsInline poster="/assets/CApjoIs8LrReq3smRle14u4Zow4.jpg" aria-label="Financial consulting team at work">
            <source src="/assets/6Qa0nsqyqXggbpIOPRdgLIdDUiw.mp4" type="video/mp4" />
          </video>
        </div>
        <form className={styles.newsletter} onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email">Get monthly strategies,<br className={styles.tabletBreak} aria-hidden="true" /> tax updates, and business<br className={styles.tabletBreak} aria-hidden="true" /> tips straight to your inbox</label>
          <div className={styles.formControls}>
            <input id="newsletter-email" name="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="hello@yourbrand.com" autoComplete="email" required />
            <button type="submit" data-valid={valid}>Subscribe now</button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
