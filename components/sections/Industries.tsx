
import React, { useState, useCallback, useMemo } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Section, SectionContainer } from '../ui/Section';
import AnimatedHeading from '../ui/AnimatedHeading';
import OptimizedImage from '../ui/OptimizedImage';
import { INDUSTRY_CATEGORIES, type IndustryCategoryId } from '../../data/industries';

const Industries: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<IndustryCategoryId>('construction');
  
  const handleTabChange = useCallback((tab: IndustryCategoryId) => {
    setActiveTab(tab);
  }, []);
  
  const activeCategoryItems = useMemo(() => {
    return INDUSTRY_CATEGORIES.find((c) => c.id === activeTab)?.items || [];
  }, [activeTab]);

  return (
    <Section id="industries" className="pt-12 md:pt-16 pb-24 md:pb-32">
      <SectionContainer>

        {/* Header Section */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Sector Expertise
            </span>
          </div>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-6"
            delay={0.1}
          >
            Industries We<br />
            <span className="text-text-secondary">Dominate</span>
          </AnimatedHeading>
          <p className="text-lg text-text-secondary leading-relaxed">
            We don't dabble. We specialize in high-ticket service industries where trust and authority drive revenue.
          </p>
        </div>

        {/* Styled Tabs */}
        <div className="flex justify-start mb-8 overflow-x-auto pb-2 -mx-6 px-6">
          <div className="bg-surface p-1.5 rounded-[2rem]  -black/5  inline-flex flex-wrap sm:flex-nowrap gap-1 min-w-max">
            {INDUSTRY_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={cn(
                    "relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-[2rem] flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none whitespace-nowrap",
                    isActive
                      ? "text-white "
                      : "text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-neutral-800"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndustryTab"
                      className="absolute inset-0 bg-black dark:bg-white rounded-[2rem]"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {activeCategoryItems.map((item, idx) => {
              const isContactCard = item.type === 'cta';

              return (
                <motion.div
                  key={`${activeTab}-${item.name}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="col-span-1"
                >
                  <div className={cn(
                    "group relative rounded-[2rem] overflow-hidden h-full min-h-[200px] sm:min-h-[220px] cursor-pointer transition-all duration-500",
                    isContactCard 
                      ? "bg-surface hover: hover:-translate-y-1" 
                      : "hover: hover:-translate-y-1"
                  )}>
                    {/* Background Image */}
                    {item.type === 'industry' && item.image && !isContactCard && (
                      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                        <OptimizedImage 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          width={800}
                          height={600}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 rounded-[2rem]" />
                      </div>
                    )}

                    {/* Content */}
                    <div className={cn(
                      "relative h-full p-6 flex flex-col",
                      isContactCard && "items-center justify-center text-center"
                    )}>
                      {/* Icon - Top */}
                      <div className={cn(
                        "mb-auto",
                        isContactCard && "flex justify-center"
                      )}>
                        <div className={cn(
                          "w-12 h-12 rounded-[2rem] flex items-center justify-center flex-shrink-0 transition-all duration-300",
                          isContactCard 
                            ? "bg-coral/10 group-hover:bg-black" 
                            : "bg-white/0 backdrop-blur-md  -white/10 group-hover:bg-white group-hover:-white/20"
                        )}>
                          <item.icon className={cn(
                            "w-5 h-5 transition-colors duration-300",
                            isContactCard 
                              ? "text-coral group-hover:text-white" 
                              : "text-white/80 group-hover:text-black"
                          )} />
                        </div>
                      </div>

                      {/* Title and Description - Bottom */}
                      <div className={cn(
                        "mt-auto",
                        isContactCard && "text-center"
                      )}>
                        {/* Title */}
                        <h3 className={cn(
                          "font-display font-semibold text-lg sm:text-xl mb-2 transition-colors duration-300",
                          isContactCard 
                            ? "text-text-primary" 
                            : "text-white"
                        )}>
                          {item.name}
                        </h3>
                        {/* Description */}
                        <p className={cn(
                          "text-xs sm:text-sm leading-relaxed",
                          isContactCard ? "text-text-secondary" : "text-white/70"
                        )}>
                          {item.description}
                        </p>
                      </div>

                      {/* Arrow for non-contact cards */}
                      {!isContactCard && (
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Border effect (match Team CTA card) */}
                    {isContactCard && (
                      <div className="absolute inset-0 rounded-[2rem]  -black/5 dark:-white/10 group-hover:-white/50 transition-colors duration-300 pointer-events-none" />
                    )}

                    {/* Link overlay */}
                    <a
                      href={isContactCard ? '/contact' : `/industries/${(item as any).slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={item.name}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </SectionContainer>
    </Section >
  );
});

Industries.displayName = 'Industries';

export default Industries;