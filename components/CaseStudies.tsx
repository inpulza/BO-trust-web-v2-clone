'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './CaseStudies.module.css';

export default function CaseStudies() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="case-studies-title">
      <motion.div
        className={styles.container}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="case-studies-title">Real-world case studies</h2>
        <div className={styles.cards}>
          <article className={styles.caseCard}>
            <header>Case Study</header>
            <div className={styles.caseBody}>
              <img src="/assets/27-PK1hoeMIruZ9LXOhQLweuSN8JhE.jpg" alt="Interior of a multi-location retail store" />
              <div className={styles.caseDetails}>
                <h3>Cutting costs for a multi-location retail chain</h3>
                <p><span>Client:</span> Multi-location retail</p>
              </div>
            </div>
          </article>
          <article className={styles.solutionCard}>
            <header>Solution &amp; Result</header>
            <div className={styles.solutionBody}>
              <p>Implementing cost-saving strategies across all outlets to boost efficiency and improve overall profitability.</p>
              <div className={styles.results}>
                <div>
                  <span className={styles.resultValue}>
                    <img src="/assets/28-HjtSaIM00qtimdqfLwlPpWrQU4.svg" alt="" aria-hidden="true" />
                    <strong>28%</strong>
                  </span>
                  <span>Archived cost reduction</span>
                </div>
                <div>
                  <span className={styles.resultValue}>
                    <img src="/assets/28-HjtSaIM00qtimdqfLwlPpWrQU4.svg" alt="" aria-hidden="true" />
                    <strong>$78</strong>
                  </span>
                  <span>Saved tax penalties</span>
                </div>
              </div>
              <a href="/case-study/cutting-costs-for-a-multi-location-retail-chain">
                View full case study
                <img src="/assets/01-tlGvIWioqeKmncOXpglcDGkJfPs.svg" alt="" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  );
}
