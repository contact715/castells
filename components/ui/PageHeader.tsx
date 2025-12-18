import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Badge } from './Badge';
import AnimatedHeading from './AnimatedHeading';
import { PageView } from '../../App';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  breadcrumbs: Array<{ label: string; action?: () => void; active?: boolean }>;
  badge: string;
  title: string;
  description?: string;
  onNavigate?: (page: PageView) => void;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  badge,
  title,
  description,
  onNavigate,
  className,
}) => {
  const breadcrumbItems = breadcrumbs.map(item => ({
    ...item,
    action: item.action || (() => onNavigate?.('home')),
  }));

  return (
    <div className={cn('mb-12', className)}>
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="mb-6">
        <Badge variant="pulse">{badge}</Badge>
      </div>

      <AnimatedHeading
        as="h1"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-text-primary mb-4"
        delay={0.1}
      >
        {title}
      </AnimatedHeading>

      {description && (
        <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mt-4">
          {description}
        </p>
      )}
    </div>
  );
};


