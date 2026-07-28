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

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: .001, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .6, ease: [.44,0,.56,1] }}>{children}</motion.div>;
}

export default function ServiceStaticPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.section} ${styles.hero}`}><div className={styles.container}><div className={styles.heroCopy}><h1>Strategic financial planning</h1><p>Strategic financial guidance to align business goals, improve performance, and create sustainable long-term growth plans.</p></div><img src={`${A}/service-hero.jpg`} alt="Strategic financial planning session" /></div></section>

      <section className={`${styles.section} ${styles.about}`}><div className={`${styles.container} ${styles.aboutGrid}`}><img src={`${A}/service-about.jpg`} alt="Financial strategy consultation" /><div><h2>Where financial expertise and strategic insight come together</h2><p>From startups navigating compliance to enterprises seeking operational efficiency, we work hand-in-hand with organizations to craft tailored, data-driven strategies that deliver measurable value.</p><p>With deep industry experience, advanced financial modeling, and a personalized approach</p><a href="/contact">Book a free consulation</a><h3>What you’ll gain:</h3><ul><li><img src={`${A}/service-benefit-1.svg`} alt="" />Tailored financial strategy</li><li><img src={`${A}/service-benefit-2.svg`} alt="" />Clear forecasting &amp; budgeting</li><li><img src={`${A}/service-benefit-3.svg`} alt="" />Risk management insights</li></ul></div></div></section>

      <section className={`${styles.section} ${styles.stats}`}><Reveal className={styles.container}><div className={styles.sectionIntro}><h2>The financial challenges most businesses struggle to overcome</h2><p>Even the most ambitious businesses and professionals face financial challenges that can hinder growth and stability.</p></div><div className={styles.statGrid}><article><h3>Irregular cash flow</h3><strong>25%</strong><span>Reduction in payment delays</span></article><article><h3>Budget overruns</h3><strong>2X</strong><span>Improvement in investment</span></article><article><h3>Unclear financial goals</h3><strong>30%</strong><span>Boosted business efficiency</span></article></div></Reveal></section>

      <section className={`${styles.section} ${styles.cta}`}><Reveal className={`${styles.container} ${styles.ctaCard}`}><img src={`${A}/service-cta.jpg`} alt="Financial advisor" /><h2>We’re ready to build a custom solution around your specific needs.</h2><a href="/contact">Let&apos;s get started</a></Reveal></section>

      <section className={`${styles.section} ${styles.steps}`}><Reveal className={styles.container}><div className={styles.sectionIntro}><h2>How our financial planning works</h2><p>Our process is designed to eliminate confusion and deliver results through expert analysis and full transparency.</p></div><ol>{steps.map((step,index)=><li key={step}><span>{index+1}</span><strong>{step}</strong></li>)}</ol></Reveal></section>

      <section className={`${styles.section} ${styles.case}`}><Reveal className={`${styles.container} ${styles.caseCard}`}><img className={styles.caseImage} src={`${A}/case-study-restructuring.jpg`} alt="Retail finance case study" /><div><img src={`${A}/service-client-logo.svg`} alt="Client logo" /><strong>30%</strong><span>Reduction in operating costs</span><h2>Restructuring a retail chain’s finances</h2><em>Business Strategy</em><a href="/case-study/restructuring-a-retail-chain-s-finances">Read the case study</a></div></Reveal></section>

      <section className={`${styles.section} ${styles.pricing}`}><Reveal className={styles.container}><div className={styles.sectionIntro}><h2>Choose the right package for your growth</h2><div className={styles.billing} role="radiogroup" aria-label="Billing period"><button type="button" role="radio" aria-checked="true">Monthly</button><button type="button" role="radio" aria-checked="false">Yearly</button><span>Save up to 30%</span></div></div><div className={styles.planGrid}>{plans.map((plan)=><article className={styles.plan} key={plan.name}><div className={styles.planHead}><img src={`${A}/${plan.icon}`} alt="" /><h3>{plan.name}</h3><p>{plan.description}</p><strong>{plan.price}<small>/month</small></strong><a href="/contact">Get started</a></div><ul>{plan.features.map(feature=><li key={feature}>{feature}</li>)}</ul></article>)}</div><div className={styles.payroll}><img src={`${A}/service-payroll.svg`} alt="" /><strong>Payroll Management – $139/month per 10 employees</strong><a href="/contact">Contact to sales</a></div></Reveal></section>
    </main>
  );
}
