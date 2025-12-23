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

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Dmitrii Z.',
        role: 'Founder & CEO',
        category: ['leadership', 'strategy'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        bio: '12+ years building revenue-focused marketing agencies. Former growth lead at multiple 8-figure companies.',
        achievements: ['Agency of the Year 2021', '500+ Campaigns Launched', '$50M+ Revenue Generated'],
        expertise: ['Growth Strategy', 'Performance Marketing', 'Team Building'],
        location: 'Los Angeles, CA',
        years: 12
    },
    {
        name: 'Sarah Mitchell',
        role: 'Head of Paid Media',
        category: ['strategy', 'analytics'],
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
        bio: 'Ex-Google Ads specialist with 8+ years optimizing multi-million dollar ad budgets. Expert in ROAS optimization.',
        achievements: ['3.2x Average ROAS', 'Managed $20M+ Ad Spend', 'Google Premier Partner'],
        expertise: ['Google Ads', 'Meta Ads', 'Performance Optimization'],
        location: 'Remote',
        years: 8
    },
    {
        name: 'David Park',
        role: 'Head of Data & Analytics',
        category: ['analytics', 'strategy'],
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
        bio: 'Data scientist turned marketer. Built proprietary attribution models that increased client ROI by 40%.',
        achievements: ['Custom Attribution Models', '40% ROI Increase', 'Data Science Expert'],
        expertise: ['Attribution Modeling', 'Data Analysis', 'Machine Learning'],
        location: 'New York, NY',
        years: 7
    },
    {
        name: 'Elena Rodriguez',
        role: 'Creative Director',
        category: ['creative', 'strategy'],
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        bio: 'Award-winning creative strategist. Her campaigns have generated over $15M in revenue for clients.',
        achievements: ['Award-Winning Campaigns', '$15M+ Revenue Generated', 'Creative Excellence'],
        expertise: ['Creative Strategy', 'Brand Development', 'Video Production'],
        location: 'Los Angeles, CA',
        years: 10
    },
    {
        name: 'James Wilson',
        role: 'Lead Developer',
        category: ['development', 'operations'],
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
        bio: 'Full-stack developer specializing in marketing automation and conversion optimization. Built 50+ landing pages.',
        achievements: ['50+ Landing Pages Built', '40% Avg Conversion Increase', 'Automation Expert'],
        expertise: ['Web Development', 'Marketing Automation', 'Conversion Optimization'],
        location: 'Remote',
        years: 9
    },
    {
        name: 'Michael Chang',
        role: 'Automation Specialist',
        category: ['development', 'operations'],
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
        bio: 'Marketing automation expert. Built systems that save clients 20+ hours per week through intelligent automation.',
        achievements: ['20+ Hours Saved Weekly', 'Automation Systems', 'Process Optimization'],
        expertise: ['Marketing Automation', 'CRM Integration', 'Workflow Design'],
        location: 'Remote',
        years: 6
    },
    {
        name: 'Anna Kowalski',
        role: 'Content Strategist',
        category: ['creative', 'strategy'],
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
        bio: 'Content strategist with expertise in high-ticket service industries. Her content has generated 500+ qualified leads.',
        achievements: ['500+ Qualified Leads', 'Content Strategy Expert', 'SEO Specialist'],
        expertise: ['Content Strategy', 'SEO', 'Copywriting'],
        location: 'Remote',
        years: 7
    },
    {
        name: 'Marcus Thorne',
        role: 'Client Success Director',
        category: ['operations', 'strategy'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
        bio: 'Client success expert with 95% client retention rate. Ensures every client achieves their revenue goals.',
        achievements: ['95% Client Retention', '100+ Clients Served', 'Client Success Expert'],
        expertise: ['Account Management', 'Client Relations', 'Revenue Growth'],
        location: 'Los Angeles, CA',
        years: 8
    },
    {
        name: 'Lisa Chen',
        role: 'SEO Specialist',
        category: ['strategy', 'analytics'],
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
        bio: 'SEO expert who has increased organic traffic by 300%+ for multiple clients. Expert in technical SEO.',
        achievements: ['300%+ Traffic Increase', 'SEO Expert', 'Technical SEO'],
        expertise: ['SEO Strategy', 'Technical SEO', 'Link Building'],
        location: 'Remote',
        years: 6
    },
    {
        name: 'Robert Martinez',
        role: 'Head of Operations',
        category: ['operations', 'leadership'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
        bio: 'Operations leader ensuring seamless delivery across all client projects. Expert in process optimization.',
        achievements: ['Process Optimization', 'Team Leadership', 'Project Management'],
        expertise: ['Operations', 'Project Management', 'Team Coordination'],
        location: 'Los Angeles, CA',
        years: 11
    },
    {
        name: 'Jennifer Kim',
        role: 'Senior Performance Marketer',
        category: ['strategy', 'analytics'],
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
        bio: 'Performance marketing specialist with expertise in scaling campaigns from $10K to $1M+ monthly ad spend.',
        achievements: ['Scaled to $1M+ Ad Spend', 'Performance Marketing Expert', 'Campaign Scaling'],
        expertise: ['Performance Marketing', 'Campaign Scaling', 'ROAS Optimization'],
        location: 'Remote',
        years: 7
    },
    {
        name: 'Thomas Anderson',
        role: 'UX/UI Designer',
        category: ['creative', 'development'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        bio: 'Designer focused on conversion-optimized experiences. His designs have increased conversion rates by 50%+.',
        achievements: ['50%+ Conversion Increase', 'UX/UI Design Expert', 'Conversion Optimization'],
        expertise: ['UX/UI Design', 'Conversion Design', 'User Research'],
        location: 'Remote',
        years: 8
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

const TEAM_STATS = [
    { value: 35, suffix: '+', label: 'Team Members', icon: Users },
    { value: 150, suffix: '+', label: 'Years Combined Experience', icon: Award },
    { value: 15, suffix: '', label: 'Countries Represented', icon: Globe },
    { value: 95, suffix: '%', label: 'Client Retention Rate', icon: Heart },
];

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

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';

    return (
        <>
            <SEO 
                title="Our Team | Castells Agency - Expert Marketing Professionals" 
                description="Meet the talented professionals behind our agency's success. World-class talent from Google, Meta, and top agencies. 35+ team members with 150+ years combined experience, serving clients from our Santa Monica headquarters and remotely across the US."
                canonical="/team"
                keywords="marketing team, digital marketing experts, Santa Monica marketing team, Los Angeles marketing professionals, Google Ads specialists, Meta Ads experts, performance marketing team"
                geoRegion="US-CA"
                geoPlacename="Santa Monica, California"
                summary="Castells Agency team consists of 35+ marketing professionals with 150+ years combined experience. Team includes ex-Google and ex-Meta specialists, serving clients from Santa Monica headquarters and remotely across the US."
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
                                        className="bg-surface rounded-[2rem] p-6 -black/5 dark:-white/10"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-[2rem] bg-coral/10 flex items-center justify-center text-coral flex-shrink-0">
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
                            {CATEGORIES.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeCategory === category.id;
                                return (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`
                                            flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300
                                            ${isActive
                                                ? 'bg-coral text-white'
                                                : 'bg-surface text-text-secondary hover:bg-coral/10 hover:text-coral -black/5 dark:-white/5'
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
                                        className="group bg-surface rounded-[2rem] overflow-hidden -black/5 dark:-white/10 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                                                style={{ transform: 'translateZ(0)' }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl" />
                                            
                                            {/* Category Badges */}
                                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                                {member.category.slice(0, 2).map((cat) => {
                                                    const categoryData = CATEGORIES.find(c => c.id === cat);
                                                    if (!categoryData || cat === 'all') return null;
                                                    return (
                                                        <span
                                                            key={cat}
                                                            className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium"
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
                                                                className="px-2 py-0.5 rounded-md bg-coral/10 text-coral text-[10px] font-medium"
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
                                        className="group bg-surface rounded-[2rem] overflow-hidden -black/5 dark:-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
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
                                        <div className="absolute inset-0 bg-gradient-to-br from-coral/10 via-transparent to-coral/5 group-hover:from-coral/20 group-hover:to-coral/10 transition-all duration-500" />

                                        {/* Content */}
                                        <div className="relative p-4 md:p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-[2rem] bg-coral flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <ArrowUpRight className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300" />
                                            </div>

                                            {/* Text */}
                                            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary dark:text-white mb-2">
                                                Join Our Team
                                            </h3>
                                            <p className="text-xs md:text-sm text-text-secondary dark:text-white/70 leading-relaxed mb-4 max-w-xs">
                                                We're always looking for talented professionals who share our passion for revenue-focused marketing.
                                            </p>
                                            <div className="flex items-center gap-2 text-coral font-semibold text-xs group-hover:gap-3 transition-all duration-300">
                                                View Open Positions
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Border Effect */}
                                        <div className="absolute inset-0 rounded-[2rem] -black/5 dark:-white/10 group-hover:-coral/50 transition-colors duration-300 pointer-events-none" />
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
                                        className="bg-surface rounded-[2rem] p-6 md:p-8 -black/5 dark:-white/10 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-[2rem] bg-coral/10 flex items-center justify-center text-coral mb-4">
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
