import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Clock, Headphones } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';
import { Button } from './Button';

interface Guarantee {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface RiskReversalProps {
  guarantees?: Guarantee[];
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

const DEFAULT_GUARANTEES: Guarantee[] = [
  {
    icon: Shield,
    title: 'Performance-Based Pricing',
    description: 'We align our success with yours. No long-term contracts, just results.'
  },
  {
    icon: CheckCircle2,
    title: 'Transparent Reporting',
    description: 'Real-time access to all campaign data. No secrets, no surprises.'
  },
  {
    icon: Clock,
    title: 'Free Strategy Session',
    description: 'Get a free consultation to discuss your goals with no obligation.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Your dedicated team is always available to answer questions and optimize.'
  },
];

const RiskReversal: React.FC<RiskReversalProps> = React.memo(({
  guarantees = DEFAULT_GUARANTEES,
  title = 'No risk, all reward',
    subtitle = "We're confident in our ability to deliver results. Here's how we reduce your risk.",
  ctaText = 'Start Your Free Consultation',
  onCtaClick,
  className = ''
}) => {
  return (
    <section className={`py-12 md:py-16 bg-ivory relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Guarantees
            </span>
          </div>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-text-primary mb-3"
            delay={0.1}
          >
            {title}
          </AnimatedHeading>
          <p className="text-lg text-text-secondary leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-surface rounded-[2rem] p-8 hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center mb-4 group-hover:bg-coral dark:group-hover:bg-coral transition-colors">
                  <Icon className="w-6 h-6 text-coral group-hover:text-white dark:group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
                  {guarantee.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {guarantee.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {onCtaClick && (
          <div className="text-center">
            <Button
              onClick={onCtaClick}
              size="lg"
              variant="primary"
              className="group"
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

RiskReversal.displayName = 'RiskReversal';

export default RiskReversal;

