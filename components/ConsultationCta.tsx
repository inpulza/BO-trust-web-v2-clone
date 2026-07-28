'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from "./ConsultationCta.module.css";

export default function ConsultationCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="consultation-title">
      <motion.div
        className={styles.container}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'linear' }}
      >
        <div className={styles.card}>
          <img className={styles.avatar} src="/assets/12-cGxorl1hAIehOBiq5qhM8L1tY.jpg" alt="Financial adviser" />
          <div className={styles.copy}>
            <h2 id="consultation-title">Let’s bring clarity <br className={styles.mobileBreak} aria-hidden="true" />to your finances.</h2>
            <a href="/contact">
              <span>Book a free consultation</span>
              <img src="/assets/01-tlGvIWioqeKmncOXpglcDGkJfPs.svg" alt="" aria-hidden="true" />
            </a>
            <p>Free 30-minute consultation.<br className={styles.mobileBreak} aria-hidden="true" /> No obligation. Clear next steps.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
