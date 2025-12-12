import React from 'react';
import { Badge } from './Badge';
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
                <div className={cn("mb-3", centered && "flex justify-center")}>
                    <Badge variant="pulse">{badge}</Badge>
                </div>
            )}

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-text-primary">
                {title}
            </h2>

            {children}
        </div>
    );
};

