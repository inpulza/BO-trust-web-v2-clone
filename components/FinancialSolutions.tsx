'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from "./FinancialSolutions.module.css";

type Solution = {
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  image: string;
};

const solutions: Solution[] = [
  {
    title: "Advanced bookkeeping",
    description: "Accurate record management to track transactions, maintain compliance, and provide clear financial visibility.",
    bullets: ["Financial statements preparation", "Cloud-based accounting setup", "Daily, monthly & annual bookkeeping"],
    icon: "/assets/13-kvko1wsB5p0UoiSRdEP4aRjVoo.svg",
    image: "/assets/15-LFSsuGjmjx3l4iF8eCDcg8Irw7s.jpg",
  },
  {
    title: "Strategic financial planning",
    description: "Strategic financial guidance to align business goals, improve performance, and create sustainable long-term growth plans.",
    bullets: ["Strategic goal alignment", "Business valuation support", "Budget forecasting & performance tracking"],
    icon: "/assets/16-3BuDmBdLuoHDTBVgFeSEVDBp1l8.svg",
    image: "/assets/17-vb8azgpgTpWD83coHxsnDxYY.jpg",
  },
  {
    title: "Professional tax consulting",
    description: "Expert tax support to ensure compliance, reduce liabilities, and manage filings with confidence and accuracy.",
    bullets: ["Corporate & individual tax planning", "Filing & regulatory compliance", "Handling audits & notices"],
    icon: "/assets/18-mwDIawLLlCnkwoeLyUZwwBn80jE.svg",
    image: "/assets/19-1R4YWi0STNzjidP32Ik1TVI.jpg",
  },
  {
    title: "Enterprise risk management",
    description: "Proactive risk assessment to identify threats, strengthen controls, and protect business stability and continuity.",
    bullets: ["Operational & financial risk audits", "Compliance risk analysis", "Business continuity planning"],
    icon: "/assets/20-uaqnen8IG6qHffB9NwCkaog6r7I.svg",
    image: "/assets/21-LlB8xjF5pB5yk1Vr1fUUCtenwk.jpg",
  },
];

export default function FinancialSolutions() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="solutions-title">
      <div className={styles.container}>
        <motion.h2
          id="solutions-title"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'linear' }}
        ><strong>Financial</strong> solutions</motion.h2>
        <motion.div
          className={styles.cards}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'linear' }}
        >
          {solutions.map((solution, index) => (
            <a className={`${styles.card} ${styles[`card${index + 1}`]}`} href="/service-static" key={solution.title}>
              <img className={styles.media} src={solution.image} alt="" aria-hidden="true" />
              <div className={styles.summary}>
                <img className={styles.icon} src={solution.icon} alt="" aria-hidden="true" />
                <div className={styles.copy}>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </div>
              </div>
              <div className={styles.details}>
                <ul>{solution.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
