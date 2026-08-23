import React from 'react';
import { m as motion } from 'framer-motion';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';

interface TermsOfServicePageProps {
  onNavigate?: NavigateFn;
}

const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20 selection:bg-accent selection:text-white">
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
          <div className="bg-white dark:bg-white/5  rounded-card p-8 md:p-12 space-y-10">
            <div className="text-sm text-text-secondary">
              <p><span className="font-semibold text-text-primary">Last updated:</span> February 7, 2026</p>
              <p className="mt-2">These Terms of Service ("Terms") govern your use of the website and services provided by Castells Media Inc ("Castells," "we," "us," or "our"). By accessing our website or using our services, including receiving SMS/text messages, you agree to these Terms.</p>
            </div>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">1. Using the site</h2>
              <p className="text-text-secondary">
                You may browse our site and submit inquiries through our contact forms. You agree not to misuse the site, attempt to disrupt services, or submit unlawful content. You must be at least 18 years of age to use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">2. SMS/Text messaging terms</h2>
              <p className="text-text-secondary">
                By opting in to receive SMS/text messages from Castells Media Inc, you agree to the following:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><span className="font-semibold text-text-primary">Consent:</span> You consent to receive text messages from Castells Media Inc at the phone number you provided. Consent is not a condition of any purchase.</li>
                <li><span className="font-semibold text-text-primary">Types of messages:</span> You may receive service updates, appointment reminders, project notifications, and occasional promotional offers related to our digital marketing services.</li>
                <li><span className="font-semibold text-text-primary">Message frequency:</span> Message frequency varies. Typically 1–5 messages per month.</li>
                <li><span className="font-semibold text-text-primary">Costs:</span> Message and data rates may apply. You are responsible for any charges from your mobile carrier.</li>
                <li><span className="font-semibold text-text-primary">Opt-out:</span> You may opt out at any time by replying <span className="font-mono font-semibold text-text-primary">STOP</span> to any message. You will receive a confirmation and no further messages.</li>
                <li><span className="font-semibold text-text-primary">Help:</span> Reply <span className="font-mono font-semibold text-text-primary">HELP</span> for assistance or email <a className="text-accent-text hover:underline" href="mailto:contact@castells.media">contact@castells.media</a>.</li>
                <li><span className="font-semibold text-text-primary">Carriers supported:</span> Compatible with major US carriers including AT&T, T-Mobile, Verizon, and others. Carrier participation may vary.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">3. No guarantees</h2>
              <p className="text-text-secondary">
                Any examples, metrics, or case studies are illustrative. Marketing results vary based on market conditions, budget, competition, and many other factors. Past results do not guarantee future performance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">4. Intellectual property</h2>
              <p className="text-text-secondary">
                Site content (text, visuals, code, branding) belongs to Castells Media Inc or its licensors and may not be copied, reproduced, or reused without prior written permission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">5. Links & third parties</h2>
              <p className="text-text-secondary">
                We may link to third-party websites or tools. We are not responsible for their content, privacy practices, or terms of service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">6. Privacy</h2>
              <p className="text-text-secondary">
                Your use of our services is also governed by our{' '}
                <button
                  type="button"
                  onClick={() => onNavigate?.('privacy-policy')}
                  className="text-accent-text hover:underline cursor-pointer"
                >
                  Privacy Policy
                </button>
                , which describes how we collect, use, and protect your personal information, including data collected through our SMS program.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">7. Changes to these terms</h2>
              <p className="text-text-secondary">
                We may update these Terms from time to time. Continued use of our website or services after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">8. Contact</h2>
              <p className="text-text-secondary">
                Questions about these terms: <a className="text-accent-text hover:underline" href="mailto:contact@castells.media">contact@castells.media</a>
              </p>
              <p className="text-text-secondary">
                Castells Media Inc, Roseville, CA 90401
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
