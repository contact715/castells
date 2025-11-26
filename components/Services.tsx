
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone, Globe, Search, Cpu, BarChart, Terminal,
  Layout, Video, MessageSquare, Shield, ArrowUpRight,
  Palette, Book, Layers, Smartphone,
  Code, ShoppingCart, LineChart, FileText
} from 'lucide-react';
import { Highlighter } from './Highlighter';
import { BentoGrid, BentoCard } from './BentoGrid';
import { VelocityScroll } from './ScrollBasedVelocity';
import { cn } from '../lib/utils';
import ScrollFloat from './ScrollFloat';

const SERVICES_DATA = {
  branding: [
    { name: 'Brand Identity', desc: 'Complete visual systems: Logo, Typography, and Color Theory.', icon: Palette },
    { name: 'Brand Guidelines', desc: 'Comprehensive rulebooks to ensure consistency across all channels.', icon: Book },
    { name: 'Logobook', desc: 'Strategic logo variations for every digital and print application.', icon: Layers },
    { name: 'UI/UX Design', desc: 'User-centric interfaces for web and mobile products.', icon: Layout },
    { name: 'Print & Packaging', desc: 'Business cards, brochures, and physical collateral design.', icon: FileText },
  ],
  development: [
    { name: 'Web Development', desc: 'High-performance websites built on React, Next.js, and modern stacks.', icon: Globe },
    { name: 'Mobile Apps', desc: 'Native and cross-platform mobile applications (iOS & Android).', icon: Smartphone },
    { name: 'E-commerce', desc: 'Scalable online stores on Shopify Plus or custom WooCommerce builds.', icon: ShoppingCart },
    { name: 'Web Applications', desc: 'Complex SaaS platforms and internal business tools.', icon: Code },
    { name: 'Landing Pages', desc: 'High-converting sales pages integrated with your CRM.', icon: Layout },
  ],
  automation: [
    { name: 'CRM & Pipelines', desc: 'Architecting GoHighLevel, HubSpot, and Kommo for sales velocity.', icon: MessageSquare },
    { name: 'Business Intelligence', desc: 'Real-time dashboards (Looker/PowerBI) to visualize ROI.', icon: BarChart },
    { name: 'Workflow Automation', desc: 'Connecting Monday.com, Slack, and billing via Zapier/Make.', icon: Cpu },
    { name: 'Advanced Tracking', desc: 'Server-side tagging (GTM) and attribution modeling.', icon: Terminal },
    { name: 'Field Ops', desc: 'Streamlining HouseCall Pro and field service workflows.', icon: Shield },
  ],
  advertising: [
    { name: 'Google Ads (PPC)', desc: 'Capture high-intent search traffic with precision keyword targeting.', icon: Search },
    { name: 'SEO & Content', desc: 'Dominating organic search results and local map packs.', icon: LineChart },
    { name: 'Meta Ads', desc: 'Scale revenue with advanced audience segmentation on FB & Instagram.', icon: Megaphone },
    { name: 'YouTube Ads', desc: 'Build authority and retarget users with high-quality video campaigns.', icon: Video },
    { name: 'TikTok & Social', desc: 'Tap into viral organic reach and younger demographics.', icon: Smartphone },
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
    <section id="services" className="py-32 bg-ivory relative">
      <div className="container mx-auto px-6">

        {/* Header & Tabs Container - Split Layout */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between mb-16 gap-10">

          {/* Left Side: Header */}
          <div className="max-w-4xl">
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight tracking-tight text-balance">
              <ScrollFloat as="span" containerClassName="block">Full-Stack Solutions</ScrollFloat>
              <span className="block">
                <ScrollFloat as="span" containerClassName="inline-block mr-3">For</ScrollFloat>
                <Highlighter action="underline" color="#E08576">
                  <span className="italic text-coral">
                    <ScrollFloat as="span" containerClassName="inline-block">Modern Growth</ScrollFloat>
                  </span>
                </Highlighter>
              </span>
            </h2>
            <p className="text-xl text-text-secondary font-normal max-w-2xl">
              From lead generation to conversion optimization, we build the infrastructure your business needs to dominate.
            </p>
          </div>

          {/* Right Side: Styled Tabs */}
          <div className="flex-shrink-0">
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
                        : "text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
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
        </div>

        <BentoGrid className="lg:grid-cols-3 auto-rows-[280px]">
          <AnimatePresence mode="popLayout">
            {SERVICES_DATA[activeTab].map((service, idx) => {
              // Standardize to 3 columns, maybe some span 2 if we want variety, 
              // but for "informative" consistency, uniform size is often better or 
              // specific featured items.
              // Let's keep the slight asymmetry for visual interest but make cards uniform in style.

              const total = SERVICES_DATA[activeTab].length;
              let spanClass = "col-span-3 md:col-span-1";

              if (idx === 0) spanClass = "col-span-3 md:col-span-2"; // First item featured

              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={spanClass}
                >
                  <BentoCard
                    name={service.name}
                    className="h-full"
                    Icon={service.icon}
                    description={service.desc}
                    href="#contact"
                    cta="Learn More"
                  />
                </motion.div>
              );
            })}

            {/* Always show a 'Custom' card to fill grid if needed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-3 md:col-span-1"
            >
              <BentoCard
                name="Enterprise Solutions"
                className="bg-black text-white dark:bg-white/10 border-none h-full"
                Icon={ArrowUpRight}
                description="We build bespoke strategies for complex needs."
                href="#contact"
                cta="Contact Sales"
                background={<div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90" />}
              />
            </motion.div>
          </AnimatePresence>
        </BentoGrid>

        {/* Background Ambient Text */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/3 w-full opacity-[0.03] grayscale">
            <VelocityScroll default_velocity={0.5} className="text-[12vw] font-display font-bold text-black dark:text-white">
              SCALE GROWTH ROI DOMINANCE
            </VelocityScroll>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
