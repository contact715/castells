import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    type?: string;
    robots?: string;
    keywords?: string;
    geoRegion?: string;
    geoPlacename?: string;
    geoPosition?: string;
    summary?: string; // AI-friendly summary
    mainEntity?: string; // Main topic/entity for AI understanding
}

const SEO: React.FC<SEOProps> = ({
    title = 'Castells Agency | Dominate Your Market',
    description = 'We help contractors and service providers dominate their local markets through data-driven strategies.',
    canonical,
    image = 'https://castells.agency/og-image.svg',
    type = 'website',
    robots = 'index, follow',
    keywords,
    geoRegion = 'US-CA',
    geoPlacename = 'Santa Monica, California',
    geoPosition,
    summary,
    mainEntity
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
            {keywords && <meta name="keywords" content={keywords} />}
            
            {/* GEO Meta Tags */}
            <meta name="geo.region" content={geoRegion} />
            <meta name="geo.placename" content={geoPlacename} />
            {geoPosition && <meta name="geo.position" content={geoPosition} />}
            <meta name="ICBM" content={geoPosition || "34.0195,-118.4912"} />
            
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
            <meta property="og:locale:alternate" content="en_US" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />
            
            {/* Additional SEO */}
            <meta name="author" content="Castells Agency" />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={fullCanonical} />
            
            {/* AI/LLM Optimization (GEO - Generative Engine Optimization) */}
            {summary && <meta name="summary" content={summary} />}
            {mainEntity && <meta name="main-entity" content={mainEntity} />}
            <meta name="content-type" content="text/html; charset=UTF-8" />
            <meta name="language" content="en-US" />
        </Helmet>
    );
};

export default SEO;
