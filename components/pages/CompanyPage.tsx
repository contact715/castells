import React from 'react';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import { motion } from 'framer-motion';
import { Users, Flag, Briefcase, ArrowRight } from 'lucide-react';
import AnimatedHeading from '../ui/AnimatedHeading';

interface CompanyPageProps {
  onBack?: () => void;
  onNavigate?: (page: PageView, data?: any) => void;
}

const COMPANY_SECTIONS = [
  {
    id: 'about',
    title: 'About Us',
    description: 'Learn about our mission, values, and the team behind Castells.',
    icon: Flag,
    link: 'about',
    linkText: 'Learn More',
  },
  {
    id: 'team',
    title: 'Our Team',
    description: 'Meet the talented professionals driving our success.',
    icon: Users,
    link: 'team',
    linkText: 'Meet the Team',
  },
  {
    id: 'careers',
    title: 'Careers',
    description: 'Join the elite. We hire owners, not employees.',
    icon: Briefcase,
    link: 'careers',
    linkText: 'View Openings',
  },
];

const CompanyPage: React.FC<CompanyPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate?.('home') },
            { label: 'Company', active: true },
          ]}
          badge="Company"
          title="We are the Anti-Agency."
          description="Obsessed with revenue, not vanity metrics. Built for founders who think like owners."
          onNavigate={onNavigate}
        />

        {/* Company Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {COMPANY_SECTIONS.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => onNavigate?.(section.link as PageView)}
                className="bg-white rounded-2xl p-8 border border-black/5 hover:border-coral/50 transition-all duration-300 hover:shadow-lg cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-6 group-hover:bg-coral transition-colors">
                  <Icon className="w-6 h-6 text-coral" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3 text-text-primary">
                  {section.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {section.description}
                </p>
                <div className="flex items-center gap-2 text-coral font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                  <span>{section.linkText}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl p-12 border border-black/5 shadow-lg"
        >
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl font-semibold mb-6 text-text-primary"
            delay={0.5}
          >
            Built for Growth
          </AnimatedHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-display text-xl font-semibold mb-3 text-text-primary">Our Mission</h4>
              <p className="text-text-secondary leading-relaxed">
                We founded Castells in 2012 with a simple thesis: Most agencies are burning their clients' money on vanity metrics. We built an infrastructure obsessed with one thing: Revenue.
              </p>
            </div>
            <div>
              <h4 className="font-display text-xl font-semibold mb-3 text-text-primary">Our Approach</h4>
              <p className="text-text-secondary leading-relaxed">
                We don't guess. We test. Every decision is backed by data, not gut feelings. Money loves speed. We launch campaigns in days, not months.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyPage;


