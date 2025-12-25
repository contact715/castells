import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Target, Shield, TrendingUp, Clock } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface BenefitsProps {
  benefits?: Benefit[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_BENEFITS: Benefit[] = [
  {
    icon: Target,
    title: 'Data-Driven Strategy',
    description: 'Every decision is backed by data and analytics, not guesswork.'
  },
  {
    icon: TrendingUp,
    title: 'Revenue Focus',
    description: 'We focus on metrics that matter: revenue, ROAS, and real business growth.'
  },
  {
    icon: Zap,
    title: 'Fast Results',
    description: 'See initial results within 2-4 weeks, significant improvements in 3-6 months.'
  },
  {
    icon: Shield,
    title: 'Proven Methodology',
    description: 'Battle-tested strategies that have generated $50M+ in client revenue.'
  },
  {
    icon: Clock,
    title: 'Dedicated Team',
    description: 'Your dedicated team of growth experts, not a revolving door of account managers.'
  },
  {
    icon: CheckCircle2,
    title: 'Transparent Reporting',
    description: 'Real-time dashboards and monthly reports so you always know what\'s working.'
  },
];

const Benefits: React.FC<BenefitsProps> = React.memo(({
  benefits = DEFAULT_BENEFITS,
  title = 'Why choose us',
  subtitle = 'We combine data-driven strategy with creative excellence to deliver results that matter.',
  className = ''
}) => {
  return (
    <section className={`py-12 md:py-16 bg-ivory relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Benefits
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-surface rounded-[2rem] p-8 hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-[2rem] bg-coral/10 dark:bg-coral/20 flex items-center justify-center mb-4 group-hover:bg-coral dark:group-hover:bg-coral transition-colors">
                  <Icon className="w-6 h-6 text-coral group-hover:text-white dark:group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Benefits.displayName = 'Benefits';

export default Benefits;

