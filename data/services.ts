import type { ComponentType } from 'react';
import {
  Palette,
  Book,
  Layers,
  Layout,
  FileText,
  Globe,
  Code,
  MessageSquare,
  Cpu,
  Terminal,
  Shield,
  Search,
  LineChart,
  Megaphone,
} from 'lucide-react';

export type ServiceCategoryId = 'branding' | 'development' | 'automation' | 'advertising';

export type ServiceItem = {
  slug: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  label: string;
  icon: ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  items: ServiceItem[];
};

/*
  14 ноября 2026: смена позиционирования. Это больше НЕ каталог отдельных
  услуг. Продаём одно полное ведение маркетинга каждый месяц, а пункты ниже
  описывают, из чего оно состоит. Страницы /services/<slug> остались ради
  поиска, но каждая говорит «это часть ведения», а не «купите отдельно».

  Что убрано и почему. Mobile Apps, E-commerce, Web Applications, Business
  Intelligence, YouTube Ads, TikTok & Social: ни одного кейса, ни одной
  подтверждённой работы, а на сайте, где запрещены утверждения без
  источника, они висели как обещание. Это же предлагал разбор каталога от
  29 августа. «Enterprise Solutions» стояла заглушкой в каждой из четырёх
  групп и не вела никуда. Старые адреса перенаправлены на /services в
  vercel.json.

  Названия оставшихся пунктов НЕ менялись: генератор страниц ищет кейсы по
  первому слову названия, и от этого зависит, идёт ли страница в поиск.

  Описание каждого пункта не длиннее 85 знаков: к нему в описании страницы
  для поиска добавляется адрес, а общий предел 165.

  Формат строки пункта менять нельзя: scripts/prerender-pages.mjs читает
  этот файл разбором текста.
*/
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'development',
    label: 'Website',
    icon: Code,
    tagline: 'People find you',
    description:
      'We build your website and landing pages and keep them current. Built inside the monthly fee and registered in your name.',
    items: [
      { slug: 'web-development', name: 'Web Development', description: 'Your website, built by us and kept current as part of the monthly work.', icon: Globe },
      { slug: 'landing-pages', name: 'Landing Pages', description: 'A page for each service and campaign, so an ad click lands where it should.', icon: Layout },
    ],
  },
  {
    id: 'advertising',
    label: 'Ads & local search',
    icon: Megaphone,
    tagline: 'Ads bring calls',
    description:
      'Google, Meta and Yelp ads for your service area, plus the local profiles and search pages that bring calls without an ad.',
    items: [
      { slug: 'google-ads-ppc', name: 'Google Ads (PPC)', description: 'Search ads for your services and cities, built by us and checked every week.', icon: Search },
      { slug: 'meta-ads', name: 'Meta Ads', description: 'Facebook and Instagram ads made from your real jobs and run for your area.', icon: Megaphone },
      { slug: 'seo-content', name: 'SEO & Content', description: 'Being found in search and on the map when someone nearby needs your service.', icon: LineChart },
    ],
  },
  {
    id: 'automation',
    label: 'Follow-up & tracking',
    icon: Cpu,
    tagline: 'No request gets lost',
    description:
      'Calls, forms and messages in one place, a follow-up after every one, and tracking that shows which channel brought the job.',
    items: [
      { slug: 'crm-pipelines', name: 'CRM & Pipelines', description: 'Every call, form and message in one pipeline on our own platform, Mosco.', icon: MessageSquare },
      { slug: 'workflow-automation', name: 'Workflow Automation', description: 'Automatic replies, reminders and review requests after a call or a job.', icon: Cpu },
      { slug: 'advanced-tracking', name: 'Advanced Tracking', description: 'Call and form tracking, so the weekly report shows where each request came from.', icon: Terminal },
      { slug: 'field-ops', name: 'Field Ops', description: 'Connecting Housecall Pro and your job schedule to the requests we bring.', icon: Shield },
    ],
  },
  {
    id: 'branding',
    label: 'Brand',
    icon: Palette,
    tagline: 'One company everywhere',
    description:
      'Logo, colours and templates, so your truck, your site and your invoice look like one company. Done when you need it, inside the monthly fee.',
    items: [
      { slug: 'brand-identity', name: 'Brand Identity', description: 'Logo, colours and type, so your truck, site and invoice look like one company.', icon: Palette },
      { slug: 'brand-guidelines', name: 'Brand Guidelines', description: 'A rulebook so your brand looks the same across every channel.', icon: Book },
      { slug: 'logobook', name: 'Logobook', description: 'Logo versions for the site, the truck, the uniform and the invoice.', icon: Layers },
      { slug: 'ui-ux-design', name: 'UI/UX Design', description: 'Page layouts where a visitor finds the phone number and the form in two taps.', icon: Layout },
      { slug: 'print-packaging', name: 'Print & Packaging', description: 'Business cards, door hangers, yard signs and truck wraps in the same style.', icon: FileText },
    ],
  },
];

export const getServiceCategory = (id: ServiceCategoryId) => SERVICE_CATEGORIES.find((c) => c.id === id);

export const findServiceBySlug = (slug: string) => {
  const s = slug.trim().toLowerCase();
  for (const category of SERVICE_CATEGORIES) {
    for (const item of category.items) {
      if (item.slug === s) return { category, item };
    }
  }
  return undefined;
};




