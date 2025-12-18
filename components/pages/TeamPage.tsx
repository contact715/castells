import React from 'react';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import AnimatedHeading from '../ui/AnimatedHeading';

interface TeamPageProps {
    onBack?: () => void;
    onNavigate?: (page: PageView) => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onBack, onNavigate }) => {
    return (
        <div className="min-h-screen bg-ivory pt-32 pb-20">
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
