
import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Zap } from 'lucide-react';
import ScrollFloat from '../effects/ScrollFloat';
import { Highlighter } from '../ui/Highlighter';
import Team from '../sections/Team';

import { Breadcrumbs } from '../ui/Breadcrumbs';
import { PageView } from '../../App';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (page: PageView, data?: any) => void;
}

import SEO from '../ui/SEO';

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-ivory min-h-screen pt-32 pb-20 animate-in fade-in duration-500">
      <SEO title="About Us | Castells Agency" description="We are the Anti-Agency. Obsessed with revenue, not vanity metrics." />
      <div className="container mx-auto px-6">

        {/* Navigation */}
        <div className="mb-12">
          <Breadcrumbs
            items={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'About', active: true }
            ]}
          />
        </div>

        {/* Hero */}
        <div className="max-w-4xl mb-24">
          <h1 className="font-display text-6xl md:text-8xl font-medium leading-[1.1] mb-8">
            We are the <br />
            <span className="text-coral italic">Anti-Agency.</span>
          </h1>
          <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10 mb-8" />
          <p className="text-2xl text-text-secondary font-light leading-relaxed">
            We founded Castells in 2012 with a simple thesis: Most agencies are burning their clients' money on vanity metrics. We built an infrastructure obsessed with one thing: <strong>Revenue.</strong>
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="bg-white p-10 rounded-2xl border border-black/5">
            <Target className="w-10 h-10 text-coral mb-6" />
            <h3 className="font-display text-2xl font-bold mb-4">Precision First</h3>
            <p className="text-text-secondary">We don't guess. We test. Every decision is backed by data, not gut feelings.</p>
          </div>
          <div className="bg-white p-10 rounded-2xl border border-black/5">
            <Zap className="w-10 h-10 text-coral mb-6" />
            <h3 className="font-display text-2xl font-bold mb-4">Velocity</h3>
            <p className="text-text-secondary">Money loves speed. We launch campaigns in days, not months.</p>
          </div>
          <div className="bg-white p-10 rounded-2xl border border-black/5">
            <Users className="w-10 h-10 text-coral mb-6" />
            <h3 className="font-display text-2xl font-bold mb-4">Partnership</h3>
            <p className="text-text-secondary">We aren't a vendor. We are your growth department.</p>
          </div>
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
