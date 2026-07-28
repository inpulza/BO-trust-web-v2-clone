'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Industries.module.css';

type Industry = {
  label: string;
  body: string;
  bullets: string[];
  mobileBullets?: string[];
  image: string;
  mobileImage?: string;
  icons: string[];
  kpiLead: string;
  kpiValue: string;
  kpiTail?: string;
};

const industries: Industry[] = [
  {
    label: 'Manufacturing',
    body: 'In an industry driven by margins and operational efficiency, we provide manufacturers with robust cost control strategies, process improvement insights, and support for navigating complex supply chains.',
    bullets: ['Optimize production costs and overhead', 'Implement lean financial processes', 'Navigate labor and environmental compliance'],
    image: '/assets/22-3vulsyppE1Ry2XsU4EA1tiQU.jpg',
    icons: ['/assets/23-IyUP5KuucYkbwiolB4uk9KPUSJ8.svg', '/assets/24-ATGEGm6O9tmz9DPm0XgrFMXqoUE.svg', '/assets/25-xkOP1U7WRmo25xXu7xJ2qpKvNWA.svg'],
    kpiLead: 'Achieved compliance support', kpiValue: 'ISO', kpiTail: '9001',
  },
  {
    label: 'Healthcare',
    body: 'We offer specialized accounting and consulting services designed to ease financial burdens, ensure compliance with healthcare laws, and help medical institutions run smoothly. From private clinics to multi-location hospitals.',
    bullets: ['Medical practice bookkeeping', 'Payroll & Staff Compensation', 'Revenue cycle management'],
    mobileBullets: ['Optimize production costs and overhead', 'Implement lean financial processes', 'Navigate labor and environmental compliance'],
    image: '/assets/jOLhWJTcJJtM1axFMQKL63OfNbU.jpg', mobileImage: '/assets/hQTTG9XWTAyP05I1w9Gl4dKWkKY.jpg',
    icons: ['/assets/fMPmyvEpK9FzKBYvzmq6aGKVdkw.svg', '/assets/JSc9E2n3qtfwh1FsGHjjQ2jgvQ.svg', '/assets/OGsfqGw4r6EtFFOb45YY9Zk2O9U.svg'],
    kpiLead: 'Practices saved an average of', kpiValue: '8 hours', kpiTail: '/month',
  },
  {
    label: 'Retail & E-commerce',
    body: 'Retailers face rapidly changing customer demands, inventory concerns, and digital competition. We assist with margin management, omnichannel inventory strategies, and sales tax compliance—helping you stay competitive and profitable.',
    bullets: ['Streamline inventory and supply chain', 'Plan seasonal cash flow and promotions'],
    mobileBullets: ['Plan seasonal cash flow and promotions', 'Streamline inventory and supply chain'],
    image: '/assets/Fh8kc7zXRrjznQXutVk38sZcYeM.jpg',
    icons: ['/assets/LAfft8BNEmNPqQ8ScQHCV5qWUZs.svg', '/assets/LzakBjIwZEZPydNa5pj2FZBOGA.svg'],
    kpiLead: 'Cut claim processing time from', kpiValue: '12 days to 3',
  },
  {
    label: 'IT & Tech startups',
    body: 'Fast-growing tech companies and startups need scalable financial systems and strategic planning from day one. We offer financial modeling, investor reporting, R&D tax support, and guidance on scaling sustainably.',
    bullets: ['Set up financial controls for scale', 'Support M&A or fundraising readiness'],
    image: '/assets/2fjTknxfrTL2NzeqwsphfvhWpCI.jpg',
    icons: ['/assets/FsmNgdINtj2wv3jL3d6CHLna8U.svg', '/assets/r5kYAwToV1QcgDrtkJBssLFNos8.svg'],
    kpiLead: 'Secured in investor funding', kpiValue: '$2.1 M',
  },
  {
    label: 'Hospitality & Restaurants',
    body: 'This industry demands agility and profitability amid seasonality and high overhead. We help hotels, restaurants, and travel companies manage costs, forecast occupancy or bookings, and maintain strong financial systems.',
    bullets: ['Create seasonal financial models', 'Control F&B and operational costs', 'Maximize cash flow in off-peak seasons'],
    image: '/assets/ftEqzs9EGUsg0ioZnrkIvpxfTnI.jpg',
    icons: ['/assets/afnk1BeDC3EUJ21Y5b0tti8Y8U.svg', '/assets/Spk3P72CXq6UefCkNuroQOvw64.svg', '/assets/LzakBjIwZEZPydNa5pj2FZBOGA.svg'],
    kpiLead: 'Practices saved an average of', kpiValue: '$300K', kpiTail: '/month',
  },
  {
    label: 'Education services',
    body: 'We support educational institutions and nonprofit organizations with solutions focused on transparency, compliance, and responsible financial stewardship.',
    bullets: ['Manage restricted/unrestricted funds', 'Meet audit and donor reporting standards'],
    image: '/assets/MPXt0DNGLvXNgLa37UiRWGwpSY.jpg',
    icons: ['/assets/sYkD6McKreuIIqTZDys2xk3cXQ.svg', '/assets/AtHVoqro7zE9HL40TkjMUlbZxc.svg'],
    kpiLead: 'Passed', kpiValue: '100%', kpiTail: 'of financial audits over 3 years',
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const item = industries[active];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % industries.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + industries.length) % industries.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = industries.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className={styles.section} aria-labelledby="industries-title">
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className={styles.top}>
            <h2 id="industries-title">Serving businesses across sectors</h2>
            <div className={styles.tabs} role="tablist" aria-label="Industries">
              {industries.map((industry, index) => (
                <button key={industry.label} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab"
                  id={`industry-tab-${index}`} aria-controls="industry-panel" aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1} className={styles.tab} onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}>{industry.label}</button>
              ))}
            </div>
          </header>
          <div className={styles.bottom} id="industry-panel" role="tabpanel" aria-labelledby={`industry-tab-${active}`} tabIndex={0}>
            <picture className={styles.imageWrap}>
              {item.mobileImage && <source media="(max-width: 767px)" srcSet={item.mobileImage} />}
              <img src={item.image} alt={`${item.label} industry`} />
            </picture>
            <div className={styles.details}>
              <div className={styles.copy}>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </div>
              <ul className={`${styles.bullets} ${item.mobileBullets ? styles.hasMobileBullets : ''}`}>
                {(item.mobileBullets ?? item.bullets).map((bullet, index) => (
                  <li className={item.mobileBullets ? styles.mobileBullet : undefined} key={`mobile-${bullet}`}>
                    <img src={item.icons[Math.min(index, item.icons.length - 1)]} alt="" aria-hidden="true" />{bullet}
                  </li>
                ))}
                {item.mobileBullets && item.bullets.map((bullet, index) => (
                  <li className={styles.desktopBullet} key={`desktop-${bullet}`}>
                    <img src={item.icons[Math.min(index, item.icons.length - 1)]} alt="" aria-hidden="true" />{bullet}
                  </li>
                ))}
              </ul>
              <div className={styles.kpi}>
                <span>{item.kpiLead}</span>
                <div><strong>{item.kpiValue}</strong>{item.kpiTail && <small>{item.kpiTail}</small>}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
