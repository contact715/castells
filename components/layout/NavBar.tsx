
import React, { useState } from 'react';
import { m as motion } from "framer-motion";
import {
    Briefcase, Users, Zap, Globe, Search, Cpu, Home, Car, PenTool,
    Layout, FileText, MessageSquare, LineChart, Megaphone,
    Hammer, Activity, Building2, Sparkles, Palette, Terminal, Scale, Flag, Mail, Factory, BarChart3, ArrowRight,
    Shield, Smartphone, ShoppingBag, Video, MousePointer2, Database, BarChart, Settings, Wrench, PaintBucket,
    HardHat, Truck, Stethoscope, Landmark, Coins, Droplets, LayoutGrid, Frame, Ruler, ShieldCheck, Sun, ArrowUpRight, MapPin,
    Book, Layers, Code, ShoppingCart
} from 'lucide-react';
import AnimatedThemeToggler from '../ui/AnimatedThemeToggler';
import { Button } from '../ui/Button';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { Menu, MenuItem, HoveredLink, ProductItem } from '../ui/NavbarMenu';
import { Navbar, NavBody, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu, MobileAccordion, MobileAccordionItem } from '../ui/ResizableNavbar';
import { CASE_STUDIES } from '../../constants';

interface NavBarProps {
    onNavigate?: (page: PageView, data?: NavigationData) => void;
}

const CategoryCard = ({ title, icon: Icon, href }: { title: string, icon: React.ElementType, href: string }) => (
    <a href={href} className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-coral/10 hover:text-coral transition-all group text-center h-full">
        <div className="bg-white dark:bg-black p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-text-primary group-hover:text-coral transition-colors" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wide text-text-primary group-hover:text-coral">{title}</span>
    </a>
);

