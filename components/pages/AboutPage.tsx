
import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Zap, TrendingUp, Award, Rocket, Calendar } from 'lucide-react';
import ScrollFloat from '../effects/ScrollFloat';
import { Highlighter } from '../ui/Highlighter';
import Team from '../sections/Team';
import AnimatedHeading from '../ui/AnimatedHeading';
import ScrollTimeline, { ScrollTimelineEntry } from '../ui/ScrollTimeline';
import { PageHeader } from '../ui/PageHeader';
import { PageView } from '../../App';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (page: PageView, data?: any) => void;
}

import SEO from '../ui/SEO';

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
];

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-ivory min-h-screen pt-32 pb-20 animate-in fade-in duration-500">
      <SEO title="About Us | Castells Agency" description="We are the Anti-Agency. Obsessed with revenue, not vanity metrics." />
      <div className="container mx-auto px-6">

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
                className="bg-white p-10 rounded-2xl border border-black/5 hover:border-coral/50 transition-all duration-300 hover:shadow-lg"
              >
                <Icon className="w-10 h-10 text-coral mb-6" />
                <h3 className="font-display text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-text-secondary">{value.desc}</p>
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
          <div className="col-span-8 h-full rounded-3xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Office" />
            <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Global HQ — Santa Monica</div>
          </div>
          <div className="col-span-4 flex flex-col gap-4 h-full">
            <div className="h-1/2 rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Meeting" />
            </div>
            <div className="h-1/2 rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Team" />
            </div>
          </div>
        </div>

        {/* Reuse Team Component */}
        <div className="mb-20">
          <Team />
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
