import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { m as motion } from 'framer-motion';
import { ArrowLeft, Calendar, Building2, TrendingUp, Target, CheckCircle2, ExternalLink, Zap, MapPin, ArrowUpRight, FileText, Globe, User, Share2, Clock, Sparkles, Phone, Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { CASE_STUDIES } from '../../constants';
import type { CaseStudy } from '../../constants';
import type { NavigateFn } from '../../types';
import { findAuthorById, AUTHORS } from '../../data/authors';
import ShareButtons from '../ui/ShareButtons';
import { ContactButtons } from '../ui/ContactButtons';
import OptimizedImage from '../ui/OptimizedImage';

interface CaseStudyDetailProps {
  onBack: () => void;
  onNavigate: NavigateFn;
  project?: Partial<CaseStudy>;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ onBack, onNavigate, project }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [readTime, setReadTime] = useState(0);
  const [shareDropdownVisible, setShareDropdownVisible] = useState(false);
  const [assetsDropdownVisible, setAssetsDropdownVisible] = useState(false);
  const [shareDropdownPos, setShareDropdownPos] = useState({ top: 0, right: 0 });
  const [assetsDropdownPos, setAssetsDropdownPos] = useState({ top: 0, right: 0 });
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const assetsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find case study from constants or use project data
  const caseStudyId = project?.id != null ? String(project.id) : undefined;
  const caseStudy = caseStudyId
    ? CASE_STUDIES.find(cs => cs.id === caseStudyId)
    : null;
  
  // Get author for this case study (default to first author if not specified)
  const authorId = (caseStudy as any)?.authorId || (project as any)?.authorId || 'alex-castells';
  const author = findAuthorById(authorId) || AUTHORS[0];
  
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

  const tableOfContents = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'results', label: 'Results' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'solution', label: 'Solution' },
    ...(data.brandGuidelines ? [{ id: 'brand-guidelines', label: 'Brand Guidelines' }] : []),
  ], [data.brandGuidelines]);

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
  }, [tableOfContents]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate reading time
  useEffect(() => {
    const calculateReadTime = () => {
      const content = document.querySelector('[id="overview"], [id="results"], [id="challenge"], [id="solution"]');
      if (content) {
        const text = content.textContent || '';
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200); // Average reading speed: 200 words per minute
        setReadTime(minutes);
      }
    };
    
    // Calculate after content is rendered
    setTimeout(calculateReadTime, 500);
  }, [data]);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
  const enhancedDescription = `${data.description} Real results from Castells Agency's marketing strategies. Serving businesses in Santa Monica, Los Angeles, and nationwide.`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-16 md:pt-20 pb-20">
      <SEO 
        title={`${data.client} Case Study | Castells Agency - Marketing Results`} 
        description={enhancedDescription}
        canonical={`/case-studies/${data.client?.toLowerCase().replace(/\s+/g, '-')}`}
        keywords={`${data.client} case study, ${data.industry} marketing, marketing case study, digital marketing results, Santa Monica marketing agency, Los Angeles marketing services`}
        geoRegion="US-CA"
        geoPlacename="Santa Monica, California"
        summary={`Case study: How Castells Agency helped ${data.client} achieve marketing success. ${data.description} Real results from proven marketing strategies.`}
        mainEntity={`${data.client} Case Study`}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Work', item: `${siteUrl}/work` },
            { name: data.client || 'Case Study', item: `${siteUrl}/case-studies/${data.client?.toLowerCase().replace(/\s+/g, '-')}` }
          ]
        }}
      />
      <div className="container mx-auto px-6 pt-4 md:pt-6">
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
            {data.video ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={data.image}
                className="w-full h-full object-cover opacity-70 transition-opacity duration-700"
                preload="metadata"
                loading="lazy"
              >
                <source src={data.video} type="video/mp4" />
              </video>
            ) : (
              <OptimizedImage
                src={data.image}
                alt={data.client}
                loading="lazy"
                width={1600}
                height={900}
                className="w-full h-full object-cover opacity-70 transition-opacity duration-700"
              />
            )}
          </div>
          
          {/* Content Overlay with Blur Background */}
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
            {/* Gradient Blur Layer - constant gradient from top (0%) to bottom (100%) */}
            <div 
              className="absolute inset-0"
              style={{
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                pointerEvents: 'none',
              }}
            />
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top: Badge (Left) and Meta (Right Top) */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                  <span className="font-bold uppercase tracking-widest text-white text-xs">
                    Case Study
                  </span>
                </div>
                
                {/* Meta Information - Right Top Corner */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 justify-end">
                  <span>{data.year}</span>
                  {readTime > 0 && (
                    <>
                      <span className="text-white/50">·</span>
                      <span>{readTime} min read</span>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom: Title, Description, and Services Tags */}
              <div className="mt-auto pt-8">
                {/* Industry Category - Above Title */}
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                    {data.industry}
                  </span>
                </div>
                
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-[1.1] tracking-tight">
                  {data.client}
                </h1>
                
                {/* Description and Services Tags - Both at Bottom */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <p className="text-lg text-white/90 max-w-3xl leading-relaxed flex-1 min-w-0">
                    {data.description}
                  </p>
                  
                  {/* Services Tags - Right Bottom */}
                  {data.services && data.services.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {data.services.map((s: string) => (
                        <span key={s} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Column: Main Content */}
              <div className="flex-1 min-w-0 w-full">
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
                    <div key={idx} className="bg-white dark:bg-surface rounded-[2rem] p-6">
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
                  <div className="bg-white dark:bg-surface rounded-[2rem] p-6">
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

              {/* Brand Guidelines - Embedded PDF */}
              {data.brandGuidelines && (
                <section id="brand-guidelines" className="space-y-4 pt-8">
                  <h2 className="font-display text-3xl font-semibold text-text-primary dark:text-white leading-tight">
                    Brand Guidelines
                  </h2>
                  <div className="bg-white dark:bg-surface rounded-[2rem] overflow-hidden">
                    <iframe
                      src={`${encodeURI(data.brandGuidelines)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      className="w-full h-[800px] md:h-[1000px] lg:h-[1200px] border-0"
                      title={`${data.client} Brand Guidelines`}
                    />
                  </div>
                </section>
              )}

              {/* Testimonial */}
              {data.testimonial && (
                <div className="pt-8">
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

              {/* Right Column: Navigation Panel */}
              <div className="lg:w-64 shrink-0">
                <div className="sticky top-24 bg-white dark:bg-surface rounded-[2rem] p-4 flex flex-col gap-3">
                  {/* Header */}
                  <div className="pb-2 border-b border-black/5 dark:border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Navigate</span>
                  </div>

                  {/* TOC - Vertical with Full Labels */}
                  <div className="flex flex-col gap-1.5">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`shrink-0 px-3 py-2 rounded-[2rem] transition-all text-xs font-medium flex items-center justify-start gap-2 min-w-[120px] ${
                          activeSection === item.id
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'bg-ivory dark:bg-[#191919] text-text-primary dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-black/5 dark:border-white/10 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Resources</span>
                  </div>

                  {/* Assets */}
                  {(data.brandGuidelines || data.website) && (
                    <div 
                      className="relative"
                      onMouseLeave={() => setAssetsDropdownVisible(false)}
                    >
                      <button 
                        ref={assetsButtonRef}
                        className="flex items-center gap-2 px-3 py-2 rounded-[2rem] bg-ivory dark:bg-[#191919] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs font-medium w-full justify-start"
                        onMouseEnter={() => {
                          if (assetsButtonRef.current) {
                            const rect = assetsButtonRef.current.getBoundingClientRect();
                            setAssetsDropdownPos({
                              top: rect.bottom + 8,
                              right: window.innerWidth - rect.right
                            });
                            setAssetsDropdownVisible(true);
                          }
                        }}
                      >
                        <Globe className="w-4 h-4 shrink-0" />
                        <span>Assets</span>
                      </button>
                    </div>
                  )}

                  {/* Author */}
                  <button
                    onClick={() => onNavigate('author', { id: author.id, name: author.name })}
                    className="group flex items-center gap-2 px-3 py-2 rounded-[2rem] bg-ivory dark:bg-[#191919] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs font-medium w-full justify-start"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                      <img
                        src={author.avatar}
                        loading="lazy"
                        decoding="async"
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="truncate">{author.name.split(' ')[0]}</span>
                  </button>

                  {/* Contact Buttons - Bottom */}
                  <div className="pt-2 border-t border-black/5 dark:border-white/10">
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Contact</span>
                    </div>
                    <ContactButtons defaultExpanded={null} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Portals - Rendered outside hero container */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Share Dropdown */}
          {shareDropdownVisible && (
            <div
              className="fixed bg-white dark:bg-surface rounded-[2rem] p-4 transition-all duration-200 z-[100]"
              style={{
                top: `${shareDropdownPos.top}px`,
                right: `${shareDropdownPos.right}px`,
              }}
              onMouseEnter={() => setShareDropdownVisible(true)}
              onMouseLeave={() => setShareDropdownVisible(false)}
            >
              <ShareButtons
                url={currentUrl}
                title={`${data.client} Case Study`}
                description={data.description}
              />
            </div>
          )}

          {/* Assets Dropdown */}
          {assetsDropdownVisible && (data.brandGuidelines || data.website) && (
            <div
              className="fixed bg-white dark:bg-surface rounded-[2rem] p-3 min-w-[180px] transition-all duration-200 z-[100]"
              style={{
                top: `${assetsDropdownPos.top}px`,
                right: `${assetsDropdownPos.right}px`,
              }}
              onMouseEnter={() => setAssetsDropdownVisible(true)}
              onMouseLeave={() => setAssetsDropdownVisible(false)}
            >
              <div className="space-y-2">
                {data.brandGuidelines && (
                  <a
                    href={encodeURI(data.brandGuidelines)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full p-2 rounded-[2rem] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Guidelines</span>
                  </a>
                )}
                {data.website && (
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full p-2 rounded-[2rem] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
};

export default CaseStudyDetail;
