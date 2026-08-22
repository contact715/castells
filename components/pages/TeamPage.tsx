import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Award, TrendingUp, Zap, Target, Heart, Globe, Briefcase, Code, PenTool, BarChart3, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Section, SectionContainer, SectionHeader } from '../ui/Section';
import AnimatedHeading from '../ui/AnimatedHeading';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import type { NavigateFn } from '../../types';

interface TeamPageProps {
    onBack?: () => void;
    onNavigate?: NavigateFn;
}

type TeamCategory = 'all' | 'leadership' | 'strategy' | 'creative' | 'operations' | 'development' | 'analytics';

interface TeamMember {
    name: string;
    role: string;
    category: TeamCategory[];
    image: string;
    bio?: string;
    achievements?: string[];
    expertise?: string[];
    location?: string;
    years?: number;
}

/*
  Здесь стояли двенадцать человек: Sarah Mitchell «ex-Google Ads», David Park,
  Elena Rodriguez, Michael Chang и другие — с достижениями вроде «Agency of the
  Year 2021», «$50M+ Revenue Generated», «Managed $20M+ Ad Spend», «Google
  Premier Partner». Все двенадцать фотографий взяты со стокового фотобанка,
  включая фотографию основателя — то есть посторонний человек был подписан
  именем владельца агентства.

  Осталась одна карточка, и в ней нет ни одного непроверенного утверждения.
  Настоящие люди появятся здесь, когда владелец пришлёт имена, роли и фото.
*/
const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Dmitrii Z.',
        role: 'Founder',
        category: ['leadership', 'strategy'],
        image: '',
        bio: 'Runs the agency and the client work. If you write to us, you are talking to him.',
        expertise: ['Growth Strategy', 'Paid Media', 'Web Development'],
        location: 'Santa Monica, CA',
    },
];

const CATEGORIES: { id: TeamCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Team', icon: Users },
    { id: 'leadership', label: 'Leadership', icon: Award },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'creative', label: 'Creative', icon: PenTool },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'operations', label: 'Operations', icon: Briefcase },
];

