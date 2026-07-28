import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemsSolutions from '@/components/ProblemsSolutions';
import ConsultationCta from '@/components/ConsultationCta';
import FinancialSolutions from '@/components/FinancialSolutions';
import Industries from '@/components/Industries';
import FinancialClarity from '@/components/FinancialClarity';
import ContactNewsletter from '@/components/ContactNewsletter';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import BlogInsights from '@/components/BlogInsights';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <Navbar />
      <main id="content">
        <Hero />
        <ProblemsSolutions />
        <ConsultationCta />
        <FinancialSolutions />
        <Industries />
        <FinancialClarity />
        <ContactNewsletter />
        <CaseStudies />
        <Process />
        <Testimonials />
        <BlogInsights />
      </main>
      <Footer />
    </>
  );
}
