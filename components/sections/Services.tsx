
import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone, Globe, Search, Cpu, BarChart, Terminal,
  Layout, Video, MessageSquare, Shield, ArrowUpRight,
  Palette, Book, Layers, Smartphone,
  Code, ShoppingCart, LineChart, FileText
} from 'lucide-react';
import { Highlighter } from '../ui/Highlighter';
import { VelocityScroll } from '../effects/ScrollBasedVelocity';
import { cn } from '../../lib/utils';
import { Section, SectionContainer, SectionHeader } from '../ui/Section';

const SERVICES_DATA = {
  branding: [
    { name: 'Brand Identity', desc: 'Complete visual systems: Logo, Typography, and Color Theory.', icon: Palette },
    { name: 'Brand Guidelines', desc: 'Comprehensive rulebooks to ensure consistency across all channels.', icon: Book },
    { name: 'Logobook', desc: 'Strategic logo variations for every digital and print application.', icon: Layers },
    { name: 'UI/UX Design', desc: 'User-centric interfaces for web and mobile products.', icon: Layout },
    { name: 'Print & Packaging', desc: 'Business cards, brochures, and physical collateral design.', icon: FileText },
    { name: 'Enterprise Solutions', desc: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
  ],
  development: [
    { name: 'Web Development', desc: 'High-performance websites built on React, Next.js, and modern stacks.', icon: Globe },
    { name: 'Mobile Apps', desc: 'Native and cross-platform mobile applications (iOS & Android).', icon: Smartphone },
    { name: 'E-commerce', desc: 'Scalable online stores on Shopify Plus or custom WooCommerce builds.', icon: ShoppingCart },
    { name: 'Web Applications', desc: 'Complex SaaS platforms and internal business tools.', icon: Code },
    { name: 'Landing Pages', desc: 'High-converting sales pages integrated with your CRM.', icon: Layout },
    { name: 'Enterprise Solutions', desc: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
  ],
  automation: [
    { name: 'CRM & Pipelines', desc: 'Architecting GoHighLevel, HubSpot, and Kommo for sales velocity.', icon: MessageSquare },
    { name: 'Business Intelligence', desc: 'Real-time dashboards (Looker/PowerBI) to visualize ROI.', icon: BarChart },
    { name: 'Workflow Automation', desc: 'Connecting Monday.com, Slack, and billing via Zapier/Make.', icon: Cpu },
    { name: 'Advanced Tracking', desc: 'Server-side tagging (GTM) and attribution modeling.', icon: Terminal },
    { name: 'Field Ops', desc: 'Streamlining HouseCall Pro and field service workflows.', icon: Shield },
    { name: 'Enterprise Solutions', desc: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
  ],
  advertising: [
    { name: 'Google Ads (PPC)', desc: 'Capture high-intent search traffic with precision keyword targeting.', icon: Search },
    { name: 'SEO & Content', desc: 'Dominating organic search results and local map packs.', icon: LineChart },
    { name: 'Meta Ads', desc: 'Scale revenue with advanced audience segmentation on FB & Instagram.', icon: Megaphone },
    { name: 'YouTube Ads', desc: 'Build authority and retarget users with high-quality video campaigns.', icon: Video },
    { name: 'TikTok & Social', desc: 'Tap into viral organic reach and younger demographics.', icon: Smartphone },
    { name: 'Enterprise Solutions', desc: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
  ],
};

const SERVICE_CATEGORIES = [
  { id: 'branding', label: 'Branding & Design', icon: Palette },
  { id: 'development', label: 'Development', icon: Code },
  { id: 'automation', label: 'Automation & Analytics', icon: Cpu },
  { id: 'advertising', label: 'Advertising & SEO', icon: Megaphone },
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof SERVICES_DATA>('branding');

  return (
    <Section id="services">
      <SectionContainer>

        {/* Header Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Left: Badge + Title */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                Our Expertise
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              Full-Stack Solutions For<br />
              <span className="text-text-secondary">Modern Growth</span>
            </h2>
          </div>

          {/* Right: Description */}
          <div className="flex flex-col justify-end">
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              From lead generation to conversion optimization, we build the infrastructure your business needs to dominate.
            </p>
          </div>
        </div>

        {/* Styled Tabs - Moved below header for cleaner layout */}
        <div className="flex justify-start mb-16">
          <div className="bg-surface p-1.5 rounded-2xl border border-black/5 shadow-none inline-flex flex-wrap gap-1">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as keyof typeof SERVICES_DATA)}
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
            {SERVICES_DATA[activeTab].map((service, idx) => {
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
                      <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-tight">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed">
                      {service.desc}
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