/*
  Здесь стояли четыре счётчика: «35+ Team Members», «150+ Years Combined
  Experience», «15 Countries Represented», «95% Client Retention Rate».
  Ни одно число не взято из наших данных. Блок не рисуется, пока считать нечего.
*/
const TEAM_STATS: { value: number; suffix: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [];

const CULTURE_VALUES = [
    {
        icon: Target,
        title: 'Revenue Obsessed',
        description: 'Every decision is optimized for ROI. We measure success by your bottom line, not vanity metrics.'
    },
    {
        icon: Zap,
        title: 'Speed is Currency',
        description: 'We move fast. Campaigns launch in days, not months. Every hour counts in the market.'
    },
    {
        icon: TrendingUp,
        title: 'Continuous Growth',
        description: 'We invest in our team\'s development. Regular training, certifications, and skill expansion.'
    },
    {
        icon: Heart,
        title: 'Ownership Mentality',
        description: 'We treat your business as our own. Your growth is our reputation. We win together.'
    },
];

const TeamPage: React.FC<TeamPageProps> = ({ onBack, onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState<TeamCategory>('all');

    const filteredMembers = activeCategory === 'all' 
        ? TEAM_MEMBERS 
        : TEAM_MEMBERS.filter(member => member.category.includes(activeCategory));

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.studio';

    return (
        <>
            <SEO 
                title="Team | Castells Media" 
                description="The people behind Castells Media, a marketing agency in Santa Monica, California."
                canonical="/team"
                keywords="marketing team, digital marketing experts, Santa Monica marketing team, Los Angeles marketing professionals, Google Ads specialists, Meta Ads experts, performance marketing team"
                geoRegion="US-CA"
                geoPlacename="Santa Monica, California"
                summary="The team behind Castells Media, a marketing agency based in Santa Monica, California."
                mainEntity="Marketing Team"
            />
            <SchemaMarkup
                type="BreadcrumbList"
                data={{
                    itemListElement: [
                        { name: 'Home', item: `${siteUrl}/` },
                        { name: 'Company', item: `${siteUrl}/company` },
                        { name: 'Our Team', item: `${siteUrl}/team` }
                    ]
                }}
            />
            <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-16 md:pt-20 pb-20 animate-in fade-in duration-500">
                {/* Hero Section */}
                <div className="container mx-auto px-6 pt-4 md:pt-6">
                        <PageHeader
                            breadcrumbs={[
                                { label: 'Home', action: () => onNavigate?.('home') },
                                { label: 'Company' },
                                { label: 'Our Team', active: true },
                            ]}
                            badge="Our Team"
                            title="Meet the Experts."
                            description="The talented professionals behind our agency's success. World-class talent from Google, Meta, and top agencies."
                            onNavigate={onNavigate}
                        />

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 md:mt-16"
                        >
                            {TEAM_STATS.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                        className="bg-surface rounded-card shadow-spatial-card p-6 border border-black/5 dark:border-white/10"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-element bg-coral/10 flex items-center justify-center text-coral-text shrink-0">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-1">
                                                    {stat.value}{stat.suffix}
                                                </div>
                                                <div className="text-xs md:text-sm text-text-secondary font-medium">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                {/* Category Filters */}
                <section className="pt-12 md:pt-16 pb-0 bg-ivory relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10 pb-6">
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                            {TEAM_MEMBERS.length > 3 && CATEGORIES.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeCategory === category.id;
                                return (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`
                                            flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium text-sm md:text-base transition-[background-color,color,border-color] duration-300
                                            ${isActive
                                                ? 'bg-coral text-white'
                                                : 'bg-surface text-text-secondary hover:bg-coral/10 hover:text-coral-text border border-black/5 dark:border-white/5'
                                            }
                                        `}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {category.label}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Team Grid */}
                <Section>
                    <SectionContainer>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                            >
                                {filteredMembers.map((member, index) => (
                                    <motion.div
                                        key={member.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.5 }}
                                        className="group bg-surface rounded-card overflow-hidden border border-black/5 dark:border-white/10 hover:-translate-y-1 transition-[transform,box-shadow] duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-3/4 overflow-hidden">
                                            {/* Нет фотографии — инициалы. Чужое лицо со стока вместо
                                                своего человека мы больше не показываем. */}
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    style={{ transform: 'translateZ(0)' }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-coral-gradient flex items-center justify-center">
                                                    <span className="font-display text-5xl font-normal text-white select-none">
                                                        {member.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent rounded-xl" />
                                            
                                            {/* Category Badges */}
                                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                                {member.category.slice(0, 2).map((cat) => {
                                                    const categoryData = CATEGORIES.find(c => c.id === cat);
                                                    if (!categoryData || cat === 'all') return null;
                                                    return (
                                                        <span
                                                            key={cat}
                                                            className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white text-[10px] font-medium"
                                                        >
                                                            {categoryData.label}
                                                        </span>
                                                    );
                                                })}
                                            </div>

                                            {/* Content Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <h3 className="font-display text-base md:text-lg font-bold text-white mb-0.5">
                                                    {member.name}
                                                </h3>
                                                <p className="text-xs text-white/90">
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="p-3">
                                            {member.bio && (
                                                <p className="text-xs text-text-secondary dark:text-white/70 leading-relaxed mb-2 line-clamp-2">
                                                    {member.bio}
                                                </p>
                                            )}

                                            {member.expertise && member.expertise.length > 0 && (
                                                <div>
                                                    <p className="text-[10px] font-semibold text-text-secondary dark:text-white/60 mb-1 uppercase tracking-wider">
                                                        Expertise
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {member.expertise.slice(0, 2).map((skill, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-0.5 rounded-md bg-coral/10 text-coral-text text-[10px] font-medium"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Join Team CTA Card */}
                                {activeCategory === 'all' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: filteredMembers.length * 0.05, duration: 0.5 }}
                                        onClick={() => onNavigate?.('careers')}
                                        className="group bg-surface rounded-card overflow-hidden border border-black/5 dark:border-white/10 hover:-translate-y-1 transition-[transform,box-shadow] duration-300 cursor-pointer relative"
                                    >
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-30">
                                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                <defs>
                                                    <pattern id="teamGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                                        <circle cx="1" cy="1" r="0.5" fill="#E08576" opacity="0.3" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill="url(#teamGrid)" />
                                            </svg>
                                        </div>

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-br from-coral/10 via-transparent to-coral/5 group-hover:from-coral/20 group-hover:to-coral/10 transition-[background-image] duration-500" />

                                        {/* Content */}
                                        <div className="relative p-4 md:p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-element bg-coral flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <ArrowUpRight className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300" />
                                            </div>

                                            {/* Text */}
                                            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary dark:text-white mb-2">
                                                Join Our Team
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary dark:text-white/70 leading-relaxed mb-4 max-w-xs">
                                                We're always looking for talented professionals who share our passion for revenue-focused marketing.
                                            </p>
                                            <div className="flex items-center gap-2 text-coral-text font-semibold text-xs group-hover:gap-3 transition-[gap] duration-300">
                                                View Open Positions
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Border Effect */}
                                        <div className="absolute inset-0 rounded-card border border-black/5 dark:border-white/10 group-hover:border-coral/50 transition-colors duration-300 pointer-events-none" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </SectionContainer>
                </Section>

                {/* Culture & Values Section */}
                <Section>
                    <SectionContainer>
                        <SectionHeader
                            badge="Our Culture"
                            title="Built for Excellence"
                            centered
                        >
                            <p className="text-lg text-text-secondary leading-relaxed mt-4">
                                Our team culture drives our results. We've built an environment where top talent thrives and delivers exceptional work.
                            </p>
                        </SectionHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {CULTURE_VALUES.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="bg-surface rounded-card shadow-spatial-card p-6 md:p-8 border border-black/5 dark:border-white/10 hover:-translate-y-1 hover:shadow-spatial-md transition-[transform,box-shadow] duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-element bg-coral/10 flex items-center justify-center text-coral-text mb-4">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary dark:text-white/70 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </SectionContainer>
                </Section>

            </div>
        </>
    );
};

export default TeamPage;
