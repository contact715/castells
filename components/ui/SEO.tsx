import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    type?: string;
    robots?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Castells Agency | Dominate Your Market',
    description = 'We help contractors and service providers dominate their local markets through data-driven strategies.',
    canonical,
    image = 'https://castells.agency/castells-logo.png',
    type = 'website',
    robots = 'noindex, nofollow'
}) => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const fullCanonical = canonical
        ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
        : (typeof window !== 'undefined' ? window.location.href : siteUrl);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            
            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Castells Agency" />
            <meta property="og:locale" content="en_US" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />
            
            {/* Additional SEO */}
            <meta name="author" content="Castells Agency" />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={fullCanonical} />
        </Helmet>
    );
};

export default SEO;
