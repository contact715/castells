import React from 'react';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import { motion } from 'framer-motion';
import {
  Palette, Book, Layers, Layout, FileText, ArrowUpRight,
  Globe, Smartphone, ShoppingCart, Code,
  MessageSquare, BarChart, Cpu, Terminal, Shield,
  Search, LineChart, Megaphone, Video
} from 'lucide-react';
import AnimatedHeading from '../ui/AnimatedHeading';

interface AllServicesPageProps {
  onBack?: () => void;
  onNavigate?: (page: PageView, data?: any) => void;
}

const SERVICES_CATEGORIES = [
  {
    id: 'branding',
    name: 'Branding',
    icon: Palette,
    description: 'Complete visual identity systems that make your brand unforgettable.',
    services: [
      { name: 'Brand Identity', desc: 'Complete visual systems: Logo, Typography, and Color Theory.', icon: Palette },
      { name: 'Brand Guidelines', desc: 'Comprehensive rulebooks to ensure consistency across all channels.', icon: Book },
      { name: 'Logobook', desc: 'Strategic logo variations for every digital and print application.', icon: Layers },
      { name: 'UI/UX Design', desc: 'User-centric interfaces for web and mobile products.', icon: Layout },
      { name: 'Print & Packaging', desc: 'Business cards, brochures, and physical collateral design.', icon: FileText },
    ],
  },
  {
    id: 'development',
    name: 'Development',
    icon: Code,
    description: 'High-performance digital products built with modern technology.',
    services: [
      { name: 'Web Development', desc: 'High-performance websites built on React, Next.js, and modern stacks.', icon: Globe },
      { name: 'Mobile Apps', desc: 'Native and cross-platform mobile applications (iOS & Android).', icon: Smartphone },
      { name: 'E-commerce', desc: 'Scalable online stores on Shopify Plus or custom WooCommerce builds.', icon: ShoppingCart },
      { name: 'Web Applications', desc: 'Complex SaaS platforms and internal business tools.', icon: Code },
      { name: 'Landing Pages', desc: 'High-converting sales pages integrated with your CRM.', icon: Layout },
    ],
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: Cpu,
    description: 'Streamline operations and boost efficiency with intelligent automation.',
    services: [
      { name: 'CRM & Pipelines', desc: 'Architecting GoHighLevel, HubSpot, and Kommo for sales velocity.', icon: MessageSquare },
      { name: 'Business Intelligence', desc: 'Real-time dashboards (Looker/PowerBI) to visualize ROI.', icon: BarChart },
      { name: 'Workflow Automation', desc: 'Connecting Monday.com, Slack, and billing via Zapier/Make.', icon: Cpu },
      { name: 'Advanced Tracking', desc: 'Server-side tagging (GTM) and attribution modeling.', icon: Terminal },
      { name: 'Field Ops', desc: 'Streamlining HouseCall Pro and field service workflows.', icon: Shield },
    ],
  },
  {
    id: 'advertising',
    name: 'Advertising',
    icon: Megaphone,
    description: 'Data-driven campaigns that turn clicks into customers.',
    services: [
      { name: 'Google Ads (PPC)', desc: 'Capture high-intent search traffic with precision keyword targeting.', icon: Search },
      { name: 'SEO & Content', desc: 'Dominating organic search results and local map packs.', icon: LineChart },
      { name: 'Meta Ads', desc: 'Scale revenue with advanced audience segmentation on FB & Instagram.', icon: Megaphone },
      { name: 'YouTube Ads', desc: 'Build authority and retarget users with high-quality video campaigns.', icon: Video },
      { name: 'TikTok & Social', desc: 'Tap into viral organic reach and younger demographics.', icon: Smartphone },
    ],
  },
];

const AllServicesPage: React.FC<AllServicesPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate?.('home') },
            { label: 'Services', active: true },
          ]}
          badge="Our Services"
          title="Everything you need to grow."
          description="From branding to development, automation to advertising—we've got you covered."
          onNavigate={onNavigate}
        />

        {/* Services Categories */}
        <div className="space-y-24 mb-20">
          {SERVICES_CATEGORIES.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-lg"
              >
                {/* Category Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="w-8 h-8 text-coral" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3 text-text-primary">
                      {category.name}
                    </h2>
                    <p className="text-text-secondary text-lg">{category.description}</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + serviceIndex * 0.05, duration: 0.5 }}
                        className="bg-ivory rounded-2xl p-6 border border-black/5 hover:border-coral/50 transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral transition-colors">
                          <ServiceIcon className="w-6 h-6 text-coral" />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2 text-text-primary">
                          {service.name}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {service.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white border border-black/5 rounded-2xl p-12 text-center shadow-lg"
        >
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl font-semibold mb-4 text-text-primary"
            delay={0.6}
          >
            Ready to get started?
          </AnimatedHeading>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals with our services.
          </p>
          <button
            onClick={() => onNavigate?.('contact')}
            className="px-8 py-4 bg-coral text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-coral-dark transition-colors"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AllServicesPage;


