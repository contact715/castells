
import React, { useState } from 'react';
import {
    Briefcase, Users, Zap, Globe, Search, Cpu, Home, Car, PenTool,
    Layout, FileText, MessageSquare, LineChart, Megaphone,
    Hammer, Activity, Building2, Sparkles, Palette, Terminal, Scale, Flag, Mail, Factory, BarChart3, ArrowRight
} from 'lucide-react';
import AnimatedThemeToggler from './AnimatedThemeToggler';
import { RippleButton } from './RippleButton';
import { PageView } from '../App';
import { Menu, MenuItem, HoveredLink, ProductItem } from './ui/NavbarMenu';
import { Navbar, NavBody, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from './ui/ResizableNavbar';

interface NavBarProps {
    onNavigate?: (page: PageView) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLinkClick = (e: React.MouseEvent, href?: string, page?: PageView) => {
        if (!href) return;

        if (page && onNavigate) {
            e.preventDefault();
            onNavigate(page);
            setActiveTab(null);
            setMobileMenuOpen(false);
            return;
        }

        if (href.startsWith('#')) {
            setMobileMenuOpen(false);
        }
    };

    return (
        <Navbar>
            {/* Desktop Navigation Body */}
            <NavBody>
                <div className="flex items-center gap-2 group cursor-pointer ml-2" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }}>
                    <div className="bg-black/5 dark:bg-white/10 p-1.5 rounded-lg">
                        <Sparkles className="w-5 h-5 text-coral" />
                    </div>
                    <span className="font-display text-xl font-bold text-text-primary italic tracking-tight group-hover:text-coral transition-colors">Castells</span>
                </div>

                <div className="flex-1 flex justify-center">
                    <Menu setActive={setActiveTab} className="border-none shadow-none bg-transparent dark:bg-transparent backdrop-blur-none">
                        <MenuItem setActive={setActiveTab} active={activeTab} item="Work" icon={Briefcase}>
                            <div className="grid grid-cols-2 gap-4 p-4 w-[600px]">
                                <div className="col-span-1 space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-coral mb-2 border-b border-black/5 pb-2">Recent Success</h4>
                                    <ProductItem
                                        title="Desert Cool HVAC"
                                        href="#work"
                                        src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80"
                                        description="Restructured pipeline. +287% YoY Growth."
                                        onClick={(e) => handleLinkClick(e, '#work')}
                                    />
                                    <ProductItem
                                        title="Apex Roofing"
                                        href="#work"
                                        src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80"
                                        description="Dallas market domination. 14x ROAS."
                                        onClick={(e) => handleLinkClick(e, '#work')}
                                    />
                                </div>
                                <div className="col-span-1 space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-coral mb-2 border-b border-black/5 pb-2">Capabilities</h4>
                                    <div className="grid gap-2">
                                        <HoveredLink href="#services" icon={LineChart}>Performance Marketing</HoveredLink>
                                        <HoveredLink href="#services" icon={Palette}>Brand Strategy</HoveredLink>
                                        <HoveredLink href="#services" icon={Globe}>Web Development</HoveredLink>
                                        <HoveredLink href="#services" icon={Cpu}>Automation & AI</HoveredLink>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-black/5">
                                        <HoveredLink href="#work">View All Case Studies <ArrowRight className="w-3 h-3" /></HoveredLink>
                                    </div>
                                </div>
                            </div>
                        </MenuItem>

                        <MenuItem setActive={setActiveTab} active={activeTab} item="Services" icon={Zap}>
                            <div className="flex flex-col space-y-4 text-sm p-4 w-[400px]">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-2">Full-Cycle Growth</h4>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <HoveredLink href="#services" icon={Megaphone}>Paid Ads</HoveredLink>
                                    <HoveredLink href="#services" icon={Search}>SEO & Local</HoveredLink>
                                    <HoveredLink href="#services" icon={Layout}>Web Design</HoveredLink>
                                    <HoveredLink href="#services" icon={Terminal}>AI Agents</HoveredLink>
                                    <HoveredLink href="#services" icon={MessageSquare}>CRM Setup</HoveredLink>
                                    <HoveredLink href="#services" icon={BarChart3}>Analytics</HoveredLink>
                                </div>
                            </div>
                        </MenuItem>

                        <MenuItem setActive={setActiveTab} active={activeTab} item="Industries" icon={Factory}>
                            <div className="flex flex-col space-y-4 text-sm p-4 w-[350px]">
                                <HoveredLink href="#industries" icon={Home}>Home Services</HoveredLink>
                                <HoveredLink href="#industries" icon={Hammer}>Construction</HoveredLink>
                                <HoveredLink href="#industries" icon={Car}>Automotive</HoveredLink>
                                <HoveredLink href="#industries" icon={Scale}>Legal & Pro</HoveredLink>
                                <HoveredLink href="#industries" icon={Activity}>Health & Wellness</HoveredLink>
                            </div>
                        </MenuItem>

                        <MenuItem setActive={setActiveTab} active={activeTab} item="Agency" icon={Building2}>
                            <div className="grid grid-cols-2 gap-8 p-4 w-[500px]">
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-coral mb-3">Company</h4>
                                    <div className="flex flex-col space-y-3">
                                        <HoveredLink href="#about" onClick={(e) => handleLinkClick(e, '#about', 'about')} icon={Flag}>Our Story</HoveredLink>
                                        <HoveredLink href="#team" icon={Users}>Leadership</HoveredLink>
                                        <HoveredLink href="#careers" onClick={(e) => handleLinkClick(e, '#careers', 'careers')} icon={Briefcase}>Careers</HoveredLink>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-coral mb-3">Resources</h4>
                                    <div className="flex flex-col space-y-3">
                                        <HoveredLink href="#blog" onClick={(e) => handleLinkClick(e, '#blog', 'blog')} icon={FileText}>Blog & Insights</HoveredLink>
                                        <HoveredLink href="#contact" icon={Mail}>Contact Us</HoveredLink>
                                    </div>
                                </div>
                            </div>
                        </MenuItem>
                    </Menu>
                </div>

                <div className="flex items-center gap-2 mr-2">
                    <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full" />
                    <RippleButton
                        href="#audit"
                        className="hidden lg:flex bg-black dark:bg-white dark:text-black text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-transparent hover:scale-105 transition-transform shadow-md"
                        rippleColor="#E08576"
                    >
                        Get Audit
                    </RippleButton>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <div className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); setMobileMenuOpen(false); }}>
                        <Sparkles className="w-5 h-5 text-coral" />
                        <span className="font-display text-xl font-bold text-text-primary italic tracking-tight">Castells</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center" />
                        <MobileNavToggle isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
                    </div>
                </MobileNavHeader>

                <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
                    <div className="grid gap-2">
                        <a href="#work" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold">Work</a>
                        <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold">Services</a>
                        <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold">Industries</a>
                        <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate?.('about'); setMobileMenuOpen(false); }} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold">Agency</a>
                        <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate?.('blog'); setMobileMenuOpen(false); }} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold">Insights</a>
                    </div>
                    <div className="pt-4 border-t border-black/5 dark:border-white/5">
                        <RippleButton
                            href="#audit"
                            className="block w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-bold text-center uppercase tracking-widest text-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Free Audit
                        </RippleButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
};

export default NavBar;
