import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { NavigateFn } from '../../types';
import { SERVICE_CATEGORIES as DATA_SERVICE_CATEGORIES } from '../../data/services';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import AnimatedHeading from '../ui/AnimatedHeading';
import Counter from '../ui/Counter';
import SEO from '../ui/SEO';
import {
  Palette, Book, Layers, Layout, FileText,
  Globe, Smartphone, ShoppingCart, Code,
  MessageSquare, BarChart, Cpu, Terminal, Shield,
  LineChart, Megaphone, Video, ArrowRight, ArrowUpRight,
  Check, Sparkles, Target, Zap, Clock, TrendingUp,
  ChevronRight, Play
} from 'lucide-react';

interface AllServicesPageProps {
  onBack?: () => void;
  onNavigate?: NavigateFn;
}

const SERVICE_CATEGORIES = DATA_SERVICE_CATEGORIES.map((category) => ({
  id: category.id,
  name: category.label,
  tagline: category.tagline,
  description: category.description,
  icon: category.icon,
  services: category.items.map((s) => ({ name: s.name, desc: s.description, icon: s.icon, slug: s.slug })),
}));

const STATS = [
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 3.2, suffix: 'x', label: 'Average ROAS' },
  { value: 50, suffix: 'M+', label: 'Revenue Generated' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Application', desc: 'You reach out to us via the contact form or schedule a call. We review your business and confirm if we are a good fit.', duration: 'Day 1' },
  { num: '02', title: 'Discovery Call', desc: 'A 30-minute video call to understand your goals, challenges, and current marketing infrastructure. No sales pitch, just strategy.', duration: 'Day 2-3' },
  { num: '03', title: 'The Audit', desc: 'Before we build, we diagnose. We tear down your current infrastructure to find exactly where you are losing money.', duration: 'Week 1' },
  { num: '04', title: 'The Strategy', desc: 'No guesswork. We build a custom roadmap based on data, defining your ideal customer and the exact message that converts them.', duration: 'Week 2' },
  { num: '05', title: 'The Launch', desc: 'Execution mode. We deploy the campaigns, launch the landing pages, and set up the tracking pixel matrix.', duration: 'Week 3-4' },
  { num: '06', title: 'The Scale', desc: 'Data optimization. We kill losing ads, double down on winners, and aggressively scale budget while maintaining ROAS.', duration: 'Week 5-6' },
];

