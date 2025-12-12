
import React, { useState, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, Calendar, Building2, Zap, Target, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import SEO from '../ui/SEO';
import { Breadcrumbs } from '../ui/Breadcrumbs';

interface CaseStudyDetailProps {
  onBack: () => void;
  onNavigate: (page: any) => void;
  project?: any;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ onBack, onNavigate, project }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80',
    keyFeatures: ['Custom Headless Architecture', 'Granular Conversion Tracking', 'Sales Funnel Automation'],
    testimonial: {
      quote: "The results speak for themselves. We've never seen this level of growth in such a short period.",
      author: "Sarah Jenkins",
      role: "CEO, Apex Architecture"
    }
  };

  const tableOfContents = [
    { id: 'overview', label: 'Overview' },
    { id: 'results', label: 'Results' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Solution' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-ivory min-h-screen pt-32 pb-20">
      <SEO title={`${data.client} Case Study | Castells Agency`} description={data.description} />
      <div className="container mx-auto px-6">

        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Work', action: () => onNavigate('work') },
              { label: data.client, active: true }
            ]}
          />
        </div>

        {/* HERO IMAGE - Full Width, Card Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[400px] rounded-[2rem] overflow-hidden mb-12 group cursor-pointer"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black">
            <img
              src={data.image}
              alt={data.client}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-widest">
                {data.year} — {data.industry}
              </div>
              <Button size="sm" variant="outline-white" className="backdrop-blur-md flex items-center gap-2">
                View Live <ExternalLink className="w-3 h-3" />
              </Button>
            </div>

            {/* Bottom Content */}
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-medium text-white mb-3 tracking-tight leading-none">
                {data.client}
              </h1>
              <div className="flex flex-wrap gap-2">
                {data.services?.map((s: string) => (
                  <span key={s} className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white/80 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* TWO COLUMN LAYOUT: 70/30 */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT COLUMN: Main Content (70%) */}
          <div className="lg:w-[70%] relative">

            {/* Reading Progress Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black/5 rounded-full hidden lg:block">
              <motion.div
                className="w-full bg-coral rounded-full origin-top"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>

            {/* Content */}
            <div className="lg:pl-8 space-y-12">

              {/* Overview */}
              <section id="overview">
                <p className="text-xl text-text-secondary leading-relaxed">
                  {data.description}
                </p>
              </section>

              {/* Results */}
              <section id="results" className="bg-white rounded-2xl p-8 border border-black/5">
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-coral" />
                  </span>
                  Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.results?.map((res: any, idx: number) => (
                    <div key={idx} className="bg-ivory/50 rounded-xl p-5">
                      <div className="font-display text-3xl font-bold text-text-primary mb-1">
                        {res.value}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                        {res.label}
                        <span className="text-coral bg-coral/10 px-1.5 py-0.5 rounded text-[10px]">{res.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Challenge */}
              <section id="challenge" className="bg-white rounded-2xl p-8 border border-black/5">
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                    <Target className="w-4 h-4 text-text-secondary" />
                  </span>
                  The Challenge
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {data.challenge}
                </p>
              </section>

              {/* Solution */}
              <section id="solution" className="bg-white rounded-2xl p-8 border border-black/5">
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-coral" />
                  </span>
                  The Solution
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {data.solution}
                </p>
                {data.keyFeatures && (
                  <div className="bg-ivory/50 rounded-xl p-5">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-text-secondary mb-4">Key Deliverables</h3>
                    <ul className="space-y-3">
                      {data.keyFeatures.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-text-primary text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* Testimonial */}
              {data.testimonial && (
                <section className="bg-black text-white rounded-2xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-coral/20 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="text-coral text-5xl font-serif leading-none mb-4">"</div>
                    <blockquote className="font-display text-xl md:text-2xl font-medium leading-relaxed mb-6">
                      {data.testimonial.quote}
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
                        {data.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <cite className="not-italic font-bold text-white text-sm block">
                          {data.testimonial.author}
                        </cite>
                        <span className="text-white/60 text-xs">
                          {data.testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (30%) */}
          <div className="lg:w-[30%]">
            <div className="lg:sticky lg:top-32 space-y-4">

              {/* TOC */}
              <div className="bg-white rounded-2xl p-5 border border-black/5">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-text-secondary mb-3">On this page</h3>
                <div className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-black hover:text-white transition-all text-text-primary text-sm font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="bg-white rounded-2xl p-5 border border-black/5">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-text-secondary mb-3">Written by</h3>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                    alt="Author"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-text-primary text-sm">Dmitry Castells</p>
                    <p className="text-text-secondary text-xs">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Why Us */}
              <div className="bg-white rounded-2xl p-5 border border-black/5">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-text-secondary mb-3">Why Castells</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-coral" />
                    </div>
                    <span className="text-sm font-medium">Revenue-First Approach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-coral" />
                    </div>
                    <span className="text-sm font-medium">Fast Execution</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-coral" />
                    </div>
                    <span className="text-sm font-medium">200+ Projects</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-black text-white rounded-2xl p-5">
                <p className="font-display text-lg font-bold mb-1">Ready to grow?</p>
                <p className="text-white/60 text-xs mb-4">Get a free strategy audit</p>
                <Button
                  onClick={() => onNavigate('contact')}
                  size="md"
                  variant="secondary"
                  className="w-full"
                >
                  Get Free Audit
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
