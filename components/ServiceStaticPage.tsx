'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './ServiceStaticPage.module.css';

const A = '/assets';
const steps = ['Define goals', 'Assess finances', 'Build the plan', 'Execute & monitor', 'Refine & adjust'];
const plans = [
  { name: 'Starter plan', description: 'Perfect for startups and small businesses', price: '$49', icon: 'service-plan-starter.svg', features: ['Basic bookkeeping','Monthly financial reports','Tax computation & filing','Email support','One 30-min strategy call/month'] },
  { name: 'Growth plan', description: 'Designed for growing companies', price: '$79', icon: 'service-plan-growth.svg', features: ['Bookkeeping & financial reporting','Quarterly financial health review','Tax advisory & filing','Dedicated account manager','Bi-weekly strategy sessions','Budgeting & forecasting'] },
  { name: 'Enterprise plan', description: 'Tailored solutions for enterprises', price: '$109', icon: 'service-plan-enterprise.svg', features: ['Unlimited bookkeeping & transaction management','Real-time dashboard reporting','Virtual CFO services','Internal audits & risk management','Investor & board reporting support','Strategic growth planning','Priority phone & video support'] },
] as const;

function Step({ index }: { index: number }) {
  return (
    <div role="listitem">
      <span>{index + 1}</span>
      <strong>{steps[index]}</strong>
    </div>
  );
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: .001, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .6, ease: [.44,0,.56,1] }}>{children}</motion.div>;
}

export default function ServiceStaticPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <span className={styles.heroIcon} aria-hidden="true">
              <img src={`${A}/service-hero-icon.svg`} alt="" />
            </span>
            <h1>Strategic financial planning</h1>
            <p>Strategic financial guidance to align business goals, improve performance, and create sustainable long-term growth plans.</p>
          </div>
          <div className={styles.heroMedia}>
            <img src={`${A}/service-hero.jpg`} alt="Strategic financial planning session" />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.container}>
          <div className={styles.aboutIntro}>
            <h2>Where financial expertise and strategic insight come together</h2>
          </div>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCopy}>
              <p>From startups navigating compliance to enterprises seeking operational efficiency, we work hand-in-hand with organizations to craft tailored, data-driven strategies that deliver measurable value.</p>
              <p>With deep industry experience, advanced financial modeling, and a personalized approach</p>
            </div>
            <div className={styles.aboutMedia}>
              <img src={`${A}/service-about.jpg`} alt="Financial strategy consultation" />
              <a href="/contact">Book a free consulation</a>
            </div>
            <div className={styles.aboutBenefits}>
              <h3>What you’ll gain:</h3>
              <ul>
                <li>Tailored financial strategy</li>
                <li>Clear forecasting &amp; budgeting</li>
                <li>Risk management insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.stats}`}>
        <Reveal className={styles.container}>
          <div className={styles.statsPanel}>
            <div className={styles.sectionIntro}>
              <h2>The financial challenges most businesses struggle to overcome</h2>
              <p>Even the most ambitious businesses and professionals face financial challenges that can hinder growth and stability.</p>
            </div>
            <div className={styles.statGrid}>
              {[
                ['service-benefit-1.svg', 'Irregular cash flow', '25%', 'Reduction in payment delays'],
                ['service-benefit-2.svg', 'Budget overruns', '2X', 'Improvement in investment'],
                ['service-benefit-3.svg', 'Unclear financial goals', '30%', 'Boosted business efficiency'],
              ].map(([icon, title, metric, outcome]) => (
                <article key={title}>
                  <div className={styles.statTop}>
                    <span className={styles.statIcon} aria-hidden="true"><img src={`${A}/${icon}`} alt="" /></span>
                    <h3>{title}</h3>
                  </div>
                  <div className={styles.statBottom}>
                    <strong>{metric}</strong>
                    <span>{outcome}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.cta}`}>
        <Reveal className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaLead}>
              <img src={`${A}/service-cta.jpg`} alt="Financial advisor" />
              <h2>We’re ready to build a custom solution around your specific needs.</h2>
            </div>
            <a href="/contact">Let&apos;s get started</a>
          </div>
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.steps}`}>
        <Reveal className={styles.container}>
          <div className={styles.sectionIntro}>
            <h2>How our financial planning works</h2>
            <p>Our process is designed to eliminate confusion and deliver results through expert analysis and full transparency.</p>
          </div>
          <div className={styles.stepsRows} role="list">
            <div className={styles.stepsRow}>
              <Step index={0} />
              <span className={styles.stepPlaceholder} aria-hidden="true" />
              <Step index={1} />
              <span className={styles.stepPlaceholder} aria-hidden="true" />
            </div>
            <div className={styles.stepsRow}>
              <Step index={2} />
              <span className={styles.stepPlaceholder} aria-hidden="true" />
              <Step index={3} />
            </div>
            <div className={styles.stepsRow}>
              <span className={styles.stepPlaceholder} aria-hidden="true" />
              <Step index={4} />
              <span className={styles.stepPlaceholder} aria-hidden="true" />
              <span className={styles.stepPlaceholder} aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.case}`}>
        <Reveal className={styles.container}>
          <article className={styles.caseCard}>
            <div className={styles.caseProof}>
              <img src={`${A}/service-client-logo.svg`} alt="Client logo" />
              <div><strong>30%</strong><span>Reduction in operating costs</span></div>
            </div>
            <div className={styles.caseMedia}>
              <img className={styles.caseImage} src={`${A}/case-study-restructuring.jpg`} alt="Retail finance case study" />
              <div><h2>Restructuring a retail chain’s finances</h2><em>Business Strategy</em></div>
            </div>
            <a className={styles.caseLink} href="/case-study/restructuring-a-retail-chain-s-finances">Read the case study <span aria-hidden="true">→</span></a>
          </article>
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.pricing}`}>
        <Reveal className={`${styles.container} ${styles.pricingContent}`}>
          <div className={styles.sectionIntro}>
            <h2>Choose the right package for your growth</h2>
            <div className={styles.billing}>
              <span className={styles.billingOption} data-active="true">Monthly</span>
              <span className={styles.billingOption}>Yearly</span>
              <span className={styles.billingSavings}>Save up to 30%</span>
            </div>
          </div>
          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article className={styles.plan} key={plan.name}>
                <div className={styles.planHead}>
                  <div className={styles.planTitle}>
                    <span><img src={`${A}/${plan.icon}`} alt="" /></span>
                    <h3>{plan.name}</h3>
                  </div>
                  <p>{plan.description}</p>
                </div>
                <strong className={styles.planPrice}>{plan.price}<small>/month</small></strong>
                <a href="/contact">Get started <span aria-hidden="true">→</span></a>
                <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className={styles.payroll}>
            <img src={`${A}/service-payroll.svg`} alt="" />
            <strong className={styles.payrollCopy}>Payroll Management – $139/month per 10 employees</strong>
            <a href="/contact">Contact to sales <span aria-hidden="true">→</span></a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
