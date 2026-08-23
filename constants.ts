import { BarChart3, Layout, PenTool, Megaphone, ArrowUpRight } from 'lucide-react';
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Digital Marketing',
    description: 'Data-driven strategies that dominate local markets and deliver measurable ROI.',
    icon: Megaphone,
  },
  {
    id: '2',
    title: 'Brand Strategy',
    description: 'Refining your voice to speak with authority, elegance, and clarity.',
    icon: PenTool,
  },
  {
    id: '3',
    title: 'Web Development',
    description: 'High-performance digital experiences built on modern, scalable architecture.',
    icon: Layout,
  },
  {
    id: '4',
    title: 'Lead Generation',
    description: 'Systems that convert traffic into qualified opportunities automatically.',
    icon: BarChart3,
  }
];

export const WORK_CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'paid-media', label: 'Paid Media' },
  { id: 'web-design', label: 'Web & Design' },
  { id: 'seo-content', label: 'SEO & Content' },
  { id: 'automation', label: 'Automation' }
];

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  /*
    Числа необязательны. Кейс, у которого есть живой сайт и понятно, что мы
    делали, честнее кейса с выдуманной метрикой — а подтверждённых цифр у
    части проектов просто нет.
  */
  metric?: string;
  metricLabel?: string;
  secondaryMetric?: string;
  secondaryLabel?: string;
  /* Снимок сайта клиента. Есть не у всех: сток мы убрали. */
  image?: string;
  video?: string;
  description: string;
  services: string[];
  color: string;
  category: 'paid-media' | 'web-design' | 'seo-content' | 'automation';
  challenge?: string;
  solution?: string;
  results?: { label: string; value: string; growth: string }[];
  keyFeatures?: string[];
  testimonial?: { quote: string; author: string; role: string };
  logo?: string;
  logoSvg?: string;
  brandGuidelines?: string;
  website?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '01',
    client: 'Roman Service',
    // Снимок сайта, который мы для него построили, сделан 23 августа 2026
    image: '/cases/roman-service.jpg',
    industry: 'HVAC Services',
    location: 'North Port, Florida',
    year: '2024',
    video: '',
    description: 'Took an HVAC company off a single lead source and onto its own site, Google and Meta, with a CRM that catches every request.',
    services: ['Lead Gen', 'Google Ads', 'Meta Ads'],
    color: '#089662',
    category: 'paid-media',
    challenge: "Roman Service relied entirely on Angie's List for leads, making the business dependent on a single, unpredictable source. The owner was skeptical about digital advertising after previous failures.",
    solution: "We launched a 'Digital Dominance' ecosystem, starting with a low-risk test on Meta Ads. We built a high-conversion landing page with A/B testing and integrated a custom CRM to automate lead processing.",
    keyFeatures: ['Meta Ads (FB & Insta)', 'High-Conversion Landing Page', 'CRM Integration'],
    testimonial: {
      quote: "I honestly didn't expect it to work so fast. I was always skeptical about advertising because before it just ate up the budget with no result. But here I see real calls, requests, people who leave contacts and really need HVAC system installation.",
      author: "Roman",
      role: "Owner, Roman Service LLC"
    },
    logo: "/Roman's Service - Brand Guidelines 2 copy/01_Logos/Primary_Logo/FullColor/Roman_Primary_Logo_FullColor.png",
    logoSvg: "/Roman's Service - Brand Guidelines 2 copy/01_Logos/Primary_Logo/FullColor/Roman_Primary_Logo_FullColor.svg",
    brandGuidelines: "/Roman's_Brand_Guideline copy.pdf",
    website: "https://www.acromanservice.com/"
  },
  {
    /*
      Кейс без чисел: подтверждённых метрик по этому проекту у нас нет, а
      выдумывать их мы перестали. Подтверждение — живой сайт, его видно и
      проверяемо. Данные взяты из карточки Web-Development в Monday
      (клиент, город) и проверены запросом 22 августа 2026.
    */
    id: '11',
    client: 'Five Star Comfort',
    industry: 'Heating and Air Conditioning',
    location: 'Bothell, Washington',
    year: '2024',
    description:
      'Built the website for a heating and air conditioning company in the Seattle area: service pages, quote request and a phone number that works from any screen.',
    services: ['Web Development'],
    color: '#089662',
    category: 'web-design',
    website: 'https://fivestarcomfort.com/',
  },
  {
    id: '02',
    client: 'Drive Car Studio',
    industry: 'Automotive',
    location: 'Los Angeles, California',
    year: '2024',
    video: '',
    description: 'Built a premium brand presence for luxury automotive services, dominating the LA market with high-end visual content and strategic social media marketing.',
    services: ['Brand Strategy', 'Web Design', 'Social Media'],
    color: '#3B82F6',
    category: 'web-design',
    challenge: "Drive Car Studio needed to establish themselves as a premium provider in the competitive LA automotive services market, competing against established players.",
    solution: "We created a luxury brand identity with high-end photography, a sophisticated website, and targeted Instagram campaigns showcasing before/after transformations.",
    keyFeatures: ['Premium Brand Identity', 'Visual Content Strategy', 'Instagram Marketing']
  },
  {
    id: '03',
    client: 'Detailed Exotics Portland',
    industry: 'Automotive',
    location: 'Portland, Oregon',
    year: '2024',
    video: '',
    description: 'Established a dominant online presence in Portland\'s luxury automotive market through targeted local SEO and high-converting paid advertising campaigns.',
    services: ['Local SEO', 'Google Ads', 'PPC'],
    color: '#10B981',
    category: 'paid-media',
    challenge: "Detailed Exotics needed to capture high-value customers in Portland's competitive luxury automotive services market.",
    solution: "We implemented a comprehensive local SEO strategy combined with hyper-targeted Google Ads campaigns focusing on premium keywords and luxury positioning.",
    keyFeatures: ['Local SEO Optimization', 'Premium Keyword Targeting', 'High-Converting Landing Pages']
  },
  {
    id: '04',
    client: 'Appliance Repair Clinic',
    industry: 'Home Services',
    location: 'Los Angeles, California',
    year: '2024',
    video: '',
    description: 'Built a comprehensive lead generation system for appliance repair services, capturing high-intent customers through strategic local advertising and SEO.',
    services: ['Local SEO', 'Google Ads', 'Lead Generation'],
    color: '#8B5CF6',
    category: 'paid-media',
    challenge: "Appliance Repair Clinic struggled to compete with larger chains and needed a cost-effective way to reach customers when their appliances broke down.",
    solution: "We implemented a multi-channel approach combining local SEO, Google Ads for emergency repairs, and a streamlined booking system that captured leads 24/7.",
    keyFeatures: ['24/7 Lead Capture', 'Emergency Service Ads', 'Automated Scheduling']
  },
  {
    id: '05',
    client: 'Cool Doc',
    industry: 'HVAC Services',
    location: 'Los Angeles, California',
    year: '2024',
    video: '',
    description: 'Established Cool Doc as the go-to HVAC service provider in LA through aggressive paid advertising and a reputation management system that generated consistent 5-star reviews.',
    services: ['Meta Ads', 'Reputation Management', 'Google Ads'],
    color: '#F59E0B',
    category: 'paid-media',
    challenge: "Cool Doc was unknown in the competitive LA market and needed to quickly establish credibility and generate leads in a highly competitive space.",
    solution: "We launched a comprehensive digital marketing campaign focusing on seasonal HVAC needs, combined with automated review generation that built trust and improved local rankings.",
    keyFeatures: ['Seasonal Campaign Strategy', 'Automated Review System', 'Hyper-Local Targeting']
  },
  {
    id: '06',
    client: 'United HVAC',
    industry: 'HVAC Services',
    location: 'San Diego / Sarasota / Tampa',
    year: '2024',
    video: '',
    description: 'Scaled a multi-location HVAC business across three markets, implementing location-specific marketing strategies that drove consistent growth in each region.',
    services: ['Multi-Location SEO', 'Geo-Targeted Ads', 'CRM Automation'],
    color: '#EC4899',
    category: 'paid-media',
    challenge: "United HVAC needed to manage marketing across three different locations while maintaining brand consistency and optimizing for each local market's unique characteristics.",
    solution: "We created location-specific landing pages, implemented geo-targeted advertising campaigns, and built a centralized CRM system that routed leads to the correct location automatically.",
    keyFeatures: ['Multi-Location Management', 'Geo-Targeted Campaigns', 'Centralized Lead Routing']
  },
  {
    id: '07',
    client: 'Royally Remodeling and Design',
    industry: 'Construction',
    location: 'Sarasota / Tampa, Florida',
    year: '2024',
    video: '',
    description: 'Positioned Royally Remodeling as the premier high-end remodeling company in Southwest Florida through luxury brand positioning and strategic content marketing.',
    services: ['Web Design', 'Content Marketing', 'Paid Advertising'],
    color: '#06B6D4',
    category: 'web-design',
    challenge: "Royally Remodeling needed to attract high-value remodeling projects but was competing against larger, more established contractors in the Florida market.",
    solution: "We created a premium brand identity with stunning before/after galleries, developed a content strategy showcasing luxury remodeling expertise, and targeted high-income homeowners.",
    keyFeatures: ['Luxury Brand Positioning', 'Before/After Portfolio', 'High-Value Client Targeting']
  },
  {
    id: '08',
    client: 'Radix Flooring',
    industry: 'Home Services',
    location: 'Various',
    year: '2024',
    video: '',
    description: 'Built a comprehensive digital presence for Radix Flooring, focusing on showcasing premium flooring options and generating qualified leads through strategic SEO and paid advertising.',
    services: ['SEO', 'Google Ads', 'Web Design'],
    color: '#2563EB',
    category: 'seo-content',
    challenge: "Radix Flooring needed to compete with big-box retailers and establish themselves as a premium flooring installation service.",
    solution: "We developed a content-rich website showcasing premium flooring options, implemented local SEO strategies, and created targeted Google Ads campaigns for high-intent flooring searches.",
    keyFeatures: ['Premium Portfolio Gallery', 'Local SEO Optimization', 'Material-Focused Content']
  },
  {
    id: '09',
    client: 'Star Dental Implants',
    industry: 'Healthcare',
    location: 'Various',
    year: '2024',
    video: '',
    description: 'Established Star Dental Implants as a trusted provider in the competitive dental implant market through educational content, patient testimonials, and strategic paid advertising.',
    services: ['Content Marketing', 'Google Ads', 'Reputation Management'],
    color: '#10B981',
    category: 'seo-content',
    challenge: "Star Dental Implants needed to build trust in a sensitive medical procedure market where patients research extensively before making decisions.",
    solution: "We created comprehensive educational content about dental implants, showcased patient success stories, and implemented a sophisticated remarketing strategy for high-intent prospects.",
    keyFeatures: ['Educational Content Hub', 'Patient Success Stories', 'Trust-Building Campaigns']
  },
  {
    id: '10',
    client: 'Design by Nova',
    industry: 'HVAC Services',
    location: 'New York, NY',
    year: '2024',
    video: '',
    description: 'Established Design by Nova as a leading HVAC and mini-split system installation company in New York, capturing market share through strategic local SEO, educational content, and government program promotion.',
    services: ['Local SEO', 'Content Marketing', 'Google Ads'],
    color: '#8B5CF6',
    category: 'seo-content',
    challenge: "Design by Nova needed to stand out in the competitive New York HVAC market while helping customers access government assistance programs like HEAP Cooling Assistance.",
    solution: "We developed comprehensive content about HVAC systems and government programs, optimized for local SEO targeting Manhattan, Brooklyn, Staten Island, and Queens, and created educational resources about mini-split systems.",
    keyFeatures: ['Government Program Integration', 'Educational HVAC Content', 'Multi-Borough SEO Strategy']
  }
];

