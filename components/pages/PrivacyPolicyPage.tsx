import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';

interface PrivacyPolicyPageProps {
  onNavigate?: NavigateFn;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20 selection:bg-coral selection:text-white">
      <div className="container mx-auto px-6 pt-4 md:pt-6">
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
          <div className="bg-white dark:bg-white/5  rounded-[2rem] p-8 md:p-12 space-y-10">
            <div className="text-sm text-text-secondary">
              <p><span className="font-semibold text-text-primary">Last updated:</span> February 7, 2026</p>
              <p className="mt-2">This Privacy Policy describes how Castells Agency LLC ("Castells," "we," "us," or "our") collects, uses, and protects your personal information when you visit our website, submit forms, or interact with our services, including SMS/text messaging communications.</p>
            </div>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">What we collect</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><span className="font-semibold text-text-primary">Contact data</span>: name, email address, phone number, and message details you submit through our website forms.</li>
                <li><span className="font-semibold text-text-primary">Business data</span>: website URL, company name, and marketing context you share with us.</li>
                <li><span className="font-semibold text-text-primary">Usage data</span>: basic analytics such as page views, referrers, and device/browser info (where enabled).</li>
                <li><span className="font-semibold text-text-primary">SMS consent data</span>: records of your consent to receive SMS/text messages from us, including the date, time, and method of consent.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">How we use information</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Respond to your requests and provide proposals, audits, or consultations.</li>
                <li>Send you service updates, appointment reminders, and project status notifications via email or SMS (with your consent).</li>
                <li>Send occasional promotional offers related to our digital marketing services (with your consent).</li>
                <li>Improve site performance, content, and conversion experience.</li>
                <li>Security, fraud prevention, and abuse monitoring.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">SMS/Text Messaging</h2>
              <p className="text-text-secondary">
                By providing your phone number and checking the SMS consent checkbox on our contact form, you agree to receive text messages from Castells Agency LLC. These messages may include:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Service updates and appointment reminders</li>
                <li>Project status notifications</li>
                <li>Occasional promotional offers related to our digital marketing services</li>
              </ul>
              <p className="text-text-secondary mt-3">
                <span className="font-semibold text-text-primary">Message frequency:</span> Message frequency varies. Typically 1–5 messages per month depending on active projects and service activity.
              </p>
              <p className="text-text-secondary">
                <span className="font-semibold text-text-primary">Message and data rates may apply.</span> Your carrier's standard messaging and data rates may apply to messages you receive from us.
              </p>
              <p className="text-text-secondary">
                <span className="font-semibold text-text-primary">Opt-out:</span> You can opt out of SMS messages at any time by replying <span className="font-mono font-semibold text-text-primary">STOP</span> to any message you receive from us. After opting out, you will receive a one-time confirmation message and will no longer receive text messages from us.
              </p>
              <p className="text-text-secondary">
                <span className="font-semibold text-text-primary">Help:</span> For help with our SMS service, reply <span className="font-mono font-semibold text-text-primary">HELP</span> to any message or email us at <a className="text-coral hover:underline" href="mailto:hello@castells.agency">hello@castells.agency</a>.
              </p>
              <p className="text-text-secondary">
                <span className="font-semibold text-text-primary">No mobile information sharing:</span> We do not sell, rent, loan, trade, lease, or otherwise transfer for profit any phone numbers or personal information collected through our SMS program to any third party.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Sharing</h2>
              <p className="text-text-secondary">
                We do not sell your personal data. We may share data with vetted service providers (hosting, analytics, email, CRM, SMS delivery platforms) strictly to operate and improve our services. These providers are contractually bound to protect your information and use it only for the purposes we specify.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Data retention</h2>
              <p className="text-text-secondary">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. SMS consent records are retained for the duration of your relationship with us and for a reasonable period thereafter to comply with legal obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Your choices</h2>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Request access, correction, or deletion of your personal information at any time.</li>
                <li>Opt out of SMS messages by replying STOP to any text message.</li>
                <li>Opt out of marketing emails by clicking the unsubscribe link in any email.</li>
                <li>Opt out of non-essential tracking and cookies where applicable.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">Contact</h2>
              <p className="text-text-secondary">
                For privacy requests or questions about this policy, email <a className="text-coral hover:underline" href="mailto:hello@castells.agency">hello@castells.agency</a> or write to us at: Castells Agency LLC, Santa Monica, CA 90401.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
