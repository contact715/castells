import React from 'react';

interface SchemaMarkupProps {
  type?: 'Organization' | 'WebSite' | 'Service' | 'Article';
  data?: Record<string, unknown>;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type = 'Organization', data }) => {
  const getSchema = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
    
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Castells Agency',
          url: baseUrl,
          logo: `${baseUrl}/castells-logo.png`,
          description: 'We help contractors and service providers dominate their local markets through data-driven strategies.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Santa Monica',
            addressRegion: 'CA',
            addressCountry: 'US'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@castells.agency',
            contactType: 'Customer Service'
          },
          sameAs: [
            // Add social media links when available
          ],
          ...data
        };
      
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Castells Agency',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          },
          ...data
        };
      
      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: data?.name || 'Digital Marketing Services',
          description: data?.description || 'Full-stack digital marketing solutions',
          provider: {
            '@type': 'Organization',
            name: 'Castells Agency'
          },
          areaServed: 'US',
          ...data
        };
      
      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.headline || '',
          description: data?.description || '',
          author: {
            '@type': 'Organization',
            name: 'Castells Agency'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Castells Agency',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/castells-logo.png`
            }
          },
          ...data
        };
      
      default:
        return data || {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema(), null, 2) }}
    />
  );
};

export default SchemaMarkup;


