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
import { Section, SectionContainer } from '../ui/Section';
import AnimatedHeading from '../ui/AnimatedHeading';

interface ServicePageProps {
    onBack?: () => void;
    onNavigate?: (page: PageView) => void;
    serviceId?: string;
    serviceName?: string;
}

const SERVICES_DATA: Record<string, { name: string; desc: string; icon: React.ElementType }[]> = {
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

const ServicePage: React.FC<ServicePageProps> = ({ onBack, onNavigate, serviceId, serviceName = 'Service' }) => {
    const services = serviceId ? SERVICES_DATA[serviceId] || [] : [];
    const displayName = serviceName || 'Service';

    return (
        <div className="min-h-screen bg-ivory pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Services' },
                        { label: displayName, active: true },
                    ]}
                    badge="Services"
                    title={displayName}
                    description={`Comprehensive ${displayName.toLowerCase()} solutions for your business.`}
                    onNavigate={onNavigate}
                />

                {/* Services Grid */}
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white rounded-2xl p-8 border border-black/5 hover:border-coral/50 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral transition-colors">
                                        <Icon className="w-6 h-6 text-coral" />
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
                ) : (
                    <div className="bg-white rounded-2xl p-12 border border-black/5 text-center mb-20">
                        <p className="text-text-secondary text-lg">
                            No services found for this category.
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white border border-black/5 rounded-2xl p-12 text-center shadow-lg"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold mb-4 text-text-primary"
                        delay={0.4}
                    >
                        Ready to get started?
                    </AnimatedHeading>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help you achieve your goals with our {displayName.toLowerCase()} solutions.
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

export default ServicePage;
