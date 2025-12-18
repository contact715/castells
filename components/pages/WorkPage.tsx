import React, { useState } from 'react';
import { Search, Grid3x3, List, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { CASE_STUDIES, WORK_CATEGORIES } from '../../constants';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { m as motion } from 'framer-motion';

interface WorkPageProps {
    onBack: () => void;
    onNavigate: (page: PageView, data?: NavigationData) => void;
}

const CATEGORIES = WORK_CATEGORIES.map(cat => cat.label);
const INDUSTRIES = Array.from(new Set(CASE_STUDIES.map(cs => cs.industry)));

const WorkPage: React.FC<WorkPageProps> = ({ onBack, onNavigate }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Newest');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleIndustry = (industry: string) => {
        setSelectedIndustries(prev => 
            prev.includes(industry) 
                ? prev.filter(i => i !== industry)
                : [...prev, industry]
        );
    };

    const filteredProjects = CASE_STUDIES.filter(project => {
        const matchesSearch = project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || 
                               selectedCategories.some(cat => {
                                   const categoryId = WORK_CATEGORIES.find(c => c.label === cat)?.id;
                                   return project.category === categoryId;
                               });
        const matchesIndustry = selectedIndustries.length === 0 || 
                               selectedIndustries.includes(project.industry);
        return matchesSearch && matchesCategory && matchesIndustry;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (sortBy === 'Newest') {
            return parseInt(b.year) - parseInt(a.year);
        } else if (sortBy === 'Alphabetically (A to Z)') {
            return a.client.localeCompare(b.client);
        } else {
            return b.client.localeCompare(a.client);
        }
    });

    return (
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate('home') },
                        { label: 'Work', active: true }
                    ]}
                    badge="Our Portfolio"
                    title="Selected Works"
                    description="Proven results that speak for themselves: $50M+ in revenue generated, 3x average ROAS, and 250%+ growth across 200+ successful campaigns for clients from startups to Fortune 500s."
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
                                        placeholder="Search cases"
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

                        {/* Projects Grid/List */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {sortedProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        onClick={() => onNavigate('case-study', project)}
                                        className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer bg-white dark:bg-surface border border-black/5 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        {/* Background Media */}
                                        <div className="absolute inset-0 bg-black">
                                            {project.video ? (
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    poster={project.image}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
                                                >
                                                    <source src={project.video} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <img
                                                    src={project.image}
                                                    alt={project.client}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                            <div className="flex justify-between items-start">
                                                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest">
                                                    {project.industry}
                                                </span>
                                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-display text-2xl md:text-3xl text-white mb-2">{project.client}</h3>
                                                <div className="flex gap-4 text-white/80">
                                                    <div>
                                                        <span className="block text-xl font-bold text-white">{project.metric}</span>
                                                        <span className="text-[10px] uppercase tracking-wider opacity-70">{project.metricLabel}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sortedProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        onClick={() => onNavigate('case-study', project)}
                                        className="group flex gap-4 bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                            {project.video ? (
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    poster={project.image}
                                                    className="w-full h-full object-cover"
                                                >
                                                    <source src={project.video} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <img
                                                    src={project.image}
                                                    alt={project.client}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-1 bg-coral/10 text-coral rounded-lg text-[10px] font-bold uppercase tracking-widest">
                                                    {project.industry}
                                                </span>
                                                <span className="text-xs text-text-secondary dark:text-white/60">
                                                    {project.year}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white mb-2 group-hover:text-coral transition-colors">
                                                {project.client}
                                            </h3>
                                            <p className="text-sm text-text-secondary dark:text-white/70 mb-2 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <div>
                                                    <span className="font-bold text-text-primary dark:text-white">{project.metric}</span>
                                                    <span className="text-text-secondary dark:text-white/60 text-xs ml-1">{project.metricLabel}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-text-secondary dark:text-white/60 group-hover:text-coral transition-colors flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkPage;
