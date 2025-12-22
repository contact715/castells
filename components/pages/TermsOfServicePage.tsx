import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';

interface TermsOfServicePageProps {
  onNavigate?: NavigateFn;
}

const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20 selection:bg-coral selection:text-white">
      <div className="container mx-auto px-6 pt-4 md:pt-6">
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate?.('home') },
            { label: 'Terms of Service', active: true },
          ]}
          badge="Legal"
          title="Terms of Service"
          description="The rules for using our website and submitting information through our forms."
          onNavigate={onNavigate}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <div className="bg-white dark:bg-white/5  rounded-[2rem] p-8 md:p-12 space-y-10">
            <div className="text-sm text-text-secondary">
              <p><span className="font-semibold text-text-primary">Last updated:</span> Dec 17, 2025</p>
            </div>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">1. Using the site</h2>
              <p className="text-text-secondary">
                You may browse our site and submit inquiries. You agree not to misuse the site, attempt to disrupt services, or submit unlawful content.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">2. No guarantees</h2>
              <p className="text-text-secondary">
                Any examples, metrics, or case studies are illustrative. Marketing results vary based on market conditions, budget, competition, and many other factors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">3. Intellectual property</h2>
              <p className="text-text-secondary">
                Site content (text, visuals, code, branding) belongs to Castells or its licensors and may not be copied or reused without permission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">4. Links & third parties</h2>
              <p className="text-text-secondary">
                We may link to third-party websites or tools. We are not responsible for their content or practices.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">5. Contact</h2>
              <p className="text-text-secondary">
                Questions about these terms: <a className="text-coral hover:underline" href="mailto:hello@castells.agency">hello@castells.agency</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
