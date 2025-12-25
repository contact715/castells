import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  service?: string;
}

interface ServiceTestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Jonathan Reed",
    role: "CEO, Apex Architecture",
    quote: "Castells didn't just run ads; they restructured our entire digital presence. Our inbound leads tripled in 90 days.",
    avatar: "JR"
  },
  {
    name: "Sarah Jenkins",
    role: "Director, Lumina Health",
    quote: "The precision of their data targeting is unmatched. We saw a 450% ROI on our first campaign. Absolutely transformative.",
    avatar: "SJ"
  },
  {
    name: "Michael Chang",
    role: "Founder, Vanguard Solar",
    quote: "Elegance meets performance. They elevated our brand aesthetic while driving record sales volumes. The perfect partner.",
    avatar: "MC"
  },
];

const ServiceTestimonials: React.FC<ServiceTestimonialsProps> = React.memo(({
  testimonials = DEFAULT_TESTIMONIALS,
  title = 'What our clients say',
  subtitle = "Don't just take our word for it. See what our clients have to say about working with us.",
  className = ''
}) => {
  return (
    <section className={`py-12 md:py-16 bg-white dark:bg-surface relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Testimonials
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-ivory dark:bg-[#191919] rounded-[2rem] p-8 hover:-translate-y-1 transition-all"
            >
              <p className="text-lg text-text-secondary font-light leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold text-base">{testimonial.name}</h4>
                  <p className="text-text-secondary/70 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ServiceTestimonials.displayName = 'ServiceTestimonials';

export default ServiceTestimonials;

