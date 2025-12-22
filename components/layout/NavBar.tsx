
import React, { useState, useCallback } from 'react';
import { m as motion } from "framer-motion";
import {
    Briefcase, Users, Zap, Globe, Search, Cpu, Home, Car, PenTool,
    Layout, FileText, MessageSquare, LineChart, Megaphone,
    Hammer, Activity, Building2, Sparkles, Palette, Terminal, Scale, Flag, Mail, Factory, BarChart3, ArrowRight,
    Shield, Smartphone, ShoppingBag, Video, MousePointer2, Database, BarChart, Settings, Wrench, PaintBucket,
    HardHat, Truck, Stethoscope, Landmark, Coins, Droplets, LayoutGrid, Frame, Ruler, ShieldCheck, Sun, ArrowUpRight, MapPin,
    Book, Layers, Code, ShoppingCart, Calendar, Phone, Send, Snowflake
} from 'lucide-react';
import AnimatedThemeToggler from '../ui/AnimatedThemeToggler';
import SnowEffect from '../effects/SnowEffect';
import { Button } from '../ui/Button';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { Menu, MenuItem, HoveredLink, ProductItem } from '../ui/NavbarMenu';
import { Navbar, NavBody, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu, MobileAccordion, MobileAccordionItem } from '../ui/ResizableNavbar';
import { CASE_STUDIES } from '../../constants';
import { INDUSTRY_CATEGORIES, type IndustryCategory, type IndustryItem } from '../../data/industries';
import { cn } from '../../lib/utils';
import { SERVICE_CATEGORIES, type ServiceCategory, type ServiceItem } from '../../data/services';
import { ContactButtons } from '../ui/ContactButtons';

interface NavBarProps {
    onNavigate?: (page: PageView, data?: NavigationData) => void;
}

const CategoryCard = ({ title, icon: Icon, href }: { title: string, icon: React.ComponentType<{ className?: string }>, href: string }) => (
    <a href={href} className="flex flex-col items-center justify-center gap-3 p-4 rounded-[2rem] bg-black/5 dark:bg-white/5 hover:bg-coral/10 hover:text-coral transition-all group text-center h-full">
        <div className="bg-white dark:bg-black p-3 rounded-xl  group-hover:scale-110 transition-transform">
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
                    <h3 className="font-display text-xl font-semibold text-text-primary mb-1">Featured Work</h3>
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
                    <a
                        key={caseStudy.id}
                        href={`/case-studies/${encodeURIComponent(caseStudy.id)}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate?.('case-study', caseStudy as any);
                        }}
                        className="group cursor-pointer rounded-[2rem] overflow-hidden relative h-[200px]  -black/5 dark:-white/10"
                    >
                        {/* Background Image */}
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.client}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                            loading="lazy"
                            style={{ transform: 'translateZ(0)' }}
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
                            <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-coral transition-colors">
                                {caseStudy.client}
                            </h4>
                            <div className="flex items-baseline gap-1">
                                <span className="text-coral font-bold text-lg">{caseStudy.metric}</span>
                                <span className="text-white/50 text-[10px] uppercase">{caseStudy.metricLabel}</span>
                            </div>
                        </div>
                    </a>
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
            { label: 'Our Story', icon: Flag, href: '/about', page: 'about' as PageView },
            { label: 'Leadership', icon: Users, href: '/team', page: 'team' as PageView },
            { label: 'Careers', icon: Briefcase, href: '/careers', page: 'careers' as PageView },
        ]
    },
    {
        id: 'connect',
        label: 'Connect',
        icon: MessageSquare,
        items: [
            { label: 'Blog & Insights', icon: FileText, href: '/blog', page: 'blog' as PageView },
            { label: 'Contact Us', icon: Mail, href: '/contact', page: 'contact' as PageView },
            { label: 'Press', icon: Megaphone, href: '#press' },
        ]
    }
];

const CompanyMenu = ({ onNavigate }: { onNavigate?: import('../../types').NavigateFn }) => {
    // Flatten items from all categories
    const allItems = COMPANY_DATA.flatMap(category => category.items);

    const handleItemClick = (item: typeof allItems[0]) => {
        if (item.page && onNavigate) {
            onNavigate(item.page);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
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
                        className="flex items-center gap-3 w-full p-3 rounded-[2rem] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all justify-between group cursor-pointer"
                    >
                        <item.icon className="w-4 h-4 text-text-secondary group-hover:text-current" />
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
            </div>

            <div className="pt-2 -t -black/5 bg-ivory dark:bg-white/5 rounded-[2rem] p-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="bg-coral/10 h-10 w-10 flex items-center justify-center rounded-full text-coral shrink-0">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex items-center">
                            <h5 className="font-sans font-bold text-sm text-text-primary truncate">Contact us</h5>
                        </div>
                    </div>

                    <ContactButtons />
                </div>
            </div>
        </div>
    );
};

// --- SERVICES DATA & COMPONENT ---
const SERVICES_DATA = SERVICE_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    icon: category.icon,
    items: category.items.map((item) => ({ label: item.name, icon: item.icon, slug: item.slug })),
}));

// --- SERVICES MENU ---
const ServicesMenu = ({ onNavigate }: { onNavigate?: (page: PageView, data?: NavigationData) => void }) => {
    const [activeCategory, setActiveCategory] = useState(SERVICES_DATA[0].id);

    const handleCategoryClick = (category: { id: string; label: string }) => {
        if (onNavigate) {
            onNavigate('service', { name: category.label, id: category.id });
        }
    };

    const handleItemClick = (item: { label: string; slug: string }) => {
        if (onNavigate) {
            onNavigate('service', { name: item.label, id: item.slug });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Top: Categories */}
            <div className="flex items-center justify-between gap-1 bg-ivory dark:bg-black/30 p-1 rounded-[2rem]  -black/5 dark:-white/10  w-full mb-2">
                {SERVICES_DATA.map((category) => (
                    <button
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        onClick={() => handleCategoryClick(category)}
                        className={`
                            flex-1 min-w-0 overflow-hidden px-2 py-2 rounded-[2rem] text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap text-center flex items-center justify-center gap-1.5 cursor-pointer
                            ${activeCategory === category.id
                                ? 'bg-black text-white dark:bg-white dark:text-black '
                                : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary'}
                        `}
                    >
                        {category.icon && (
                            <category.icon
                                className={`w-3.5 h-3.5 shrink-0 ${activeCategory === category.id ? 'text-white dark:text-black' : ''}`}
                            />
                        )}
                        <span className="min-w-0 max-w-full truncate">{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Bottom: Items */}
            <div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {SERVICES_DATA.find(c => c.id === activeCategory)?.items.map((item) => (
                        <a
                            key={item.label}
                            href={`/services/${encodeURIComponent(item.slug)}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleItemClick(item);
                            }}
                            className="flex items-center gap-3 w-full p-3 rounded-[2rem] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all justify-between group cursor-pointer"
                        >
                            <item.icon className="w-4 h-4 text-text-secondary group-hover:text-current" />
                            <span className="flex-1 text-sm font-medium">{item.label}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="pt-2 -t -black/5 bg-ivory dark:bg-white/5 rounded-[2rem] p-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="bg-coral/10 h-10 w-10 flex items-center justify-center rounded-full text-coral shrink-0">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex items-center">
                            <h5 className="font-sans font-bold text-sm text-text-primary truncate">Need a custom solution?</h5>
                        </div>
                    </div>
                    <ContactButtons />
                </div>
            </div>
        </div>
    );
};