const AllServicesPage: React.FC<AllServicesPageProps> = ({ onBack, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919]">
      <SEO
        title="Services | Castells Agency"
        description="Full-stack growth services: branding, development, automation, analytics, paid media, and SEO."
        canonical="/services"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pb-32 overflow-hidden">

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Breadcrumbs
              items={[
                { label: 'Home', action: () => onNavigate?.('home') },
                { label: 'Services', active: true },
              ]}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Badge variant="pulse" className="mb-6">Full-Stack Growth Partner</Badge>
              </motion.div>

              <AnimatedHeading
                as="h1"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-text-primary mb-6"
                delay={0.2}
              >
                Everything you need<br />
                <span className="text-text-secondary">to dominate.</span>
              </AnimatedHeading>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-8"
              >
                From brand identity to performance marketing—we build the infrastructure 
                that transforms local businesses into market leaders.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" onClick={() => onNavigate?.('contact')} className="group">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Showreel
                </Button>
              </motion.div>
            </div>

            {/* Right: Stats Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-surface rounded-2xl p-6 md:p-8 border border-black/5 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                  </div>
                  <p className="text-sm text-text-secondary font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories Overview */}
      <section className="py-20 md:py-32 bg-ivory border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <Badge className="mb-4">What We Do</Badge>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
              delay={0.1}
            >
              Four pillars of<br />
              <span className="text-text-secondary">market dominance</span>
            </AnimatedHeading>
            <p className="text-lg text-text-secondary leading-relaxed">
              Each service is designed to work independently or as part of an integrated growth system. 
              Most clients start with one and scale across all four.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_CATEGORIES.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => setActiveCategory(index)}
                  className={`relative bg-ivory dark:bg-[#1F1F1F] rounded-2xl p-6 border border-black/5 dark:border-white/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${activeCategory === index ? 'ring-2 ring-coral' : ''}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-coral/10 dark:bg-coral/20 flex items-center justify-center mb-5 group-hover:bg-coral group-hover:scale-110 transition-all duration-300">
                    <CategoryIcon className="w-7 h-7 text-coral group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {category.tagline}
                  </p>
                  <div className="flex items-center text-coral text-sm font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      {SERVICE_CATEGORIES.map((category, categoryIndex) => {
        const CategoryIcon = category.icon;
        return (
          <section
            key={category.id}
            className="py-20 md:py-32 bg-ivory"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Left: Category Info */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-coral/10 dark:bg-coral/20 flex items-center justify-center mb-6">
                      <CategoryIcon className="w-8 h-8 text-coral" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary mb-4 leading-tight">
                      {category.name}
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-8">
                      {category.description}
                    </p>
                    <Button variant="outline" size="md" className="group">
                      Start a Project
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>

                {/* Right: Services Grid */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.services.map((service, serviceIndex) => {
                      const ServiceIcon = service.icon;
                      return (
                        <motion.div
                          key={service.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: serviceIndex * 0.1, duration: 0.5 }}
                          className="bg-white dark:bg-surface rounded-2xl p-6 border border-black/5 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300">
                              <ServiceIcon className="w-6 h-6 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
                                {service.name}
                              </h3>
                              <p className="text-sm text-text-secondary leading-relaxed">
                                {service.desc}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-ivory border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Content (Sticky) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <Badge variant="pulse" className="mb-6">
                Our Process
              </Badge>
              <AnimatedHeading
                as="h2"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
                delay={0.1}
              >
                From zero to<br />
                <span className="text-text-secondary">market leader</span>
              </AnimatedHeading>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                Our battle-tested framework has generated over $50M in revenue for clients. 
                Every step is designed for speed and measurable results.
              </p>
              <Button size="lg" onClick={() => onNavigate?.('contact')} className="group">
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right: Process Steps */}
            <div className="lg:col-span-8 space-y-6">
              {PROCESS_STEPS.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-6 p-6 rounded-2xl bg-white dark:bg-surface border border-black/5 dark:border-white/5 hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="font-display text-4xl font-bold text-coral flex-shrink-0">
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-coral transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-xs font-bold uppercase tracking-wider text-coral bg-coral/10 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <Badge className="mb-4">The Advantage</Badge>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
              delay={0.1}
            >
              Why elite brands<br />
              <span className="text-text-secondary">choose us</span>
            </AnimatedHeading>
            <p className="text-lg text-text-secondary leading-relaxed">
              Most agencies sell you hours. We sell you outcomes. Here's how we structure your dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Revenue Obsessed', desc: 'We optimize for profit, not vanity metrics. Every decision is backed by data.' },
              { icon: Zap, title: 'Speed to Market', desc: 'Campaigns live in 14 days. Your competition will never see it coming.' },
              { icon: Shield, title: 'Full Ownership', desc: 'You own everything we create. No hostage situations, ever.' },
              { icon: TrendingUp, title: 'Proven Results', desc: 'Average 3.2x ROAS across 500+ campaigns. We have the receipts.' },
              { icon: Clock, title: '24/7 Access', desc: 'Real-time dashboards and Slack access to your dedicated team.' },
              { icon: Sparkles, title: 'White Glove Service', desc: 'A dedicated marketing director, not just a support ticket.' },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-surface rounded-2xl p-8 border border-black/5 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-5 group-hover:bg-coral transition-colors duration-300">
                    <ItemIcon className="w-6 h-6 text-coral group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white dark:bg-[#232323] rounded-3xl p-12 md:p-20 overflow-hidden border border-black/5 dark:border-white/5"
          >

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-20 h-20 rounded-2xl bg-coral flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-6 leading-tight">
                Ready to build your<br />unfair advantage?
              </h2>

              <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                Schedule a free strategy session. We'll audit your current setup and show you exactly where the opportunities are.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate?.('contact')}
                  className="group"
                >
                  Get Free Audit
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                >
                  View Case Studies
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AllServicesPage;
