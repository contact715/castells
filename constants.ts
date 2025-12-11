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
  metric: string;
  metricLabel: string;
  secondaryMetric?: string;
  secondaryLabel?: string;
  image: string;
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
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '01',
    client: 'Desert Cool HVAC',
    industry: 'Home Services',
    location: 'Phoenix, AZ',
    year: '2024',
    metric: '$697K',
    metricLabel: 'Added Revenue (Q1)',
    secondaryMetric: '+287%',
    secondaryLabel: 'YoY Growth',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_25fps.mp4',
    description: 'We restructured their entire digital acquisition pipeline, moving from low-quality shared leads to a proprietary exclusive lead system.',
    services: ['Lead Gen', 'Google Ads', 'CRM Automation'],
    color: '#E08576',
    category: 'paid-media',
    challenge: "Desert Cool was struggling with low-quality shared leads from aggregators, resulting in a high cost per acquisition and low conversion rates.",
    solution: "We built a proprietary lead generation system using Google Ads and a custom landing page funnel, integrated directly with their CRM for instant follow-up.",
    results: [
      { label: "Added Revenue", value: "$697K", growth: "+287%" },
      { label: "Lead Quality", value: "95%", growth: "+40%" },
      { label: "CPA", value: "$45", growth: "-60%" }
    ],
    keyFeatures: ['Proprietary Lead Scoring System', 'Automated SMS Follow-ups', 'Real-time ROI Dashboard']
  },
  {
    id: '02',
    client: 'Apex Roofing',
    industry: 'Construction',
    location: 'Dallas, TX',
    year: '2023',
    metric: '14x',
    metricLabel: 'Return on Ad Spend',
    secondaryMetric: '698',
    secondaryLabel: 'Qualified Leads',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
    description: 'Dominated the Dallas market during peak storm season with high-intent retargeting strategies and AI-driven appointment setting.',
    services: ['Local SEO', 'Meta Ads', 'AI Agents'],
    color: '#3B82F6',
    category: 'paid-media',
    challenge: "Apex needed to maximize their reach during the short storm season window but was getting lost in the noise of competitors.",
    solution: "We deployed a high-velocity Meta Ads campaign with AI-driven appointment setters to instantly qualify and book inspections.",
    results: [
      { label: "ROAS", value: "14x", growth: "+120%" },
      { label: "Qualified Leads", value: "698", growth: "+300%" },
      { label: "Appointments", value: "450", growth: "+250%" }
    ],
    keyFeatures: ['AI Appointment Setter Agent', 'Hyper-Local Geo-Fencing', 'Storm Tracking Integration']
  },
  {
    id: '03',
    client: 'SunPower Solutions',
    industry: 'Solar Energy',
    location: 'California',
    year: '2024',
    metric: '$2.3M',
    metricLabel: 'First Year Revenue',
    secondaryMetric: '156',
    secondaryLabel: 'Installations',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/1592237/1592237-hd_1920_1080_30fps.mp4',
    description: 'Built a complete brand infrastructure from scratch, scaling to over 150 installs in the first year through aggressive video marketing.',
    services: ['Brand Strategy', 'Video Production', 'Youtube Ads'],
    color: '#10B981',
    category: 'web-design',
    challenge: "A new entrant in the saturated California solar market needed to establish trust and generate leads immediately.",
    solution: "We created a premium brand identity and launched a YouTube video campaign focusing on educational content and customer testimonials.",
    results: [
      { label: "Revenue", value: "$2.3M", growth: "New" },
      { label: "Installations", value: "156", growth: "New" },
      { label: "Brand Awareness", value: "High", growth: "N/A" }
    ],
    keyFeatures: ['Cinematic Brand Storytelling', 'YouTube Ad Sequencing', 'Trust-Building Email Flows']
  },
  {
    id: '04',
    client: 'Elite Legal Group',
    industry: 'Legal Services',
    location: 'New York, NY',
    year: '2023',
    metric: '300%',
    metricLabel: 'Case Load Increase',
    secondaryMetric: '$450',
    secondaryLabel: 'Cost Per Case',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/5668435/5668435-hd_1920_1080_24fps.mp4',
    description: 'Implemented a high-ticket personal injury lead generation system that automatically qualifies consultations before they ever speak to an attorney.',
    services: ['PPC', 'Workflow Automation', 'Web Design'],
    color: '#8B5CF6',
    category: 'automation',
    challenge: "Attorneys were wasting hours on unqualified leads, and the cost per case acquisition was skyrocketing.",
    solution: "We implemented an automated qualification workflow that filtered leads before they reached the firm, ensuring only high-value cases were booked.",
    results: [
      { label: "Case Load", value: "300%", growth: "+300%" },
      { label: "Cost Per Case", value: "$450", growth: "-40%" },
      { label: "Time Saved", value: "20hrs/wk", growth: "N/A" }
    ],
    keyFeatures: ['Automated Lead Qualification', 'CRM Integration', 'High-Ticket Sales Funnel']
  },
  {
    id: '05',
    client: 'Velos Motors',
    industry: 'Automotive',
    location: 'Miami, FL',
    year: '2024',
    metric: '$1.8M',
    metricLabel: 'Inventory Sold',
    secondaryMetric: '12d',
    secondaryLabel: 'Avg Days on Lot',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/4489760/4489760-hd_1920_1080_25fps.mp4',
    description: 'Transformed a local dealership into a regional powerhouse using inventory-feed ads and hyper-targeted lifestyle creative on Instagram.',
    services: ['Meta Ads', 'Inventory Feed', 'Creative Strategy'],
    color: '#F59E0B',
    category: 'paid-media',
    challenge: "Inventory was sitting on the lot too long, depreciating in value, and traditional advertising was losing effectiveness.",
    solution: "We connected their inventory feed directly to Meta Ads, showing specific cars to users most likely to buy them based on lifestyle data.",
    results: [
      { label: "Inventory Sold", value: "$1.8M", growth: "+150%" },
      { label: "Days on Lot", value: "12d", growth: "-60%" },
      { label: "Ad Engagement", value: "High", growth: "+200%" }
    ],
    keyFeatures: ['Dynamic Inventory Ads', 'Lifestyle Creative Strategy', 'Automated Price Drop Alerts']
  },
  {
    id: '06',
    client: 'Pure Life Med Spa',
    industry: 'Health & Beauty',
    location: 'Beverly Hills, CA',
    year: '2023',
    metric: '450+',
    metricLabel: 'New Appointments',
    secondaryMetric: '$150k',
    secondaryLabel: 'Monthly Rec. Rev',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/3997977/3997977-hd_1920_1080_25fps.mp4',
    description: 'Launched a membership-focused marketing funnel that filled their calendar 3 months in advance with high-value recurring clients.',
    services: ['Membership Funnel', 'Email Marketing', 'Paid Social'],
    color: '#EC4899',
    category: 'paid-media',
    challenge: "The spa relied on one-off treatments and lacked a predictable recurring revenue stream.",
    solution: "We designed and launched a VIP membership program, marketed through exclusive offers and a high-end email nurture sequence.",
    results: [
      { label: "Appointments", value: "450+", growth: "+450%" },
      { label: "Recurring Rev", value: "$150k", growth: "New" },
      { label: "Retention", value: "90%", growth: "+20%" }
    ],
    keyFeatures: ['VIP Membership Portal', 'Automated Email Nurture', 'Influencer Partnership Program']
  },
  {
    id: '07',
    client: 'Urban Greens',
    industry: 'Sustainable Design',
    location: 'Austin, TX',
    year: '2024',
    metric: '210%',
    metricLabel: 'Traffic Growth',
    secondaryMetric: 'Top 3',
    secondaryLabel: 'Rank for Keywords',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/4243407/4243407-hd_1920_1080_30fps.mp4',
    description: 'An aggressive content SEO strategy combined with a rebrand established them as the #1 sustainable landscaper in the Austin metro area.',
    services: ['SEO', 'Content Marketing', 'Rebranding'],
    color: '#06B6D4',
    category: 'seo-content',
    challenge: "Despite high-quality work, they were invisible online and losing local search traffic to larger, less sustainable competitors.",
    solution: "We executed a complete rebrand and a content-heavy SEO strategy targeting high-intent local keywords.",
    results: [
      { label: "Traffic Growth", value: "210%", growth: "+210%" },
      { label: "Keyword Rank", value: "Top 3", growth: "+50 pos" },
      { label: "Leads", value: "85/mo", growth: "+150%" }
    ],
    keyFeatures: ['Local SEO Dominance', 'Content Marketing Engine', 'Sustainable Brand Identity']
  },
  {
    id: '08',
    client: "Roman's Service",
    industry: 'HVAC & Heating',
    location: 'North Port, FL',
    year: '2024',
    metric: '$1M+',
    metricLabel: 'Added Revenue',
    secondaryMetric: '14x',
    secondaryLabel: 'ROAS',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80',
    video: 'https://videos.pexels.com/video-files/6195519/6195519-hd_1920_1080_25fps.mp4',
    description: "Scaled an HVAC business in North Port, FL from a single lead source to a $1M+ revenue increase through a multi-channel digital marketing system.",
    services: ['Meta Ads', 'Landing Page Dev', 'CRM Integration'],
    color: '#2563EB',
    category: 'paid-media',
    challenge: "Roman's Service relied entirely on Angie's List for leads, making the business dependent on a single, unpredictable source. The owner was skeptical about digital advertising after previous failures and lacked a scalable marketing system.",
    solution: "We launched a 'Digital Dominance' ecosystem, starting with a low-risk $1,000 test on Meta Ads. We built a high-conversion landing page with A/B testing and integrated a custom CRM to automate lead processing, proving ROI in the first month.",
    results: [
      { label: "Added Revenue", value: "$1M+", growth: "+300%" },
      { label: "Leads Generated", value: "150+", growth: "New" },
      { label: "Avg Deal Size", value: "$8.5k", growth: "+20%" }
    ],
    keyFeatures: ['Meta Ads (FB & Insta)', 'High-Conversion Landing Page', 'A/B Testing & Optimization'],
    testimonial: {
      quote: "I honestly didn't expect it to work so fast. I was always skeptical about advertising because before it just ate up the budget with no result. But here I see real calls, requests, people who leave contacts and really need HVAC system installation.",
      author: "Roman",
      role: "Owner, Roman's Service LLC"
    }
  }
];

export const MANIFESTO_TEXT = "WE BUILD LEGACIES. ELEGANCE IS NOT OPTIONAL. DATA DRIVES DESIGN. YOUR SUCCESS IS OUR METRIC. DOMINATE YOUR MARKET.";