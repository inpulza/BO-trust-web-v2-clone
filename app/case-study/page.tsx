import type { Metadata } from 'next';
import CaseStudyIndex from '@/components/CaseStudyIndex';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Case Studies — Amplus',
  description: 'Measured outcomes from Amplus accounting and business strategy engagements.',
};

export default function CaseStudyRoute() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <Navbar />
      <div id="content"><CaseStudyIndex /></div>
      <Footer />
    </>
  );
}
