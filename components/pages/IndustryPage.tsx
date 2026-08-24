import React, { useState } from 'react';
import { PageHeader } from '../ui/PageHeader';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, ArrowRight } from 'lucide-react';
import AnimatedHeading from '../ui/AnimatedHeading';
import { Button } from '../ui/Button';
import type { NavigateFn } from '../../types';
import { findIndustryBySlug, getIndustryCategory, type IndustryCategoryId } from '../../data/industries';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import Breadcrumbs from '../ui/Breadcrumbs';
import { CASE_STUDIES, type CaseStudy } from '../../constants';
import TrustIndicators from '../ui/TrustIndicators';
import Benefits from '../ui/Benefits';
import ProcessSteps from '../ui/ProcessSteps';
import MetricsDashboard from '../ui/MetricsDashboard';
import ServiceTestimonials from '../ui/ServiceTestimonials';
import WhyChooseUs from '../ui/WhyChooseUs';
import RiskReversal from '../ui/RiskReversal';
import NextSteps from '../ui/NextSteps';

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
                        className=""
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                            className="w-full py-8 flex items-start justify-between gap-6 text-left group"
                        >
                            <h3 className={`font-display font-semibold text-2xl md:text-3xl transition-colors group-hover:text-accent-text ${isOpen ? 'text-accent-text' : 'text-text-primary'}`}>
                                {faq.question}
                            </h3>
                            <span className="shrink-0 mt-1">
                                {isOpen ? (
                                    <Minus className="w-6 h-6 text-accent-text" />
                                ) : (
                                    <Plus className="w-6 h-6 text-text-secondary group-hover:text-accent-text transition-colors" />
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

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.studio';
    const enhancedDescription = `${seoDescription} Specialized marketing strategies for ${displayName.toLowerCase()} businesses in Roseville, Los Angeles, and across the US. Proven results with 3x average ROAS.`;

    return (
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
            <SEO
                title={`${displayName} Marketing | Castells Media - Industry-Specific Strategies`}
                description={enhancedDescription}
                canonical={seoCanonical}
                keywords={`${displayName.toLowerCase()} marketing, ${displayName.toLowerCase()} advertising, ${displayName.toLowerCase()} SEO, industry marketing, Roseville marketing, Los Angeles marketing services, ${displayName.toLowerCase()} growth strategies`}
                geoRegion="US-CA"
                geoPlacename="1298 Antelope Creek Drive, Roseville, California"
                summary={`Specialized marketing strategies for ${displayName.toLowerCase()} businesses by Castells Media. ${seoDescription} Proven results with 3x average ROAS serving businesses in Roseville, Los Angeles, and nationwide.`}
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
                    description={`Marketing for ${displayName.toLowerCase()} businesses.`}
                    onNavigate={onNavigate}
                />
            </div>

            {/* Trust Indicators */}
            <TrustIndicators className="mb-0" />

            <div className="container mx-auto px-6 pt-4 md:pt-6">
                {/* Industries Grid / Description */}
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
                                    className="bg-white dark:bg-surface rounded-card shadow-spatial-card p-8 border border-black/5 dark:border-white/10 hover:border-accent/50 hover:shadow-spatial-md transition-[border-color,box-shadow] duration-300 group"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-element bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                                            <Icon className="w-6 h-6 text-accent-text group-hover:text-white transition-colors" />
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
                    <div className="bg-white dark:bg-surface rounded-card shadow-spatial-card p-12 border border-black/5 dark:border-white/10 text-center mb-20">
                        <p className="text-text-secondary dark:text-white/60 text-lg">
                            No industries found for this selection.
                        </p>
                        <button
                            onClick={() => onNavigate?.('industries')}
                            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-semibold tracking-wide text-xs"
                        >
                            View all industries
                        </button>
                    </div>
                )}

                {/* Inline CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-surface rounded-card p-8 md:p-12 text-center mb-20"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-2xl md:text-3xl font-normal mb-3 text-text-primary"
                        delay={0.1}
                    >
                        Want to talk about your {displayName.toLowerCase()} business?
                    </AnimatedHeading>
                    <p className="text-text-secondary mb-6 max-w-xl mx-auto">
                        Tell us what you do and where, and we will say plainly whether we can help.
                    </p>
                    <Button
                        onClick={() => onNavigate?.('contact')}
                        size="lg"
                        variant="primary"
                        className="group"
                    >
                        Schedule Free Consultation
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>

            {/* Benefits */}
            <Benefits
                title={`Why ${displayName} businesses choose us`}
                subtitle={`We combine industry expertise with data-driven strategies to deliver results that matter for ${displayName.toLowerCase()} businesses.`}
                className="mb-0"
            />

            {/* Process/How It Works */}
            <ProcessSteps
                title={`How we help ${displayName.toLowerCase()} businesses`}
                subtitle={`Our proven process for driving measurable growth in the ${displayName.toLowerCase()} industry`}
                className="mb-0"
            />

            {/* Metrics/Stats */}
            <MetricsDashboard
                title={`${displayName} marketing results`}
                subtitle={`Real metrics from our ${displayName.toLowerCase()} marketing campaigns`}
                className="mb-0"
            />

            {/* Testimonials */}
            <ServiceTestimonials
                title={`What ${displayName.toLowerCase()} clients say`}
                subtitle={`See how we've helped ${displayName.toLowerCase()} businesses achieve remarkable growth.`}
                className="mb-0"
            />

            <div className="container mx-auto px-6 pt-4 md:pt-6">
                {/* Related Case Studies */}
                {relatedCases.length > 0 && (
                    <section className="mb-20">
                        <div className="max-w-3xl mb-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-accent-gradient animate-pulse shrink-0" aria-hidden="true" />
                                <span className="text-xs font-semibold tracking-wide text-text-secondary">Proof</span>
                            </div>
                            <AnimatedHeading
                                as="h2"
                                className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-text-primary mb-3"
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
                                    className="group relative rounded-card overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-spatial-md hover:-translate-y-1 transition-[transform,box-shadow] duration-300"
                                >
                                    <div className="absolute inset-0 overflow-hidden rounded-card">
                                        <img
                                            src={cs.image}
                                            alt={cs.client}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                            style={{ transform: 'translateZ(0)' }}
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10 rounded-card" />
                                    </div>

                                    <div className="relative p-6 h-[260px] flex flex-col">
                                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                            <ArrowUpRight className="w-4 h-4 text-white" />
                                        </div>

                                        <div className="text-[10px] font-semibold tracking-wide text-white/60 mb-2">
                                            {cs.industry} · {cs.year}
                                        </div>

                                        <div className="mt-auto">
                                            <h3 className="font-display text-2xl font-semibold text-white leading-tight group-hover:text-accent-text transition-colors mb-2">
                                                {cs.client}
                                            </h3>
                                            <p className="text-sm text-white/70 leading-relaxed max-h-[2.8em] overflow-hidden">
                                                {cs.description}
                                            </p>
                                            <div className="mt-4 flex items-baseline gap-2">
                                                <span className="text-accent-text font-bold text-2xl">{cs.metric}</span>
                                                <span className="text-white/60 text-[10px] font-semibold tracking-wide">
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

                {/* Mid-page CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-accent rounded-card p-8 md:p-12 text-center mb-20"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-normal mb-4 text-white"
                        delay={0.1}
                    >
                        Let's discuss your {displayName.toLowerCase()} marketing needs
                    </AnimatedHeading>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                        Tell us about your business and we will say plainly whether we can help.
                    </p>
                    <Button
                        onClick={() => onNavigate?.('contact')}
                        size="lg"
                        variant="secondary"
                        className="group"
                    >
                        Get Started Today
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>

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
                                answer: `We do not publish typical numbers, because we do not have a measurement we could show you the source for. What we can say: the work is the site people land on, the ads that bring them, the local profile they find, and the follow-up that answers. Ask us for the account of a ${displayName.toLowerCase()} client and we will show you the real one.`
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
                                                    <span className="w-2 h-2 rounded-full bg-accent-gradient animate-pulse shrink-0" aria-hidden="true" />
                                                    <span className="text-xs font-semibold tracking-wide text-text-secondary">FAQ</span>
                                                </div>
                                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight mb-4">
                                                    Common<br />
                                                    <span className="text-text-secondary">Questions</span>
                                                </h2>
                                                <p className="text-lg text-text-secondary leading-relaxed">
                                                    Transparency is key to our partnership. Here are the answers to the questions you're likely thinking about.
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-start gap-4">
                                                <p className="text-sm font-semibold tracking-wide text-text-primary">
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

            {/* Why Choose Us */}
            <WhyChooseUs
                title={`Why choose Castells for ${displayName.toLowerCase()} marketing`}
                subtitle={`We're different from traditional agencies. Here's how we deliver better results for ${displayName.toLowerCase()} businesses.`}
                className="mb-0"
            />

            {/* Risk Reversal */}
            <RiskReversal
                title="How we work"
                subtitle={`We're confident in our ability to deliver ${displayName.toLowerCase()} marketing results. Here's how we reduce your risk.`}
                ctaText="Start Your Free Consultation"
                onCtaClick={() => onNavigate?.('contact')}
                className="mb-0"
            />

            <div className="container mx-auto px-6 pt-4 md:pt-6">
                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-surface rounded-card p-12 text-center mb-20"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-normal mb-4 text-text-primary dark:text-white"
                        delay={0.1}
                    >
                        Want to talk about your business?
                    </AnimatedHeading>
                    <p className="text-text-secondary dark:text-white/60 mb-8 max-w-2xl mx-auto text-lg">
                        Tell us what your {displayName.toLowerCase()} business does and where, and we will say plainly whether we can help.
                    </p>
                    <Button
                        onClick={() => onNavigate?.('contact')}
                        size="lg"
                        variant="primary"
                        className="group"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>

            {/* Next Steps */}
            <NextSteps
                title="What happens next"
                subtitle="Here's what to expect after you contact us about our industry-specific marketing services"
                className="mb-0"
            />
        </div>
    );
};

export default IndustryPage;
