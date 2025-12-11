import React from 'react';
import { PageView } from '../../App';
import ScrollFloat from '../effects/ScrollFloat';
import { Breadcrumbs } from '../ui/Breadcrumbs';

interface BlogPageProps {
    onBack?: () => void;
    onNavigate?: (page: PageView) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, onNavigate }) => {
    return (
        <div className="min-h-screen bg-ivory pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    className="mb-12"
                    items={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Blog & Insights', active: true },
                    ]}
                />

                {/* Header */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-black/10 bg-white text-xs font-bold uppercase tracking-widest mb-6 text-text-secondary">
                        <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                        Blog & Insights
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight mb-8">
                        <ScrollFloat as="span" containerClassName="block">Latest</ScrollFloat>
                        <span className="text-coral italic">
                            <ScrollFloat as="span" containerClassName="inline-block">Insights.</ScrollFloat>
                        </span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl">
                        Industry trends, case studies, and growth strategies.
                    </p>
                </div>

                {/* Placeholder Content */}
                <div className="bg-white rounded-2xl p-12 border border-black/5 text-center">
                    <p className="text-text-secondary text-lg">
                        Blog posts coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
