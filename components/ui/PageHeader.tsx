import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Badge } from './Badge';
import AnimatedHeading from './AnimatedHeading';
import SchemaMarkup from './SchemaMarkup';
import { PageView } from '../../App';
import { cn } from '../../lib/utils';
import { NavigationData } from '../../types';
import { m as motion } from 'framer-motion';

interface PageHeaderProps {
  breadcrumbs: Array<{ label: string; action?: () => void; active?: boolean; url?: string }>;
  badge: string;
  title: string;
  description?: string;
  onNavigate?: (page: PageView, data?: NavigationData) => void;
  className?: string;
  illustration?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  badge,
  title,
  description,
  onNavigate,
  className,
  illustration,
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
  
  const breadcrumbItems = breadcrumbs.map(item => ({
    ...item,
    action: item.action || (() => onNavigate?.('home')),
  }));

  // Generate breadcrumb schema data
  const breadcrumbSchemaData = breadcrumbs.length > 0 ? {
    itemListElement: breadcrumbs.map((item, index) => {
      // Generate URL from label if not provided
      let url = item.url;
      if (!url) {
        const labelLower = item.label.toLowerCase();
        if (labelLower === 'home') url = '/';
        else if (labelLower === 'services') url = '/services';
        else if (labelLower === 'industries') url = '/industries';
        else if (labelLower === 'work') url = '/work';
        else if (labelLower === 'blog') url = '/blog';
        else if (labelLower === 'about') url = '/about';
        else if (labelLower === 'contact') url = '/contact';
        else if (labelLower === 'team') url = '/team';
        else if (labelLower === 'careers') url = '/careers';
        else if (labelLower === 'company') url = '/company';
        else url = typeof window !== 'undefined' ? window.location.pathname : '/'; // Fallback to current path
      }
      
      return {
        name: item.label,
        item: url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
      };
    })
  } : null;

  return (
    <div className={cn('mb-12', className)}>
      {breadcrumbSchemaData && (
        <SchemaMarkup type="BreadcrumbList" data={breadcrumbSchemaData} />
      )}
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className={cn('mb-6', illustration && 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-start')}>
        <div>
          <div className="mb-6">
            <Badge variant="pulse">{badge}</Badge>
          </div>

          <AnimatedHeading
            as="h1"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-text-primary dark:text-white mb-4"
            delay={0.1}
          >
            {title}
          </AnimatedHeading>

          {description && (
            <p className="text-lg text-text-secondary dark:text-white/70 leading-relaxed max-w-3xl mt-4">
              {description}
            </p>
          )}
        </div>

        {illustration && (
          <div className="hidden lg:block relative h-[260px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              {illustration}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



