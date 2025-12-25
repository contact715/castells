import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, CheckCircle2, Star } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description?: string;
}

interface TrustIndicatorsProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const DEFAULT_INDICATORS: TrustIndicator[] = [
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Projects Delivered',
    description: 'Successful campaigns across industries'
  },
  {
    icon: Award,
    value: '$50M+',
    label: 'Revenue Generated',
    description: 'For our clients through our campaigns'
  },
  {
    icon: Star,
    value: '3.2x',
    label: 'Average ROAS',
    description: 'Return on ad spend across all campaigns'
  },
  {
    icon: Users,
    value: '98%',
    label: 'Client Satisfaction',
    description: 'Clients who would recommend us'
  },
];

const TrustIndicators: React.FC<TrustIndicatorsProps> = React.memo(({ 
  className = '',
  variant = 'default'
}) => {
  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {DEFAULT_INDICATORS.map((indicator, index) => {
          const Icon = indicator.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-surface rounded-[2rem] p-6 text-center transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-coral" />
              </div>
              <div className="font-display text-3xl font-semibold text-text-primary mb-1">
                {indicator.value}
              </div>
              <div className="text-sm text-text-secondary font-medium">
                {indicator.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <section className={`py-12 md:py-16 bg-ivory relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Trust & Results
            </span>
          </div>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-text-primary mb-3"
            delay={0.1}
          >
            Proven results you can trust
          </AnimatedHeading>
          <p className="text-lg text-text-secondary leading-relaxed">
            Our track record speaks for itself. We've helped hundreds of businesses achieve remarkable growth through data-driven strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEFAULT_INDICATORS.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-surface rounded-[2rem] p-8 text-center hover:-translate-y-1 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-coral dark:group-hover:bg-coral transition-colors">
                  <Icon className="w-8 h-8 text-coral group-hover:text-white dark:group-hover:text-black transition-colors" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-2">
                  {indicator.value}
                </div>
                <div className="text-lg font-semibold text-text-primary mb-2">
                  {indicator.label}
                </div>
                {indicator.description && (
                  <p className="text-sm text-text-secondary">
                    {indicator.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

TrustIndicators.displayName = 'TrustIndicators';

export default TrustIndicators;

