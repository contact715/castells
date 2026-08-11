import React from 'react';
import { Shield, Target, Users, ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import AnimatedHeading from '../ui/AnimatedHeading';
import Counter from '../ui/Counter';
import { m as motion } from 'framer-motion';

const REASONS = [
    {
        id: "01",
        title: 'Specialized Intel',
        desc: "We don't guess. We rely on data from 500+ home service campaigns.",
        icon: Shield,
        stat: '500+',
        statValue: 500,
        statSuffix: '+',
        statLabel: 'Campaigns'
    },
    {
        id: "02",
        title: 'Profit Focused',
        desc: "Clicks don't pay bills. We optimize exclusively for revenue and ROAS.",
        icon: Target,
        stat: '3.2x',
        statValue: 3.2,
        statSuffix: 'x',
        statDecimals: 1,
        statLabel: 'Avg ROAS'
    },
    {
        id: "03",
        title: 'Full Partnership',
        desc: 'You get a dedicated marketing director, not just a support ticket.',
        icon: Users,
        stat: '24/7',
        statLabel: 'Support'
    },
    {
        id: "04",
        title: 'Speed to Market',
        desc: 'Ads live within 14 days. Your competition will never see it coming.',
        icon: Zap,
        stat: '14',
        statValue: 14,
        statLabel: 'Days to Launch'
    },
    {
        id: "05",
        title: 'Transparent Reporting',
        desc: 'Real-time dashboards. No vanity metrics. Only the numbers that matter.',
        icon: Clock,
        stat: '100%',
        statValue: 100,
        statSuffix: '%',
        statLabel: 'Visibility'
    },
    {
        id: "06",
        title: 'Proven Growth',
        desc: 'Our average client sees 3x revenue growth within the first 6 months.',
        icon: TrendingUp,
        stat: '3x',
        statValue: 3,
        statSuffix: 'x',
        statLabel: 'Avg Growth'
    },
] as const;

type Reason = (typeof REASONS)[number];

/* ─── Hero Card (Card 1) — col-span-2, row-span-2 ────────────────────────── */
const HeroCard: React.FC<{ item: Reason; index: number }> = React.memo(({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="relative col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 bg-white dark:bg-white/3 border border-black/5 dark:border-white/10 rounded-card p-8 sm:p-10 flex flex-col justify-between overflow-hidden group cursor-pointer will-change-transform hover:-translate-y-1 hover:shadow-spatial-md hover:border-black/10 dark:hover:border-white/15 transition-[transform,border-color,box-shadow] duration-300"
    >
        {/* Coral gradient glow — top-right (reduced blur for GPU perf) */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full glow-coral opacity-70 blur-2xl" />

        <div className="relative z-10">
            <div className="w-12 h-12 rounded-element bg-coral-gradient-subtle flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                <item.icon className="w-6 h-6 stroke-[1.5] text-coral-text group-hover:text-white dark:group-hover:text-black transition-colors" />
            </div>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-black dark:text-white leading-tight mb-3">
                {item.title}
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-md">
                {item.desc}
            </p>
        </div>

        <div className="relative z-10 mt-8 flex items-baseline gap-3">
            {'statValue' in item && item.statValue !== undefined ? (
                <Counter
                    value={item.statValue}
                    suffix={'statSuffix' in item ? (item.statSuffix as string) : ''}
                    decimals={'statDecimals' in item ? (item.statDecimals as number) : 0}
                    className="font-display text-6xl md:text-7xl font-bold text-coral-gradient"
                />
            ) : (
                <span className="font-display text-6xl md:text-7xl font-bold text-coral-gradient">
                    {item.stat}
                </span>
            )}
            <span className="text-sm uppercase tracking-widest text-text-secondary">{item.statLabel}</span>
        </div>
    </motion.div>
));
HeroCard.displayName = 'HeroCard';

/* ─── Standard Card ───────────────────────────────────────────────────────── */
const StandardCard: React.FC<{ item: Reason; index: number }> = React.memo(({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-white/3 border border-black/5 dark:border-white/10 rounded-card p-6 sm:p-8 flex flex-col h-full group cursor-pointer will-change-transform hover:-translate-y-1 hover:shadow-spatial-md hover:border-black/10 dark:hover:border-white/15 transition-[transform,border-color,box-shadow] duration-300"
    >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-element bg-coral-gradient-subtle flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-coral-text group-hover:text-white dark:group-hover:text-black transition-colors" />
        </div>

        <h3 className="font-display font-semibold text-xl sm:text-2xl text-black dark:text-white leading-tight mb-2">
            {item.title}
        </h3>
        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4">
            {item.desc}
        </p>

        <div className="mt-auto flex items-baseline gap-2">
            {'statValue' in item && item.statValue !== undefined ? (
                <Counter
                    value={item.statValue}
                    suffix={'statSuffix' in item ? (item.statSuffix as string) : ''}
                    decimals={'statDecimals' in item ? (item.statDecimals as number) : 0}
                    className="font-display text-3xl font-bold text-text-primary dark:text-white"
                />
            ) : (
                <span className="font-display text-3xl font-bold text-text-primary dark:text-white">
                    {item.stat}
                </span>
            )}
            <span className="text-xs uppercase tracking-widest text-text-secondary">{item.statLabel}</span>
        </div>
    </motion.div>
));
StandardCard.displayName = 'StandardCard';

/* ─── Section ─────────────────────────────────────────────────────────────── */
const WhyChoose: React.FC = () => {
    return (
        <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory relative">
            <div className="container mx-auto px-6">

                {/* Header — centered, full-width */}
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <Badge className="mb-3 justify-center">Why Us</Badge>
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4"
                        delay={0.1}
                    >
                        The Unfair{' '}
                        <span className="text-text-secondary">Advantage</span>
                    </AnimatedHeading>
                    <p className="text-lg text-text-secondary leading-relaxed mb-6">
                        Most agencies sell you hours. We sell you outcomes. Here is how we structure your dominance.
                    </p>
                    <Button size="md" className="inline-flex items-center gap-2 group mx-auto">
                        See Our Results
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {/* Row 1: Hero card (2 col, 2 row) + Cards 2 & 3 stacked right */}
                    <HeroCard item={REASONS[0]} index={0} />
                    <StandardCard item={REASONS[1]} index={1} />
                    <StandardCard item={REASONS[2]} index={2} />

                    {/* Row 2: Three equal cards across the bottom */}
                    <StandardCard item={REASONS[3]} index={3} />
                    <StandardCard item={REASONS[4]} index={4} />
                    <StandardCard item={REASONS[5]} index={5} />
                </div>

            </div>
        </section>
    );
};

export default WhyChoose;
