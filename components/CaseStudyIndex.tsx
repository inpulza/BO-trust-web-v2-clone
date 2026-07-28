'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { caseStudies, type CaseStudy } from '@/lib/case-studies';
import styles from './CaseStudyIndex.module.css';

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      className={styles.card}
      href={study.href}
      initial={reduceMotion || index === 0 ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
    >
      <span className={styles.media}><img src={study.image} alt="" /></span>
      <span className={styles.copy}>
        <span><em>{study.category}</em><h2>{study.title}</h2></span>
        <span className={styles.metrics}>
          {study.metrics.map(([value, label]) => <span className={styles.metric} key={label}><strong>{value}</strong><span>{label}</span></span>)}
        </span>
      </span>
    </motion.a>
  );
}

export default function CaseStudyIndex() {
  const [expanded, setExpanded] = useState(false);
  const visibleCases = expanded ? caseStudies : caseStudies.slice(0, 4);

  return (
    <main className={styles.main}>
      <h1>Case studies</h1>
      <div className={styles.grid}>
        {visibleCases.map((study, index) => <CaseCard study={study} index={index} key={study.href} />)}
      </div>
      <div className={styles.more} aria-live="polite">
        {expanded ? <p>That’s everything for now!</p> : <button type="button" onClick={() => setExpanded(true)}>Load more</button>}
      </div>
    </main>
  );
}
