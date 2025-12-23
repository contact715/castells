import React from 'react';

interface SchemaMarkupProps {
  type?: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'BreadcrumbList' | 'FAQPage' | 'LocalBusiness' | 'HowTo' | 'VideoObject' | 'ItemList' | 'Review' | 'AggregateRating' | 'Definition' | 'Course';
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
            name: 'Castells Agency',
            url: baseUrl
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States'
          },
          serviceType: data?.serviceType || 'Digital Marketing',
          offers: data?.offers || {
            '@type': 'Offer',
            description: 'Professional digital marketing services'
          },
          ...data
        };
      
      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.headline || '',
          description: data?.description || '',
          image: data?.image || `${baseUrl}/castells-logo.png`,
          datePublished: data?.datePublished || new Date().toISOString().split('T')[0],
          dateModified: data?.dateModified || new Date().toISOString().split('T')[0],
          author: data?.author || {
            '@type': 'Organization',
            name: 'Castells Agency'
          },
          publisher: data?.publisher || {
            '@type': 'Organization',
            name: 'Castells Agency',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/castells-logo.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url || baseUrl
          },
          ...data
        };
      
      case 'BreadcrumbList':
        const items = (data?.itemListElement as Array<{ name: string; item: string }>) || [];
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item.startsWith('http') ? item.item : `${baseUrl}${item.item.startsWith('/') ? '' : '/'}${item.item}`
          }))
        };
      
      case 'FAQPage':
        const faqs = (data?.mainEntity as Array<{ question: string; answer: string }>) || [];
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        };
      
      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: data?.name || 'Castells Agency',
          description: data?.description || 'Revenue-focused digital marketing agency helping contractors and service providers dominate their local markets.',
          url: baseUrl,
          logo: `${baseUrl}/castells-logo.png`,
          image: data?.image || `${baseUrl}/castells-logo.png`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: data?.streetAddress || '1234 Main Street',
            addressLocality: 'Santa Monica',
            addressRegion: 'CA',
            postalCode: data?.postalCode || '90401',
            addressCountry: 'US'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data?.latitude || 34.0195,
            longitude: data?.longitude || -118.4912
          },
          telephone: data?.telephone || '+1-555-000-0000',
          email: data?.email || 'hello@castells.agency',
          priceRange: data?.priceRange || '$$$',
          areaServed: {
            '@type': 'Country',
            name: 'United States'
          },
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 34.0195,
              longitude: -118.4912
            },
            geoRadius: {
              '@type': 'Distance',
              value: '50000',
              unitCode: 'KM'
            }
          },
          ...data
        };
      
      case 'HowTo':
        const steps = (data?.step as Array<{ name: string; text: string; image?: string; url?: string }>) || [];
        return {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: data?.name || 'How to Work with Castells Agency',
          description: data?.description || 'Step-by-step process for working with Castells Agency to grow your business.',
          image: data?.image || `${baseUrl}/castells-logo.png`,
          totalTime: data?.totalTime || 'PT6W',
          step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.image && { image: step.image }),
            ...(step.url && { url: step.url })
          })),
          ...data
        };
      
      case 'VideoObject':
        return {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: data?.name || 'Castells Agency Video',
          description: data?.description || '',
          thumbnailUrl: data?.thumbnailUrl || `${baseUrl}/castells-logo.png`,
          uploadDate: data?.uploadDate || new Date().toISOString(),
          duration: data?.duration,
          contentUrl: data?.contentUrl,
          embedUrl: data?.embedUrl,
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
      
      case 'ItemList':
        const listItems = (data?.itemListElement as Array<{ name: string; description?: string; url?: string }>) || [];
        return {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: data?.name || 'List',
          description: data?.description,
          numberOfItems: listItems.length,
          itemListElement: listItems.map((listItem, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: listItem.name,
            description: listItem.description,
            ...(listItem.url && { url: listItem.url.startsWith('http') ? listItem.url : `${baseUrl}${listItem.url.startsWith('/') ? '' : '/'}${listItem.url}` })
          })),
          ...data
        };
      
      case 'Review':
        return {
          '@context': 'https://schema.org',
          '@type': 'Review',
          itemReviewed: {
            '@type': 'Organization',
            name: data?.itemReviewed?.name || 'Castells Agency'
          },
          author: {
            '@type': data?.author?.type || 'Person',
            name: data?.author?.name || 'Client'
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: data?.ratingValue || '5',
            bestRating: data?.bestRating || '5',
            worstRating: data?.worstRating || '1'
          },
          reviewBody: data?.reviewBody || '',
          datePublished: data?.datePublished || new Date().toISOString().split('T')[0],
          ...data
        };
      
      case 'AggregateRating':
        return {
          '@context': 'https://schema.org',
          '@type': 'AggregateRating',
          ratingValue: data?.ratingValue || '5',
          bestRating: data?.bestRating || '5',
          worstRating: data?.worstRating || '1',
          ratingCount: data?.ratingCount || '100',
          reviewCount: data?.reviewCount || '100',
          ...data
        };
      
      case 'Definition':
        return {
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: data?.name || '',
          description: data?.description || '',
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: data?.termSetName || 'Marketing Glossary'
          },
          ...data
        };
      
      case 'Course':
        return {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: data?.name || '',
          description: data?.description || '',
          provider: {
            '@type': 'Organization',
            name: 'Castells Agency',
            url: baseUrl
          },
          courseCode: data?.courseCode,
          educationalCredentialAwarded: data?.educationalCredentialAwarded,
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






