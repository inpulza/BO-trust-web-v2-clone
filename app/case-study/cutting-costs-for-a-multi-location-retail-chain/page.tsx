import type { Metadata } from 'next';
import CaseStudyDetail from '@/components/CaseStudyDetail';
import ContactNewsletter from '@/components/ContactNewsletter';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Cutting Costs for a Multi-Location Retail Chain — Amplus',
  description: 'How Amplus implemented cost-saving strategies across a multi-location retail network.',
};

export default function RetailCostCaseStudy() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <Navbar />
      <div id="content"><CaseStudyDetail /></div>
      <ContactNewsletter />
      <Footer />
    </>
  );
}
