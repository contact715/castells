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

interface AllIndustriesPageProps {
  onBack?: () => void;
  onNavigate?: (page: PageView, data?: any) => void;
}

const INDUSTRIES_CATEGORIES = [
  {
    id: 'construction',
    name: 'Construction',
    icon: Hammer,
    description: 'High-ticket lead generation for construction and remodeling projects.',
    industries: [
      { name: 'ADU & Additions', desc: 'High-ticket lead generation for large-scale residential projects.', icon: Home },
      { name: 'Bathroom Remodeling', desc: 'Capture homeowners ready to invest in luxury upgrades.', icon: Droplets },
      { name: 'Roofing Services', desc: 'Emergency repair and full replacement leads that convert.', icon: ShieldCheck },
      { name: 'Kitchen Remodeling', desc: 'Targeting high-value renovation projects with precision.', icon: LayoutGrid },
      { name: 'Concrete & Paving', desc: 'Commercial and residential paving leads for your crew.', icon: Frame },
      { name: 'Fencing & Gates', desc: 'Secure more contracts for perimeter and security installations.', icon: Ruler },
    ],
  },
  {
    id: 'home',
    name: 'Home Services',
    icon: Home,
    description: 'Recurring service contracts and high-value home improvement leads.',
    industries: [
      { name: 'HVAC Systems', desc: 'Seasonal campaigns to keep your technicians booked year-round.', icon: Zap },
      { name: 'Flooring & Tile', desc: 'Connect with clients looking for premium material installations.', icon: LayoutGrid },
      { name: 'Int/Ext Painting', desc: 'Fill your schedule with whole-home and commercial painting jobs.', icon: PaintBucket },
      { name: 'Plumbing', desc: 'Emergency service calls and high-value repiping projects.', icon: Droplets },
      { name: 'Electrical', desc: 'Panel upgrades, lighting, and smart home installation leads.', icon: Zap },
      { name: 'Solar Energy', desc: 'Qualified appointments for residential and commercial solar.', icon: Sun },
      { name: 'Landscaping', desc: 'Recurring maintenance contracts and high-end design projects.', icon: Sun },
    ],
  },
  {
    id: 'auto',
    name: 'Automotive',
    icon: Car,
    description: 'Premium automotive services for car enthusiasts and commercial fleets.',
    industries: [
      { name: 'Paint Protection', desc: 'Attract car enthusiasts seeking premium PPF installations.', icon: ShieldCheck },
      { name: 'Vinyl Wraps', desc: 'Leads for color change wraps and commercial fleet branding.', icon: Palette },
      { name: 'Window Tinting', desc: 'Volume-based campaigns to drive daily shop traffic.', icon: Sun },
      { name: 'Auto Detailing', desc: 'High-end detailing and ceramic coating packages.', icon: Sparkles },
      { name: 'Ceramic Coating', desc: 'Educated customers looking for long-term vehicle protection.', icon: Droplets },
    ],
  },
  {
    id: 'pro',
    name: 'Professional Services',
    icon: Briefcase,
    description: 'B2B growth strategies for professional service providers.',
    industries: [
      { name: 'Legal Services', desc: 'High-value client acquisition for law firms and attorneys.', icon: Scale },
      { name: 'Financial Services', desc: 'Targeted campaigns for accountants, CPAs, and financial advisors.', icon: FileText },
      { name: 'Real Estate', desc: 'Lead generation for agents, brokers, and property management.', icon: Home },
      { name: 'Healthcare', desc: 'Patient acquisition for medical practices and clinics.', icon: ShieldCheck },
    ],
  },
];

const AllIndustriesPage: React.FC<AllIndustriesPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate?.('home') },
            { label: 'Industries', active: true },
          ]}
          badge="Industries We Serve"
          title="Dominate your market."
          description="Proven growth strategies tailored to your industry's unique challenges and opportunities."
          onNavigate={onNavigate}
        />

        {/* Industries Categories */}
        <div className="space-y-24 mb-20">
          {INDUSTRIES_CATEGORIES.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-lg"
              >
                {/* Category Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="w-8 h-8 text-coral" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3 text-text-primary">
                      {category.name}
                    </h2>
                    <p className="text-text-secondary text-lg">{category.description}</p>
                  </div>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.industries.map((industry, industryIndex) => {
                    const IndustryIcon = industry.icon;
                    return (
                      <motion.div
                        key={industry.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + industryIndex * 0.05, duration: 0.5 }}
                        className="bg-ivory rounded-2xl p-6 border border-black/5 hover:border-coral/50 transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral transition-colors">
                          <IndustryIcon className="w-6 h-6 text-coral" />
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
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white border border-black/5 rounded-2xl p-12 text-center shadow-lg"
        >
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl font-semibold mb-4 text-text-primary"
            delay={0.6}
          >
            Ready to dominate your market?
          </AnimatedHeading>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals in your industry.
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

export default AllIndustriesPage;


