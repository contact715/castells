import { BarChart3, Layout, PenTool, Megaphone, ArrowUpRight } from 'lucide-react';
import { Service, Project } from './types';

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

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Apex Architecture',
    category: 'Rebranding',
    image: 'https://picsum.photos/800/600?random=10',
    description: 'A minimalist identity system for a leading sustainable architecture firm.'
  },
  {
    id: 'p2',
    title: 'Lumina Health',
    category: 'Digital Product',
    image: 'https://picsum.photos/800/600?random=11',
    description: 'Streamlining patient care through an elegant, accessible mobile interface.'
  },
  {
    id: 'p3',
    title: 'Vanguard',
    category: 'Campaign',
    image: 'https://picsum.photos/800/600?random=12',
    description: 'Increasing market share by 300% through targeted local outreach.'
  }
];

export const MANIFESTO_TEXT = "WE BUILD LEGACIES. ELEGANCE IS NOT OPTIONAL. DATA DRIVES DESIGN. YOUR SUCCESS IS OUR METRIC. DOMINATE YOUR MARKET.";