import React from 'react';
import { m as motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface Metric {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  change?: string;
  description?: string;
}

interface MetricsDashboardProps {
  metrics?: Metric[];
  title?: string;
  subtitle?: string;
  className?: string;
}

/*
  Здесь стояли четыре числа без единого источника: «3.2x средний ROAS»,
  «250% рост выручки», «3-6 месяцев до результата», «98% довольных клиентов»,
  под заголовком «Real metrics from real campaigns». Ни одно из них не взято
  из нашего рекламного кабинета или CRM.

  Нет подтверждённых чисел — блока нет.
*/

const MetricsDashboard: React.FC<MetricsDashboardProps> = React.memo(({
  metrics,
  title = 'Results that speak for themselves',
  subtitle = 'Real metrics from real campaigns',
  className = ''
}) => {
  // Числа приходят только снаружи и только с источником. Нет их — блока нет.
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className={`py-12 md:py-16 bg-ivory relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral-gradient animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Metrics
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
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-surface rounded-card p-8 hover:-translate-y-1 transition-[transform,box-shadow] group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center group-hover:bg-coral dark:group-hover:bg-coral transition-colors">
                    <Icon className="w-6 h-6 text-coral-text group-hover:text-white dark:group-hover:text-black transition-colors" />
                  </div>
                  {metric.change && (
                    <span className="text-xs font-bold uppercase tracking-widest text-coral-text">
                      {metric.change}
                    </span>
                  )}
                </div>
                <div className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-text-primary mb-2">
                  {metric.label}
                </div>
                {metric.description && (
                  <p className="text-sm text-text-secondary">
                    {metric.description}
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

MetricsDashboard.displayName = 'MetricsDashboard';

export default MetricsDashboard;