// --- INDUSTRIES MENU ---
const IndustriesMenu = ({ onNavigate }: { onNavigate?: (page: PageView, data?: NavigationData) => void }) => {
    const [activeCategory, setActiveCategory] = useState(INDUSTRY_CATEGORIES[0].id);

    const handleCategoryClick = (category: IndustryCategory) => {
        if (onNavigate) {
            onNavigate('industry', { name: category.label, id: category.id });
        }
    };

    const handleItemClick = (item: IndustryItem) => {
        if (!onNavigate) return;

        if (item.type === 'cta') {
            onNavigate('contact');
            return;
        }

        onNavigate('industry', { name: item.name, id: item.slug });
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Top: Categories */}
            <div className="flex items-center justify-between gap-1 bg-ivory dark:bg-black/30 p-1 rounded-[2rem]  -black/5 dark:-white/10  w-full mb-2">
                {INDUSTRY_CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        onClick={() => handleCategoryClick(category)}
                        className={`
                            flex-1 min-w-0 overflow-hidden px-2 py-2 rounded-[2rem] text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer
                            ${activeCategory === category.id
                                ? 'bg-black text-white dark:bg-white dark:text-black '
                                : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary'}
                        `}
                    >
                        {category.icon && (
                            <category.icon
                                className={`w-3.5 h-3.5 shrink-0 ${activeCategory === category.id ? 'text-white dark:text-black' : ''}`}
                            />
                        )}
                        <span className="min-w-0 max-w-full truncate">{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Bottom: Items */}
            <div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {INDUSTRY_CATEGORIES.find(c => c.id === activeCategory)?.items.map((item) => (
                        <a
                            key={item.name}
                            href={
                                item.type === 'cta'
                                    ? item.href
                                    : `/industries/${encodeURIComponent(item.slug)}`
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                handleItemClick(item);
                            }}
                            className="flex items-center gap-3 w-full p-3 rounded-[2rem] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all justify-between group cursor-pointer"
                        >
                            <item.icon className="w-4 h-4 text-text-secondary group-hover:text-current" />
                            <span className="flex-1 text-sm font-medium">{item.name}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="pt-2 -t -black/5 bg-ivory dark:bg-white/5 rounded-[2rem] p-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="bg-coral/10 h-10 w-10 flex items-center justify-center rounded-full text-coral shrink-0">
                            <Activity className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex items-center">
                            <h5 className="font-sans font-bold text-sm text-text-primary truncate">Don't see your industry?</h5>
                        </div>
                    </div>
                    <ContactButtons />
                </div>
            </div>
        </div>
    );
};

const NavBar: React.FC<NavBarProps> = React.memo(({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
    const [isSnowActive, setIsSnowActive] = useState(false);

    const toggleMobileCategory = useCallback((category: string) => {
        setOpenMobileCategory(prev => prev === category ? null : category);
    }, []);

    const handleLinkClick = useCallback((e: React.MouseEvent, href?: string, page?: PageView) => {
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
    }, [onNavigate]);

    const handleSnowToggle = useCallback(() => {
        setIsSnowActive(true);
    }, []);

    const handleHomeClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        onNavigate?.('home');
    }, [onNavigate]);

    return (
        <Navbar>
            {/* Desktop Navigation Body */}
            <NavBody>
                <motion.div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={handleHomeClick}
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
                        loading="eager"
                        fetchPriority="high"
                    />
                    <span className="font-display text-4xl font-bold text-black dark:text-white tracking-tight transition-colors leading-none flex items-center">Caste//s</span>
                </motion.div>

                <div className="flex items-center gap-6">
                    <Menu setActive={setActiveTab} className="-none  bg-transparent dark:bg-transparent backdrop-blur-none">

                        {/* CASES MENU */}
                        <MenuItem 
                            setActive={setActiveTab} 
                            active={activeTab} 
                            item="Cases"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate?.('work');
                            }}
                        >
                            <div className="w-[720px] p-3">
                                <CasesMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>

                        {/* SERVICES MENU - RESTRUCTURED */}
                        <MenuItem 
                            setActive={setActiveTab} 
                            active={activeTab} 
                            item="Services"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate?.('services');
                            }}
                        >
                            <div className="w-[800px] p-3">
                                <ServicesMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>

                        {/* INDUSTRIES MENU - RESTRUCTURED */}
                        <MenuItem 
                            setActive={setActiveTab} 
                            active={activeTab} 
                            item="Industries"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate?.('industries');
                            }}
                        >
                            <div className="w-[800px] p-3">
                                <IndustriesMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>

                        {/* COMPANY MENU */}
                        <MenuItem 
                            setActive={setActiveTab} 
                            active={activeTab} 
                            item="Company"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate?.('company');
                            }}
                        >
                            <div className="w-[550px] p-3">
                                <CompanyMenu onNavigate={onNavigate} />
                            </div>
                        </MenuItem>
                    </Menu>

                    <div className="h-6 w-[1px] bg-black/10 dark:bg-white/10 mx-2"></div>

                    <div className="flex items-center gap-3">
                        <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full" />
                        <button
                            onClick={handleSnowToggle}
                            className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors p-2"
                            aria-label="Start snow effect"
                        >
                            <Snowflake className="w-5 h-5 text-text-primary" />
                        </button>
                        <Button
                            href="/contact"
                            size="sm"
                            className="hidden lg:flex"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate?.('contact');
                            }}
                        >
                            Get Audit
                        </Button>
                    </div>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <div className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); handleHomeClick(e); setMobileMenuOpen(false); }}>
                        <img src="/castells-logo.png" alt="Castells Logo" className="w-8 h-8 object-contain" loading="eager" fetchPriority="high" />
                        <span className="font-display text-2xl font-bold text-text-primary tracking-tight">Caste//s</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center" />
                        <button
                            onClick={handleSnowToggle}
                            className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors p-2"
                            aria-label="Start snow effect"
                        >
                            <Snowflake className="w-5 h-5 text-text-primary" />
                        </button>
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
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Identity & Logo</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">UI/UX Design</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Brand Guidelines</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Development</h5>
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Custom Web</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Mobile Apps</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">E-commerce</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Growth</h5>
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Paid Media (PPC)</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">SEO Strategy</a>
                                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Video Ads</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Systems</h5>
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
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
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">General</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Roofing</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Remodeling</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Home Services</h5>
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">HVAC</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Solar</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Automotive</h5>
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Detailing</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Wraps & PPF</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Performance</a>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold uppercase tracking-widest text-coral">Professional</h5>
                                        <div className="flex flex-col gap-1 pl-2 -l -black/10 dark:-white/10">
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Legal</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Finance</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Real Estate</a>
                                            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-1 px-2 text-sm text-text-secondary hover:text-text-primary">Medical</a>
                                        </div>
                                    </div>
                                </div>
                            </MobileAccordionItem>
                        </MobileAccordion>

                        <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate?.('about'); setMobileMenuOpen(false); }} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold text-text-primary">Agency</a>
                        <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate?.('blog'); setMobileMenuOpen(false); }} className="block p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-display text-xl font-bold text-text-primary">Insights</a>
                    </div>
                    <div className="pt-4 -t -black/5 dark:-white/5">
                        <Button
                            href="/contact"
                            size="sm"
                            className="w-full"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate?.('contact');
                                setMobileMenuOpen(false);
                            }}
                        >
                            Get Free Audit
                        </Button>
                    </div>
                </MobileNavMenu>
            </MobileNav>

            {/* Snow Effect */}
            <SnowEffect
                isActive={isSnowActive}
            />
        </Navbar>
    );
});

NavBar.displayName = 'NavBar';

export default NavBar;
