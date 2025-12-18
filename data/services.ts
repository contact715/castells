import type { ComponentType } from 'react';
import {
  Palette,
  Book,
  Layers,
  Layout,
  FileText,
  ArrowUpRight,
  Globe,
  Smartphone,
  ShoppingCart,
  Code,
  MessageSquare,
  BarChart,
  Cpu,
  Terminal,
  Shield,
  Search,
  LineChart,
  Megaphone,
  Video,
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

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'branding',
    label: 'Branding & Design',
    icon: Palette,
    tagline: 'Visual identity that commands attention',
    description:
      'We craft distinctive brand identities that resonate with your audience and differentiate you from the competition. Every pixel is purposeful.',
    items: [
      { slug: 'brand-identity', name: 'Brand Identity', description: 'Complete visual systems: Logo, Typography, and Color Theory.', icon: Palette },
      { slug: 'brand-guidelines', name: 'Brand Guidelines', description: 'Comprehensive rulebooks to ensure consistency across all channels.', icon: Book },
      { slug: 'logobook', name: 'Logobook', description: 'Strategic logo variations for every digital and print application.', icon: Layers },
      { slug: 'ui-ux-design', name: 'UI/UX Design', description: 'User-centric interfaces for web and mobile products.', icon: Layout },
      { slug: 'print-packaging', name: 'Print & Packaging', description: 'Business cards, brochures, and physical collateral design.', icon: FileText },
      { slug: 'enterprise-solutions', name: 'Enterprise Solutions', description: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
    ],
  },
  {
    id: 'development',
    label: 'Development',
    icon: Code,
    tagline: 'Build products that convert and scale',
    description:
      'High-performance websites and apps built on modern stacks, with conversion-first UX and measurable outcomes.',
    items: [
      { slug: 'web-development', name: 'Web Development', description: 'High-performance websites built on React, Next.js, and modern stacks.', icon: Globe },
      { slug: 'mobile-apps', name: 'Mobile Apps', description: 'Native and cross-platform mobile applications (iOS & Android).', icon: Smartphone },
      { slug: 'e-commerce', name: 'E-commerce', description: 'Scalable online stores on Shopify Plus or custom WooCommerce builds.', icon: ShoppingCart },
      { slug: 'web-applications', name: 'Web Applications', description: 'Complex SaaS platforms and internal business tools.', icon: Code },
      { slug: 'landing-pages', name: 'Landing Pages', description: 'High-converting sales pages integrated with your CRM.', icon: Layout },
      { slug: 'enterprise-solutions', name: 'Enterprise Solutions', description: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
    ],
  },
  {
    id: 'automation',
    label: 'Automation & Analytics',
    icon: Cpu,
    tagline: 'Systems that run while you sleep',
    description:
      'From CRM pipelines to dashboards and attribution—build a reliable growth engine with full visibility into ROI.',
    items: [
      { slug: 'crm-pipelines', name: 'CRM & Pipelines', description: 'Architecting GoHighLevel, HubSpot, and Kommo for sales velocity.', icon: MessageSquare },
      { slug: 'business-intelligence', name: 'Business Intelligence', description: 'Real-time dashboards (Looker/PowerBI) to visualize ROI.', icon: BarChart },
      { slug: 'workflow-automation', name: 'Workflow Automation', description: 'Connecting Monday.com, Slack, and billing via Zapier/Make.', icon: Cpu },
      { slug: 'advanced-tracking', name: 'Advanced Tracking', description: 'Server-side tagging (GTM) and attribution modeling.', icon: Terminal },
      { slug: 'field-ops', name: 'Field Ops', description: 'Streamlining HouseCall Pro and field service workflows.', icon: Shield },
      { slug: 'enterprise-solutions', name: 'Enterprise Solutions', description: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
    ],
  },
  {
    id: 'advertising',
    label: 'Advertising & SEO',
    icon: Megaphone,
    tagline: 'Demand generation that prints revenue',
    description:
      'Capture demand across search, social, and video with conversion-first creative and advanced measurement.',
    items: [
      { slug: 'google-ads-ppc', name: 'Google Ads (PPC)', description: 'Capture high-intent search traffic with precision keyword targeting.', icon: Search },
      { slug: 'seo-content', name: 'SEO & Content', description: 'Dominating organic search results and local map packs.', icon: LineChart },
      { slug: 'meta-ads', name: 'Meta Ads', description: 'Scale revenue with advanced audience segmentation on FB & Instagram.', icon: Megaphone },
      { slug: 'youtube-ads', name: 'YouTube Ads', description: 'Build authority and retarget users with high-quality video campaigns.', icon: Video },
      { slug: 'tiktok-social', name: 'TikTok & Social', description: 'Tap into viral organic reach and younger demographics.', icon: Smartphone },
      { slug: 'enterprise-solutions', name: 'Enterprise Solutions', description: 'We build bespoke strategies for complex needs.', icon: ArrowUpRight },
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


