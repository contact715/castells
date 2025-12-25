import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface ProcessStepsProps {
  steps?: ProcessStep[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We analyze your business, competitors, and market to create a custom growth strategy.',
    duration: 'Week 1-2',
    icon: Search
  },
  {
    number: '02',
    title: 'Setup & Launch',
    description: 'We set up tracking, create campaigns, and launch your first ads with optimized creatives.',
    duration: 'Week 3-4',
    icon: Target
  },
  {
    number: '03',
    title: 'Optimization',
    description: 'We continuously test, analyze, and optimize campaigns to improve performance.',
    duration: 'Week 5-6',
    icon: TrendingUp
  },
  {
    number: '04',
    title: 'Scale & Growth',
    description: 'Once we find what works, we aggressively scale budget while maintaining ROAS.',
    duration: 'Month 2+',
    icon: Rocket
  },
];

const ProcessSteps: React.FC<ProcessStepsProps> = React.memo(({
  steps = DEFAULT_STEPS,
  title = 'How it works',
  subtitle = 'Our proven process for driving measurable growth',
  className = ''
}) => {
  return (
    <section className={`py-12 md:py-16 bg-white dark:bg-surface relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Process
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon || ArrowRight;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Connector Line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-coral/20 -z-10" style={{ width: 'calc(100% - 2rem)' }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-coral/30" />
                  </div>
                )}

                <div className="bg-ivory dark:bg-[#191919] rounded-[2rem] p-8 h-full hover:-translate-y-1 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center group-hover:bg-coral dark:group-hover:bg-coral transition-colors">
                      <Icon className="w-6 h-6 text-coral group-hover:text-white dark:group-hover:text-black transition-colors" />
                    </div>
                    <span className="text-2xl font-display font-bold text-coral/30 dark:text-coral/20">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {step.description}
                  </p>
                  {step.duration && (
                    <div className="text-xs font-bold uppercase tracking-widest text-coral">
                      {step.duration}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ProcessSteps.displayName = 'ProcessSteps';

export default ProcessSteps;

