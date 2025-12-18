import React from 'react';
import { motion } from 'framer-motion';
import type { NavigateFn } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import AnimatedHeading from '../ui/AnimatedHeading';
import Counter from '../ui/Counter';
import SEO from '../ui/SEO';
import {
  Users, Flag, Briefcase, ArrowRight, ArrowUpRight,
  FileText, Mail, Newspaper, Target, Award, Heart,
  Zap, Globe, TrendingUp, CheckCircle, Star, MapPin,
  Calendar, Clock, DollarSign, Rocket, Shield, Eye
} from 'lucide-react';

interface CompanyPageProps {
  onBack?: () => void;
  onNavigate?: NavigateFn;
}

const STATS = [
  { value: 12, suffix: '+', label: 'Years in Business' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: 'M+', label: 'Revenue Generated' },
  { value: 35, suffix: '', label: 'Team Members' },
];

const VALUES = [
  {
    icon: Target,
    title: 'Revenue Obsessed',
    description: 'We measure success by your bottom line, not vanity metrics. Every decision is optimized for ROI.'
  },
  {
    icon: Zap,
    title: 'Speed is Currency',
    description: 'Money loves speed. We launch campaigns in days, not months. Every hour counts in the market.'
  },
  {
    icon: Shield,
    title: 'Radical Transparency',
    description: 'No hidden fees, no black boxes. You see exactly where every dollar goes and what it generates.'
  },
  {
    icon: Eye,
    title: 'Data, Not Gut',
    description: 'We don\'t guess—we test. Every decision is backed by data, every pivot is evidence-based.'
  },
  {
    icon: Heart,
    title: 'Ownership Mentality',
    description: 'We treat your business as our own. Your growth is our reputation. We win together.'
  },
  {
    icon: Rocket,
    title: 'Relentless Improvement',
    description: 'Good enough is never enough. We optimize, iterate, and push boundaries every single day.'
  },
];

const TEAM_HIGHLIGHTS = [
  { label: 'Ex-Google', count: 4 },
  { label: 'Ex-Meta', count: 3 },
  { label: 'Ex-Agency Founders', count: 5 },
  { label: 'Certified Experts', count: 20 },
];

const OPEN_POSITIONS = [
  { title: 'Senior Performance Marketer', location: 'Remote', type: 'Full-time' },
  { title: 'Full-Stack Developer', location: 'Remote', type: 'Full-time' },
  { title: 'Account Manager', location: 'Los Angeles', type: 'Full-time' },
  { title: 'Content Strategist', location: 'Remote', type: 'Contract' },
];

const BLOG_POSTS = [
  { title: 'How We Generated $2.4M for a Roofing Company', category: 'Case Study', date: 'Dec 10, 2024' },
  { title: 'The Death of Vanity Metrics', category: 'Insights', date: 'Dec 5, 2024' },
  { title: 'Google Ads in 2025: What Changes', category: 'Strategy', date: 'Nov 28, 2024' },
];

