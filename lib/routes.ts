import type { NavigationData, PageView } from '../types';

export const slugify = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-');

export const titleize = (value: string) =>
  value
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const buildBlogPostPath = (id?: string | number) => (id != null ? `/blog/${encodeURIComponent(String(id))}` : '/blog');
export const buildCaseStudyPath = (id?: string | number) => (id != null ? `/case-studies/${encodeURIComponent(String(id))}` : '/work');
export const buildServicePath = (slug?: string) => (slug ? `/services/${encodeURIComponent(slug)}` : '/services');
export const buildIndustryPath = (slug?: string) => (slug ? `/industries/${encodeURIComponent(slug)}` : '/industries');

export const routeFromPathname = (pathname: string): { page: PageView; data?: NavigationData } => {
  const clean = pathname.replace(/\/+$/, '') || '/';

  // Parameterized routes
  if (clean.startsWith('/blog/')) {
    const idPart = decodeURIComponent(clean.replace('/blog/', ''));
    const id = Number(idPart);
    if (!Number.isNaN(id) && id > 0) return { page: 'blog-post', data: { id } };
    return { page: 'blog-post', data: { id: 1 } };
  }

  if (clean.startsWith('/case-studies/')) {
    const id = decodeURIComponent(clean.replace('/case-studies/', ''));
    if (id) return { page: 'case-study', data: { id } };
    return { page: 'work' };
  }

  if (clean.startsWith('/services/')) {
    const id = decodeURIComponent(clean.replace('/services/', ''));
    if (id) return { page: 'service', data: { id, name: titleize(id) } };
    return { page: 'services' };
  }

  if (clean.startsWith('/industries/')) {
    const id = decodeURIComponent(clean.replace('/industries/', ''));
    if (id) return { page: 'industry', data: { id, name: titleize(id) } };
    return { page: 'industries' };
  }

  // Static routes
  switch (clean) {
    case '/':
      return { page: 'home' };
    case '/work':
      return { page: 'work' };
    case '/case-studies':
      return { page: 'work' };
    case '/about':
      return { page: 'about' };
    case '/careers':
      return { page: 'careers' };
    case '/blog':
      return { page: 'blog' };
    case '/contact':
      return { page: 'contact' };
    case '/team':
      return { page: 'team' };
    case '/services':
      return { page: 'services' };
    case '/industries':
      return { page: 'industries' };
    case '/company':
      return { page: 'company' };
    case '/thank-you':
      return { page: 'thank-you', data: { name: 'general' } };
    case '/privacy-policy':
      return { page: 'privacy-policy' };
    case '/terms':
      return { page: 'terms' };
    case '/cookie-policy':
      return { page: 'cookie-policy' };
    case '/404':
      return { page: 'not-found' };
    default:
      return { page: 'not-found' };
  }
};

export const pathnameFromRoute = (page: PageView, data?: NavigationData | null): string | null => {
  switch (page) {
    case 'home':
      return '/';
    case 'work':
      return '/work';
    case 'case-study':
      return buildCaseStudyPath(data?.id);
    case 'about':
      return '/about';
    case 'careers':
      return '/careers';
    case 'blog':
      return '/blog';
    case 'blog-post':
      return buildBlogPostPath(data?.id);
    case 'contact':
      return '/contact';
    case 'team':
      return '/team';
    case 'services':
      return '/services';
    case 'service':
      return buildServicePath(data?.id != null ? String(data.id) : undefined);
    case 'industries':
      return '/industries';
    case 'industry':
      return buildIndustryPath(data?.id != null ? String(data.id) : undefined);
    case 'company':
      return '/company';
    case 'thank-you':
      return '/thank-you';
    case 'privacy-policy':
      return '/privacy-policy';
    case 'terms':
      return '/terms';
    case 'cookie-policy':
      return '/cookie-policy';
    case 'not-found':
      return '/404';
    default:
      return null;
  }
};




