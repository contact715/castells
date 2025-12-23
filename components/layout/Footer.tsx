
import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { INDUSTRY_CATEGORIES } from '../../data/industries';
import { SERVICE_CATEGORIES } from '../../data/services';
import NewsletterSignup from '../ui/NewsletterSignup';

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
    <footer className="relative bg-ivory dark:bg-[#191919] text-black dark:text-white overflow-hidden border-t border-black/5 dark:border-white/10">
      <div className="container mx-auto px-6 py-12 relative z-10">

        {/* Top Section: CTA with Video */}
        <div className="mb-12 pb-8">
          <div className="relative rounded-[2rem] overflow-hidden bg-white dark:bg-surface">
            {/* Video Background */}
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 1 }}
              >
                <source src="https://media.istockphoto.com/id/1287601917/video/close-up-of-diverse-multiethnic-team-having-conversation-in-meeting-room-in-a-creative-office.mp4?s=mp4-640x640-is&k=20&c=itAwTLCSvfv3Wd3vqirH0-8_bA2JMywNLZOAFkO9lzM=" type="video/mp4" />
              </video>
              {/* Very light gradient overlay - only for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent dark:from-black/40 dark:via-black/20" style={{ zIndex: 2 }} />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Left Column: Badge, Title & Subtitle */}
                <div>
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                      Q2 2025 — Limited Availability
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-white mb-2">
                    Ready to<br />
                    <span className="text-white/80">Dominate?</span>
                  </h2>
                  <p className="text-base md:text-lg text-white/70 max-w-xl">
                    Join the team that's helping businesses scale from $2M to $10M+ in revenue.
                  </p>
                </div>

                {/* Right Column: CTA Button & Contact Info */}
                <div className="flex flex-col items-start lg:items-end gap-4">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('contact');
                    }}
                    size="md"
                    className="bg-coral hover:bg-coral-dark text-white"
                  >
                    Start Your Growth Audit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Contact Info */}
                  <div className="flex flex-col lg:items-end gap-2 text-white/70 text-sm font-medium">
                    <a href="mailto:hello@castells.agency" className="flex items-center gap-2 hover:text-white transition-colors group">
                      hello@castells.agency
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <span className="flex items-center gap-2">
                      Santa Monica, CA
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* MEGA FOOTER LAYOUT */}
        <div className="flex flex-col gap-8 mb-8">

          {/* ROW 1: SERVICES DOMAIN */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-text-primary dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-3">Services Domain</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
              {SERVICE_CATEGORIES.map((category) => (
                <div key={category.id} className="flex flex-col gap-2 text-text-secondary text-sm">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-coral mb-3">
                    {category.label}
                  </h4>
                  {category.items.slice(0, 5).map((service) => (
                    <a
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={(e) => handleNav(e, 'service', { id: service.slug, name: service.name })}
                      className="hover:text-text-primary dark:hover:text-white transition-colors"
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: INDUSTRIES DOMAIN */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-text-primary dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-3">Industries Domain</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
              {INDUSTRY_CATEGORIES.map((category) => (
                <div key={category.id} className="flex flex-col gap-2 text-text-secondary text-sm">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-coral dark:text-coral mb-3">
                    {category.label}
                  </h4>
                  {category.items
                    .filter((i) => i.type === 'industry')
                    .slice(0, 5)
                    .map((industry) => (
                      <a
                        key={industry.slug}
                        href={`/industries/${industry.slug}`}
                        onClick={(e) => handleNav(e, 'industry', { id: industry.slug, name: industry.name })}
                        className="hover:text-text-primary dark:hover:text-white transition-colors"
                      >
                        {industry.name}
                      </a>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* ROW 3: AGENCY ECOSYSTEM */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-text-primary dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-3">Agency Ecosystem</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-coral dark:text-coral mb-3">Resources</h4>
                <div className="flex flex-col gap-2 text-text-secondary text-sm">
                  <a href="/blog" onClick={(e) => handleNav(e, 'blog')} className="hover:text-coral transition-colors flex items-center gap-2">
                    Agency Blog <span className="text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-black/60 dark:text-white/60">New</span>
                  </a>
                  <a href="/work" onClick={(e) => handleNav(e, 'work')} className="hover:text-coral transition-colors">Case Studies</a>
                  <a href="/blog" onClick={(e) => handleNav(e, 'blog')} className="hover:text-coral transition-colors">Whitepapers</a>
                  <a href="/blog" onClick={(e) => handleNav(e, 'blog')} className="hover:text-coral transition-colors">Playbooks</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-coral dark:text-coral mb-3">Tools</h4>
                <div className="flex flex-col gap-2 text-text-secondary text-sm">
                  <a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-coral transition-colors">ROI Calculator</a>
                  <a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-coral transition-colors">Competitor Audit</a>
                  <a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-coral transition-colors">Keyword Planner</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-coral dark:text-coral mb-3">Company</h4>
                <div className="flex flex-col gap-2 text-text-secondary text-sm">
                  <a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-text-primary dark:hover:text-white transition-colors">About Us</a>
                  <a href="#careers" onClick={(e) => handleNav(e, 'careers')} className="hover:text-text-primary dark:hover:text-white transition-colors">Careers</a>
                  <a href="/company" onClick={(e) => handleNav(e, 'company')} className="hover:text-text-primary dark:hover:text-white transition-colors">Partner Program</a>
                  <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-text-primary dark:hover:text-white transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-coral dark:text-coral mb-3">Connect</h4>
                <div className="flex gap-3 mb-4">
                  <a href="#" className="text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                </div>
                <div className="flex flex-col gap-1.5 text-text-secondary dark:text-white/60 text-xs">
                  <a href="/privacy-policy" onClick={(e) => handleNav(e, 'privacy-policy')} className="hover:text-text-primary dark:hover:text-white transition-colors">Privacy Policy</a>
                  <a href="/terms" onClick={(e) => handleNav(e, 'terms')} className="hover:text-text-primary dark:hover:text-white transition-colors">Terms of Service</a>
                  <a href="/cookie-policy" onClick={(e) => handleNav(e, 'cookie-policy')} className="hover:text-text-primary dark:hover:text-white transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 mb-8">
          <div className="max-w-md">
            <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-text-secondary dark:text-white/70 mb-4">
              Get the latest marketing insights and strategies.
            </p>
            <NewsletterSignup variant="inline" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2 mb-3 md:mb-0">
            <img src="/castells-logo.png" alt="Castells Logo" className="w-8 h-8 object-contain" loading="lazy" />
            <span className="font-display font-bold text-lg tracking-tight text-text-primary dark:text-white">Castells.</span>
          </div>
          <p className="text-xs text-text-secondary uppercase tracking-widest">
            © {new Date().getFullYear()} Castells Agency Inc.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
