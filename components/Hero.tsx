'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from "./Hero.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const chips = [
  { label: 'Bookkeeping', className: 'bookkeeping', opacity: 0.48, y: 10, delay: 0 },
  { label: 'Financial planning', className: 'planning', opacity: 0.21, y: 16, delay: 0.04 },
  { label: 'Tax consulting', className: 'tax', opacity: 0.046, y: 19, delay: 0.08 },
  { label: 'Risk management', className: 'risk', opacity: 0.001, y: 20, delay: 0.12 },
] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const initialReveal = reduceMotion ? false : { opacity: 0, y: 20 };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <motion.img
        data-hero-visual
        className={styles.background}
        src="/assets/02-jewe6TLC1EzTr2VnzLPxRuot4IU.jpg"
        alt=""
        aria-hidden="true"
        initial={initialReveal}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
      />
      <div className={styles.shade} />
      <div className={styles.content}>
        <motion.h1
          id="hero-title"
          aria-label="Financial Growth"
          initial={initialReveal}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        ><span>Financial</span> <em>Growth</em></motion.h1>
        <div className={styles.tags} aria-label="Financial services">
          {chips.map((chip) => (
            <motion.span
              key={chip.label}
              className={styles[chip.className]}
              initial={reduceMotion ? false : { opacity: chip.opacity, y: chip.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: chip.delay, ease }}
            >
              {chip.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
