import type { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';
import ContactNewsletter from '@/components/ContactNewsletter';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'About — Amplus',
  description: 'Financial clarity, precise accounting, and strategic partnership for confident growth.',
};

export default function AboutRoute() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <Navbar />
      <main id="content">
        <AboutPage />
        <ContactNewsletter />
      </main>
      <Footer />
    </>
  );
}
