import React, { useState } from 'react';
import { Search, Grid3x3, List, Code, BarChart, Zap, Scale, Globe, Terminal, Users, TrendingUp, Palette } from 'lucide-react';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import { NavigationData } from '../../types';

interface BlogPost {
    id: number;
    title: string;
    date: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
    image: string;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "The Death of Generic Targeting: Why Hyper-Local Wins in 2025",
        date: "Oct 13, 2025",
        category: "Marketing",
        icon: TrendingUp,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
    },
    {
        id: 2,
        title: "AI Agents vs. Human Support: The Hybrid Model",
        date: "Aug 2, 2025",
        category: "Enterprise AI",
        icon: Users,
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1600&q=80"
    },
    {
        id: 3,
        title: "Behind every pixel lies purpose passion and powerful brand",
        date: "Aug 6, 2025",
        category: "Design",
        icon: Palette,
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80"
    },
    {
        id: 4,
        title: "Creative ideas smart solutions and insights to shape the future",
        date: "Aug 27, 2025",
        category: "Coding",
        icon: Code,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80"
    },
    {
        id: 5,
        title: "Building Scalable Growth Systems for Local Businesses",
        date: "Sep 15, 2025",
        category: "Business",
        icon: BarChart,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
    },
    {
        id: 6,
        title: "Automation Strategies That Actually Work",
        date: "Sep 28, 2025",
        category: "Automation",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80"
    },
    {
        id: 7,
        title: "Legal Tech: How AI Transforms Contract Review",
        date: "Oct 5, 2025",
        category: "Legal",
        icon: Scale,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
    },
    {
        id: 8,
        title: "Global Expansion: Digital Marketing Across Borders",
        date: "Oct 20, 2025",
        category: "Marketing",
        icon: Globe,
        image: "https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?w=1600&q=80"
    },
    {
        id: 9,
        title: "Advanced Analytics: Turning Data Into Decisions",
        date: "Nov 1, 2025",
        category: "Analytics",
        icon: Terminal,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
    },
];

const CATEGORIES = ["Marketing", "Design", "Coding", "Business", "Automation", "Analytics", "Legal", "Enterprise AI"];
const TOPICS = ["Branding", "Development", "Advertising", "Automation", "Growth", "Strategy", "Case Studies"];
const INDUSTRIES = ["Construction", "Home Services", "Automotive", "Professional", "Retail", "Healthcare"];

