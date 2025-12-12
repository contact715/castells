
import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import ScrollFloat from '../effects/ScrollFloat';
import { PageView } from '../../App';

interface FooterProps {
  onNavigate?: (page: PageView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, page: PageView) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="relative bg-ivory dark:bg-[#191919] text-text-primary overflow-hidden border-t border-black/5 dark:border-white/10">

      <div className="container mx-auto px-6 py-24 relative z-10">

        {/* Top Section: CTA - Standardized Two Column Layout */}
        <div className="border-b border-black/10 mb-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Left Column: Badge + Title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Q2 2025 — Limited Availability
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-text-primary max-w-xl">
                Ready to<br />
                <span className="text-text-secondary">Dominate?</span>
              </h2>
            </div>

            {/* Right Column: CTA + Contact */}
            <div className="flex flex-col justify-end items-start lg:items-end gap-8">
              <Button
                href="#audit"
                size="lg"
              >
                Start Your Growth Audit
              </Button>

              <div className="flex items-center gap-6 text-text-secondary text-sm font-medium">
                <a href="mailto:hello@castells.agency" className="flex items-center gap-2 hover:text-coral transition-colors group">
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

        {/* MEGA FOOTER LAYOUT */}
        <div className="flex flex-col gap-24 mb-24">

          {/* ROW 1: SERVICES DOMAIN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary mb-12 border-b border-black/10 dark:border-white/10 pb-4">
              Services Domain
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start">

              {/* Column 1: Branding & Design */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Branding & Design</h4>
                <a href="#services" className="hover:text-text-primary transition-colors">Brand Identity</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Brand Guidelines</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Logobook</a>
                <a href="#services" className="hover:text-text-primary transition-colors">UI/UX Design</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Print & Packaging</a>
              </div>

              {/* Column 2: Development */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Development</h4>
                <a href="#services" className="hover:text-text-primary transition-colors">Web Development</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Mobile Apps</a>
                <a href="#services" className="hover:text-text-primary transition-colors">E-commerce</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Web Applications</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Landing Pages</a>
              </div>

              {/* Column 3: Advertising & SEO */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Advertising & SEO</h4>
                <a href="#services" className="hover:text-text-primary transition-colors">Google Ads (PPC)</a>
                <a href="#services" className="hover:text-text-primary transition-colors">SEO & Content</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Meta Ads (FB/IG)</a>
                <a href="#services" className="hover:text-text-primary transition-colors">YouTube Ads</a>
                <a href="#services" className="hover:text-text-primary transition-colors">TikTok & Social</a>
              </div>

              {/* Column 4: Automation & Analytics */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Automation & Analytics</h4>
                <a href="#services" className="hover:text-text-primary transition-colors">CRM & Pipelines</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Business Intelligence</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Workflow Automation</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Advanced Tracking</a>
                <a href="#services" className="hover:text-text-primary transition-colors">Field Ops</a>
              </div>
            </div>
          </div>

          {/* ROW 2: INDUSTRIES DOMAIN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary mb-12 border-b border-black/10 dark:border-white/10 pb-4">
              Industries Domain
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start">

              {/* Column 1: Construction */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Construction</h4>
                <a href="#industries" className="hover:text-text-primary transition-colors">ADU & Additions</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Bathroom Remodeling</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Roofing Services</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Kitchen Remodeling</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Concrete & Paving</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Fencing & Gates</a>
              </div>

              {/* Column 2: Home Services */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Home Services</h4>
                <a href="#industries" className="hover:text-text-primary transition-colors">HVAC Systems</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Flooring & Tile</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Int/Ext Painting</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Plumbing</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Electrical</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Solar Energy</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Landscaping</a>
              </div>

              {/* Column 3: Automotive */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Automotive</h4>
                <a href="#industries" className="hover:text-text-primary transition-colors">Paint Protection (PPF)</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Vinyl Wraps</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Window Tinting</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Auto Detailing</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Ceramic Coating</a>
              </div>

              {/* Column 4: Professional */}
              <div className="flex flex-col gap-2 text-text-secondary text-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Professional</h4>
                <a href="#industries" className="hover:text-text-primary transition-colors">Insurance Agencies</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Legal Services</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Business Consulting</a>
                <a href="#industries" className="hover:text-text-primary transition-colors">Financial Planning</a>
              </div>
            </div>
          </div>

          {/* ROW 3: AGENCY ECOSYSTEM */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary mb-12 border-b border-black/10 dark:border-white/10 pb-4">
              Agency Ecosystem
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70 mb-4">Resources</h4>
                <div className="flex flex-col gap-2 text-text-secondary text-sm">
                  <a href="#" className="hover:text-coral transition-colors flex items-center gap-2">
                    Agency Blog{" "}
                    <span className="text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-text-secondary">
                      New
                    </span>
                  </a>
                  <a href="#" className="hover:text-coral transition-colors">Case Studies</a>
                  <a href="#" className="hover:text-coral transition-colors">Whitepapers</a>
                  <a href="#" className="hover:text-coral transition-colors">Playbooks</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70 mb-4">Tools</h4>
                <div className="flex flex-col gap-2 text-text-secondary text-sm">
                  <a href="#" className="hover:text-coral transition-colors">ROI Calculator</a>
                  <a href="#" className="hover:text-coral transition-colors">Competitor Audit</a>
                  <a href="#" className="hover:text-coral transition-colors">Keyword Planner</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70 mb-4">Company</h4>
                <div className="flex flex-col gap-2 text-text-secondary text-sm">
                  <a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-text-primary transition-colors">About Us</a>
                  <a href="#careers" onClick={(e) => handleNav(e, 'careers')} className="hover:text-text-primary transition-colors">Careers</a>
                  <a href="#" className="hover:text-text-primary transition-colors">Partner Program</a>
                  <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-text-primary transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70 mb-4">Connect</h4>
                <div className="flex gap-4 mb-6">
                  <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                </div>
                <div className="flex flex-col gap-1 text-text-secondary opacity-70 text-xs">
                  <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-text-primary transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/castells-logo.png" alt="Castells Logo" className="w-10 h-10 object-contain" loading="lazy" />
            <span className="font-display font-bold text-xl tracking-tight text-text-primary">Castells.</span>
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
