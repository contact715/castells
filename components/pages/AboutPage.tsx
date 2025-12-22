
import React, { useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Zap, TrendingUp, Award, Rocket, Calendar } from 'lucide-react';
import ScrollFloat from '../effects/ScrollFloat';
import { Highlighter } from '../ui/Highlighter';
import Team from '../sections/Team';
import AnimatedHeading from '../ui/AnimatedHeading';
import ScrollTimeline, { ScrollTimelineEntry } from '../ui/ScrollTimeline';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';
import SEO from '../ui/SEO';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: NavigateFn;
}

const TIMELINE_ENTRIES: ScrollTimelineEntry[] = [
  {
    year: '2017',
    title: 'The Beginning',
    icon: Rocket,
    description: `Castells was founded with a mission to break away from traditional agency models. We started with a small team of growth hackers and data scientists, determined to prove that performance marketing could be both creative and measurable.`,
    items: [
      'Founded with focus on revenue, not vanity metrics',
      'Worked with three clients in first year',
      'Proved small budgets could generate outsized returns',
      'Built foundation for data-driven methodology'
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80'
  },
  {
    year: '2018',
    title: 'First $10M in Revenue',
    icon: TrendingUp,
    description: `Our data-driven approach paid off spectacularly. We helped our first major client scale from $2M to $10M in annual revenue within 12 months. This milestone validated our thesis that revenue-focused marketing beats vanity metrics every time.`,
    items: [
      'Helped client scale from $2M to $10M in 12 months',
      '400% increase in revenue with only 150% increase in ad spend',
      'Built custom attribution models',
      'Tested hundreds of creative variations'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
  },
  {
    year: '2019',
    title: 'Team Expansion',
    icon: Users,
    description: `We grew from 5 to 25 team members, opening our Santa Monica headquarters. We hired the best talent from Google, Meta, and top agencies, building a team of growth experts who think like owners, not employees.`,
    items: [
      'Grew from 5 to 25 team members',
      'Opened Santa Monica headquarters',
      'Hired talent from Google, Meta, and top agencies',
      'Built proprietary analytics platforms'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'
  },
  {
    year: '2020',
    title: 'Pandemic Pivot',
    icon: Target,
    description: `When COVID hit, we helped 50+ businesses pivot online. We launched e-commerce campaigns that generated $50M+ in new revenue for clients. Our agility and speed became our superpower.`,
    items: [
      'Helped 50+ businesses pivot online',
      'Generated $50M+ in new revenue for clients',
      'Launched campaigns in days instead of weeks',
      'Built thriving e-commerce operations'
    ],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80'
  },
  {
    year: '2021',
    title: 'Industry Recognition',
    icon: Award,
    description: `We were named "Agency of the Year" by Growth Marketing Awards and featured in Forbes. But more importantly, our clients collectively generated over $200M in revenue through our campaigns.`,
    items: [
      'Named "Agency of the Year" by Growth Marketing Awards',
      'Featured in Forbes',
      'Clients generated over $200M in revenue',
      'Scaled methodology across industries'
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    icon: Rocket,
    description: `Opened offices in New York and London. We now serve clients across 15 countries, from startups to Fortune 500 companies. Our remote-first culture allowed us to hire the best talent globally.`,
    items: [
      'Opened offices in New York and London',
      'Serving clients across 15 countries',
      'Remote-first culture',
      'Global knowledge network'
    ],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80'
  },
  {
    year: '2023',
    title: '$500M Milestone',
    icon: TrendingUp,
    description: `Our clients collectively generated over $500M in revenue through our campaigns. We launched our proprietary growth framework and began offering fractional CMO services to scale-ups.`,
    items: [
      'Clients generated over $500M in revenue',
      'Launched proprietary growth framework',
      'Began fractional CMO services',
      'Battle-tested across hundreds of campaigns'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80'
  },
  {
    year: '2024',
    title: 'AI-Powered Growth',
    icon: Award,
    description: `We integrated AI into every aspect of our operations. Our predictive models and automated optimization systems help clients achieve 3x better ROAS. We're not just an agency—we're a growth technology company.`,
    items: [
      'AI integrated into all operations',
      '3x better ROAS for clients',
      'Predictive models and automated optimization',
      'Pioneering new way of growth marketing'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80'
  },
  {
    year: '2025',
    title: 'The Future of Growth',
    icon: Rocket,
    description: `We're building the next generation of growth marketing tools. Our platform combines AI, automation, and human expertise to deliver unprecedented results. We're not just keeping up with the future—we're creating it.`,
    items: [
      'Next-gen growth platform launch',
      'Expanded AI capabilities',
      'Global team of 50+ experts',
      'Revolutionizing client success'
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80'
  },
  {
    year: '2026',
    title: 'Industry Leadership',
    icon: TrendingUp,
    description: `As we look ahead, we're setting new standards for what a growth agency can achieve. With cutting-edge technology, world-class talent, and an unwavering focus on revenue, we're helping businesses dominate their markets.`,
    items: [
      'Industry-leading growth platform',
      'Expanded global presence',
      'Innovation in marketing technology',
      'Setting new industry standards'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
  },
];

const AboutPage: React.FC<AboutPageProps> = React.memo(({ onBack, onNavigate }) => {
  return (
    <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-16 md:pt-20 pb-20 animate-in fade-in duration-500">
      <SEO title="About Us | Castells Agency" description="We are the Anti-Agency. Obsessed with revenue, not vanity metrics." />
      <div className="container mx-auto px-6 pt-4 md:pt-6">

        {/* Header */}
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate('home') },
            { label: 'About', active: true }
          ]}
          badge="About Us"
          title="We are the Anti-Agency."
          description="We founded Castells in 2012 with a simple thesis: Most agencies are burning their clients' money on vanity metrics. We built an infrastructure obsessed with one thing: Revenue."
          onNavigate={onNavigate}
        />

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Target, title: 'Precision First', desc: "We don't guess. We test. Every decision is backed by data, not gut feelings." },
            { icon: Zap, title: 'Velocity', desc: 'Money loves speed. We launch campaigns in days, not months.' },
            { icon: Users, title: 'Partnership', desc: "We aren't a vendor. We are your growth department." }
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-surface p-10 rounded-[2rem]  -black/5 dark:-white/10 hover:-coral/50 dark:hover:-coral/40 transition-all duration-300 hover:"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Icon className="w-10 h-10 text-coral flex-shrink-0" />
                  <h3 className="font-display text-2xl font-semibold text-text-primary dark:text-white">{value.title}</h3>
                </div>
                <p className="text-text-secondary dark:text-white/70">{value.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="mb-32">
          <ScrollTimeline
            title="Our Journey"
            description="From a small team in 2017 to a global growth agency. Scroll through our story and see how we've evolved, learned, and grown alongside our clients."
            entries={TIMELINE_ENTRIES}
          />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-12 gap-4 mb-32 h-[600px]">
          <div className="col-span-8 h-full rounded-[2rem] overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" style={{ transform: 'translateZ(0)' }} alt="Office" />
            <div className="absolute bottom-6 left-6 bg-white dark:bg-surface px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-text-primary dark:text-white  -black/5 dark:-white/10">Global HQ — Santa Monica</div>
          </div>
          <div className="col-span-4 flex flex-col gap-4 h-full">
            <div className="h-1/2 rounded-[2rem] overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" style={{ transform: 'translateZ(0)' }} alt="Meeting" />
            </div>
            <div className="h-1/2 rounded-[2rem] overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" style={{ transform: 'translateZ(0)' }} alt="Team" />
            </div>
          </div>
        </div>

        {/* Reuse Team Component */}
        <div className="mb-20">
          <Team onNavigate={onNavigate} />
        </div>

      </div>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;
