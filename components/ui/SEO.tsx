import type React from 'react';

/*
  Найдено 24 августа 2026: этот компонент через react-helmet-async менял
  <title>, description, canonical и OG-теги в document.head ПОСЛЕ загрузки
  скриптов — то есть перебивал собственными, часто старыми и с выдуманными
  цифрами тегами то, что scripts/prerender-pages.mjs кладёт в HTML для
  каждой из 74 страниц. Проверено headless-браузером на собранной сборке:
  /industries/hvac-systems после гидратации отдавал другой заголовок и
  другое описание, чем в HTML. Раз собственные теги уже есть в HTML на
  каждой странице, которая рендерит этот компонент, — компонент отключён,
  а не переписан текстами: переписывать нечего, разметка уже верная.
*/

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

const SEO: React.FC<SEOProps> = () => null;

export default SEO;
