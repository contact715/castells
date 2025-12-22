
import React from 'react';
import { ArrowUpRight, TrendingUp, MapPin, Layers } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import ScrollFloat from '../effects/ScrollFloat';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import AnimatedHeading from '../ui/AnimatedHeading';
import type { NavigateFn } from '../../types';

interface WorkProps {
  onNavigate?: NavigateFn;
}

import { CASE_STUDIES, CaseStudy } from '../../constants';

const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  return (
    <section id="work" className="bg-ivory relative">
      <div className="container mx-auto px-6 pt-16 md:pt-20 pb-12">

        {/* Header - Sticky Left Column Layout (like FAQ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">

          {/* Left: Badge + Title (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <Badge className="mb-3">Selected Works 2023-2025</Badge>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight"
              delay={0.1}
            >
              Proven<br />
              <span className="text-text-secondary">Dominance.</span>
            </AnimatedHeading>
          </div>

          {/* Right: Description + CTA Button */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              We track every click, call, and conversion. Our portfolio isn't just a gallery of pretty pictures — it's a ledger of market conquests.
            </p>
            <Button
              onClick={() => onNavigate?.('work')}
              size="md"
              className="self-start"
            >
              View Full Archive
            </Button>
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
          {CASE_STUDIES.slice(0, 9).map((project, idx) => (
            <ScrollStackItem key={project.id}>
              <StackCard
                project={project}
                index={idx}
                onClick={() => onNavigate?.('case-study', { id: project.id, name: project.client })}
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Bottom CTA Button */}
      <div className="container mx-auto px-6 pb-24 pt-8 flex justify-center">
        <Button
          onClick={() => onNavigate?.('work')}
          size="md"
        >
          View Full Archive
        </Button>
      </div>
    </section>
  );
};

// Redesigned Card for Stacking - "Immersive Overlay" Aesthetic
const StackCard: React.FC<{ project: CaseStudy; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <a
      href={`/case-studies/${encodeURIComponent(project.id)}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[32px] overflow-hidden   -white/10 relative group cursor-pointer transition-transform duration-500 hover:scale-[1.02] transform-gpu isolate block"
    >
      {/* Full Background Media */}
      <div className="absolute inset-0 bg-black overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[32px]">
        {project.video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={project.image}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700 will-change-opacity"
            style={{ transform: 'translateZ(0)' }}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={project.image}
            alt={project.client}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700 will-change-opacity"
            loading="lazy"
            style={{ transform: 'translateZ(0)' }}
          />
        )}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[32px]" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-between z-10">

        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div className="bg-white/10 backdrop-blur-md  -white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            {project.year} — {project.industry}
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1.5rem] sm:rounded-[2rem] bg-white/0 backdrop-blur-md  -white/10 flex items-center justify-center group-hover:bg-white group-hover:-white/20 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Bottom Content */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h3 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-white mb-3 sm:mb-4 tracking-tight leading-none">
              {project.client}
            </h3>
            <p className="text-white/70 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="flex gap-6 sm:gap-12 pt-6 sm:pt-8 -t -white/10">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-1">{project.metric}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{project.metricLabel}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-1">{project.secondaryMetric}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{project.secondaryLabel}</div>
            </div>
          </div>
        </div>

      </div>
    </a>
  );
};

export default Work;
