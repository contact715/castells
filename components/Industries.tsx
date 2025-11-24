
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hammer, Home, Car, Briefcase, 
  ArrowUpRight, Zap, Droplets, PaintBucket, 
  Sun, Ruler, ShieldCheck, LayoutGrid, 
  Palette, Sparkles, Scale, FileText, Frame, MessageSquare
} from 'lucide-react';
import { Highlighter } from './Highlighter';
import { cn } from '../lib/utils';
import ScrollFloat from './ScrollFloat';
import SpotlightCard from './SpotlightCard';

const CATEGORIES = [
  { id: 'construction', label: 'Construction', icon: Hammer },
  { id: 'home', label: 'Home Services', icon: Home },
  { id: 'auto', label: 'Automotive', icon: Car },
  { id: 'pro', label: 'Professional', icon: Briefcase },
];

const INDUSTRIES_DATA: Record<string, { name: string; icon: React.ElementType }[]> = {
  construction: [
    { name: 'ADU & Additions', icon: Home },
    { name: 'Bathroom Remodeling', icon: Droplets },
    { name: 'Roofing Services', icon: ShieldCheck },
    { name: 'Kitchen Remodeling', icon: LayoutGrid },
    { name: 'Concrete & Paving', icon: Frame },
    { name: 'Fencing & Gates', icon: Ruler },
  ],
  home: [
    { name: 'HVAC Systems', icon: Zap },
    { name: 'Flooring & Tile', icon: LayoutGrid },
    { name: 'Int/Ext Painting', icon: PaintBucket },
    { name: 'Plumbing', icon: Droplets },
    { name: 'Electrical', icon: Zap },
    { name: 'Solar Energy', icon: Sun },
    { name: 'Landscaping', icon: Sun },
  ],
  auto: [
    { name: 'Paint Protection', icon: ShieldCheck },
    { name: 'Vinyl Wraps', icon: Palette },
    { name: 'Window Tinting', icon: Sun },
    { name: 'Auto Detailing', icon: Sparkles },
    { name: 'Ceramic Coating', icon: Droplets },
  ],
  pro: [
    { name: 'Insurance Agencies', icon: ShieldCheck },
    { name: 'Legal Services', icon: Scale },
    { name: 'Business Consulting', icon: FileText },
    { name: 'Financial Planning', icon: Briefcase },
  ]
};

const Industries: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof INDUSTRIES_DATA>('construction');

  return (
    <section id="industries" className="py-32 bg-ivory relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coral/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header & Tabs Container - Split Layout on Desktop */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between mb-16 gap-10">
          
          {/* Left Side: Header Text */}
          <div className="max-w-2xl text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest mb-6 text-text-secondary"
            >
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
              Sector Expertise
            </motion.div>
            
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight text-left tracking-tight">
              <ScrollFloat as="span" containerClassName="inline-block mr-3">Industries We</ScrollFloat>
              <Highlighter action="highlight" color="rgba(224, 133, 118, 0.3)">
                  <ScrollFloat as="span" containerClassName="inline-block">Dominate</ScrollFloat>
              </Highlighter>
            </h2>
            <p className="text-text-secondary text-xl font-light leading-relaxed max-w-xl text-left">
              We don't generalize. We specialize. Choose your sector to see our specific capabilities in high-ticket markets.
            </p>
          </div>

          {/* Right Side: Tabs Navigation - SOLID OPAQUE */}
          <div className="flex-shrink-0">
            <div className="bg-white dark:bg-black p-1.5 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm inline-flex flex-wrap gap-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id as keyof typeof INDUSTRIES_DATA)}
                    className={cn(
                      "relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none border border-transparent",
                      isActive 
                        ? "text-white shadow-md" 
                        : "text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-black dark:bg-white rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <cat.icon className={cn("w-4 h-4", isActive ? "text-coral" : "currentColor")} />
                      <span className={isActive ? "text-white dark:text-black" : ""}>{cat.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid Content - SOLID OPAQUE */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {INDUSTRIES_DATA[activeTab].map((item, idx) => (
              <motion.div
                key={`${activeTab}-${item.name}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="h-full"
              >
                <SpotlightCard 
                  spotlightColor="rgba(224, 133, 118, 0.2)"
                  className="group h-full relative bg-white dark:bg-black border border-black/5 dark:border-white/5 rounded-2xl p-8 hover:border-coral/30 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                >
                  {/* Hover Background Effect - Solid Color */}
                  <div className="absolute inset-0 bg-coral/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full pointer-events-none">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-xl bg-ivory border border-black/5 text-text-secondary group-hover:text-coral group-hover:bg-white transition-colors duration-300">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-text-secondary opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out" />
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className="font-display text-2xl font-medium text-text-primary group-hover:text-coral transition-colors duration-300 leading-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}

            {/* CTA Card - Catch All */}
            <motion.div
                key="catch-all-card"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: INDUSTRIES_DATA[activeTab].length * 0.05 }}
                className="h-full"
            >
                 <SpotlightCard
                    spotlightColor="rgba(255, 255, 255, 0.15)"
                    className="group h-full relative bg-[#1a1a1a] dark:bg-black rounded-2xl p-8 shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                 >
                     <a href="#contact" className="absolute inset-0 z-30" aria-label="Contact us for custom niche"></a>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-coral/20 rounded-full blur-[50px] pointer-events-none" />
                     
                     <div className="relative z-10 pointer-events-none">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-white/10 text-coral">
                               <MessageSquare className="w-6 h-6" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                        
                        <h3 className="font-display text-2xl font-medium text-white mb-2 leading-tight">
                            Don't see your niche?
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Leave a request. We build custom strategies for unique markets.
                        </p>
                     </div>
                 </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Industries;