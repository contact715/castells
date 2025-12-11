import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children: React.ReactNode;
    id?: string;
}

export const Section: React.FC<SectionProps> = ({ className, children, id, ...props }) => {
    return (
        <section
            id={id}
            className={cn("py-24 md:py-32 bg-ivory relative overflow-hidden", className)}
            {...props}
        >
            {children}
        </section>
    );
};

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ className, children, ...props }) => {
    return (
        <div className={cn("container mx-auto px-6 relative z-10", className)} {...props}>
            {children}
        </div>
    );
};

interface SectionHeaderProps {
    badge?: string;
    title: React.ReactNode;
    description?: string;
    className?: string;
    centered?: boolean;
    children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    badge,
    title,
    description,
    className,
    centered = false,
    children
}) => {
    return (
        <div className={cn("mb-16 md:mb-24", centered && "text-center max-w-4xl mx-auto", className)}>
            {badge && (
                <div className={cn(
                    "flex items-center gap-2 mb-3",
                    centered && "justify-center"
                )}>
                    <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                        {badge}
                    </span>
                </div>
            )}

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-text-primary">
                {title}
            </h2>

            {children}
        </div>
    );
};

