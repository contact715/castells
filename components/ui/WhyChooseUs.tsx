import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface ComparisonItem {
  feature: string;
  us: string | boolean;
  competitors: string | boolean;
}

interface WhyChooseUsProps {
  comparisons?: ComparisonItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_COMPARISONS: ComparisonItem[] = [
  {
    feature: 'Approach',
    us: 'Data-driven, revenue-focused',
    competitors: 'Vanity metrics, guesswork'
  },
  {
    feature: 'Reporting',
    us: 'Real-time dashboards, transparent',
    competitors: 'Monthly PDFs, limited access'
  },
  {
    feature: 'Team',
    us: 'Dedicated growth experts',
    competitors: 'Revolving account managers'
  },
  {
    feature: 'Results',
    us: '3.2x average ROAS, $50M+ generated',
    competitors: 'Promises, no guarantees'
  },
  {
    feature: 'Pricing',
    us: 'Performance-based, transparent',
    competitors: 'Hidden fees, long contracts'
  },
  {
    feature: 'Support',
    us: '24/7 access, responsive',
    competitors: 'Business hours only'
  },
];

const WhyChooseUs: React.FC<WhyChooseUsProps> = React.memo(({
  comparisons = DEFAULT_COMPARISONS,
  title = 'Why choose Castells',
  subtitle = 'We're different from traditional agencies. Here's how.',
  className = ''
}) => {
  return (
    <section className={`py-12 md:py-16 bg-white dark:bg-surface relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Comparison
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

        <div className="bg-ivory dark:bg-[#191919] rounded-[2rem] p-8 md:p-12 overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-4">
              <div className="font-display text-lg font-semibold text-text-primary">
                Feature
              </div>
              <div className="font-display text-lg font-semibold text-coral text-center">
                Castells
              </div>
              <div className="font-display text-lg font-semibold text-text-secondary text-center">
                Others
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="grid grid-cols-3 gap-4 py-4"
                >
                  <div className="font-semibold text-text-primary">
                    {item.feature}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {typeof item.us === 'boolean' ? (
                      item.us ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      <span className="text-text-primary text-center">{item.us}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {typeof item.competitors === 'boolean' ? (
                      item.competitors ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      <span className="text-text-secondary text-center">{item.competitors}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = 'WhyChooseUs';

export default WhyChooseUs;

