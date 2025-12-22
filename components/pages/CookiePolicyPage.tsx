import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';

interface CookiePolicyPageProps {
  onNavigate?: NavigateFn;
}

const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20 selection:bg-coral selection:text-white">
      <div className="container mx-auto px-6 pt-4 md:pt-6">
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate?.('home') },
            { label: 'Cookie Policy', active: true },
          ]}
          badge="Legal"
          title="Cookie Policy"
          description="What cookies are, which ones we use, and how you can control them."
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
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">What cookies are</h2>
              <p className="text-text-secondary">
                Cookies are small text files stored on your device. They help websites function properly and can be used for analytics and personalization.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">How we use cookies</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><span className="font-semibold text-text-primary">Essential</span>: required for core functionality (for example, remembering certain preferences).</li>
                <li><span className="font-semibold text-text-primary">Performance</span>: analytics to understand usage and improve UX (when enabled).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">How to control cookies</h2>
              <p className="text-text-secondary">
                You can usually control cookies via your browser settings. Blocking all cookies may impact site functionality.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Contact</h2>
              <p className="text-text-secondary">
                Questions: <a className="text-coral hover:underline" href="mailto:hello@castells.agency">hello@castells.agency</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
