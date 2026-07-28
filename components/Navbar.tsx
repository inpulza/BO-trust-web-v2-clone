'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Case Studies', href: '/case-study' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {menuOpen && <button className={styles.overlay} type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
      <div className={styles.inner}>
        <a className={styles.brand} href="/" aria-label="Home">
          <img src="/assets/00-cVbEbB4i59QHwEvVP0dX8ws.svg" alt="Brand" />
        </a>
        <div className={styles.links}>
          {links.map((link) => (
            <a key={link.label} className={isActive(link.href) ? styles.active : undefined} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
              {link.label}
            </a>
          ))}
        </div>
        <div className={styles.actions}>
          <a className={styles.cta} href="/contact">
            <span>Get started</span>
            <img src="/assets/01-tlGvIWioqeKmncOXpglcDGkJfPs.svg" alt="" aria-hidden="true" />
          </a>
          <button className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.mobileLinks} id="mobile-navigation">
          {links.map((link) => (
            <a key={link.label} className={isActive(link.href) ? styles.active : undefined} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
