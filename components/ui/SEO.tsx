import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Castells Agency | Dominate Your Market',
    description = 'We help contractors and service providers dominate their local markets through data-driven strategies.',
    canonical
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {canonical && <link rel="canonical" href={canonical} />}
        </Helmet>
    );
};

export default SEO;
