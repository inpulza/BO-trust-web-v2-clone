'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const ASSETS = '/assets';
const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: '58-AhxGAjEIeNgao8CDybSCqy1D0dA.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: '59-6CtIV4pHXddsj7QrRk5VqzBcKo.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: '60-4J3dhLFYl5Fg3bl89IEXEVRZUY.svg' },
];
const pages = [
  ['Home', '/'], ['About', '/about'], ['Case Studies', '/case-study'],
  ['Service Static', '/service-static'], ['Blog', '/blog'],
  ['Privacy Policy', '/legal-pages/privacy-policy'], ['404', '/404'],
];

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.contactBand}
          initial={reduceMotion ? false : { opacity: 0, y: 11 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>How can we help?</h2>
          <nav className={styles.contacts} aria-label="Contacto">
            <a href="/contact">Contact</a>
            <a href="mailto:support@yourbrand.com">support@yourbrand.com</a>
            <a href="tel:+1 202 555 0147">+1 202 555 0147</a>
          </nav>
          <div className={styles.socials}>
            {socials.map((social) => (
              <a href={social.href} aria-label={social.label} key={social.label}>
                <img src={`${ASSETS}/${social.icon}`} alt="" />
              </a>
            ))}
          </div>
        </motion.div>
        <div className={styles.lower}>
          <motion.div
            className={styles.pagesCard}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className={styles.logo} href="/" aria-label="Amplus, inicio">
              <img src={`${ASSETS}/00-cVbEbB4i59QHwEvVP0dX8ws.svg`} alt="Amplus" />
            </a>
            <div className={styles.pages}>
              <h3>Pages</h3>
              <nav aria-label="Páginas">
                {pages.map(([label, href]) => <a className={isActive(href) ? styles.active : undefined} href={href} aria-current={isActive(href) ? 'page' : undefined} key={label}>{label}</a>)}
              </nav>
            </div>
          </motion.div>
          <motion.div
            className={styles.ctaCard}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.action}>
              <h3>Gain full control over your accounting and strategy</h3>
              <a className={styles.cta} href="/contact">Let&apos;s get started<img src={`${ASSETS}/01-tlGvIWioqeKmncOXpglcDGkJfPs.svg`} alt="" /></a>
            </div>
            <a className={styles.address} href="https://www.google.com/maps">
              <img className={styles.location} src={`${ASSETS}/61-kaPWZ8059IZy03mcz8oZP4yANyk.jpg`} alt="Ubicación de Your Consulting Co. en New York" />
              <span><img src={`${ASSETS}/62-yi2b1cppjEaLaPXb9ekHOCW1T0A.svg`} alt="" />Your Consulting Co. 120 business avenue, suite 500, New York, NY 10001, USA</span>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
