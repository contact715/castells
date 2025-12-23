import React, { useState } from 'react';
import { PageHeader } from '../ui/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import AnimatedHeading from '../ui/AnimatedHeading';
import { Button } from '../ui/Button';
import type { NavigateFn } from '../../types';
import { findIndustryBySlug, getIndustryCategory, type IndustryCategoryId } from '../../data/industries';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { CASE_STUDIES, type CaseStudy } from '../../constants';

// FAQ Accordion Component
const FAQAccordion: React.FC<{ faqs: Array<{ question: string; answer: string }> }> = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="flex flex-col">
            {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`border-b border-black/10 dark:border-white/10 ${idx === 0 ? 'border-t' : ''}`}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                            className="w-full py-8 flex items-start justify-between gap-6 text-left group"
                        >
                            <h3 className={`font-display font-semibold text-2xl md:text-3xl transition-colors group-hover:text-coral ${isOpen ? 'text-coral' : 'text-text-primary'}`}>
                                {faq.question}
                            </h3>
                            <span className="flex-shrink-0 mt-1">
                                {isOpen ? (
                                    <Minus className="w-6 h-6 text-coral" />
                                ) : (
                                    <Plus className="w-6 h-6 text-text-secondary group-hover:text-coral transition-colors" />
                                )}
                            </span>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-text-secondary dark:text-white/70 text-lg leading-relaxed max-w-3xl pb-8 font-light">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

interface IndustryPageProps {
    onBack?: () => void;
    onNavigate?: NavigateFn;
    industryId?: string;
    industryName?: string;
}

