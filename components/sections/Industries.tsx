
import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  Hammer, Home, Car, Briefcase,
  ArrowUpRight, Zap, Droplets, PaintBucket,
  Sun, Ruler, ShieldCheck, LayoutGrid,
  Palette, Sparkles, Scale, FileText, Frame, MessageSquare
} from 'lucide-react';
import { Highlighter } from '../ui/Highlighter';
import { cn } from '../../lib/utils';
import { Section, SectionContainer, SectionHeader } from '../ui/Section';

const CATEGORIES = [
  { id: 'construction', label: 'Construction', icon: Hammer },
  { id: 'home', label: 'Home Services', icon: Home },
  { id: 'auto', label: 'Automotive', icon: Car },
  { id: 'pro', label: 'Professional', icon: Briefcase },
];

const INDUSTRIES_DATA: Record<string, { name: string; desc: string; icon: React.ElementType; image?: string; href?: string }[]> = {
  construction: [
    { name: 'ADU & Additions', desc: 'High-ticket lead generation for large-scale residential projects.', icon: Home, image: '/images/adu-additions.png' },
    { name: 'Bathroom Remodeling', desc: 'Capture homeowners ready to invest in luxury upgrades.', icon: Droplets, image: '/images/bathroom-remodel.png' },
    { name: 'Roofing Services', desc: 'Emergency repair and full replacement leads that convert.', icon: ShieldCheck, image: '/images/roofing-services.png' },
    { name: 'Kitchen Remodeling', desc: 'Targeting high-value renovation projects with precision.', icon: LayoutGrid, image: '/images/kitchen-remodeling.png' },
    { name: 'Concrete & Paving', desc: 'Commercial and residential paving leads for your crew.', icon: Frame, image: '/images/concrete-paving.png' },
    { name: 'Fencing & Gates', desc: 'Secure more contracts for perimeter and security installations.', icon: Ruler, image: '/images/fencing-gates.png' },
    { name: "Don't see your niche?", desc: 'Leave a request. We build custom strategies for unique markets.', icon: MessageSquare, image: '/images/concrete-paving.png', href: '#contact' },
  ],
  home: [
    { name: 'HVAC Systems', desc: 'Seasonal campaigns to keep your technicians booked year-round.', icon: Zap, image: '/images/hvac-systems.png' },
    { name: 'Flooring & Tile', desc: 'Connect with clients looking for premium material installations.', icon: LayoutGrid, image: '/images/flooring-tile.png' },
    { name: 'Int/Ext Painting', desc: 'Fill your schedule with whole-home and commercial painting jobs.', icon: PaintBucket, image: '/images/painting-services.png' },
    { name: 'Plumbing', desc: 'Emergency service calls and high-value repiping projects.', icon: Droplets, image: '/images/plumbing-services.png' },
    { name: 'Electrical', desc: 'Panel upgrades, lighting, and smart home installation leads.', icon: Zap, image: '/images/electrical-services.png' },
    { name: 'Solar Energy', desc: 'Qualified appointments for residential and commercial solar.', icon: Sun, image: '/images/solar-energy.png' },
    { name: 'Landscaping', desc: 'Recurring maintenance contracts and high-end design projects.', icon: Sun, image: '/images/landscaping-services.png' },
    { name: "Don't see your niche?", desc: 'Leave a request. We build custom strategies for unique markets.', icon: MessageSquare, image: '/images/concrete-paving.png', href: '#contact' },
  ],
  auto: [
    { name: 'Paint Protection', desc: 'Attract car enthusiasts seeking premium PPF installations.', icon: ShieldCheck, image: '/images/paint-protection.png' },
    { name: 'Vinyl Wraps', desc: 'Leads for color change wraps and commercial fleet branding.', icon: Palette, image: '/images/vinyl-wraps.png' },
    { name: 'Window Tinting', desc: 'Volume-based campaigns to drive daily shop traffic.', icon: Sun, image: '/images/window-tinting.png' },
    { name: 'Auto Detailing', desc: 'High-end detailing and ceramic coating packages.', icon: Sparkles, image: '/images/auto-detailing.png' },
    { name: 'Ceramic Coating', desc: 'Educated customers looking for long-term vehicle protection.', icon: Droplets, image: '/images/ceramic-coating.png' },
    { name: "Don't see your niche?", desc: 'Leave a request. We build custom strategies for unique markets.', icon: MessageSquare, image: '/images/concrete-paving.png', href: '#contact' },
  ],
  pro: [
    { name: 'Insurance Agencies', desc: 'Exclusive leads for auto, home, and life insurance policies.', icon: ShieldCheck, image: '/images/insurance-agencies.png' },
    { name: 'Legal Services', desc: 'High-intent clients for personal injury, family, and estate law.', icon: Scale, image: '/images/legal-services.png' },
    { name: 'Business Consulting', desc: 'Connect with B2B clients needing strategic growth advice.', icon: FileText, image: '/images/business-consulting.png' },
    { name: 'Financial Planning', desc: 'Qualified prospects for wealth management and retirement planning.', icon: Briefcase, image: '/images/landscaping-services.png' },
    { name: "Don't see your niche?", desc: 'Leave a request. We build custom strategies for unique markets.', icon: MessageSquare, image: '/images/concrete-paving.png', href: '#contact' },
  ]
};

const Industries: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof INDUSTRIES_DATA>('construction');

  return (
    <Section id="industries">
      <SectionContainer>

        {/* Header Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Left: Badge + Title */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                Sector Expertise
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              Industries We<br />
              <span className="text-text-secondary">Dominate</span>
            </h2>
          </div>

          {/* Right: Description */}
          <div className="flex flex-col justify-end">
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              We don't dabble. We specialize in high-ticket service industries where trust and authority drive revenue.
            </p>
          </div>
        </div>

        {/* Styled Tabs */}
        <div className="flex justify-start mb-16">
          <div className="bg-surface p-1.5 rounded-2xl border border-black/5 shadow-none inline-flex flex-wrap gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as keyof typeof INDUSTRIES_DATA)}
                  className={cn(
                    "relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none",
                    isActive
                      ? "text-white shadow-md"
                      : "text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-neutral-800"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndustryTab"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {INDUSTRIES_DATA[activeTab].map((item, idx) => {
              const spanClass = "col-span-1";

              const CardContent = () => (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 relative z-20">
                      <item.icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-tight relative z-20">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed relative z-20">
                    {item.desc}
                  </p>

                  {item.href && (
                    <a href={item.href} className="absolute inset-0 z-30" aria-label={item.name}></a>
                  )}
                </>
              );

              return (
                <motion.div
                  key={`${activeTab}-${item.name}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={spanClass}
                >
                  <div className="relative overflow-hidden bg-surface border border-black/5 dark:border-white/10 rounded-[2rem] h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {item.image && (
                      <>
                        {/* Always-visible image background (no hover reveal effect) */}
                        <img
                          src={item.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover opacity-25"
                          loading="lazy"
                        />
                        {/* Readability wash */}
                        <div className="absolute inset-0 bg-white/70 dark:bg-[#2A2A2A]/65" />
                      </>
                    )}

                    <div className="p-8 h-full flex flex-col items-start relative z-20">
                      <CardContent />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </SectionContainer>
    </Section >
  );
};

export default Industries;