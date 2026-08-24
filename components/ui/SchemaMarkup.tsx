import React from 'react';
import { BUSINESS } from '../../config/business';

interface SchemaMarkupProps {
  type?: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'BreadcrumbList' | 'FAQPage' | 'LocalBusiness' | 'HowTo' | 'VideoObject' | 'ItemList' | 'Review' | 'Definition' | 'Course';
  data?: Record<string, unknown>;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type = 'Organization', data }) => {
  const getSchema = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';
    
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Castells Media',
          // Официальное имя компании: владелец подтвердил 22 августа 2026.
          // В юридических текстах сайта до этого стояло «Castells Media LLC».
          legalName: 'Castells Media Inc',
          url: baseUrl,
          logo: `${baseUrl}/castells-logo.png`,
          description: 'We build websites, run ads and set up follow-up automation for home service businesses.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS.street,
            addressLocality: BUSINESS.city,
            addressRegion: BUSINESS.state,
            addressCountry: BUSINESS.country
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'contact@castells.media',
            contactType: 'Customer Service'
          },
          sameAs: [
            'https://www.instagram.com/castells.media/',
            'https://www.threads.com/@castells.media',
            'https://www.facebook.com/castells.media'
          ],
          ...data
        };
      
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Castells Media',
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
            name: 'Castells Media',
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
            name: 'Castells Media'
          },
          publisher: data?.publisher || {
            '@type': 'Organization',
            name: 'Castells Media',
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
      
      case 'LocalBusiness': {
        const postalCode = (data?.postalCode as string | undefined) || BUSINESS.zip || undefined;
        const latitude = data?.latitude as number | undefined;
        const longitude = data?.longitude as number | undefined;
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: data?.name || BUSINESS.name,
          description: data?.description || 'We build websites, run ads and set up follow-up automation for home service businesses.',
          url: baseUrl,
          logo: `${baseUrl}/castells-logo.png`,
          image: data?.image || `${baseUrl}/castells-logo.png`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: data?.streetAddress || BUSINESS.street,
            addressLocality: BUSINESS.city,
            addressRegion: BUSINESS.state,
            ...(postalCode ? { postalCode } : {}),
            addressCountry: BUSINESS.country
          },
          // Координаты не подтверждены владельцем — без источника не публикуем.
          ...(latitude != null && longitude != null
            ? { geo: { '@type': 'GeoCoordinates', latitude, longitude } }
            : {}),
          telephone: data?.telephone || BUSINESS.phoneSchema,
          email: data?.email || BUSINESS.email,
          areaServed: {
            '@type': 'Country',
            name: 'United States'
          },
          ...data
        };
      }

      case 'HowTo':
        const steps = (data?.step as Array<{ name: string; text: string; image?: string; url?: string }>) || [];
        return {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: data?.name || 'How to Work with Castells Media',
          description: data?.description || 'Step-by-step process for working with Castells Media to grow your business.',
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
          name: data?.name || 'Castells Media Video',
          description: data?.description || '',
          thumbnailUrl: data?.thumbnailUrl || `${baseUrl}/castells-logo.png`,
          uploadDate: data?.uploadDate || new Date().toISOString(),
          duration: data?.duration,
          contentUrl: data?.contentUrl,
          embedUrl: data?.embedUrl,
          publisher: {
            '@type': 'Organization',
            name: 'Castells Media',
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
            name: data?.itemReviewed?.name || 'Castells Media'
          },
          author: {
            '@type': data?.author?.type || 'Person',
            name: data?.author?.name
          },
          // Оценка ставится только если она реально пришла с отзывом.
          // Раньше здесь по умолчанию стояли пять звёзд — оценка без отзыва.
          ...(data?.ratingValue
            ? {
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: data.ratingValue,
                  bestRating: data?.bestRating || '5',
                  worstRating: data?.worstRating || '1'
                }
              }
            : {}),
          reviewBody: data?.reviewBody || '',
          datePublished: data?.datePublished || new Date().toISOString().split('T')[0],
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
            name: 'Castells Media',
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