export const MANIFESTO_TEXT = "WE BUILD LEGACIES. ELEGANCE IS NOT OPTIONAL. DATA DRIVES DESIGN. YOUR SUCCESS IS OUR METRIC. DOMINATE YOUR MARKET.";
/**
 * Сайты, которые построили МЫ. Не «сайты наших клиентов»: у клиента по
 * рекламе тоже есть сайт, и он не наш.
 *
 * Условие попадания в список ровно одно и проверяется руками: в Monday у
 * клиента есть карточка Web-Development, и адрес отвечает 200.
 *
 * Проверено 22 августа 2026:
 *   Roman Service      — acromanservice.com, 200, North Port FL, совпадает
 *   Five Star Comfort  — fivestarcomfort.com, 200, адрес в Bothell под Сиэтлом,
 *                        совпадает с городом клиента в Monday
 *
 * Не попали и почему:
 *   Design by Nova     — design-by-nova.com отдаёт 404, сайт не работает
 *   ChiefHVAC          — в Monday домен с опечаткой (cheifhvac.com, не отвечает),
 *                        chiefhvac.com показывает заглушку
 *   United HVAC        — unitedhvac.com принадлежит другой компании, не клиенту
 *   Detailed Exotics, HVAC & Appliance Repair Clinic, Hawaii Amazonian,
 *   Seattle InFlow     — адреса неизвестны, спрошены у владельца
 *
 * НЕ добавлять сюда memaso.com, wedohvacus.com, fusefl.com, fusepsl.com и
 * aaabrothers.com: это клиенты по рекламе, сайты строили не мы. Увидеть свой
 * сайт в чужом портфолио — то, за что клиент перестаёт быть клиентом.
 */
export const BUILT_SITES = [
  {
    client: 'Roman Service',
    industry: 'HVAC',
    location: 'North Port, Florida',
    website: 'https://www.acromanservice.com/',
  },
  {
    client: 'Five Star Comfort',
    industry: 'Heating and air conditioning',
    location: 'Bothell, Washington',
    website: 'https://fivestarcomfort.com/',
  },
];
