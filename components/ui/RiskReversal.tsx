import React from 'react';
import { m as motion } from 'framer-motion';
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

/*
  Блок стоял на 47 страницах услуг и ниш под заголовком «Guarantees» и
  подзаголовком «No risk, all reward». Аудит 24 августа разобрал каждое из
  четырёх утверждений:

    «Performance-Based Pricing»  — неправда: цена фиксированная месячная,
                                    а не от результата
    «No risk»                    — неправда: рекламный бюджет клиента под
                                    риском по устройству услуги, о чём честно
                                    написано на странице цен
    «Dedicated team is always
     available», «24/7 access»   — агентство из одного человека
    само слово «Guarantees»      — превращает рекламный текст в перечень
                                    гарантий, за которые придётся отвечать

  Заменено на то, что мы действительно делаем и можем подтвердить на этом же
  сайте. Заголовок раздела теперь описывает условия работы, а не гарантии.
*/
const DEFAULT_GUARANTEES: Guarantee[] = [
  {
    icon: Shield,
    title: 'Month to month',
    description: 'No contract and no cancellation fee. If a month goes badly, you stop and owe nothing further.'
  },
  {
    icon: CheckCircle2,
    title: 'The accounts are yours',
    description: 'Ad accounts, website and data are in your name from day one. Leaving costs you nothing but the notice.'
  },
  {
    icon: Clock,
    title: 'Prices are published',
    description: 'They are on our prices page, so you know the number before the first call.'
  },
  {
    icon: Headphones,
    title: 'You talk to the person doing the work',
    description: 'Not an account manager relaying it. Fastest answer is WhatsApp on our main number.'
  },
];

const RiskReversal: React.FC<RiskReversalProps> = React.memo(({
  guarantees = DEFAULT_GUARANTEES,
  title = 'How we work',
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
            <span className="w-2 h-2 rounded-full bg-accent-gradient animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide text-text-secondary">
              How we work
            </span>
          </div>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-text-primary mb-3"
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
                className="bg-white dark:bg-surface rounded-card shadow-spatial-card p-8 hover:-translate-y-1 hover:shadow-spatial-md transition-[transform,box-shadow] group"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent dark:group-hover:bg-accent transition-colors">
                  <Icon className="w-6 h-6 text-accent-text group-hover:text-white dark:group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-text transition-colors">
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

