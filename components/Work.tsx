
import React from 'react';
import { ArrowUpRight, TrendingUp, MapPin, Layers } from 'lucide-react';
import { RippleButton } from './RippleButton';
import ScrollFloat from './ScrollFloat';
import { PageView } from '../App';
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';

interface WorkProps {
  onNavigate?: (page: PageView, data?: any) => void;
}

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  metric: string;
  metricLabel: string;
  secondaryMetric?: string;
  secondaryLabel?: string;
  image: string;
  description: string;
  services: string[];
  color: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '01',
    client: 'Desert Cool HVAC',
    industry: 'Home Services',
    location: 'Phoenix, AZ',
    year: '2024',
    metric: '$697K',
    metricLabel: 'Added Revenue (Q1)',
    secondaryMetric: '+287%',
    secondaryLabel: 'YoY Growth',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80',
    description: 'We restructured their entire digital acquisition pipeline, moving from low-quality shared leads to a proprietary exclusive lead system. The result was dominance in the Phoenix metro area.',
    services: ['Lead Gen', 'Google Ads', 'CRM Automation'],
    color: '#E08576'
  },
  {
    id: '02',
    client: 'Apex Roofing',
    industry: 'Construction',
    location: 'Dallas, TX',
    year: '2023',
    metric: '14x',
    metricLabel: 'Return on Ad Spend',
    secondaryMetric: '698',
    secondaryLabel: 'Qualified Leads',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80',
    description: 'Dominated the Dallas market during peak storm season with high-intent retargeting strategies and AI-driven appointment setting.',
    services: ['Local SEO', 'Meta Ads', 'AI Agents'],
    color: '#3B82F6'
  },
  {
    id: '03',
    client: 'SunPower Solutions',
    industry: 'Solar Energy',
    location: 'California',
    year: '2024',
    metric: '$2.3M',
    metricLabel: 'First Year Revenue',
    secondaryMetric: '156',
    secondaryLabel: 'Installations',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',
    description: 'Built a complete brand infrastructure from scratch, scaling to over 150 installs in the first year through aggressive video marketing.',
    services: ['Brand Strategy', 'Video Production', 'Youtube Ads'],
    color: '#10B981'
  },
  {
    id: '04',
    client: 'Elite Legal Group',
    industry: 'Legal Services',
    location: 'New York, NY',
    year: '2023',
    metric: '300%',
    metricLabel: 'Case Load Increase',
    secondaryMetric: '$450',
    secondaryLabel: 'Cost Per Case',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1600&q=80',
    description: 'Implemented a high-ticket personal injury lead generation system that automatically qualifies consultations before they ever speak to an attorney.',
    services: ['PPC', 'Workflow Automation', 'Web Design'],
    color: '#8B5CF6'
  },
  {
    id: '05',
    client: 'Velos Motors',
    industry: 'Automotive',
    location: 'Miami, FL',
    year: '2024',
    metric: '$1.8M',
    metricLabel: 'Inventory Sold',
    secondaryMetric: '12d',
    secondaryLabel: 'Avg Days on Lot',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80',
    description: 'Transformed a local dealership into a regional powerhouse using inventory-feed ads and hyper-targeted lifestyle creative on Instagram.',
    services: ['Meta Ads', 'Inventory Feed', 'Creative Strategy'],
    color: '#F59E0B'
  },
  {
    id: '06',
    client: 'Pure Life Med Spa',
    industry: 'Health & Beauty',
    location: 'Beverly Hills, CA',
    year: '2023',
    metric: '450+',
    metricLabel: 'New Appointments',
    secondaryMetric: '$150k',
    secondaryLabel: 'Monthly Rec. Rev',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600&q=80',
    description: 'Launched a membership-focused marketing funnel that filled their calendar 3 months in advance with high-value recurring clients.',
    services: ['Membership Funnel', 'Email Marketing', 'Paid Social'],
    color: '#EC4899'
  },
  {
    id: '07',
    client: 'Urban Greens',
    industry: 'Sustainable Design',
    location: 'Austin, TX',
    year: '2024',
    metric: '210%',
    metricLabel: 'Traffic Growth',
    secondaryMetric: 'Top 3',
    secondaryLabel: 'Rank for Keywords',
    image: 'https://images.unsplash.com/photo-1585320269677-44d34ee62380?w=1600&q=80',
    description: 'An aggressive content SEO strategy combined with a rebrand established them as the #1 sustainable landscaper in the Austin metro area.',
    services: ['SEO', 'Content Marketing', 'Rebranding'],
    color: '#06B6D4'
  }
];

const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  return (
    <section id="work" className="bg-ivory relative border-t border-black/5">
      <div className="container mx-auto px-6 pt-32 pb-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest mb-6 text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
              Selected Works 2023-2025
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-8 leading-tight tracking-tight">
              <ScrollFloat as="span" containerClassName="block">Proven</ScrollFloat>
              <span className="text-coral italic">
                <ScrollFloat as="span" containerClassName="inline-block">Dominance.</ScrollFloat>
              </span>
            </h2>
            <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10 mb-8" />
            <p className="text-xl text-text-secondary font-light max-w-xl leading-relaxed">
              We track every click, call, and conversion. Our portfolio isn't just a gallery of pretty pictures—it's a ledger of market conquests.
            </p>
          </div>
          <div className="hidden md:block pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary animate-pulse">
              <Layers className="w-4 h-4" />
              Scroll to explore stack
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Stack Implementation */}
      <div className="w-full relative px-4 md:px-6">
        <ScrollStack
          stackOffset={140} // 140px from top
          scaleFactor={0.08} // Stronger scaling effect
          blurAmount={8}
        >
          {CASE_STUDIES.map((project, idx) => (
            <ScrollStackItem key={project.id}>
              <StackCard
                project={project}
                index={idx}
                onClick={() => onNavigate?.('case-study', project)}
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      <div className="container mx-auto px-6 pb-32 pt-12 text-center">
        <RippleButton
          onClick={() => onNavigate?.('home')}
          className="bg-black text-white dark:bg-white dark:text-black rounded-xl px-10 py-4 font-bold text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          View Full Archive
        </RippleButton>
      </div>
    </section>
  );
};

// Redesigned Card for Stacking - "Immersive Overlay" Aesthetic
const StackCard: React.FC<{ project: CaseStudy; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[600px] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 relative group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
    >
      {/* Full Background Image */}
      <div className="absolute inset-0 bg-black">
        <img
          src={project.image}
          alt={project.client}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between z-10">

        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest">
            {project.year} — {project.industry}
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Content */}
        <div>
          <div className="mb-8">
            <h3 className="font-display text-6xl md:text-8xl font-medium text-white mb-4 tracking-tight leading-none">
              {project.client}
            </h3>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="flex gap-12 pt-8 border-t border-white/10">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">{project.metric}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{project.metricLabel}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">{project.secondaryMetric}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{project.secondaryLabel}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Work;