const BlogPage: React.FC<{ onNavigate?: (page: PageView, data?: NavigationData) => void }> = ({ onNavigate }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Newest');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleTopic = (topic: string) => {
        setSelectedTopics(prev => 
            prev.includes(topic) 
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    const toggleIndustry = (industry: string) => {
        setSelectedIndustries(prev => 
            prev.includes(industry) 
                ? prev.filter(i => i !== industry)
                : [...prev, industry]
        );
    };

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);
        return matchesSearch && matchesCategory;
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortBy === 'Newest') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === 'Alphabetically (A to Z)') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    return (
        <>
            <SEO 
                title="Blog & Insights | Castells Agency" 
                description="Explore our latest insights, strategies, and case studies on digital marketing, growth, automation, and revenue optimization."
                canonical="/blog"
            />
            <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Blog & Insights', active: true },
                    ]}
                    badge="Blog & Insights"
                    title="Latest Insights."
                    description="Industry trends, case studies, and growth strategies."
                    onNavigate={onNavigate}
                />

                {/* Main Content: Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column: Filters */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-text-primary dark:text-white mb-6">
                                Filter and sort
                            </h2>

                            {/* Sort By */}
                            <div className="mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                                <label className="block text-xs font-medium text-text-secondary dark:text-white/60 mb-2">
                                    Sort by
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-white dark:bg-surface border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-text-primary dark:text-white focus:outline-none focus:border-coral"
                                >
                                    <option>Newest</option>
                                    <option>Alphabetically (A to Z)</option>
                                    <option>Alphabetically (Z to A)</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                                <label className="block text-xs font-medium text-text-secondary dark:text-white/60 mb-3">
                                    Category
                                </label>
                                <div className="space-y-2">
                                    {CATEGORIES.map(cat => (
                                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                                className="w-4 h-4 rounded border-black/20 dark:border-white/20 bg-white dark:bg-surface text-coral focus:ring-coral focus:ring-offset-0 cursor-pointer"
                                            />
                                            <span className="text-sm text-text-primary dark:text-white group-hover:text-coral transition-colors">
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Topic */}
                            <div className="mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                                <label className="block text-xs font-medium text-text-secondary dark:text-white/60 mb-3">
                                    Topic
                                </label>
                                <div className="space-y-2">
                                    {TOPICS.map(topic => (
                                        <label key={topic} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedTopics.includes(topic)}
                                                onChange={() => toggleTopic(topic)}
                                                className="w-4 h-4 rounded border-black/20 dark:border-white/20 bg-white dark:bg-surface text-coral focus:ring-coral focus:ring-offset-0 cursor-pointer"
                                            />
                                            <span className="text-sm text-text-primary dark:text-white group-hover:text-coral transition-colors">
                                                {topic}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Industry */}
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-text-secondary dark:text-white/60 mb-3">
                                    Industry
                                </label>
                                <div className="space-y-2">
                                    {INDUSTRIES.map(industry => (
                                        <label key={industry} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedIndustries.includes(industry)}
                                                onChange={() => toggleIndustry(industry)}
                                                className="w-4 h-4 rounded border-black/20 dark:border-white/20 bg-white dark:bg-surface text-coral focus:ring-coral focus:ring-offset-0 cursor-pointer"
                                            />
                                            <span className="text-sm text-text-primary dark:text-white group-hover:text-coral transition-colors">
                                                {industry}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-3">
                        {/* Search and View Toggle */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-white/60" />
                                    <input
                                        type="text"
                                        placeholder="Search posts"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white dark:bg-surface border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-text-primary dark:text-white placeholder:text-text-secondary dark:placeholder:text-white/40 focus:outline-none focus:border-coral"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-xl transition-colors ${
                                        viewMode === 'grid'
                                            ? 'bg-coral text-white'
                                            : 'bg-white dark:bg-surface text-text-secondary dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10'
                                    }`}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-xl transition-colors ${
                                        viewMode === 'list'
                                            ? 'bg-coral text-white'
                                            : 'bg-white dark:bg-surface text-text-secondary dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10'
                                    }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Posts Grid/List */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedPosts.map((post) => {
                                    const Icon = post.icon;
                                    return (
                                        <a
                                            key={post.id}
                                            href={`/blog/${post.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onNavigate?.('blog-post', { id: post.id });
                                            }}
                                            className="group relative overflow-hidden border border-black/5 dark:border-white/10 rounded-[2rem] p-6 h-[220px] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                        >
                                            {/* Background image */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 group-hover:bg-coral group-hover:border-coral/40 transition-colors duration-300">
                                                    <Icon className="w-6 h-6 text-white transition-colors" />
                                                </div>
                                                <div className="text-xs text-white/70 mb-2">
                                                    {post.date}
                                                </div>
                                                <h3 className="font-display text-lg font-semibold text-white mb-2 max-h-[2.8em] overflow-hidden group-hover:text-coral transition-colors">
                                                    {post.title}
                                                </h3>
                                            </div>

                                            <div className="relative z-10 text-xs text-coral font-medium">
                                                {post.category}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sortedPosts.map((post) => {
                                    const Icon = post.icon;
                                    return (
                                        <a
                                            key={post.id}
                                            href={`/blog/${post.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onNavigate?.('blog-post', { id: post.id });
                                            }}
                                            className="group flex gap-4 bg-white dark:bg-surface border border-black/5 dark:border-white/10 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                                        >
                                            {/* Thumb */}
                                            <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/10">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                                <div className="absolute bottom-1.5 left-1.5 w-8 h-8 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                                    <Icon className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-text-secondary dark:text-white/60 mb-1">
                                                    {post.date}
                                                </div>
                                                <h3 className="font-display text-base font-semibold text-text-primary dark:text-white mb-1 max-h-[2.8em] overflow-hidden group-hover:text-coral transition-colors">
                                                    {post.title}
                                                </h3>
                                                <div className="text-xs text-coral font-medium">
                                                    {post.category}
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default BlogPage;