// --- CASES MENU (Featured Case Studies) ---
const CasesMenu = ({ onNavigate }: { onNavigate?: (page: PageView, data?: NavigationData) => void }) => {
    // Take first 3 case studies as featured
    const featuredCases = CASE_STUDIES.slice(0, 3);

    return (
        <div className="flex flex-col gap-6">
            {/* Header with View All Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-1">Featured Work</h3>
                    <p className="text-xs text-text-secondary">Explore {CASE_STUDIES.length}+ case studies & success stories.</p>
                </div>
                <Button
                    onClick={() => onNavigate?.('work')}
                    size="sm"
                >
                    View All Cases
                </Button>
            </div>

            {/* Featured Cases Grid */}
            <div className="grid grid-cols-3 gap-4">
                {featuredCases.map((caseStudy) => (
                    <div
                        key={caseStudy.id}
                        onClick={() => onNavigate?.('case-study', caseStudy as any)}
                        className="group cursor-pointer rounded-2xl overflow-hidden relative h-[200px] border border-black/5 dark:border-white/10"
                    >
                        {/* Background Image */}
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.client}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                            <div className="mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                                    {caseStudy.industry}
                                </span>
                            </div>
                            <h4 className="text-white font-bold text-sm mb-1 group-hover:text-coral transition-colors">
                                {caseStudy.client}
                            </h4>
                            <div className="flex items-baseline gap-1">
                                <span className="text-coral font-bold text-lg">{caseStudy.metric}</span>
                                <span className="text-white/50 text-[10px] uppercase">{caseStudy.metricLabel}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- COMPANY DATA & COMPONENT ---
const COMPANY_DATA = [
    {
        id: 'about',
        label: 'About',
        icon: Flag,
        items: [
            { label: 'Our Story', icon: Flag, href: '#about', page: 'about' as PageView },
            { label: 'Leadership', icon: Users, href: '#team', page: 'team' as PageView },
            { label: 'Careers', icon: Briefcase, href: '#careers', page: 'careers' as PageView },
        ]
    },
    {
        id: 'connect',
        label: 'Connect',
        icon: MessageSquare,
        items: [
            { label: 'Blog & Insights', icon: FileText, href: '#blog', page: 'blog' as PageView },
            { label: 'Contact Us', icon: Mail, href: '#contact', page: 'contact' as PageView },
            { label: 'Press', icon: Megaphone, href: '#press' },
        ]
    }
];

const CompanyMenu = ({ onNavigate }: { onNavigate?: (page: PageView) => void }) => {
    // Flatten items from all categories
    const allItems = COMPANY_DATA.flatMap(category => category.items);

    const handleItemClick = (item: typeof allItems[0]) => {
        if (item.page && onNavigate) {
            onNavigate(item.page);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {allItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.page ? undefined : item.href}
                        onClick={(e) => {
                            if (item.page) {
                                e.preventDefault();
                                handleItemClick(item);
                            }
                        }}
                        className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all justify-between group cursor-pointer"
                    >
                        <item.icon className="w-4 h-4 text-text-secondary group-hover:text-current" />
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
            </div>

            <div className="pt-3 border-t border-black/5 flex justify-between items-center bg-black/5 rounded-xl p-3">
                <div className="flex items-center gap-3">
                    <div className="bg-coral/10 p-2 rounded-full text-coral">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <h5 className="font-bold text-sm text-text-primary">Join the team?</h5>
                        <p className="text-xs text-text-secondary">We are always hiring.</p>
                    </div>
                </div>
                <Button
                    onClick={() => onNavigate?.('careers')}
                    size="sm"
                >
                    View Careers
                </Button>
            </div>
        </div>
    );
};

// --- SERVICES DATA & COMPONENT ---
const SERVICES_DATA = [
    {
        id: 'branding',
        label: 'Branding',
        icon: Palette,
        items: [
            { label: 'Brand Identity', icon: Palette, href: '#services' },
            { label: 'Brand Guidelines', icon: Book, href: '#services' },
            { label: 'Logobook', icon: Layers, href: '#services' },
            { label: 'UI/UX Design', icon: Layout, href: '#services' },
            { label: 'Print & Packaging', icon: FileText, href: '#services' },
            { label: 'Enterprise Solutions', icon: ArrowUpRight, href: '#services' },
        ]
    },
    {
        id: 'development',
        label: 'Development',
        icon: Code,
        items: [
            { label: 'Web Development', icon: Globe, href: '#services' },
            { label: 'Mobile Apps', icon: Smartphone, href: '#services' },
            { label: 'E-commerce', icon: ShoppingCart, href: '#services' },
            { label: 'Web Applications', icon: Code, href: '#services' },
            { label: 'Landing Pages', icon: Layout, href: '#services' },
            { label: 'Enterprise Solutions', icon: ArrowUpRight, href: '#services' },
        ]
    },
    {
        id: 'advertising',
        label: 'Advertising',
        icon: Megaphone,
        items: [
            { label: 'Google Ads (PPC)', icon: Search, href: '#services' },
            { label: 'SEO & Content', icon: LineChart, href: '#services' },
            { label: 'Meta Ads', icon: Megaphone, href: '#services' },
            { label: 'YouTube Ads', icon: Video, href: '#services' },
            { label: 'TikTok & Social', icon: Smartphone, href: '#services' },
            { label: 'Enterprise Solutions', icon: ArrowUpRight, href: '#services' },
        ]
    },
    {
        id: 'automation',
        label: 'Automation',
        icon: Cpu,
        items: [
            { label: 'CRM & Pipelines', icon: MessageSquare, href: '#services' },
            { label: 'Business Intelligence', icon: BarChart, href: '#services' },
            { label: 'Workflow Automation', icon: Cpu, href: '#services' },
            { label: 'Advanced Tracking', icon: Terminal, href: '#services' },
            { label: 'Field Ops', icon: Shield, href: '#services' },
            { label: 'Enterprise Solutions', icon: ArrowUpRight, href: '#services' },
        ]
    }
];

// --- SERVICES MENU ---
const ServicesMenu = ({ onNavigate }: { onNavigate?: (page: PageView, data?: NavigationData) => void }) => {
    const [activeCategory, setActiveCategory] = useState(SERVICES_DATA[0].id);

    const handleItemClick = (item: { label: string }) => {
        if (onNavigate) {
            onNavigate('service', { name: item.label, id: item.label.toLowerCase().replace(/\s+/g, '-') });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Top: Categories */}
            <div className="flex items-center justify-between gap-1 bg-white dark:bg-neutral-900 p-1.5 rounded-2xl border border-black/5 shadow-sm w-full mb-4">
                {SERVICES_DATA.map((category) => (
                    <button
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        className={`
                            flex-1 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap text-center flex items-center justify-center gap-2
                            ${activeCategory === category.id
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                                : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary'}
                        `}
                    >
                        {category.icon && <category.icon className="w-4 h-4" />}
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Bottom: Items */}
            <div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {SERVICES_DATA.find(c => c.id === activeCategory)?.items.map((item) => (
                        <a
                            key={item.label}
                            onClick={(e) => {
                                e.preventDefault();
                                handleItemClick(item);
                            }}
                            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all justify-between group cursor-pointer"
                        >
                            <item.icon className="w-4 h-4 text-text-secondary group-hover:text-current" />
                            <span className="flex-1 text-sm font-medium">{item.label}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="pt-3 border-t border-black/5 flex justify-between items-center bg-black/5 rounded-xl p-3">
                <div className="flex items-center gap-3">
                    <div className="bg-coral/10 p-2 rounded-full text-coral">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h5 className="font-bold text-sm text-text-primary">Need a custom solution?</h5>
                        <p className="text-xs text-text-secondary">We build tailored growth engines.</p>
                    </div>
                </div>
                <Button
                    onClick={() => onNavigate?.('contact')}
                    size="sm"
                >
                    Book Strategy Call
                </Button>
            </div>
        </div>
    );
};

// --- INDUSTRIES DATA & COMPONENT ---
const INDUSTRIES_DATA = [
    {
        id: 'construction',
        label: 'Construction',
        icon: Hammer,
        items: [
            { label: 'ADU & Additions', icon: Home, href: '#industries' },
            { label: 'Bathroom Remodeling', icon: Droplets, href: '#industries' },
            { label: 'Roofing Services', icon: ShieldCheck, href: '#industries' },
            { label: 'Kitchen Remodeling', icon: LayoutGrid, href: '#industries' },
            { label: 'Concrete & Paving', icon: Frame, href: '#industries' },
            { label: 'Fencing & Gates', icon: Ruler, href: '#industries' },
            { label: "Don't see your niche?", icon: MessageSquare, href: '#contact' },
        ]
    },
    {
        id: 'home_services',
        label: 'Home Services',
        icon: Home,
        items: [
            { label: 'HVAC Systems', icon: Zap, href: '#industries' },
            { label: 'Flooring & Tile', icon: LayoutGrid, href: '#industries' },
            { label: 'Int/Ext Painting', icon: PaintBucket, href: '#industries' },
            { label: 'Plumbing', icon: Droplets, href: '#industries' },
            { label: 'Electrical', icon: Zap, href: '#industries' },
            { label: 'Solar Energy', icon: Sun, href: '#industries' },
            { label: 'Landscaping', icon: Sun, href: '#industries' },
            { label: "Don't see your niche?", icon: MessageSquare, href: '#contact' },
        ]
    },
    {
        id: 'automotive',
        label: 'Automotive',
        icon: Car,
        items: [
            { label: 'Paint Protection', icon: ShieldCheck, href: '#industries' },
            { label: 'Vinyl Wraps', icon: Palette, href: '#industries' },
            { label: 'Window Tinting', icon: Sun, href: '#industries' },
            { label: 'Auto Detailing', icon: Sparkles, href: '#industries' },
            { label: 'Ceramic Coating', icon: Droplets, href: '#industries' },
            { label: "Don't see your niche?", icon: MessageSquare, href: '#contact' },
        ]
    },
    {
        id: 'professional',
        label: 'Professional',
        icon: Briefcase,
        items: [
            { label: 'Insurance Agencies', icon: ShieldCheck, href: '#industries' },
            { label: 'Legal Services', icon: Scale, href: '#industries' },
            { label: 'Business Consulting', icon: FileText, href: '#industries' },
            { label: 'Financial Planning', icon: Briefcase, href: '#industries' },
            { label: "Don't see your niche?", icon: MessageSquare, href: '#contact' },
        ]
    }
];

// --- INDUSTRIES MENU ---
const IndustriesMenu = ({ onNavigate }: { onNavigate?: (page: PageView, data?: NavigationData) => void }) => {
    const [activeCategory, setActiveCategory] = useState(INDUSTRIES_DATA[0].id);

    const handleItemClick = (item: { label: string }) => {
        if (onNavigate) {
            onNavigate('industry', { name: item.label, id: item.label.toLowerCase().replace(/\s+/g, '-') });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Top: Categories */}
            <div className="flex items-center justify-between gap-1 bg-white dark:bg-neutral-900 p-1.5 rounded-2xl border border-black/5 shadow-sm w-full mb-4">
                {INDUSTRIES_DATA.map((category) => (
                    <button
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        className={`
                            flex-1 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center justify-center gap-2
                            ${activeCategory === category.id
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                                : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary'}
                        `}
                    >
                        {category.icon && <category.icon className="w-4 h-4" />}
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Bottom: Items */}
            <div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {INDUSTRIES_DATA.find(c => c.id === activeCategory)?.items.map((item) => (
                        <a
                            key={item.label}
                            onClick={(e) => {
                                e.preventDefault();
                                handleItemClick(item);
                            }}
                            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all justify-between group cursor-pointer"
                        >
                            <item.icon className="w-4 h-4 text-text-secondary group-hover:text-current" />
                            <span className="flex-1 text-sm font-medium">{item.label}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="pt-3 border-t border-black/5 flex justify-between items-center bg-black/5 rounded-xl p-3">
                <div className="flex items-center gap-3">
                    <div className="bg-coral/10 p-2 rounded-full text-coral">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h5 className="font-bold text-sm text-text-primary">Don't see your industry?</h5>
                        <p className="text-xs text-text-secondary">We adapt our strategies to any market.</p>
                    </div>
                </div>
                <Button
                    onClick={() => onNavigate?.('contact')}
                    size="sm"
                >
                    Book Strategy Call
                </Button>
            </div>
        </div>
    );
};

const NavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);

    const toggleMobileCategory = (category: string) => {
        setOpenMobileCategory(openMobileCategory === category ? null : category);
    };

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
                <motion.div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.img
                        src="/castells-logo.png"
                        alt="Castells Logo"
                        className="w-12 h-12 object-contain brightness-0 dark:brightness-0 dark:invert"
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    <span className="font-display text-2xl font-bold text-black dark:text-white tracking-tight transition-colors">caste//s</span>
                </motion.div>

                <div className="flex items-center gap-6">
                    <Menu setActive={setActiveTab} className="border-none shadow-none bg-transparent dark:bg-transparent backdrop-blur-none">

                        {/* CASES MENU */}
                        <MenuItem setActive={setActiveTab} active={activeTab} item="Cases">
                            <div className="w-[720px] p-6">
                                <CasesMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>

                        {/* SERVICES MENU - RESTRUCTURED */}
                        <MenuItem setActive={setActiveTab} active={activeTab} item="Services">
                            <div className="w-[800px] p-4">
                                <ServicesMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>

                        {/* INDUSTRIES MENU - RESTRUCTURED */}
                        <MenuItem setActive={setActiveTab} active={activeTab} item="Industries">
                            <div className="w-[800px] p-4">
                                <IndustriesMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>

                        {/* COMPANY MENU */}
                        <MenuItem setActive={setActiveTab} active={activeTab} item="Company">
                            <div className="w-[600px] p-4">
                                <CompanyMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>
                    </Menu>

                    <div className="h-6 w-[1px] bg-black/10 dark:bg-white/10 mx-2"></div>

                    <div className="flex items-center gap-3">
                        <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full" />
                        <Button
                            href="#audit"
                            size="sm"
                            className="hidden lg:flex"
                        >
                            Get Audit
                        </Button>
                    </div>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <div className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); setMobileMenuOpen(false); }}>
                        <img src="/castells-logo.png" alt="Castells Logo" className="w-8 h-8 object-contain" />
                        <span className="font-display text-xl font-bold text-text-primary tracking-tight">caste//s</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center" />
                        <MobileNavToggle isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
                    </div>
                </MobileNavHeader>

                <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
                    <div className="grid gap-2">
                        <a href="#work" onClick={(e) => { e.preventDefault(); onNavigate?.('work'); setMobileMenuOpen(false); }} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold text-text-primary">Work</a>

                        <MobileAccordion>
                            <MobileAccordionItem
                                title="Services"
                                isOpen={openMobileCategory === 'services'}
                                onToggle={() => toggleMobileCategory('services')}
                            >
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Branding & Design</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Identity & Logo</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">UI/UX Design</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Brand Guidelines</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Development</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Custom Web</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Mobile Apps</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">E-commerce</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Growth</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Paid Media (PPC)</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">SEO Strategy</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Video Ads</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Systems</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">CRM Setup</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Automation</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Analytics & BI</a>
                                        </div>
                                    </div>
                                </div>
                            </MobileAccordionItem>

                            <MobileAccordionItem
                                title="Industries"
                                isOpen={openMobileCategory === 'industries'}
                                onToggle={() => toggleMobileCategory('industries')}
                            >
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Construction</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">General</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Roofing</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Remodeling</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Home Services</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">HVAC</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Solar</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Plumbing</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Automotive</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Detailing</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Wraps & PPF</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Performance</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Professional</h5>
                                        <div className="flex flex-col gap-1 pl-2 border-l border-black/10 dark:border-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Legal</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Finance</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Medical</a>
                                        </div>
                                    </div>
                                </div>
                            </MobileAccordionItem>
                        </MobileAccordion>

                        <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate?.('about'); setMobileMenuOpen(false); }} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold text-text-primary">Agency</a>
                        <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate?.('blog'); setMobileMenuOpen(false); }} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold text-text-primary">Insights</a>
                    </div>
                    <div className="pt-4 border-t border-black/5 dark:border-white/5">
                        <Button
                            href="#audit"
                            size="sm"
                            className="w-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Free Audit
                        </Button>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
};

export default NavBar;
