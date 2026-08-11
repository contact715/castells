
import React from 'react';
import { Instagram, Threads, Facebook } from '../ui/icons/SocialIcons';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { INDUSTRY_CATEGORIES } from '../../data/industries';
import { SERVICE_CATEGORIES } from '../../data/services';
import NewsletterSignup from '../ui/NewsletterSignup';

// ─── Footer ─────────────────────────────────────────────────────────────────

interface FooterProps {
  onNavigate?: (page: PageView, data?: NavigationData) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, page: PageView, data?: NavigationData) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, data);
    }
  };

  return (
    <footer className="relative bg-ivory dark:bg-[#191919] text-black dark:text-white overflow-hidden">

      {/* ── TOP BAR: Logo + Newsletter ────────────────────────────── */}
      <div className="container mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-10 border-b border-black/10 dark:border-white/10">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/castells-logo.webp" alt="Castells Logo" width="127" height="144" className="w-9 h-9 object-contain" loading="lazy" />
              <span className="font-display font-bold text-2xl tracking-tight text-text-primary dark:text-white">Castells.</span>
            </div>
            <p className="text-sm text-text-secondary dark:text-white/60 max-w-xs leading-relaxed">
              We design, build, and optimize campaigns for contractors, service providers, and local businesses.
            </p>
          </div>
          {/* Newsletter */}
          <div className="max-w-sm w-full">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-white/50 mb-3">Stay Updated</p>
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </div>

      {/* ── LINK COLUMNS: Unified Grid ────────────────────────────── */}
      <div className="container mx-auto px-6 pb-10">

        {/* Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 mb-10">
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category.id}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-coral-text mb-4">
                {category.label}
              </h4>
              <div className="flex flex-col gap-2.5">
                {category.items.slice(0, 5).map((service) => (
                  <a
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={(e) => handleNav(e, 'service', { id: service.slug, name: service.name })}
                    className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors"
                  >
                    {service.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 mb-10">
          {INDUSTRY_CATEGORIES.map((category) => (
            <div key={category.id}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-coral-text mb-4">
                {category.label}
              </h4>
              <div className="flex flex-col gap-2.5">
                {category.items
                  .filter((i) => i.type === 'industry')
                  .slice(0, 5)
                  .map((industry) => (
                    <a
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      onClick={(e) => handleNav(e, 'industry', { id: industry.slug, name: industry.name })}
                      className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors"
                    >
                      {industry.name}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Agency / Company */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-coral-text mb-4">Resources</h4>
            <div className="flex flex-col gap-2.5">
              <a href="/blog" onClick={(e) => handleNav(e, 'blog')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Agency Blog</a>
              <a href="/work" onClick={(e) => handleNav(e, 'work')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Case Studies</a>
              <a href="/blog" onClick={(e) => handleNav(e, 'blog')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Whitepapers</a>
              <a href="/blog" onClick={(e) => handleNav(e, 'blog')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Playbooks</a>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-coral-text mb-4">Get Started</h4>
            <div className="flex flex-col gap-2.5">
              <a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Free Growth Audit</a>
              <a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Get a Quote</a>
              <a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Schedule a Call</a>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-coral-text mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              <a href="/about" onClick={(e) => handleNav(e, 'about')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">About Us</a>
              <a href="/careers" onClick={(e) => handleNav(e, 'careers')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Careers</a>
              <a href="/company" onClick={(e) => handleNav(e, 'company')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Partner Program</a>
              <a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="text-[13px] text-text-secondary dark:text-white/50 hover:text-text-primary dark:hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-coral-text mb-4">Connect</h4>
            <div className="flex gap-2 mb-5">
              <a href="https://www.instagram.com/castells.media/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full text-text-secondary dark:text-white/55 hover:text-text-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Castells in Instagram"><Instagram className="w-[18px] h-[18px]" /></a>
              <a href="https://www.threads.com/@castells.media" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full text-text-secondary dark:text-white/55 hover:text-text-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Castells in Threads"><Threads className="w-[18px] h-[18px]" /></a>
              <a href="https://www.facebook.com/castells.media" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-11 h-11 rounded-full text-text-secondary dark:text-white/55 hover:text-text-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Castells in Facebook"><Facebook className="w-[18px] h-[18px]" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-black/10 dark:border-white/10">
          <p className="text-[11px] text-text-secondary dark:text-white/55 uppercase tracking-widest">
            © {new Date().getFullYear()} Castells Agency Inc.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-text-secondary dark:text-white/55">
            <a href="/privacy-policy" onClick={(e) => handleNav(e, 'privacy-policy')} className="hover:text-text-primary dark:hover:text-white transition-colors">Privacy</a>
            <a href="/terms" onClick={(e) => handleNav(e, 'terms')} className="hover:text-text-primary dark:hover:text-white transition-colors">Terms</a>
            <a href="/cookie-policy" onClick={(e) => handleNav(e, 'cookie-policy')} className="hover:text-text-primary dark:hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
