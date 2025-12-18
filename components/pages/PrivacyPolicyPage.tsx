import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';

interface PrivacyPolicyPageProps {
  onNavigate?: NavigateFn;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-32 pb-20 selection:bg-coral selection:text-white">
      <div className="container mx-auto px-6">
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate?.('home') },
            { label: 'Privacy Policy', active: true },
          ]}
          badge="Legal"
          title="Privacy Policy"
          description="How we collect, use, and protect your information when you use Castells."
          onNavigate={onNavigate}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-12 space-y-10">
            <div className="text-sm text-text-secondary">
              <p><span className="font-semibold text-text-primary">Last updated:</span> Dec 17, 2025</p>
              <p className="mt-2">This policy is a practical overview for our website and inbound forms. If you need a signed DPA or vendor list, contact us.</p>
            </div>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">What we collect</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><span className="font-semibold text-text-primary">Contact data</span>: name, email, phone, and message details you submit.</li>
                <li><span className="font-semibold text-text-primary">Business data</span>: website URL, company name, and marketing context you share.</li>
                <li><span className="font-semibold text-text-primary">Usage data</span>: basic analytics such as page views, referrers, and device/browser info (where enabled).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">How we use information</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Respond to your requests and provide proposals or audits.</li>
                <li>Improve site performance, content, and conversion experience.</li>
                <li>Security, fraud prevention, and abuse monitoring.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Sharing</h2>
              <p className="text-text-secondary">
                We do not sell your personal data. We may share data with vetted service providers (hosting, analytics, email, CRM) strictly to operate and improve our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Your choices</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Request access, correction, or deletion of your information.</li>
                <li>Opt out of non-essential tracking where applicable.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Contact</h2>
              <p className="text-text-secondary">
                For privacy requests, email <a className="text-coral hover:underline" href="mailto:hello@castells.agency">hello@castells.agency</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
