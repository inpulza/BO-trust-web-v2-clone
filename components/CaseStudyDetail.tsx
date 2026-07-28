'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './CaseStudyDetail.module.css';

const A = '/assets';

function Reveal({ children, className, distance = 20 }: { children: ReactNode; className?: string; distance?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: distance }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7, ease: [.44, 0, .56, 1] }}>{children}</motion.div>;
}

const metadata = [
  ['Client ', 'Multi-location retail'],
  ['Company Size', '20 outlets, 300+ employees'],
  ['Regions Covered', 'Tier 1 & Tier 2 USA cities'],
  ['Services provided', 'Cost optimization, financial reporting overhaul, vendor strategy'],
] as const;
const results = [['28%', 'Archived cost reduction'], ['$78', 'Saved tax penalties'], ['8%', 'Improvement in margin']] as const;
const related = [
  { category: 'Business Strategy', title: 'Restructuring a retail chain’s finances', href: '/case-study/restructuring-a-retail-chain-s-finances', image: 'case-detail-related-restructuring.jpg', metrics: [['30%', 'Reduction in operating costs'], ['$1.2K', 'Monthly savings']] },
  { category: 'Tax Strategy', title: 'Tax planning for a tech startup', href: '/case-study/tax-planning-for-a-tech-startup', image: 'case-detail-related-tax.jpg', metrics: [['$85K', 'R&D tax credits claimed'], ['100%', 'Compliance across']] },
] as const;

export default function CaseStudyDetail() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <img className={styles.heroImage} src={`${A}/case-detail-hero.jpg`} alt="Multi-location retail storefront" />
          <article className={styles.heroCopy}>
            <div><span>Automated POS-integrated</span><h1>Cutting costs for a multi-location retail chain</h1><p>Implementing cost-saving strategies across all outlets to boost efficiency and improve overall profitability.</p></div>
            <img src={`${A}/case-detail-client-logo.svg`} alt="OSLO" />
          </article>
          <div className={styles.metadata}>{metadata.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}</div>
        </div>
      </section>

      <section className={styles.editorial}>
        <article className={styles.overview}><h2>Overview</h2><p>When a fast-growing retail brand operating over 20 stores across India approached Amplus Consulting, they were struggling with rising operational costs, fragmented vendor management, and little control over store-wise financial performance. While their expansion had been rapid, it came at the cost of visibility, efficiency, and profitability.</p><p>Through a data-driven, strategic consulting approach, Amplus helped the client centralize key operations, restructure procurement, and implement real-time financial dashboards — all while maintaining business continuity across every retail location.</p><p>We uncovered widespread inefficiencies in procurement, non-standardized expense tracking, and overstaffed locations that were underperforming.</p></article>
        <Reveal className={styles.unit}><h3>Challenges</h3><p>Despite rapid growth and a strong market presence, the retail chain faced mounting operational expenses that threatened its long-term profitability. With over 20 store locations spread across multiple cities, the business struggled to maintain financial visibility and consistency in cost control.</p><ul><li>Lack of market familiarity and local partners</li><li>Navigating strict financial regulations</li><li>Building trust in a competitive and saturated market</li></ul><img className={styles.challengeImage} src={`${A}/case-detail-challenges.jpg`} alt="OBVIOUS retail storefront" /></Reveal>
        <Reveal className={styles.unit}><h3>Solutions</h3><p>To address the cost inefficiencies and operational inconsistencies across the client’s retail network, Amplus Consulting implemented a series of strategic, data-driven solutions tailored specifically for multi-location retail management:</p><div className={styles.solutions}><div><strong>Centralized financial reporting system</strong><p>We replaced fragmented accounting processes with a unified reporting platform</p></div><div><strong>Vendor consolidation and contract Re-negotiation</strong><p>The team conducted a full vendor audit and consolidated multiple local suppliers into fewer national-level contracts</p></div></div></Reveal>
        <Reveal className={styles.unit}><h3>Results</h3><p>Highlight measurable improvements and business impact, with data.</p><div className={styles.results}>{results.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></Reveal>
        <Reveal className={styles.testimonial}><div><img src={`${A}/case-detail-avatar.jpg`} alt="Ethan Walker" /><span><strong>Ethan Walker</strong><small>Retail Client, Operations Director</small></span></div><blockquote>Working with Amplus Consulting has been one of the most valuable strategic decisions we’ve made as an organization. Managing over 20 retail locations had become increasingly complex — each store was operating in its own silo</blockquote></Reveal>
      </section>

      <section className={styles.related}>
        <Reveal className={styles.relatedHead}><h2>Other case studies</h2><a href="/case-study">See all case studies</a></Reveal>
        <div className={styles.relatedGrid}>{related.map((study) => <motion.a className={styles.relatedCard} href={study.href} key={study.href} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .4 }}><span className={styles.relatedMedia}><img src={`${A}/${study.image}`} alt="" /></span><span className={styles.relatedCopy}><span><em>{study.category}</em><h3>{study.title}</h3></span><span>{study.metrics.map(([value,label]) => <span className={styles.relatedMetric} key={label}><strong>{value}</strong><span>{label}</span></span>)}</span></span></motion.a>)}</div>
      </section>
    </main>
  );
}
