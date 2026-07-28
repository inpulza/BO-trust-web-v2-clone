'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import styles from './FinancialClarity.module.css';

const metrics = [
  ['150+', 'Business empowered'],
  ['100M+', 'In transactions managed'],
  ['10+', 'Years of experience'],
];
const messages = [
  'Clear visibility into cash flow',
  'Reports that guide real decisions',
  'Compliance handled before risk',
  'Advice grounded in real numbers',
  'Reliable support every month',
  'Systems built to scale with you',
];

const messageRanges = [
  [0.33, 0.43],
  [0.25, 0.35],
  [0.43, 0.52],
  [0.51, 0.60],
  [0.65, 0.74],
  [0.58, 0.67],
] as const;

function ClarityMessage({
  index,
  message,
  progress,
  reduceMotion,
}: {
  index: number;
  message: string;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const [start, end] = messageRanges[index];
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.5, 1]);

  return (
    <motion.span
      data-clarity-message={index + 1}
      style={reduceMotion ? { opacity: 1, scale: 1 } : { opacity, scale }}
    >
      {message}
    </motion.span>
  );
}

export default function FinancialClarity() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="clarity-title">
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img className={styles.icon} src="/assets/26-im4blmlIKKgYWw99Ava9SAaXLLc.svg" alt="" aria-hidden="true" />
          <h2 id="clarity-title">The financial clarity your business needs to grow with confidence.</h2>
          <div className={styles.metrics} aria-label="Company metrics">
            {metrics.map(([value, label]) => <div className={styles.metric} key={value}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <div className={styles.messages} aria-label="Financial clarity outcomes">
            {messages.map((message, index) => (
              <ClarityMessage
                index={index}
                key={message}
                message={message}
                progress={scrollYProgress}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
          <a className={styles.cta} href="/about">Talk to your advisors<img src="/assets/01-tlGvIWioqeKmncOXpglcDGkJfPs.svg" alt="" aria-hidden="true" /></a>
        </motion.div>
      </div>
    </section>
  );
}
