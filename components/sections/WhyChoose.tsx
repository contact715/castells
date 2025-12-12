import React from 'react';
import { Shield, Target, Users, ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
import { Section, SectionContainer } from '../ui/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const REASONS = [
    {
        id: "01",
        title: 'Specialized Intel',
        desc: "We don't guess. We rely on data from 500+ home service campaigns.",
        icon: Shield,
        stat: '500+',
        statLabel: 'Campaigns'
    },
    {
        id: "02",
        title: 'Profit Focused',
        desc: "Clicks don't pay bills. We optimize exclusively for revenue and ROAS.",
        icon: Target,
        stat: '3.2x',
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
        statLabel: 'Days to Launch'
    },
    {
        id: "05",
        title: 'Transparent Reporting',
        desc: 'Real-time dashboards. No vanity metrics. Only the numbers that matter.',
        icon: Clock,
        stat: '100%',
        statLabel: 'Visibility'
    },
    {
        id: "06",
        title: 'Proven Growth',
        desc: 'Our average client sees 3x revenue growth within the first 6 months.',
        icon: TrendingUp,
        stat: '3x',
        statLabel: 'Avg Growth'
    },
];

const WhyChoose: React.FC = () => {
    return (
        <section className="py-24 md:py-32 bg-ivory relative border-t border-black/5">
            <div className="container mx-auto px-6">

                {/* Two Column Layout - Header Left (Sticky), Cards Right (Scroll) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">

                    {/* Left: Header + CTA */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="mb-8">
                            <Badge className="mb-3">Why Us</Badge>
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight mb-4">
                                The Unfair<br />
                                <span className="text-text-secondary">Advantage</span>
                            </h2>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                Most agencies sell you hours. We sell you outcomes. Here is how we structure your dominance.
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            <Button size="md" className="inline-flex items-center gap-2 group">
                                See Our Results
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Right: 6 Cards in 2 Columns (Scrollable) */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {REASONS.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5 dark:border-white/5 group cursor-pointer"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                        <item.icon className="w-6 h-6 stroke-[1.5]" />
                                    </div>
                                    <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-tight">
                                        {item.title}
                                    </h3>
                                </div>

                                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                    {item.desc}
                                </p>

                                <div className="mt-auto flex items-baseline gap-2">
                                    <span className="font-display text-3xl font-bold text-coral">{item.stat}</span>
                                    <span className="text-xs uppercase tracking-widest text-text-secondary">{item.statLabel}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhyChoose;