const CompanyPage: React.FC<CompanyPageProps> = ({ onBack, onNavigate }) => {
  return (
    <>
      <SEO 
        title="Company | Castells Agency" 
        description="The Anti-Agency. 12+ years in business, 500+ projects delivered, $50M+ revenue generated. Revenue-obsessed digital marketing agency."
        canonical="/company"
      />
      <div className="min-h-screen bg-ivory dark:bg-[#191919]">

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
                { label: 'Company', active: true },
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
                <Badge variant="pulse" className="mb-6">The Anti-Agency</Badge>
              </motion.div>

              <AnimatedHeading
                as="h1"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-text-primary mb-6"
                delay={0.2}
              >
                Built for founders<br />
                <span className="text-text-secondary">who think like owners.</span>
              </AnimatedHeading>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-8"
              >
                We founded Castells with a simple thesis: Most agencies burn their clients' 
                money on vanity metrics. We built an infrastructure obsessed with one thing—Revenue.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button onClick={() => onNavigate?.('contact')} size="lg" className="group">
                  Work With Us
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button onClick={() => onNavigate?.('careers')} variant="outline" size="lg">
                  View Careers
                </Button>
              </motion.div>
            </div>

            {/* Right: Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl p-6 border border-black/5 dark:border-white/10"
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 bg-ivory border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Sticky Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <Badge className="mb-4">Our Story</Badge>
              <AnimatedHeading
                as="h2"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
                delay={0.1}
              >
                From frustration<br />
                <span className="text-text-secondary">to domination.</span>
              </AnimatedHeading>
              <Button onClick={() => onNavigate?.('about')} variant="outline" className="group">
                Read Full Story
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface rounded-2xl p-8 border border-black/5 dark:border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-coral" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-text-secondary">2012</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-text-primary">The Beginning</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Founded by marketers who were tired of watching agencies waste client budgets on impressions and clicks 
                    that didn't convert. We started with a radical idea: what if we only got paid when our clients grew?
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-surface rounded-2xl p-8 border border-black/5 dark:border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-coral" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-text-secondary">Today</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-text-primary">The Reality</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Over $50M in revenue generated for our clients. 500+ projects delivered. A team of 35 specialists 
                    who eat, sleep, and breathe performance marketing. We're not the biggest agency—we're the most effective.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-surface rounded-2xl p-8 border border-black/5 dark:border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-coral" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-text-secondary">Mission</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-text-primary">The Future</h3>
                  <p className="text-text-secondary leading-relaxed">
                    We're building the infrastructure that turns local businesses into market dominators. 
                    Our goal is simple: become the unfair advantage for every founder who refuses to settle for average.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <AnimatedHeading
              as="h2"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
              delay={0.1}
            >
              What we stand for
            </AnimatedHeading>
            <p className="text-lg text-text-secondary leading-relaxed">
              These aren't corporate buzzwords on a wall. These are the principles that guide every decision, 
              every campaign, and every client relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface rounded-2xl p-8 border border-black/5 dark:border-white/10 hover:border-coral/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-6 group-hover:bg-coral/20 transition-colors">
                    <Icon className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-text-primary">{value.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-ivory border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Sticky Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <Badge className="mb-4">Leadership</Badge>
              <AnimatedHeading
                as="h2"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
                delay={0.1}
              >
                Meet the<br />
                <span className="text-text-secondary">Minds.</span>
              </AnimatedHeading>
              <p className="text-text-secondary leading-relaxed mb-6">
                The people behind the millions. We don't outsource. We execute.
              </p>
              <Button onClick={() => onNavigate?.('team')} variant="outline" className="group">
                View Full Team
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right: Team Stats */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {TEAM_HIGHLIGHTS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-surface rounded-2xl p-6 border border-black/5 dark:border-white/10"
                  >
                    <div className="font-display text-4xl font-bold text-coral mb-2">{item.count}</div>
                    <div className="text-text-secondary font-medium">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface rounded-2xl p-8 border border-black/5 dark:border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-coral" />
                  </div>
                  <span className="font-display text-lg font-semibold text-text-primary">Why We're Different</span>
                </div>
                <ul className="space-y-4">
                  {[
                    'No junior account managers—you work directly with specialists',
                    'Every team member has run their own campaigns with real budgets',
                    'We hire owners, not employees—everyone has skin in the game',
                    'Continuous education: $10k/year per team member for certifications',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Sticky Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <Badge className="mb-4">Careers</Badge>
              <AnimatedHeading
                as="h2"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
                delay={0.1}
              >
                Join the<br />
                <span className="text-text-secondary">Elite.</span>
              </AnimatedHeading>
              <p className="text-text-secondary leading-relaxed mb-6">
                We hire owners, not employees. If you think like a founder and execute like a machine, we want you.
              </p>
              <Button onClick={() => onNavigate?.('careers')} variant="outline" className="group">
                All Open Positions
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right: Open Positions */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {OPEN_POSITIONS.map((position, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => onNavigate?.('careers')}
                    className="bg-surface rounded-2xl p-6 border border-black/5 dark:border-white/10 hover:border-coral/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-coral transition-colors">
                          {position.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-text-secondary group-hover:text-coral transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 bg-coral/10 rounded-2xl p-6 border border-coral/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-coral" />
                  <span className="font-display font-semibold text-text-primary">Don't see your role?</span>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  We're always looking for exceptional talent. Send us your portfolio and tell us why you'd be a great fit.
                </p>
                <Button onClick={() => onNavigate?.('contact')} size="sm" variant="outline">
                  Submit Application
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 md:py-32 bg-ivory border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Sticky Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <Badge className="mb-4">Blog & Insights</Badge>
              <AnimatedHeading
                as="h2"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6"
                delay={0.1}
              >
                Knowledge<br />
                <span className="text-text-secondary">is power.</span>
              </AnimatedHeading>
              <p className="text-text-secondary leading-relaxed mb-6">
                Real strategies, real results. No fluff, no gatekeeping—just actionable insights from the trenches.
              </p>
              <Button onClick={() => onNavigate?.('blog')} variant="outline" className="group">
                Read All Articles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right: Blog Posts */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {BLOG_POSTS.map((post, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => onNavigate?.('blog')}
                    className="bg-surface rounded-2xl p-6 border border-black/5 dark:border-white/10 hover:border-coral/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-bold uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="text-sm text-text-secondary">{post.date}</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-coral transition-colors">
                          {post.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-text-secondary group-hover:text-coral transition-colors shrink-0 ml-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-surface rounded-3xl p-12 md:p-20 overflow-hidden border border-black/5 dark:border-white/5"
          >
            <div className="relative z-10 max-w-2xl">
              <Badge className="mb-6">Get Started</Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-text-primary mb-6">
                Ready to build your<br />
                <span className="text-text-secondary">unfair advantage?</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                Schedule a free strategy session. We'll audit your current setup and show you 
                exactly where the opportunities are.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => onNavigate?.('contact')} size="lg" className="group">
                  Get Free Audit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button onClick={() => onNavigate?.('work')} variant="outline" size="lg">
                  View Case Studies
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 dark:opacity-20">
              <div className="absolute top-20 right-20 w-40 h-40 rounded-full border-2 border-coral" />
              <div className="absolute bottom-20 right-40 w-60 h-60 rounded-full border border-coral" />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
    </>
  );
};

export default CompanyPage;

