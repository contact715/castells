import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { NavigateFn } from '../../types';
import { INDUSTRY_CATEGORIES } from '../../data/industries';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import AnimatedHeading from '../ui/AnimatedHeading';
import Counter from '../ui/Counter';
import SEO from '../ui/SEO';
import {
  Hammer, Home, Car, Briefcase, ArrowRight, ArrowUpRight,
  Zap, Droplets, PaintBucket, Sun, Ruler, ShieldCheck,
  LayoutGrid, Palette, Sparkles, Scale, FileText, Frame,
  ChevronRight, Target, TrendingUp, Users, Clock
} from 'lucide-react';

interface AllIndustriesPageProps {
  onBack?: () => void;
  onNavigate?: NavigateFn;
}

const INDUSTRIES_CATEGORIES = INDUSTRY_CATEGORIES.map((category) => ({
  id: category.id,
  name: category.label,
  tagline: category.tagline,
  description: category.description,
  icon: category.icon,
  industries: category.items
    .filter((i) => i.type === 'industry')
    .map((i) => ({ name: i.name, desc: i.description, icon: i.icon, slug: i.slug })),
}));

const STATS = [
  { value: 500, suffix: '+', label: 'Campaigns Launched' },
  { value: 47, suffix: '+', label: 'Industries Served' },
  { value: 3.2, suffix: 'x', label: 'Average ROAS' },
  { value: 50, suffix: 'M+', label: 'Revenue Generated' },
];

const AllIndustriesPage: React.FC<AllIndustriesPageProps> = ({ onBack, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919]">
      <SEO
        title="Industries | Castells Agency"
        description="Explore the high-ticket industries we specialize in—from construction to professional services."
        canonical="/industries"
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
                { label: 'Industries', active: true },
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
                <Badge variant="pulse" className="mb-6">Industries We Serve</Badge>
              </motion.div>

              <AnimatedHeading
                as="h1"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-text-primary mb-6"
                delay={0.2}
              >
                Dominate your<br />
                <span className="text-text-secondary">market.</span>
              </AnimatedHeading>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-8"
              >
                Proven growth strategies tailored to your industry's unique challenges. 
                We've helped businesses like yours generate millions in revenue.
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
                <Button variant="outline" size="lg" onClick={() => onNavigate?.('work')} className="group">
                  View Case Studies
                  <ArrowUpRight className="w-4 h-4 ml-2" />
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

      {/* Industry Categories Overview */}
      <section className="py-20 md:py-32 bg-ivory dark:bg-[#191919] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <Badge className="mb-4">Specializations</Badge>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
              delay={0.1}
            >
              Deep expertise in<br />
              <span className="text-text-secondary">high-value industries</span>
            </AnimatedHeading>
            <p className="text-lg text-text-secondary leading-relaxed">
              We don't do generic marketing. Each industry has unique challenges, customer behaviors, 
              and competitive landscapes. Our specialized teams know your market inside and out.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES_CATEGORIES.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => setActiveCategory(index)}
                  className={`relative bg-white dark:bg-surface rounded-2xl p-6 border border-black/5 dark:border-white/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${activeCategory === index ? 'ring-2 ring-coral' : ''}`}
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

      {/* Detailed Industry Sections */}
      {INDUSTRIES_CATEGORIES.map((category, categoryIndex) => {
        const CategoryIcon = category.icon;
        return (
          <section
            key={category.id}
            className="py-20 md:py-32 bg-ivory"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Left: Category Info (Sticky) */}
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
                    <Button variant="outline" size="md" onClick={() => onNavigate?.('contact')} className="group">
                      Get Industry Report
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>

                {/* Right: Industries Grid */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.industries.map((industry, industryIndex) => {
                      const IndustryIcon = industry.icon;
                      return (
                        <motion.div
                          key={industry.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: industryIndex * 0.1, duration: 0.5 }}
                          className="bg-white dark:bg-surface rounded-2xl p-6 border border-black/5 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-coral transition-colors duration-300">
                              <IndustryIcon className="w-6 h-6 text-text-primary group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
                                {industry.name}
                              </h3>
                              <p className="text-sm text-text-secondary leading-relaxed">
                                {industry.desc}
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

      {/* Why Industry Expertise Matters */}
      <section className="py-20 md:py-32 bg-ivory dark:bg-[#191919] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <Badge className="mb-4">The Advantage</Badge>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
              delay={0.1}
            >
              Why industry expertise<br />
              <span className="text-text-secondary">matters</span>
            </AnimatedHeading>
            <p className="text-lg text-text-secondary leading-relaxed">
              Generic agencies waste your money learning your industry. We already know it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Precise Targeting', desc: 'We know exactly who your ideal customers are and where to find them online.' },
              { icon: TrendingUp, title: 'Proven Playbooks', desc: 'Battle-tested strategies that have generated millions for businesses like yours.' },
              { icon: Clock, title: 'Faster Results', desc: 'No learning curve. We hit the ground running with industry-specific campaigns.' },
              { icon: Users, title: 'Competitor Intel', desc: 'Deep knowledge of your competitive landscape and how to outmaneuver them.' },
              { icon: Scale, title: 'Realistic Benchmarks', desc: 'We know what good looks like in your industry and set achievable targets.' },
              { icon: Sparkles, title: 'Industry Networks', desc: 'Connections with vendors, partners, and media specific to your vertical.' },
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
            className="relative bg-white dark:bg-surface rounded-3xl p-12 md:p-20 overflow-hidden border border-black/5 dark:border-white/5"
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
                Ready to dominate<br />your market?
              </h2>

              <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
                Get a free industry analysis. We'll show you exactly where the opportunities are in your market.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate?.('contact')}
                  className="group"
                >
                  Get Free Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate?.('work')}
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

export default AllIndustriesPage;


