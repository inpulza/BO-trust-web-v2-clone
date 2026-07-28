export type CaseStudy = {
  category: string;
  title: string;
  href: string;
  image: string;
  metrics: readonly [readonly [string, string], readonly [string, string]];
};

export const caseStudies: readonly CaseStudy[] = [
  { category: 'Business Strategy', title: 'Restructuring a retail chain’s finances', href: '/case-study/restructuring-a-retail-chain-s-finances', image: '/assets/case-study-restructuring.jpg', metrics: [['30%', 'Reduction in operating costs'], ['$1.2K', 'Monthly savings']] },
  { category: 'Automated POS-integrated', title: 'Cutting costs for a multi-location retail chain', href: '/case-study/cutting-costs-for-a-multi-location-retail-chain', image: '/assets/case-study-cost-cutting.jpg', metrics: [['28%', 'Archived cost reduction'], ['$78', 'Saved tax penalties']] },
  { category: 'Tax Strategy', title: 'Tax planning for a tech startup', href: '/case-study/tax-planning-for-a-tech-startup', image: '/assets/case-study-tax-planning.jpg', metrics: [['$85K', 'R&D tax credits claimed'], ['100%', 'Compliance across']] },
  { category: 'Process Optimization', title: 'Operational strategy for a manufacturing firm', href: '/case-study/operational-strategy-for-a-manufacturing-firm', image: '/assets/case-study-process-optimization.jpg', metrics: [['22%', 'Increase in production'], ['18%', 'Reduction in costs']] },
  { category: 'Mergers & Acquisitions', title: 'M&A due diligence for a logistics client', href: '/case-study/m-a-due-diligence-for-a-logistics-client', image: '/assets/case-study-ma.jpg', metrics: [['$1.4M', 'Overstated asset value'], ['100%', 'Compliance gaps uncovered']] },
  { category: 'Operational Efficiency', title: 'Manufacturing efficiency boost', href: '/case-study/manufacturing-efficiency-boost', image: '/assets/case-study-manufacturing.jpg', metrics: [['28%', 'Increase in production'], ['40%', 'Reduction in downtime']] },
  { category: 'Accounting Infrastructure', title: 'Startup financial structure setup', href: '/case-study/startup-financial-structure-setup', image: '/assets/case-study-startup.jpg', metrics: [['100%', 'Investor report'], ['50K', 'Full forecasting model']] },
];
