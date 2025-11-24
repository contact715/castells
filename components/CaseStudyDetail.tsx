
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { RippleButton } from './RippleButton';
import ScrollFloat from './ScrollFloat';
import { Highlighter } from './Highlighter';

interface CaseStudyDetailProps {
  onBack: () => void;
  project?: any;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ onBack, project }) => {
  // Fallback data if no project is passed
  const data = project || {
    client: 'Apex Architecture',
    industry: 'Construction',
    year: '2024',
    services: ['Brand Identity', 'Web Development', 'SEO'],
    description: 'A complete digital transformation for a leading sustainable architecture firm looking to dominate the luxury residential market.',
    challenge: "Apex was losing market share to younger, digital-native firms. Their legacy website didn't reflect their premium status, and their lead pipeline was dependent on referrals.",
    solution: "We rebuilt their brand identity to emphasize 'Sustainability as Luxury'. We deployed a headless CMS website optimized for local SEO and launched a targeted Meta Ads campaign focusing on high-net-worth individuals.",
    results: [
      { label: "Monthly Revenue", value: "$697k", growth: "+210%" },
      { label: "Cost Per Lead", value: "$42", growth: "-65%" },
      { label: "Organic Traffic", value: "12k", growth: "+400%" },
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80'
  };

  return (
    <div className="bg-ivory min-h-screen pt-32 pb-20 animate-in fade-in duration-500">
      <div className="container mx-auto px-6">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-coral transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </button>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">{data.industry} — {data.year}</span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-medium leading-none tracking-tight mb-8">
              {data.client}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
              {data.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {data.services.map((s: string) => (
              <span key={s} className="px-4 py-2 border border-black/10 rounded-full text-xs font-bold uppercase tracking-widest bg-white">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden mb-24"
        >
          <img 
            src={data.image} 
            alt={data.client} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Results Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 border-y border-black/10 py-12">
          {data.results.map((res: any, idx: number) => (
            <div key={idx} className="text-center md:text-left">
              <div className="font-display text-5xl md:text-6xl font-medium text-text-primary mb-2">
                {res.value}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary">
                {res.label}
                <span className="text-coral bg-coral/10 px-2 py-0.5 rounded text-[10px]">{res.growth}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-4">
             <h3 className="font-display text-3xl font-medium mb-6">The Challenge</h3>
             <p className="text-text-secondary leading-relaxed text-lg">
               {data.challenge}
             </p>
          </div>
          <div className="lg:col-span-8">
             <h3 className="font-display text-3xl font-medium mb-6">The Solution</h3>
             <p className="text-text-secondary leading-relaxed text-lg mb-8">
               {data.solution}
             </p>
             <ul className="space-y-4">
               {['Developed custom headless architecture', 'Implemented granular conversion tracking', 'Restructured sales funnel automation'].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-text-primary font-medium">
                   <CheckCircle2 className="w-5 h-5 text-coral" />
                   {item}
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Next Project CTA */}
        <div className="bg-black text-white rounded-3xl p-12 md:p-24 text-center relative overflow-hidden group cursor-pointer">
           <div className="absolute inset-0 bg-coral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />
           <div className="relative z-10">
             <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-6">Ready to replicate these results?</p>
             <h2 className="font-display text-5xl md:text-7xl font-medium mb-8">
               Start Your Project
             </h2>
             <RippleButton className="bg-white text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform" rippleColor="#000">
                Get Audit
             </RippleButton>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CaseStudyDetail;
