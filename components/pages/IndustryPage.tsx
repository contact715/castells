import React from 'react';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import { motion } from 'framer-motion';
import {
  Hammer, Home, Car, Briefcase,
  ArrowUpRight, Zap, Droplets, PaintBucket,
  Sun, Ruler, ShieldCheck, LayoutGrid,
  Palette, Sparkles, Scale, FileText, Frame, MessageSquare
} from 'lucide-react';
import AnimatedHeading from '../ui/AnimatedHeading';

interface IndustryPageProps {
    onBack?: () => void;
    onNavigate?: (page: PageView) => void;
    industryId?: string;
    industryName?: string;
}

const INDUSTRIES_DATA: Record<string, { name: string; desc: string; icon: React.ElementType }[]> = {
  construction: [
    { name: 'ADU & Additions', desc: 'High-ticket lead generation for large-scale residential projects.', icon: Home },
    { name: 'Bathroom Remodeling', desc: 'Capture homeowners ready to invest in luxury upgrades.', icon: Droplets },
    { name: 'Roofing Services', desc: 'Emergency repair and full replacement leads that convert.', icon: ShieldCheck },
    { name: 'Kitchen Remodeling', desc: 'Targeting high-value renovation projects with precision.', icon: LayoutGrid },
    { name: 'Concrete & Paving', desc: 'Commercial and residential paving leads for your crew.', icon: Frame },
    { name: 'Fencing & Gates', desc: 'Secure more contracts for perimeter and security installations.', icon: Ruler },
  ],
  home: [
    { name: 'HVAC Systems', desc: 'Seasonal campaigns to keep your technicians booked year-round.', icon: Zap },
    { name: 'Flooring & Tile', desc: 'Connect with clients looking for premium material installations.', icon: LayoutGrid },
    { name: 'Int/Ext Painting', desc: 'Fill your schedule with whole-home and commercial painting jobs.', icon: PaintBucket },
    { name: 'Plumbing', desc: 'Emergency service calls and high-value repiping projects.', icon: Droplets },
    { name: 'Electrical', desc: 'Panel upgrades, lighting, and smart home installation leads.', icon: Zap },
    { name: 'Solar Energy', desc: 'Qualified appointments for residential and commercial solar.', icon: Sun },
    { name: 'Landscaping', desc: 'Recurring maintenance contracts and high-end design projects.', icon: Sun },
  ],
  auto: [
    { name: 'Paint Protection', desc: 'Attract car enthusiasts seeking premium PPF installations.', icon: ShieldCheck },
    { name: 'Vinyl Wraps', desc: 'Leads for color change wraps and commercial fleet branding.', icon: Palette },
    { name: 'Window Tinting', desc: 'Volume-based campaigns to drive daily shop traffic.', icon: Sun },
    { name: 'Auto Detailing', desc: 'High-end detailing and ceramic coating packages.', icon: Sparkles },
    { name: 'Ceramic Coating', desc: 'Educated customers looking for long-term vehicle protection.', icon: Droplets },
  ],
  pro: [
    { name: 'Insurance Agencies', desc: 'Exclusive leads for auto, home, and life insurance policies.', icon: ShieldCheck },
    { name: 'Legal Services', desc: 'High-intent clients for personal injury, family, and estate law.', icon: Scale },
    { name: 'Business Consulting', desc: 'Connect with B2B clients needing strategic growth advice.', icon: FileText },
    { name: 'Financial Planning', desc: 'Qualified prospects for wealth management and retirement planning.', icon: Briefcase },
  ]
};

const IndustryPage: React.FC<IndustryPageProps> = ({ onBack, onNavigate, industryId, industryName = 'Industry' }) => {
    // Map industryId to correct key (handle both 'home' and 'home_services')
    const mappedId = industryId === 'home_services' ? 'home' : industryId;
    const industries = mappedId ? INDUSTRIES_DATA[mappedId] || [] : [];
    const displayName = industryName || 'Industry';

    return (
        <div className="min-h-screen bg-ivory pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Industries' },
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
                                    className="bg-white rounded-2xl p-8 border border-black/5 hover:border-coral/50 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral transition-colors">
                                        <Icon className="w-6 h-6 text-coral" />
                                    </div>
                                    <h3 className="font-display text-xl font-semibold mb-2 text-text-primary">
                                        {industry.name}
                                    </h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        {industry.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-12 border border-black/5 text-center mb-20">
                        <p className="text-text-secondary text-lg">
                            No industries found for this category.
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white border border-black/5 rounded-2xl p-12 text-center shadow-lg"
                >
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold mb-4 text-text-primary"
                        delay={0.4}
                    >
                        Ready to dominate your market?
                    </AnimatedHeading>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
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
