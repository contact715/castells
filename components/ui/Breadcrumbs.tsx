import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    action?: () => void;
    active?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
    return (
        <nav className={`flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-widest ${className}`}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <ChevronRight className="w-4 h-4 text-black/20 dark:text-white/20" />
                    )}
                    <button
                        onClick={item.action}
                        disabled={item.active}
                        className={`
              transition-colors
              ${item.active
                                ? 'text-text-primary cursor-default'
                                : 'text-text-secondary hover:text-coral'
                            }
            `}
                    >
                        {item.label}
                    </button>
                </React.Fragment>
            ))}
        </nav>
    );
};
