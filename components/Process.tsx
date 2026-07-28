'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Process.module.css';

const ASSETS = '/assets';

const steps = [
  {
    label: 'Step 1',
    title: 'Understand your business',
    text: 'We review your operations, financial structure, and goals to identify key challenges, uncover growth opportunities, and build a strong foundation.',
    image: '33-oqfo9eIHQh7BOwFtSgkvB54k0.jpg',
  },
  {
    label: 'Step 2',
    title: 'Set up reporting & insights',
    text: 'We design reporting systems that provide accurate data, track performance metrics, and support confident, well-informed business decisions.',
    image: '34-gt7HBmTUXEWbwDW4E5O6Yg6wkw.jpg',
  },
  {
    label: 'Step 3',
    title: 'Establish cash flow control',
    text: 'We implement structured cash flow processes that control expenses, improve forecasting accuracy, and strengthen long-term financial stability.',
    image: '35-rkjDeioeNbwzZEGQOJzXCtI0ccM.jpg',
  },
];

const avatars = [
  '29-N5LEbb3vQLR3vYoUEdYI5wP68.jpg',
  '30-tb3vLZMZBvv83W1nzQTRRaUhL8.jpg',
  '31-jV5zySmx0qtvVfd4uCDr0NrA3g.jpg',
  '32-Ceu1tcmxqwtwrlXHZoOdDadn9O4.jpg',
];

export default function Process() {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className={styles.section} aria-labelledby="process-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div
            className={styles.intro}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.67, ease: 'linear' }}
          >
            <div>
              <h2 id="process-title" className={styles.title}>
                A simple path to <span>financial</span> clarity
              </h2>
              <p className={styles.lead}>A proven framework that transforms your financial challenges into actionable growth strategies.</p>
            </div>
            <div className={styles.actions}>
              <div className={styles.proof}>
                <div className={styles.avatars} aria-hidden="true">
                  {avatars.map((avatar) => <img key={avatar} src={`${ASSETS}/${avatar}`} alt="" />)}
                </div>
                <div><strong>110+ CFOs</strong><span>Using our financial services</span></div>
              </div>
              <a className={styles.cta} href="/contact">
                Let&apos;s get started
                <img src={`${ASSETS}/01-tlGvIWioqeKmncOXpglcDGkJfPs.svg`} alt="" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
          <motion.ol
            className={styles.steps}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.67, delay: 0.2, ease: 'linear' }}
          >
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
              <motion.li
                className={styles.step}
                data-active={isActive}
                key={step.label}
                layout
                onPointerEnter={() => setActiveStep(index)}
                transition={reduceMotion ? { duration: 0 } : { layout: { duration: 0.5, ease: [0.44, 0, 0.56, 1] } }}
              >
                <div className={styles.stepCopy}>
                  <span className={styles.label}>{step.label}</span>
                  {isActive && <h3>{step.title}</h3>}
                </div>
                <img className={styles.stepImage} src={`${ASSETS}/${step.image}`} alt={`${step.label}: ${step.title}`} />
                {isActive && <p>{step.text}</p>}
              </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
