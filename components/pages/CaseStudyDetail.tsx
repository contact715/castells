import React, { useState, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, Calendar, Building2, TrendingUp, Target, CheckCircle2, ExternalLink, Zap, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import SEO from '../ui/SEO';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { CASE_STUDIES } from '../../constants';
import type { CaseStudy } from '../../constants';
import type { NavigateFn } from '../../types';

interface CaseStudyDetailProps {
  onBack: () => void;
  onNavigate: NavigateFn;
  project?: Partial<CaseStudy>;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ onBack, onNavigate, project }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = tableOfContents.map(item => item.id);
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observers: IntersectionObserver[] = [];
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Find case study from constants or use project data
  const caseStudyId = project?.id != null ? String(project.id) : undefined;
  const caseStudy = caseStudyId
    ? CASE_STUDIES.find(cs => cs.id === caseStudyId)
    : null;
  
  const data = caseStudy || project || {
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
    <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-32 pb-20">
      <SEO title={`${data.client} Case Study | Castells Agency`} description={data.description} />
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Breadcrumbs
            items={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Work', action: () => onNavigate('work') },
              { label: data.client, active: true }
            ]}
          />
        </div>

        {/* Hero Image with Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[500px] rounded-[2rem] overflow-hidden mb-12 group"
        >
          <div className="absolute inset-0 bg-black">
            <img
              src={data.image}
              alt={data.client}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
            {/* Top: Badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="font-bold uppercase tracking-widest text-white text-xs">
                Case Study
              </span>
            </div>

            {/* Bottom: Title, Description and Meta */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-[1.1] tracking-tight">
                {data.client}
              </h1>
              <p className="text-lg text-white/90 mb-6 max-w-3xl leading-relaxed">
                {data.description}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{data.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{data.industry}</span>
                </div>
                {data.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{data.location}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {data.services?.map((s: string) => (
                  <span key={s} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-widest">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Main Content (70%) */}
          <div className="lg:w-[70%] relative">
            {/* Reading Progress Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black/5 dark:bg-white/10 rounded-full hidden lg:block">
              <motion.div
                className="w-full bg-coral rounded-full origin-top"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>

            {/* Content */}
            <div className="lg:pl-8 space-y-8">
              {/* Overview */}
              <section id="overview">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-xl text-text-secondary dark:text-white/80 leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </section>

              {/* Results */}
              <section id="results" className="space-y-4">
                <h2 className="font-display text-3xl font-semibold text-text-primary dark:text-white leading-tight">
                  Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.results?.map((res: any, idx: number) => (
                    <div key={idx} className="bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-[2rem] p-6">
                      <div className="font-display text-3xl font-bold text-text-primary dark:text-white mb-2">
                        {res.value}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/60 mb-1">
                        {res.label}
                      </div>
                      <div className="text-coral text-sm font-semibold">
                        {res.growth}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Challenge */}
              <section id="challenge" className="space-y-4">
                <h2 className="font-display text-3xl font-semibold text-text-primary dark:text-white leading-tight">
                  The Challenge
                </h2>
                <p className="text-lg text-text-secondary dark:text-white/70 leading-relaxed">
                  {data.challenge}
                </p>
              </section>

              {/* Solution */}
              <section id="solution" className="space-y-4">
                <h2 className="font-display text-3xl font-semibold text-text-primary dark:text-white leading-tight">
                  The Solution
                </h2>
                <p className="text-lg text-text-secondary dark:text-white/70 leading-relaxed mb-6">
                  {data.solution}
                </p>
                {data.keyFeatures && (
                  <div className="bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-[2rem] p-6">
                    <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white mb-4">Key Deliverables</h3>
                    <ul className="space-y-3">
                      {data.keyFeatures.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-text-primary dark:text-white">
                          <CheckCircle2 className="w-5 h-5 text-coral flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* Testimonial */}
              {data.testimonial && (
                <div className="pt-8 border-t border-black/10 dark:border-white/10">
                  <div className="text-coral text-5xl font-serif leading-none mb-4">"</div>
                  <blockquote className="font-display text-xl md:text-2xl font-medium leading-relaxed mb-6 text-text-primary dark:text-white">
                    {data.testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center text-coral font-bold text-lg">
                      {data.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic font-bold text-text-primary dark:text-white text-sm block">
                        {data.testimonial.author}
                      </cite>
                      <span className="text-text-secondary dark:text-white/60 text-xs">
                        {data.testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar (30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-32 space-y-6">
              {/* Back Button */}
              <Button
                onClick={onBack}
                variant="primary"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Work
              </Button>

              {/* TOC */}
              <div className="bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-[2rem] p-6">
                <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-4">
                  On this page
                </h3>
                <div className="space-y-2">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                        activeSection === item.id
                          ? 'bg-coral text-white'
                          : 'text-text-primary dark:text-white hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Why Castells */}
              <div className="bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-[2rem] p-6">
                <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-4">
                  Why Castells
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-coral/10 dark:bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary dark:text-white mb-1">
                        Revenue-First Approach
                      </div>
                      <div className="text-xs text-text-secondary dark:text-white/60">
                        We optimize exclusively for revenue and ROAS, not vanity metrics.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-coral/10 dark:bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary dark:text-white mb-1">
                        Fast Execution
                      </div>
                      <div className="text-xs text-text-secondary dark:text-white/60">
                        Campaigns live within 14 days. Speed to market matters.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-coral/10 dark:bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-coral" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary dark:text-white mb-1">
                        200+ Projects
                      </div>
                      <div className="text-xs text-text-secondary dark:text-white/60">
                        Proven track record across industries and markets.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-[2rem] p-6">
                <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white mb-2">
                  Ready to grow?
                </h3>
                <p className="text-text-secondary dark:text-white/60 text-sm mb-4">
                  Get a free strategy audit
                </p>
                <Button
                  onClick={() => onNavigate('contact')}
                  size="md"
                  variant="primary"
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
