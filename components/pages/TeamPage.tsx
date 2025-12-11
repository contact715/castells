import React from 'react';
import { PageView } from '../../App';
import ScrollFloat from '../effects/ScrollFloat';
import { Breadcrumbs } from '../ui/Breadcrumbs';

interface TeamPageProps {
    onBack?: () => void;
    onNavigate?: (page: PageView) => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onBack, onNavigate }) => {
    return (
        <div className="min-h-screen bg-ivory pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    className="mb-12"
                    items={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Company' },
                        { label: 'Leadership', active: true },
                    ]}
                />

                {/* Header */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-black/10 bg-white text-xs font-bold uppercase tracking-widest mb-6 text-text-secondary">
                        <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                        Our Team
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight mb-8">
                        <ScrollFloat as="span" containerClassName="block">Meet the</ScrollFloat>
                        <span className="text-coral italic">
                            <ScrollFloat as="span" containerClassName="inline-block">Experts.</ScrollFloat>
                        </span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl">
                        The talented professionals behind our agency's success.
                    </p>
                </div>

                {/* Placeholder Content */}
                <div className="bg-white rounded-2xl p-12 border border-black/5 text-center">
                    <p className="text-text-secondary text-lg">
                        Team member profiles coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
