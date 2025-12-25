import React, { useState } from 'react';
import { PageHeader } from '../ui/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, ArrowRight } from 'lucide-react';
import { Section, SectionContainer } from '../ui/Section';
import AnimatedHeading from '../ui/AnimatedHeading';
import { Button } from '../ui/Button';
import type { NavigateFn } from '../../types';
import { findServiceBySlug, getServiceCategory, type ServiceCategoryId } from '../../data/services';
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

interface ServicePageProps {
    onBack?: () => void;
    onNavigate?: NavigateFn;
    serviceId?: string;
    serviceName?: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ onBack, onNavigate, serviceId, serviceName = 'Service' }) => {
    const category = serviceId ? getServiceCategory(serviceId as ServiceCategoryId) : undefined;
    const matched = !category && serviceId ? findServiceBySlug(serviceId) : undefined;

    const services = category ? category.items : matched ? [matched.item] : [];
    const displayName = matched?.item.name || category?.label || (serviceName || 'Service');
    const seoCanonical = serviceId ? `/services/${encodeURIComponent(serviceId)}` : '/services';
    const seoDescription =
        matched?.item.description ||
        category?.description ||
        `Comprehensive ${displayName.toLowerCase()} solutions for your business.`;

    const relatedCases = (() => {
        const norm = (v: string) => v.toLowerCase().trim();

        const serviceCategoryId = category?.id || matched?.category.id;

        const categoryToCaseCategories: Record<ServiceCategoryId, Array<CaseStudy['category']>> = {
            branding: ['web-design'],
            development: ['web-design'],
            automation: ['automation'],
            advertising: ['paid-media', 'seo-content'],
        };

        const byExactServiceName = CASE_STUDIES.filter((cs) =>
            cs.services?.some((s) => norm(s) === norm(displayName))
        );
        if (byExactServiceName.length >= 3) return byExactServiceName.slice(0, 3);

        const keywords = new Set<string>();
        // If it's a specific service page, use its slug + name tokens as fuzzy signals
        if (matched?.item) {
            keywords.add(norm(matched.item.slug));
            matched.item.name
                .split(/[\s/()&-]+/g)
                .filter(Boolean)
                .forEach((t) => keywords.add(norm(t)));
        }

        // Useful cross-matches for branding-y services (so Brand Identity can surface Rebranding/Brand Strategy)
        if (serviceCategoryId === 'branding') {
            ['brand', 'branding', 'rebrand', 'rebranding', 'design', 'web', 'strategy'].forEach((k) => keywords.add(k));
        }
        if (serviceCategoryId === 'advertising') {
            ['ppc', 'ads', 'seo', 'content', 'paid', 'meta', 'google', 'youtube', 'tiktok'].forEach((k) => keywords.add(k));
        }
        if (serviceCategoryId === 'automation') {
            ['automation', 'crm', 'tracking', 'pipeline', 'integration', 'workflow'].forEach((k) => keywords.add(k));
        }
        if (serviceCategoryId === 'development') {
            ['web', 'dev', 'development', 'landing', 'application'].forEach((k) => keywords.add(k));
        }

        const keywordList = Array.from(keywords);
        const byKeyword = CASE_STUDIES.filter((cs) =>
            cs.services?.some((s) => keywordList.some((k) => norm(s).includes(k)))
        );

        const byCategory = serviceCategoryId
            ? CASE_STUDIES.filter((cs) => categoryToCaseCategories[serviceCategoryId].includes(cs.category))
            : [];

        const merged = [...byExactServiceName, ...byKeyword, ...byCategory, ...CASE_STUDIES]
            .filter((cs, idx, arr) => arr.findIndex((x) => x.id === cs.id) === idx)
            .sort((a, b) => Number(b.year) - Number(a.year));

        return merged.slice(0, 3);
    })();

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
    const enhancedDescription = `${seoDescription} Serving businesses in Santa Monica, Los Angeles, and nationwide. Proven results with 3x average ROAS and $50M+ revenue generated.`;

    return (
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
            <SEO
                title={`${displayName} | Castells Agency - Santa Monica Marketing Services`}
                description={enhancedDescription}
                canonical={seoCanonical}
                keywords={`${displayName.toLowerCase()}, ${displayName.toLowerCase()} services, Santa Monica ${displayName.toLowerCase()}, Los Angeles marketing services, digital marketing agency, performance marketing`}
                geoRegion="US-CA"
                geoPlacename="Santa Monica, California"
                summary={`${displayName} services by Castells Agency. ${seoDescription} Serving businesses in Santa Monica, Los Angeles, and nationwide with proven results: 3x average ROAS and $50M+ revenue generated.`}
                mainEntity={displayName}
            />
            <SchemaMarkup
                type="BreadcrumbList"
                data={{
                    itemListElement: [
                        { name: 'Home', item: `${siteUrl}/` },
                        { name: 'Services', item: `${siteUrl}/services` },
                        { name: displayName, item: `${siteUrl}${seoCanonical}` }
                    ]
                }}
            />
            {matched?.item && (
                <SchemaMarkup
                    type="Service"
                    data={{
                        name: matched.item.name,
                        description: matched.item.description,
                        serviceType: matched.item.name,
                        areaServed: 'US',
                    }}
                />
            )}
            <div className="container mx-auto px-6 pt-4 md:pt-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Services', action: () => onNavigate?.('services') },
                        { label: displayName, active: true },
                    ]}
                    badge="Services"
                    title={displayName}
                    description={`Comprehensive ${displayName.toLowerCase()} solutions for your business.`}
                    onNavigate={onNavigate}
                />
            </div>

            {/* Trust Indicators */}
            <TrustIndicators className="mb-0" />

            <div className="container mx-auto px-6 pt-4 md:pt-6">
                {/* Services Grid / Description */}
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {services.map((service, index) => {
                            const Icon = service.icon as React.ComponentType<{ className?: string }>;
                            return (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white dark:bg-surface rounded-[2rem] p-8  -black/5 dark:-white/10 hover:-coral/50 dark:hover:-coral/40 transition-all duration-300 hover: group"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-[2rem] bg-coral/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-coral dark:group-hover:bg-white transition-colors">
                                            <Icon className="w-6 h-6 text-coral dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
                                        </div>
                                        <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white">
                                            {service.name}
                                        </h3>
                                    </div>
                                    <p className="text-text-secondary dark:text-white/70 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-surface rounded-[2rem] p-12  -black/5 dark:-white/10 text-center mb-20">
                        <p className="text-text-secondary dark:text-white/70 text-lg">
                            No services found for this selection.
                        </p>
                        <button
                            onClick={() => onNavigate?.('services')}
                            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl -2 -black dark:-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-xs"
                        >
                            View all services
                        </button>
                    </div>
                )}

                {/* Inline CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-surface rounded-[2rem] p-8 md:p-12 text-center mb-20"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-2xl md:text-3xl font-semibold mb-3 text-text-primary"
                        delay={0.1}
                    >
                        Ready to get started with {displayName}?
                    </AnimatedHeading>
                    <p className="text-text-secondary mb-6 max-w-xl mx-auto">
                        Schedule a free strategy session to discuss how we can help you achieve your goals.
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

            {/* Process/How It Works */}
            <ProcessSteps
                title={`How ${displayName} works`}
                subtitle={`Our proven process for delivering ${displayName.toLowerCase()} results`}
                className="mb-0"
            />

            {/* Metrics/Stats */}
            <MetricsDashboard
                title={`${displayName} results`}
                subtitle={`Real metrics from our ${displayName.toLowerCase()} campaigns`}
                className="mb-0"
            />

            {/* Testimonials */}
            <ServiceTestimonials
                title={`What clients say about our ${displayName.toLowerCase()}`}
                subtitle={`See how we've helped businesses achieve remarkable growth with ${displayName.toLowerCase()}.`}
                className="mb-0"
            />

            <div className="container mx-auto px-6 pt-4 md:pt-6">
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
                                See how we apply <span className="text-text-primary font-semibold">{displayName}</span> to drive measurable growth.
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

                {/* Mid-page CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-coral rounded-[2rem] p-8 md:p-12 text-center mb-20"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold mb-4 text-white"
                        delay={0.1}
                    >
                        Let's discuss your {displayName.toLowerCase()} needs
                    </AnimatedHeading>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                        Get a free strategy session and discover how we can help you achieve your business goals.
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
                                question: `What is ${displayName}?`,
                                answer: `${displayName} is a comprehensive digital marketing service that helps businesses grow their revenue through data-driven strategies and proven methodologies.`
                            },
                            {
                                question: `How long does it take to see results with ${displayName}?`,
                                answer: `Typically, you'll see initial results within 2-4 weeks, with significant improvements in 3-6 months. Results vary based on your industry, budget, and current marketing infrastructure.`
                            },
                            {
                                question: `What's included in ${displayName} services?`,
                                answer: `Our ${displayName.toLowerCase()} services include strategy development, campaign setup, creative development, tracking implementation, ongoing optimization, and monthly reporting.`
                            },
                            {
                                question: `Do you work with businesses in my industry?`,
                                answer: `Yes, we work with businesses across multiple industries including construction, home services, professional services, automotive, retail, and healthcare.`
                            },
                            {
                                question: `What's the minimum budget required for ${displayName}?`,
                                answer: `We recommend a minimum ad spend of $3,000/month, excluding our agency fee, to see significant results with our systems.`
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

            {/* Why Choose Us */}
            <WhyChooseUs
                title={`Why choose Castells for ${displayName.toLowerCase()}`}
                subtitle={`We're different from traditional agencies. Here's how we deliver better ${displayName.toLowerCase()} results.`}
                className="mb-0"
            />

            {/* Risk Reversal */}
            <RiskReversal
                title="No risk, all reward"
                subtitle={`We're confident in our ability to deliver ${displayName.toLowerCase()} results. Here's how we reduce your risk.`}
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
                    className="bg-white dark:bg-surface rounded-[2rem] p-12 text-center mb-20"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold mb-4 text-text-primary dark:text-white"
                        delay={0.1}
                    >
                        Ready to get started?
                    </AnimatedHeading>
                    <p className="text-text-secondary dark:text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                        Let's discuss how we can help you achieve your goals with our {displayName.toLowerCase()} solutions.
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
                subtitle="Here's what to expect after you contact us about our services"
                className="mb-0"
            />
        </div>
    );
};

export default ServicePage;
