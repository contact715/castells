import React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionContainer } from '../ui/Section';
import AnimatedHeading from '../ui/AnimatedHeading';
import type { NavigateFn } from '../../types';
import { findServiceBySlug, getServiceCategory, type ServiceCategoryId } from '../../data/services';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { CASE_STUDIES, type CaseStudy } from '../../constants';

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

    return (
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-32 pb-20">
            <SEO
                title={`${displayName} | Castells Agency`}
                description={seoDescription}
                canonical={seoCanonical}
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
            <div className="container mx-auto px-6">
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

                {/* Services Grid */}
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
                                    className="bg-white dark:bg-surface rounded-2xl p-8 border border-black/5 dark:border-white/10 hover:border-coral/50 dark:hover:border-coral/40 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-coral/10 dark:bg-white/10 flex items-center justify-center mb-4 group-hover:bg-coral dark:group-hover:bg-white transition-colors">
                                        <Icon className="w-6 h-6 text-coral dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
                                    </div>
                                    <h3 className="font-display text-xl font-semibold mb-2 text-text-primary dark:text-white">
                                        {service.name}
                                    </h3>
                                    <p className="text-text-secondary dark:text-white/70 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-surface rounded-2xl p-12 border border-black/5 dark:border-white/10 text-center mb-20">
                        <p className="text-text-secondary dark:text-white/70 text-lg">
                            No services found for this selection.
                        </p>
                        <button
                            onClick={() => onNavigate?.('services')}
                            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-xs"
                        >
                            View all services
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
                                    className="group relative rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={cs.image}
                                            alt={cs.client}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
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

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white dark:bg-surface border border-black/5 dark:border-white/10 rounded-2xl p-12 text-center shadow-lg"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold mb-4 text-text-primary dark:text-white"
                        delay={0.4}
                    >
                        Ready to get started?
                    </AnimatedHeading>
                    <p className="text-text-secondary dark:text-white/70 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help you achieve your goals with our {displayName.toLowerCase()} solutions.
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

export default ServicePage;
