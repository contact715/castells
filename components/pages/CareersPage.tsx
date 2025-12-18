import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';
import AnimatedHeading from '../ui/AnimatedHeading';

interface CareersPageProps {
  onBack: () => void;
  onNavigate: NavigateFn;
}

const OPENINGS = [
  { title: "Senior Performance Marketer", dept: "Growth", loc: "Remote / LA", type: "Full-Time" },
  { title: "Creative Strategist", dept: "Creative", loc: "Santa Monica", type: "Full-Time" },
  { title: "React/Next.js Developer", dept: "Engineering", loc: "Remote", type: "Contract" },
  { title: "Account Executive", dept: "Sales", loc: "New York", type: "Full-Time" },
];

import SEO from '../ui/SEO';

const CareersPage: React.FC<CareersPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-32 pb-20 animate-in fade-in duration-500">
      <SEO title="Careers | Castells Agency" description="Join the elite. We hire owners, not employees." />
      <div className="container mx-auto px-6">

        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate('home') },
            { label: 'Careers', active: true }
          ]}
          badge="Join the Elite"
          title="Build the Future of Growth."
          description="We don't hire employees. We hire owners. If you're obsessed with excellence and allergic to average, you belong here."
          onNavigate={onNavigate}
        />

        <div className="grid grid-cols-1 gap-4 max-w-5xl">
          {OPENINGS.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              className="group bg-white dark:bg-surface p-8 rounded-2xl border border-black/5 dark:border-white/10 hover:border-coral/50 dark:hover:border-coral/40 transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-text-primary group-hover:text-coral transition-colors">{job.title}</h3>
                <div className="flex gap-4 mt-2 text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/60">
                  <span>{job.dept}</span>
                  <span className="w-px h-3 bg-black/20 dark:bg-white/20 self-center" />
                  <span>{job.loc}</span>
                  <span className="w-px h-3 bg-black/20 self-center" />
                  <span>{job.type}</span>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-primary group-hover:translate-x-1 transition-transform">
                  Apply Now <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 p-12 bg-white dark:bg-surface border border-black/5 dark:border-white/10 rounded-3xl text-center shadow-lg"
        >
          <AnimatedHeading
            as="h3"
            className="font-display text-3xl font-semibold mb-4 text-text-primary dark:text-white"
            delay={1.1}
          >
            Don't see your role?
          </AnimatedHeading>
          <p className="text-text-secondary dark:text-white/70 mb-8">We are always looking for top talent. Send us your portfolio.</p>
          <Button size="md" variant="secondary">
            Email Recruiting
          </Button>
        </motion.div>

      </div>
    </div>
  );
};

export default CareersPage;
