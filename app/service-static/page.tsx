import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ServiceStaticPage from '@/components/ServiceStaticPage';

export const metadata: Metadata = {
  title: 'Strategic Financial Planning — Amplus',
  description: 'Strategic financial guidance, planning process, case study, and service packages.',
};

export default function ServiceStaticRoute() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <Navbar />
      <div id="content"><ServiceStaticPage /></div>
      <Footer />
    </>
  );
}
