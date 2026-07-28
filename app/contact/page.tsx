import type { Metadata } from 'next';
import ContactPage from '@/components/ContactPage';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Contact — Amplus',
  description: 'Contact Amplus for financial systems, compliance, and strategic business advice.',
};

export default function ContactRoute() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <Navbar />
      <main id="content"><ContactPage /></main>
      <Footer />
    </>
  );
}
