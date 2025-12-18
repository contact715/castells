
import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Highlighter } from '../ui/Highlighter';
import { VelocityScroll } from '../effects/ScrollBasedVelocity';
import { cn } from '../../lib/utils';
import { Section, SectionContainer, SectionHeader } from '../ui/Section';
import AnimatedHeading from '../ui/AnimatedHeading';
import { SERVICE_CATEGORIES, type ServiceCategoryId } from '../../data/services';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceCategoryId>('branding');

  return (
    <Section id="services">
      <SectionContainer>

        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Our Expertise
            </span>
          </div>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-6"
            delay={0.1}
          >
            Full-Stack Solutions For<br />
            <span className="text-text-secondary">Modern Growth</span>
          </AnimatedHeading>
          <p className="text-lg text-text-secondary leading-relaxed">
            From lead generation to conversion optimization, we build the infrastructure your business needs to dominate.
          </p>
        </div>

        {/* Styled Tabs - Moved below header for cleaner layout */}
        <div className="flex justify-start mb-16">
          <div className="bg-surface p-1.5 rounded-2xl border border-black/5 shadow-none inline-flex flex-wrap gap-1">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    "relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none",
                    isActive
                      ? "text-white shadow-md"
                      : "text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-neutral-800"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTab"
                      className="absolute inset-0 bg-black dark:bg-white rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <cat.icon className={cn("w-4 h-4", isActive ? "text-white dark:text-black" : "currentColor")} />
                    <span className={isActive ? "text-white dark:text-black" : ""}>{cat.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {SERVICE_CATEGORIES.find((c) => c.id === activeTab)?.items.map((service, idx) => {
              const spanClass = "col-span-1";

              return (
                <motion.div
                  key={`${activeTab}-${service.name}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={spanClass}
                >
                  <div className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5 dark:border-white/5 group cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                        <service.icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <h3 className="font-display font-semibold text-2xl text-black dark:text-white leading-tight">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </SectionContainer >
    </Section >
  );
};

export default Services;
