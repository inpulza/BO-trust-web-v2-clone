'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from "./ProblemsSolutions.module.css";

const problems = [
  "Delayed or inaccurate financial reporting",
  "Complex tax rules and compliance risks",
  "Unclear cash flow and rising costs",
  "Lack of reliable data for decisions",
  "Inefficient manual accounting processes",
];

const solutions = [
  ["/assets/06-Aza7qPQXSkN8eF4x26D6Pqgc8n4.svg", "Real-time, accurate financial reporting"],
  ["/assets/07-6VmwfOA1xpmnTd0maUqqizB0k.svg", "Compliant tax planning and risk management"],
  ["/assets/08-ZScGtcg9s4sMVhrj410HlhvDi0.svg", "Clear cash-flow tracking and cost control"],
  ["/assets/09-GwhJSkew0zY9cBkZyNJYB9TZhM.svg", "Data-driven insights for smarter decisions"],
  ["/assets/10-3lN2S5gk2D9s1okUfyGyohIr7E.svg", "Automated, efficient accounting systems"],
];

const revealTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

export default function ProblemsSolutions() {
  const reduceMotion = useReducedMotion();
  return (
    <section className={styles.section} aria-label="Problems and solutions">
      <div className={styles.container}>
        <motion.article
          data-progressive-reveal
          data-reveal="problem"
          className={`${styles.card} ${styles.problem}`}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition}
        >
          <img className={styles.avatar} src="/assets/03-TiOHi2JRpZ4nwGRDjHsI2u11Rw0.jpg" alt="Business owner facing accounting problems" />
          <h2>The problems businesses face</h2>
          <ul>
            {problems.map((problem) => <li key={problem}><img src="/assets/04-FpOEaldZkPoO9sB20F0KfLltzY0.svg" alt="" aria-hidden="true" /><span>{problem}</span></li>)}
          </ul>
        </motion.article>
        <motion.div
          data-progressive-reveal
          data-reveal="center"
          className={styles.connector}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition}
        >
          <span className={styles.leftLine} data-connector-line="left" aria-hidden="true" />
          <span className={styles.centerLine} data-connector-line="center" aria-hidden="true" />
          <span className={styles.rightLine} data-connector-line="right" aria-hidden="true" />
          <div className={styles.node}><img src="/assets/05-ELpShQB6dZYiiFyzU47LqQr60.svg" alt="" aria-hidden="true" /></div>
          <h2>From confusion to financial clarity</h2>
        </motion.div>
        <motion.article
          data-progressive-reveal
          data-reveal="solution"
          className={`${styles.card} ${styles.solution}`}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition}
        >
          <img className={styles.avatar} src="/assets/11-lgO5ekPJarDdcLA3tMR5fcn4LB4.jpg" alt="Business owner with clear financial information" />
          <h2>How do we solve them</h2>
          <ul>
            {solutions.map(([icon, solution]) => <li key={solution}><img src={icon} alt="" aria-hidden="true" /><span>{solution}</span></li>)}
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
