
import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket, BarChart3, ArrowRight } from 'lucide-react';
import { Highlighter } from './Highlighter';
import { cn } from '../lib/utils';
import ScrollFloat from './ScrollFloat';

const STEPS = [
  {
    id: '01',
    title: 'The Audit',
    desc: 'We tear down your current infrastructure. We analyze your ad accounts, SEO health, and funnel conversion rates to find the leaks.',
    icon: Search
  },
  {
    id: '02',
    title: 'The Strategy',
    desc: 'We build a custom roadmap. No templates. We define your ideal customer profile (ICP) and craft the messaging that resonates.',
    icon: PenTool
  },
  {
    id: '03',
    title: 'The Launch',
    desc: 'Execution mode. We deploy campaigns, launch landing pages, and set up the tracking pixel matrix. Systems go live in 14 days or less.',
    icon: Rocket
  },
  {
    id: '04',
    title: 'The Scale',
    desc: 'Data optimization. We kill losing ads, double down on winners, and aggressively scale budget while maintaining ROAS.',
    icon: BarChart3
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-32 bg-ivory relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-black/5 pb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight tracking-tight">
              <ScrollFloat as="span" containerClassName="inline-block mr-3">The Growth</ScrollFloat>
              <Highlighter action="underline" color="#E08576">
                  <span className="italic text-coral">
                      <ScrollFloat as="span" containerClassName="inline-block">Blueprint</ScrollFloat>
                  </span>
              </Highlighter>
            </h2>
            <p className="text-xl text-text-secondary font-light">
              We don't rely on luck. We follow a battle-tested protocol designed to minimize risk and maximize velocity.
            </p>
          </div>
          <div className="hidden md:block text-right">
             <div className="text-sm font-bold uppercase tracking-widest text-text-secondary opacity-50 mb-2">
                Est. Timeline
             </div>
             <div className="font-display text-3xl font-bold text-text-primary">
                4-6 Weeks
             </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="group relative">
               {/* Connecting Arrow for Desktop (except last) */}
               {idx !== STEPS.length - 1 && (
                 <div className="absolute top-16 -right-3 z-20 hidden xl:flex items-center justify-center w-6 h-6 text-black/10 group-hover:text-coral/50 transition-colors duration-500 transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                 </div>
               )}

               <div className="h-full bg-surface border border-black/5 dark:border-white/5 p-8 rounded-[2rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group-hover:border-coral/20">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                     <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 bg-ivory rounded-2xl flex items-center justify-center border border-black/5 group-hover:border-coral/30 group-hover:bg-white transition-all duration-500 shadow-sm">
                           <step.icon className="w-6 h-6 text-text-primary group-hover:text-coral transition-colors" />
                        </div>
                        <span className="font-display text-5xl font-bold text-black/5 dark:text-white/5 group-hover:text-black/10 transition-colors select-none">
                           {step.id}
                        </span>
                     </div>
                     
                     <h3 className="font-display text-2xl font-bold mb-4 text-text-primary group-hover:text-coral transition-colors duration-300">
                        {step.title}
                     </h3>
                     <p className="text-text-secondary text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {step.desc}
                     </p>
                  </div>
                  
                  {/* Bottom Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5 group-hover:bg-coral transition-colors duration-500 origin-left transform scale-x-0 group-hover:scale-x-100" />
               </div>
            </div>
          ))}
        </div>
        
        {/* Footer Note */}
        <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-text-secondary">
                    Average time to first result: <span className="text-text-primary font-bold">21 Days</span>
                </span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
