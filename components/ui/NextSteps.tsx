import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration?: string;
}

interface NextStepsProps {
  steps?: Step[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'Schedule a free 30-minute call to discuss your goals and challenges.',
    icon: Calendar,
    duration: '30 min'
  },
  {
    number: '02',
    title: 'Custom Proposal',
      description: "We'll create a tailored strategy and proposal based on your needs.",
    icon: FileText,
    duration: '3-5 days'
  },
  {
    number: '03',
    title: 'Kickoff Meeting',
    description: "We'll align on strategy, set up tracking, and launch your first campaigns.",
    icon: Rocket,
    duration: 'Week 1'
  },
  {
    number: '04',
    title: 'Campaign Launch',
    description: 'Your campaigns go live and we start optimizing for results.',
    icon: CheckCircle2,
    duration: 'Week 2-3'
  },
];

const NextSteps: React.FC<NextStepsProps> = React.memo(({
  steps = DEFAULT_STEPS,
  title = 'What happens next',
  subtitle = "Here's what to expect after you contact us",
  className = ''
}) => {
  return (
    <section className={`py-12 md:py-16 bg-white dark:bg-surface relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Next Steps
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
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Connector Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full -z-10">
                    <ArrowRight className="w-6 h-6 text-coral/30 mx-auto" />
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
                  <p className="text-text-secondary leading-relaxed mb-3">
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

NextSteps.displayName = 'NextSteps';

export default NextSteps;

