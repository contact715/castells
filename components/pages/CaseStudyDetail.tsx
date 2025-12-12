
import React, { useState, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, Target, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import SEO from '../ui/SEO';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import type { CaseStudy } from '../../constants';
import {
  CaseStudyHero,
  CaseStudyPageShell,
  CaseStudySectionCard,
  CaseStudySidebarCard,
  CaseStudyStatCard,
  CaseStudyTestimonialCard,
  buildCaseStudyTOC,
} from '../ui/CaseStudyTemplate';

interface CaseStudyDetailProps {
  onBack: () => void;
  onNavigate: (page: any) => void;
  project?: CaseStudy;
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

  if (!project) {
    // If we somehow navigated here without a project, go back to Work.
    onNavigate('work');
    return null;
  }

  const data = project;
  const tableOfContents = buildCaseStudyTOC(data);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <CaseStudyPageShell>
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

        <CaseStudyHero data={data} />

        {/* TWO COLUMN LAYOUT: 70/30 */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT COLUMN: Main Content (70%) */}
          <div className="lg:w-[70%] relative">

            {/* Reading Progress Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black/5 dark:bg-white/10 rounded-full hidden lg:block">
              <motion.div
                className="w-full bg-coral rounded-full origin-top"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>

            {/* Content */}
            <div className="lg:pl-8 space-y-12">

              {/* Overview */}
              <section id="overview">
                <p className="text-xl text-text-secondary leading-relaxed">{data.description}</p>
              </section>

              {/* Results */}
              {data.results?.length ? (
                <CaseStudySectionCard
                  id="results"
                  title="Results"
                  icon={
                    <span className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-coral" />
                    </span>
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.results.map((res, idx) => (
                      <CaseStudyStatCard
                        key={idx}
                        value={res.value}
                        label={res.label}
                        growth={res.growth}
                      />
                    ))}
                  </div>
                </CaseStudySectionCard>
              ) : null}

              {/* Challenge */}
              {data.challenge ? (
                <CaseStudySectionCard
                  id="challenge"
                  title="The Challenge"
                  icon={
                    <span className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-text-secondary" />
                    </span>
                  }
                >
                  <p className="text-text-secondary leading-relaxed">{data.challenge}</p>
                </CaseStudySectionCard>
              ) : null}

              {/* Solution */}
              {data.solution ? (
                <CaseStudySectionCard
                  id="solution"
                  title="The Solution"
                  icon={
                    <span className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-coral" />
                    </span>
                  }
                >
                  <p className="text-text-secondary leading-relaxed mb-6">{data.solution}</p>
                  {data.keyFeatures?.length ? (
                    <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl p-5">
                      <h3 className="font-bold text-xs uppercase tracking-widest text-text-secondary mb-4">
                        Key Deliverables
                      </h3>
                      <ul className="space-y-3">
                        {data.keyFeatures.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-text-primary text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CaseStudySectionCard>
              ) : null}

              {/* Testimonial */}
              {data.testimonial ? (
                <CaseStudyTestimonialCard
                  quote={data.testimonial.quote}
                  author={data.testimonial.author}
                  role={data.testimonial.role}
                />
              ) : null}

            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (30%) */}
          <div className="lg:w-[30%]">
            <div className="lg:sticky lg:top-32 space-y-4">

              {/* TOC */}
              <CaseStudySidebarCard title="On this page">
                <div className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-text-primary text-sm font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </CaseStudySidebarCard>

              {/* Author */}
              <CaseStudySidebarCard title="Written by">
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
              </CaseStudySidebarCard>

              {/* Why Us */}
              <CaseStudySidebarCard title="Why Castells">
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
              </CaseStudySidebarCard>

              {/* CTA */}
              <CaseStudySidebarCard title="">
                <p className="font-display text-lg font-bold mb-1 text-text-primary">Ready to grow?</p>
                <p className="text-text-secondary text-xs mb-4">Get a free strategy audit</p>
                <Button onClick={() => onNavigate('contact')} size="md" className="w-full">
                  Get Free Audit
                </Button>
              </CaseStudySidebarCard>

            </div>
          </div>

        </div>
      </div>
    </CaseStudyPageShell>
  );
};

export default CaseStudyDetail;
