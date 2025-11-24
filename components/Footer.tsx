
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

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Socials</h3>
                <div className="flex flex-col gap-4">
                    <a href="#" className="flex items-center gap-2 hover:text-coral transition-colors group">
                        <Linkedin className="w-4 h-4" /> <span>LinkedIn</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:text-coral transition-colors group">
                        <Instagram className="w-4 h-4" /> <span>Instagram</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:text-coral transition-colors group">
                        <Twitter className="w-4 h-4" /> <span>Twitter</span>
                    </a>
                </div>
            </div>

            <div>
                 <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Sitemap</h3>
                 <div className="flex flex-col gap-4 text-white/80">
                    <a href="#work" onClick={(e) => handleNav(e, 'home')} className="hover:text-white transition-colors">Work</a>
                    <a href="#services" className="hover:text-white transition-colors">Services</a>
                    <a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-white transition-colors">Agency</a>
                    <a href="#careers" onClick={(e) => handleNav(e, 'careers')} className="hover:text-white transition-colors">Careers</a>
                 </div>
            </div>
             
            <div>
                 <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Services</h3>
                 <div className="flex flex-col gap-4 text-white/80">
                    <a href="#" className="hover:text-white transition-colors">Paid Ads</a>
                    <a href="#" className="hover:text-white transition-colors">SEO & Content</a>
                    <a href="#" className="hover:text-white transition-colors">Web Development</a>
                    <a href="#" className="hover:text-white transition-colors">Brand Identity</a>
                 </div>
            </div>

            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">Legal</h3>
                <div className="flex flex-col gap-4 text-white/80">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
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
