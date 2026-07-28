'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './BlogInsights.module.css';

const ASSETS = '/assets';
const posts = [
  { category: 'Process Optimization', date: 'Feb 26, 2026', title: 'Operational excellence through consulting', href: '/blog/operational-excellence-through-consulting', image: '55-joegLKvajAqPRCVfUBSVoMAeAE.jpg' },
  { category: 'Decision-Making', date: 'Feb 23, 2026', title: 'Do you really need a business consultant?', href: '/blog/do-you-really-need-a-business-consultant', image: '56-0xprda3Itt7ZtzjOM47uMitsko.jpg' },
  { category: 'Technology Consulting ', date: 'Feb 6, 2026', title: 'Driving digital growth with consulting', href: '/blog/driving-digital-growth-with-consulting', image: '57-he3fhhwU2klCnAE88cr75QJHM.jpg' },
];

export default function BlogInsights() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="insights-title">
      <div className={styles.container}>
        <div className={styles.inner}>
          <motion.h2
            id="insights-title"
            initial={reduceMotion ? false : { opacity: 0, y: 11 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Latest blog &amp; insights
          </motion.h2>
          <div className={styles.grid}>
            {posts.map((post, index) => (
              <motion.a
                className={styles.card}
                href={post.href}
                key={post.href}
                aria-label={`${post.category.trim()}, ${post.date}: ${post.title}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.65, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={`${ASSETS}/${post.image}`} alt={post.title} />
                <div className={styles.copy}>
                  <div className={styles.meta}><span>{post.category}</span><time>{post.date}</time></div>
                  <h3>{post.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