const IndustryPage: React.FC<IndustryPageProps> = ({ onBack, onNavigate, industryId, industryName = 'Industry' }) => {
    const mappedId = industryId === 'home_services'
        ? 'home'
        : industryId === 'automotive'
            ? 'auto'
            : industryId === 'professional'
                ? 'pro'
                : industryId;

    const category = mappedId ? getIndustryCategory(mappedId as IndustryCategoryId) : undefined;
    const matched = !category && mappedId ? findIndustryBySlug(mappedId) : undefined;

    const industries = category
        ? category.items.filter((i) => i.type === 'industry')
        : matched
            ? [matched.item]
            : [];

    const displayName = matched?.item.name || category?.label || (industryName || 'Industry');
    const seoCanonical = mappedId ? `/industries/${encodeURIComponent(mappedId)}` : '/industries';
    const seoDescription =
        matched?.item.description ||
        category?.description ||
        `Dominating the ${displayName.toLowerCase()} market with proven strategies.`;

    const relatedCases = (() => {
        const norm = (v: string) => v.toLowerCase().trim();
        const tokenize = (v: string) =>
            v
                .split(/[\s/()&-]+/g)
                .map((t) => norm(t))
                .filter(Boolean);

        const keywords = new Set<string>();
        tokenize(displayName).forEach((t) => keywords.add(t));
        if (category?.label) tokenize(category.label).forEach((t) => keywords.add(t));

        // Helpful synonyms for common niches
        const dn = norm(displayName);
        if (dn.includes('hvac')) ['hvac', 'ac', 'heating', 'cooling'].forEach((k) => keywords.add(k));
        if (dn.includes('solar')) ['solar', 'pv'].forEach((k) => keywords.add(k));
        if (dn.includes('roof')) ['roof', 'roofing'].forEach((k) => keywords.add(k));

        const keywordList = Array.from(keywords);

        const byKeyword = CASE_STUDIES.filter((cs) => {
            const hay = norm(`${cs.client} ${cs.industry} ${cs.description} ${(cs.services || []).join(' ')}`);
            return keywordList.some((k) => hay.includes(k));
        });

        // If user is on a category page (construction/home/auto/pro), prefer matching by caseStudy.industry
        const byCategoryIndustry = category
            ? CASE_STUDIES.filter((cs) => norm(cs.industry) === norm(category.label))
            : [];

        // Merge unique, then sort so direct industry match first, then most recent
        const merged = [...byKeyword, ...byCategoryIndustry, ...CASE_STUDIES]
            .filter((cs, idx, arr) => arr.findIndex((x) => x.id === cs.id) === idx)
            .sort((a, b) => {
                const aScore = (category && norm(a.industry) === norm(category.label) ? 2 : 0) + (norm(a.industry) === dn ? 3 : 0);
                const bScore = (category && norm(b.industry) === norm(category.label) ? 2 : 0) + (norm(b.industry) === dn ? 3 : 0);
                if (aScore !== bScore) return bScore - aScore;
                return Number(b.year) - Number(a.year);
            });

        return merged.slice(0, 3);
    })();

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
    const enhancedDescription = `${seoDescription} Specialized marketing strategies for ${displayName.toLowerCase()} businesses in Santa Monica, Los Angeles, and across the US. Proven results with 3x average ROAS.`;

    return (
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
            <SEO
                title={`${displayName} Marketing | Castells Agency - Industry-Specific Strategies`}
                description={enhancedDescription}
                canonical={seoCanonical}
                keywords={`${displayName.toLowerCase()} marketing, ${displayName.toLowerCase()} advertising, ${displayName.toLowerCase()} SEO, industry marketing, Santa Monica marketing, Los Angeles marketing services, ${displayName.toLowerCase()} growth strategies`}
                geoRegion="US-CA"
                geoPlacename="Santa Monica, California"
                summary={`Specialized marketing strategies for ${displayName.toLowerCase()} businesses by Castells Agency. ${seoDescription} Proven results with 3x average ROAS serving businesses in Santa Monica, Los Angeles, and nationwide.`}
                mainEntity={`${displayName} Marketing`}
            />
            <SchemaMarkup
                type="BreadcrumbList"
                data={{
                    itemListElement: [
                        { name: 'Home', item: `${siteUrl}/` },
                        { name: 'Industries', item: `${siteUrl}/industries` },
                        { name: displayName, item: `${siteUrl}${seoCanonical}` }
                    ]
                }}
            />
            <div className="container mx-auto px-6 pt-4 md:pt-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Industries', action: () => onNavigate?.('industries') },
                        { label: displayName, active: true },
                    ]}
                    badge="Industries"
                    title={displayName}
                    description={`Dominating the ${displayName.toLowerCase()} market with proven strategies.`}
                    onNavigate={onNavigate}
                />

                {/* Industries Grid */}
                {industries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {industries.map((industry, index) => {
                            const Icon = industry.icon;
                            return (
                                <motion.div
                                    key={industry.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white dark:bg-surface rounded-[2rem] p-8  -black/5 dark:-white/10 hover:-coral/50 transition-all duration-300 hover: group"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-[2rem] bg-coral/10 flex items-center justify-center flex-shrink-0 group-hover:bg-coral transition-colors">
                                            <Icon className="w-6 h-6 text-coral group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white">
                                            {industry.name}
                                        </h3>
                                    </div>
                                    <p className="text-text-secondary dark:text-white/60 text-sm leading-relaxed">
                                        {industry.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-surface rounded-[2rem] p-12  -black/5 dark:-white/10 text-center mb-20">
                        <p className="text-text-secondary dark:text-white/60 text-lg">
                            No industries found for this selection.
                        </p>
                        <button
                            onClick={() => onNavigate?.('industries')}
                            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl -2 -black dark:-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-xs"
                        >
                            View all industries
                        </button>
                    </div>
                )}

                {/* Related Case Studies */}
                {relatedCases.length > 0 && (
                    <section className="mb-20">
                        <div className="max-w-3xl mb-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
                                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Proof</span>
                            </div>
                            <AnimatedHeading
                                as="h2"
                                className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-text-primary mb-3"
                                delay={0.15}
                            >
                                Related case studies
                            </AnimatedHeading>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                Results in <span className="text-text-primary font-semibold">{displayName}</span> and adjacent markets.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedCases.map((cs, i) => (
                                <motion.a
                                    key={cs.id}
                                    href={`/case-studies/${encodeURIComponent(cs.id)}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate?.('case-study', { id: cs.id, name: cs.client });
                                    }}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                                    className="group relative rounded-[2rem] overflow-hidden  -black/5 dark:-white/10 bg-white dark:bg-white/5 hover: hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                                        <img
                                            src={cs.image}
                                            alt={cs.client}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                                            loading="lazy"
                                            style={{ transform: 'translateZ(0)' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 rounded-[2rem]" />
                                    </div>

                                    <div className="relative p-6 h-[260px] flex flex-col">
                                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                            <ArrowUpRight className="w-4 h-4 text-white" />
                                        </div>

                                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">
                                            {cs.industry} · {cs.year}
                                        </div>

                                        <div className="mt-auto">
                                            <h3 className="font-display text-2xl font-semibold text-white leading-tight group-hover:text-coral transition-colors mb-2">
                                                {cs.client}
                                            </h3>
                                            <p className="text-sm text-white/70 leading-relaxed max-h-[2.8em] overflow-hidden">
                                                {cs.description}
                                            </p>
                                            <div className="mt-4 flex items-baseline gap-2">
                                                <span className="text-coral font-bold text-2xl">{cs.metric}</span>
                                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                                                    {cs.metricLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </section>
                )}

                {/* FAQ Section */}
                <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory relative">
                    {(() => {
                        const faqs = [
                            {
                                question: `What marketing strategies work best for ${displayName}?`,
                                answer: `For ${displayName.toLowerCase()} businesses, we focus on local SEO, geo-targeted advertising, industry-specific messaging, and conversion-optimized landing pages. Our strategies are tailored to your industry's unique customer journey.`
                            },
                            {
                                question: `How do you target customers in the ${displayName} industry?`,
                                answer: `We use data-driven targeting including location-based campaigns, industry-specific keywords, competitor analysis, and customer behavior insights to reach your ideal customers at the right time.`
                            },
                            {
                                question: `What results can I expect for my ${displayName} business?`,
                                answer: `Results vary, but our ${displayName.toLowerCase()} clients typically see 2-4x ROAS, 200-400% increase in qualified leads, and significant revenue growth within 3-6 months.`
                            },
                            {
                                question: `Do you understand the ${displayName} industry?`,
                                answer: `Yes, we have deep expertise in ${displayName.toLowerCase()} marketing. We understand your industry's challenges, customer behavior, competitive landscape, and what messaging converts best.`
                            },
                            {
                                question: `What's the typical timeline for ${displayName} marketing campaigns?`,
                                answer: `Initial setup takes 2-3 weeks, with campaigns going live within 14 days. You'll see early results in 2-4 weeks, with significant improvements in 3-6 months as we optimize based on performance data.`
                            }
                        ];

                        return (
                            <>
                                <SchemaMarkup
                                    type="FAQPage"
                                    data={{
                                        mainEntity: faqs.map(faq => ({
                                            question: faq.question,
                                            answer: faq.answer
                                        }))
                                    }}
                                />
                                <div className="container mx-auto px-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
                                        {/* Left Column: Header & CTA */}
                                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                                            <div className="mb-8">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
                                                    <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">FAQ</span>
                                                </div>
                                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4">
                                                    Common<br />
                                                    <span className="text-text-secondary">Questions</span>
                                                </h2>
                                                <p className="text-lg text-text-secondary leading-relaxed">
                                                    Transparency is key to our partnership. Here are the answers to the questions you're likely thinking about.
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-start gap-4">
                                                <p className="text-sm font-bold uppercase tracking-widest text-text-primary">
                                                    Have another question?
                                                </p>
                                                <Button
                                                    onClick={() => onNavigate?.('contact')}
                                                    size="md"
                                                    className="inline-flex items-center gap-2 group"
                                                >
                                                    Contact Us <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Right Column: Q&A List */}
                                        <div className="lg:col-span-8">
                                            <FAQAccordion faqs={faqs} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </section>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white dark:bg-surface  -black/5 dark:-white/10 rounded-[2rem] p-12 text-center "
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold mb-4 text-text-primary dark:text-white"
                        delay={0.4}
                    >
                        Ready to dominate your market?
                    </AnimatedHeading>
                    <p className="text-text-secondary dark:text-white/60 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help you achieve your goals in the {displayName.toLowerCase()} industry.
                    </p>
                    <button
                        onClick={() => onNavigate?.('contact')}
                        className="px-8 py-4 bg-coral text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-coral-dark transition-colors"
                    >
                        Get Started
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default IndustryPage;
