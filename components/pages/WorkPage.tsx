import React, { useState, useCallback, useMemo, useDeferredValue, useId, useEffect } from 'react';
import { Search, Grid3x3, List, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { CASE_STUDIES, WORK_CATEGORIES } from '../../constants';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { m as motion } from 'framer-motion';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import Pagination from '../ui/Pagination';

interface WorkPageProps {
    onBack: () => void;
    onNavigate: (page: PageView, data?: NavigationData) => void;
}

const CATEGORIES = WORK_CATEGORIES.map(cat => cat.label);
const INDUSTRIES = Array.from(new Set(CASE_STUDIES.map(cs => cs.industry)));

const WorkPage: React.FC<WorkPageProps> = React.memo(({ onBack, onNavigate }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Newest');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 9;
    
    // useDeferredValue для отложенного обновления поиска (не блокирует UI)
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const deferredCategories = useDeferredValue(selectedCategories);
    const deferredIndustries = useDeferredValue(selectedIndustries);
    
    // useId для стабильных ID
    const searchId = useId();
    const filterId = useId();

    const toggleCategory = useCallback((category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    }, []);

    const toggleIndustry = useCallback((industry: string) => {
        setSelectedIndustries(prev => 
            prev.includes(industry) 
                ? prev.filter(i => i !== industry)
                : [...prev, industry]
        );
    }, []);

    const filteredProjects = useMemo(() => {
        return CASE_STUDIES.filter(project => {
            const matchesSearch = project.client.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
                               project.description.toLowerCase().includes(deferredSearchQuery.toLowerCase());
            const matchesCategory = deferredCategories.length === 0 || 
                                   deferredCategories.some(cat => {
                                       const categoryId = WORK_CATEGORIES.find(c => c.label === cat)?.id;
                                       return project.category === categoryId;
                                   });
            const matchesIndustry = deferredIndustries.length === 0 || 
                                   deferredIndustries.includes(project.industry);
            return matchesSearch && matchesCategory && matchesIndustry;
        });
    }, [deferredSearchQuery, deferredCategories, deferredIndustries]);

    const sortedProjects = useMemo(() => {
        return [...filteredProjects].sort((a, b) => {
            if (sortBy === 'Newest') {
                return parseInt(b.year) - parseInt(a.year);
            } else if (sortBy === 'Alphabetically (A to Z)') {
                return a.client.localeCompare(b.client);
            } else {
                return b.client.localeCompare(a.client);
            }
        });
    }, [filteredProjects, sortBy]);

    // Pagination
    const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * projectsPerPage;
        return sortedProjects.slice(startIndex, startIndex + projectsPerPage);
    }, [sortedProjects, currentPage, projectsPerPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategories, selectedIndustries, sortBy]);

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';

    return (
        <>
            <SEO 
                title="Our Work & Case Studies | Castells Agency - Proven Results" 
                description="Proven results that speak for themselves: $50M+ in revenue generated, 3x average ROAS, and 250%+ growth across 200+ successful campaigns for clients from startups to Fortune 500s. View our portfolio of digital marketing case studies in Santa Monica, Los Angeles, and nationwide."
                canonical="/work"
                keywords="marketing case studies, digital marketing portfolio, successful marketing campaigns, marketing results, Santa Monica marketing agency, Los Angeles marketing services, performance marketing examples"
                geoRegion="US-CA"
                geoPlacename="Santa Monica, California"
                summary="Portfolio of successful digital marketing campaigns by Castells Agency. Results include $50M+ revenue generated, 3x average ROAS, 250%+ growth across 200+ campaigns for clients ranging from startups to Fortune 500 companies."
                mainEntity="Marketing Case Studies"
            />
            <SchemaMarkup
                type="BreadcrumbList"
                data={{
                    itemListElement: [
                        { name: 'Home', item: `${siteUrl}/` },
                        { name: 'Our Work', item: `${siteUrl}/work` }
                    ]
                }}
            />
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
            <div className="container mx-auto px-6 pt-4 md:pt-6">
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
                            <div className="mb-6 pb-6 -b -black/10 dark:-white/10">
                                <label htmlFor={filterId} className="block text-xs font-medium text-text-secondary dark:text-white/60 mb-2">
                                    Sort by
                                </label>
                                <select
                                    id={filterId}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-white dark:bg-surface  -black/10 dark:-white/10 rounded-[2rem] px-3 py-2 text-sm text-text-primary dark:text-white focus:outline-none focus:-coral"
                                >
                                    <option>Newest</option>
                                    <option>Alphabetically (A to Z)</option>
                                    <option>Alphabetically (Z to A)</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="mb-6 pb-6 -b -black/10 dark:-white/10">
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
                                                className="w-4 h-4 rounded -black/20 dark:-white/20 bg-white dark:bg-surface accent-coral focus:ring-coral focus:ring-offset-0 cursor-pointer"
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
                                                className="w-4 h-4 rounded -black/20 dark:-white/20 bg-white dark:bg-surface accent-coral focus:ring-coral focus:ring-offset-0 cursor-pointer"
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
                                        className="w-full bg-white dark:bg-surface  -black/10 dark:-white/10 rounded-[2rem] pl-10 pr-4 py-2 text-sm text-text-primary dark:text-white placeholder:text-text-secondary dark:placeholder:text-white/40 focus:outline-none focus:-coral"
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
                                {paginatedProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        onClick={() => onNavigate('case-study', project as unknown as NavigationData)}
                                        className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer bg-white dark:bg-surface hover:-translate-y-1 transition-all duration-300"
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
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                            <div className="flex justify-between items-start">
                                                <span className="bg-white/10 backdrop-blur-md  -white/10 px-3 py-1 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest">
                                                    {project.industry}
                                                </span>
                                                <div className="w-10 h-10 rounded-[2rem] bg-white/0 backdrop-blur-md  -white/10 flex items-center justify-center group-hover:bg-white group-hover:-white/20 transition-all duration-300">
                                                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
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
                                {paginatedProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        onClick={() => onNavigate('case-study', project as unknown as NavigationData)}
                                        className="group flex gap-4 bg-white dark:bg-surface  -black/5 dark:-white/5 rounded-xl p-4 hover: hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 pt-8">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
});

WorkPage.displayName = 'WorkPage';

export default WorkPage;
