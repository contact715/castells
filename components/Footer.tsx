
import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { RippleButton } from './RippleButton';
import FooterAmbient from './FooterAmbient';
import ScrollFloat from './ScrollFloat';
import LightRays from './LightRays';
import { PageView } from '../App';

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
    <footer className="relative bg-black text-white overflow-hidden" id="contact">
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#E08576"
          raysSpeed={2.5}
          lightSpread={0.15}
          rayLength={0.8}
          followMouse={true}
          mouseInfluence={0.4}
          noiseAmount={0.05}
          distortion={0.1}
        />
      </div>
      <FooterAmbient />

      <div className="container mx-auto px-6 py-24 relative z-10">

        {/* Top Section: CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end border-b border-white/10 pb-16">
          <div>
            <h2 className="font-display text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-6">
              <ScrollFloat as="span" containerClassName="block">Let's Build</ScrollFloat>
              <span className="text-coral">
                <ScrollFloat as="span" containerClassName="inline-block">Your Legacy.</ScrollFloat>
              </span>
            </h2>
            <div className="flex flex-col gap-2 mt-8">
              <a href="mailto:hello@castells.agency" className="text-2xl md:text-3xl hover:text-coral transition-colors inline-flex items-center gap-2 group">
                hello@castells.agency <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </a>
              <p className="text-white/40 text-lg">
                1200 Ocean Ave, Santa Monica, CA
              </p>
            </div>
          </div>
          <div className="lg:text-right flex flex-col items-start lg:items-end justify-between h-full">
            <div className="mb-8 lg:mb-0">
              <RippleButton
                href="#audit"
                className="bg-white text-black px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-coral hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(224,133,118,0.4)]"
                rippleColor="#000"
              >
                Start Project
              </RippleButton>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed text-left lg:text-right">
              We only work with brands ready to dominate. Our schedule is currently open for Q2 2025.
            </p>
          </div>
        </div>

        {/* MEGA FOOTER LAYOUT */}
        <div className="flex flex-col gap-24 mb-24">

          {/* ROW 1: SERVICES DOMAIN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-12 border-b border-white/10 pb-4">Services Domain</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start">

              {/* Column 1: Branding & Design */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Identity</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Logo Design</a>
                    <a href="#" className="hover:text-white transition-colors">Brand Guidelines</a>
                    <a href="#" className="hover:text-white transition-colors">Visual Systems</a>
                    <a href="#" className="hover:text-white transition-colors">Rebranding</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Experience</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">UI/UX Design</a>
                    <a href="#" className="hover:text-white transition-colors">Prototyping</a>
                    <a href="#" className="hover:text-white transition-colors">Print Collateral</a>
                    <a href="#" className="hover:text-white transition-colors">Packaging</a>
                  </div>
                </div>
              </div>

              {/* Column 2: Development */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Web</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Custom Development</a>
                    <a href="#" className="hover:text-white transition-colors">Landing Pages</a>
                    <a href="#" className="hover:text-white transition-colors">CMS Integration</a>
                    <a href="#" className="hover:text-white transition-colors">Webflow / Framer</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Product</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Web Applications</a>
                    <a href="#" className="hover:text-white transition-colors">Mobile Apps (iOS/Android)</a>
                    <a href="#" className="hover:text-white transition-colors">SaaS Platforms</a>
                    <a href="#" className="hover:text-white transition-colors">E-commerce (Shopify/Woo)</a>
                  </div>
                </div>
              </div>

              {/* Column 3: Growth Marketing */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Paid Media</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Google Ads (PPC)</a>
                    <a href="#" className="hover:text-white transition-colors">Meta Ads (FB/IG)</a>
                    <a href="#" className="hover:text-white transition-colors">YouTube Video Ads</a>
                    <a href="#" className="hover:text-white transition-colors">TikTok Ads</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn B2B</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Organic</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">SEO Strategy</a>
                    <a href="#" className="hover:text-white transition-colors">Content Marketing</a>
                    <a href="#" className="hover:text-white transition-colors">Local Map Packs</a>
                  </div>
                </div>
              </div>

              {/* Column 4: Automation & Data */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Systems</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">CRM Implementation</a>
                    <a href="#" className="hover:text-white transition-colors">Workflow Automation</a>
                    <a href="#" className="hover:text-white transition-colors">Zapier / Make Integrations</a>
                    <a href="#" className="hover:text-white transition-colors">Chatbots & AI Agents</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-coral mb-4">Intelligence</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Business Intelligence (BI)</a>
                    <a href="#" className="hover:text-white transition-colors">Advanced Tracking (GTM)</a>
                    <a href="#" className="hover:text-white transition-colors">Attribution Modeling</a>
                    <a href="#" className="hover:text-white transition-colors">Reporting Dashboards</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: INDUSTRIES DOMAIN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-12 border-b border-white/10 pb-4">Industries Domain</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start">

              {/* Column 1: Construction */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">General</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">ADU & Additions</a>
                    <a href="#" className="hover:text-white transition-colors">Custom Home Building</a>
                    <a href="#" className="hover:text-white transition-colors">Concrete & Paving</a>
                    <a href="#" className="hover:text-white transition-colors">Remodeling (Kitchen/Bath)</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Specialty</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Roofing Services</a>
                    <a href="#" className="hover:text-white transition-colors">Fencing & Gates</a>
                    <a href="#" className="hover:text-white transition-colors">Flooring & Tile</a>
                    <a href="#" className="hover:text-white transition-colors">Windows & Doors</a>
                  </div>
                </div>
              </div>

              {/* Column 2: Home Services */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Systems</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">HVAC & Air Quality</a>
                    <a href="#" className="hover:text-white transition-colors">Solar Energy & Battery</a>
                    <a href="#" className="hover:text-white transition-colors">Plumbing Services</a>
                    <a href="#" className="hover:text-white transition-colors">Electrical Services</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Aesthetics</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Interior/Exterior Painting</a>
                    <a href="#" className="hover:text-white transition-colors">Landscaping & Hardscaping</a>
                    <a href="#" className="hover:text-white transition-colors">Pools & Spas</a>
                    <a href="#" className="hover:text-white transition-colors">Garage Cabinets</a>
                  </div>
                </div>
              </div>

              {/* Column 3: Automotive */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Protection</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Paint Protection Film (PPF)</a>
                    <a href="#" className="hover:text-white transition-colors">Vinyl Wraps</a>
                    <a href="#" className="hover:text-white transition-colors">Ceramic Coating</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Care & Style</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Auto Detailing</a>
                    <a href="#" className="hover:text-white transition-colors">Window Tinting</a>
                    <a href="#" className="hover:text-white transition-colors">Performance Parts</a>
                  </div>
                </div>
              </div>

              {/* Column 4: Professional */}
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Finance & Law</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Insurance Agencies</a>
                    <a href="#" className="hover:text-white transition-colors">Financial Planning</a>
                    <a href="#" className="hover:text-white transition-colors">Law Firms</a>
                    <a href="#" className="hover:text-white transition-colors">Accounting / CPA</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Consulting</h4>
                  <div className="flex flex-col gap-2 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Business Coaching</a>
                    <a href="#" className="hover:text-white transition-colors">Real Estate</a>
                    <a href="#" className="hover:text-white transition-colors">Medical Practices</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: AGENCY ECOSYSTEM */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-12 border-b border-white/10 pb-4">Agency Ecosystem</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Resources</h4>
                <div className="flex flex-col gap-2 text-white/70 text-sm">
                  <a href="#" className="hover:text-coral transition-colors flex items-center gap-2">
                    Agency Blog <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60">New</span>
                  </a>
                  <a href="#" className="hover:text-coral transition-colors">Case Studies</a>
                  <a href="#" className="hover:text-coral transition-colors">Whitepapers</a>
                  <a href="#" className="hover:text-coral transition-colors">Playbooks</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Tools</h4>
                <div className="flex flex-col gap-2 text-white/70 text-sm">
                  <a href="#" className="hover:text-coral transition-colors">ROI Calculator</a>
                  <a href="#" className="hover:text-coral transition-colors">Competitor Audit</a>
                  <a href="#" className="hover:text-coral transition-colors">Keyword Planner</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Company</h4>
                <div className="flex flex-col gap-2 text-white/70 text-sm">
                  <a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-white transition-colors">About Us</a>
                  <a href="#careers" onClick={(e) => handleNav(e, 'careers')} className="hover:text-white transition-colors">Careers</a>
                  <a href="#" className="hover:text-white transition-colors">Partner Program</a>
                  <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Connect</h4>
                <div className="flex gap-4 mb-6">
                  <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                </div>
                <div className="flex flex-col gap-1 text-white/30 text-xs">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-display font-bold text-xl tracking-tight">Castells.</span>
          </div>
          <p className="text-xs text-white/30 uppercase tracking-widest">
            © {new Date().getFullYear()} Castells Agency Inc.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
