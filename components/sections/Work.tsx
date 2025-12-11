
import React from 'react';
import { ArrowUpRight, TrendingUp, MapPin, Layers } from 'lucide-react';
import { RippleButton } from '../ui/RippleButton';
import ScrollFloat from '../effects/ScrollFloat';
import { PageView } from '../../App';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

interface WorkProps {
  onNavigate?: (page: PageView, data?: any) => void;
}

import { CASE_STUDIES, CaseStudy } from '../../constants';

const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  return (
    <section id="work" className="bg-ivory relative border-t border-black/5">
      <div className="container mx-auto px-6 pt-32 pb-12">

        {/* Header - Sticky Left Column Layout (like FAQ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">

          {/* Left: Badge + Title (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                Selected Works 2023-2025
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              Proven<br />
              <span className="text-text-secondary">Dominance.</span>
            </h2>
          </div>

          {/* Right: Description + CTA Button */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              We track every click, call, and conversion. Our portfolio isn't just a gallery of pretty pictures — it's a ledger of market conquests.
            </p>
            <RippleButton
              onClick={() => onNavigate?.('work')}
              className="bg-black text-white dark:bg-white dark:text-black rounded-xl px-6 py-2.5 font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all self-start"
            >
              View Full Archive
            </RippleButton>
            <div className="flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-widest text-text-secondary">
              <Layers className="w-4 h-4" />
              Scroll to explore stack
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Stack Implementation */}
      <div className="container mx-auto px-6 relative">
        <ScrollStack
          stackOffset={140} // 140px from top
          scaleFactor={0.08} // Stronger scaling effect
          blurAmount={8}
        >
          {CASE_STUDIES.map((project, idx) => (
            <ScrollStackItem key={project.id}>
              <StackCard
                project={project}
                index={idx}
                onClick={() => onNavigate?.('case-study', project)}
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Bottom CTA Button */}
      <div className="container mx-auto px-6 pb-32 pt-12 flex justify-center">
        <RippleButton
          onClick={() => onNavigate?.('work')}
          className="bg-black text-white dark:bg-white dark:text-black rounded-xl px-6 py-2.5 font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          View Full Archive
        </RippleButton>
      </div>
    </section>
  );
};

// Redesigned Card for Stacking - "Immersive Overlay" Aesthetic
const StackCard: React.FC<{ project: CaseStudy; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[600px] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 relative group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
    >
      {/* Full Background Media */}
      <div className="absolute inset-0 bg-black">
        {project.video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={project.image}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={project.image}
            alt={project.client}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
          />
        )}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between z-10">

        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-widest">
            {project.year} — {project.industry}
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Content */}
        <div>
          <div className="mb-8">
            <h3 className="font-display text-6xl md:text-8xl font-medium text-white mb-4 tracking-tight leading-none">
              {project.client}
            </h3>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="flex gap-12 pt-8 border-t border-white/10">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">{project.metric}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{project.metricLabel}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">{project.secondaryMetric}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{project.secondaryLabel}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Work;
