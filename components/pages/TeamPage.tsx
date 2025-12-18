import React from 'react';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import AnimatedHeading from '../ui/AnimatedHeading';
import SEO from '../ui/SEO';
import type { NavigateFn } from '../../types';

interface TeamPageProps {
    onBack?: () => void;
    onNavigate?: NavigateFn;
}

const TeamPage: React.FC<TeamPageProps> = ({ onBack, onNavigate }) => {
    return (
        <>
            <SEO 
                title="Our Team | Castells Agency" 
                description="Meet the talented professionals behind our agency's success. The experts driving revenue growth for our clients."
                canonical="/team"
            />
            <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Company' },
                        { label: 'Leadership', active: true },
                    ]}
                    badge="Our Team"
                    title="Meet the Experts."
                    description="The talented professionals behind our agency's success."
                    onNavigate={onNavigate}
                />

                {/* Placeholder Content */}
                <div className="bg-white dark:bg-surface rounded-2xl p-12 border border-black/5 dark:border-white/10 text-center">
                    <p className="text-text-secondary dark:text-white/70 text-lg">
                        Team member profiles coming soon...
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default TeamPage;
