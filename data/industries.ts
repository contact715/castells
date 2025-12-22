import type { ComponentType } from 'react';
import {
  Hammer,
  Home,
  Car,
  Briefcase,
  Droplets,
  ShieldCheck,
  LayoutGrid,
  Ruler,
  Zap,
  PaintBucket,
  Sun,
  Palette,
  Sparkles,
  Scale,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { slugify } from '../lib/routes';

export type IndustryCategoryId = 'construction' | 'home' | 'auto' | 'pro';

export type IndustryItemBase = {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

export type IndustryItem =
  | (IndustryItemBase & {
    type: 'industry';
    slug: string;
    image?: string;
  })
  | (IndustryItemBase & {
    type: 'cta';
    href: '/contact';
  });

export type IndustryCategory = {
  id: IndustryCategoryId;
  label: string;
  icon: ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  items: IndustryItem[];
};

const ctaItem: IndustryItem = {
  type: 'cta',
  name: "Don't see your niche?",
  description: 'Leave a request. We build custom strategies for unique markets.',
  icon: MessageSquare,
  href: '/contact',
};

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  {
    id: 'construction',
    label: 'Construction',
    icon: Hammer,
    tagline: 'Build your pipeline, not just buildings',
    description:
      'High-ticket lead generation for construction and remodeling projects. We help contractors fill their schedules with qualified, high-value projects.',
    items: [
      {
        type: 'industry',
        slug: slugify('ADU & Additions'),
        name: 'ADU & Additions',
        description: 'High-ticket lead generation for large-scale residential projects.',
        icon: Home,
        image: '/images/adu-additions.png',
      },
      {
        type: 'industry',
        slug: slugify('Bathroom Remodeling'),
        name: 'Bathroom Remodeling',
        description: 'Capture homeowners ready to invest in luxury upgrades.',
        icon: Droplets,
        image: '/images/bathroom-remodel.png',
      },
      {
        type: 'industry',
        slug: slugify('Roofing Services'),
        name: 'Roofing Services',
        description: 'Emergency repair and full replacement leads that convert.',
        icon: ShieldCheck,
        image: '/images/roofing-services.png',
      },
      {
        type: 'industry',
        slug: slugify('Kitchen Remodeling'),
        name: 'Kitchen Remodeling',
        description: 'Targeting high-value renovation projects with precision.',
        icon: LayoutGrid,
        image: '/images/kitchen-remodeling.png',
      },
      {
        type: 'industry',
        slug: slugify('Fencing & Gates'),
        name: 'Fencing & Gates',
        description: 'Secure more contracts for perimeter and security installations.',
        icon: Ruler,
        image: '/images/fencing-gates.png',
      },
      ctaItem,
    ],
  },
  {
    id: 'home',
    label: 'Home Services',
    icon: Home,
    tagline: 'Keep your technicians booked year-round',
    description:
      'Recurring service contracts and high-value home improvement leads. We build systems that generate consistent, predictable revenue.',
    items: [
      {
        type: 'industry',
        slug: slugify('HVAC Systems'),
        name: 'HVAC Systems',
        description: 'Seasonal campaigns to keep your technicians booked year-round.',
        icon: Zap,
        image: '/images/hvac-systems.png',
      },
      {
        type: 'industry',
        slug: slugify('Flooring & Tile'),
        name: 'Flooring & Tile',
        description: 'Connect with clients looking for premium material installations.',
        icon: LayoutGrid,
        image: '/images/flooring-tile.png',
      },
      {
        type: 'industry',
        slug: slugify('Int/Ext Painting'),
        name: 'Int/Ext Painting',
        description: 'Fill your schedule with whole-home and commercial painting jobs.',
        icon: PaintBucket,
        image: '/images/painting-services.png',
      },
      {
        type: 'industry',
        slug: slugify('Electrical'),
        name: 'Electrical',
        description: 'Panel upgrades, lighting, and smart home installation leads.',
        icon: Zap,
        image: '/images/electrical-services.png',
      },
      {
        type: 'industry',
        slug: slugify('Solar Energy'),
        name: 'Solar Energy',
        description: 'Qualified appointments for residential and commercial solar.',
        icon: Sun,
        image: '/images/solar-energy.png',
      },
      ctaItem,
    ],
  },
  {
    id: 'auto',
    label: 'Automotive',
    icon: Car,
    tagline: 'Drive more traffic to your shop',
    description:
      'Premium automotive services for car enthusiasts and commercial fleets. We target customers who value quality over price.',
    items: [
      {
        type: 'industry',
        slug: slugify('Paint Protection'),
        name: 'Paint Protection',
        description: 'Attract car enthusiasts seeking premium PPF installations.',
        icon: ShieldCheck,
        image: '/images/paint-protection.png',
      },
      {
        type: 'industry',
        slug: slugify('Vinyl Wraps'),
        name: 'Vinyl Wraps',
        description: 'Leads for color change wraps and commercial fleet branding.',
        icon: Palette,
        image: '/images/vinyl-wraps.png',
      },
      {
        type: 'industry',
        slug: slugify('Window Tinting'),
        name: 'Window Tinting',
        description: 'Volume-based campaigns to drive daily shop traffic.',
        icon: Sun,
        image: '/images/window-tinting.png',
      },
      {
        type: 'industry',
        slug: slugify('Auto Detailing'),
        name: 'Auto Detailing',
        description: 'High-end detailing and ceramic coating packages.',
        icon: Sparkles,
        image: '/images/auto-detailing.png',
      },
      {
        type: 'industry',
        slug: slugify('Ceramic Coating'),
        name: 'Ceramic Coating',
        description: 'Educated customers looking for long-term vehicle protection.',
        icon: Droplets,
        image: '/images/ceramic-coating.png',
      },
      ctaItem,
    ],
  },
  {
    id: 'pro',
    label: 'Professional',
    icon: Briefcase,
    tagline: 'Grow your practice, not your overhead',
    description:
      'B2B growth strategies for professional service providers. We help you attract high-value clients who need your expertise.',
    items: [
      {
        type: 'industry',
        slug: slugify('Insurance Agencies'),
        name: 'Insurance Agencies',
        description: 'Exclusive leads for auto, home, and life insurance policies.',
        icon: ShieldCheck,
        image: '/images/insurance-agencies.png',
      },
      {
        type: 'industry',
        slug: slugify('Legal Services'),
        name: 'Legal Services',
        description: 'High-intent clients for personal injury, family, and estate law.',
        icon: Scale,
        image: '/images/legal-services.png',
      },
      {
        type: 'industry',
        slug: slugify('Business Consulting'),
        name: 'Business Consulting',
        description: 'Connect with B2B clients needing strategic growth advice.',
        icon: FileText,
        image: '/images/business-consulting.png',
      },
      {
        type: 'industry',
        slug: slugify('Financial Planning'),
        name: 'Financial Planning',
        description: 'Qualified prospects for wealth management and retirement planning.',
        icon: Briefcase,
        image: '/images/financial-planning.png',
      },
      {
        type: 'industry',
        slug: slugify('Real Estate'),
        name: 'Real Estate',
        description: 'Lead gen for agents, brokers, and property managers ready to grow.',
        icon: Home,
        image: '/images/real-estate.png',
      },
      ctaItem,
    ],
  },
];

export const getIndustryCategory = (id: IndustryCategoryId) =>
  INDUSTRY_CATEGORIES.find((c) => c.id === id);

export const findIndustryBySlug = (slug: string) => {
  const s = slugify(slug);
  for (const category of INDUSTRY_CATEGORIES) {
    for (const item of category.items) {
      if (item.type === 'industry' && item.slug === s) {
        return { category, item };
      }
    }
  }
  return undefined;
};




