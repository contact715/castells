export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  expertise: string[];
  caseStudies?: string[]; // IDs of case studies
}

export const AUTHORS: Author[] = [
  {
    id: 'alex-castells',
    name: 'Alex Castells',
    role: 'Founder & CEO',
    bio: 'Alex is the visionary behind Castells Agency, with over 10 years of experience in digital marketing and growth strategy. He specializes in revenue-first marketing approaches and has helped 200+ businesses achieve remarkable growth.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    email: 'alex@castells.agency',
    linkedin: 'https://linkedin.com/in/alexcastells',
    twitter: 'https://twitter.com/alexcastells',
    expertise: ['Growth Strategy', 'Revenue Optimization', 'Paid Advertising', 'Marketing Automation'],
    caseStudies: ['apex-architecture', 'lumina-health', 'vanguard-solar']
  },
  {
    id: 'sarah-martinez',
    name: 'Sarah Martinez',
    role: 'Head of Strategy',
    bio: 'Sarah brings a data-driven approach to marketing strategy, with expertise in SEO, content marketing, and conversion optimization. She has a proven track record of increasing client revenue by 300%+ through strategic campaigns.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    email: 'sarah@castells.agency',
    linkedin: 'https://linkedin.com/in/sarahmartinez',
    expertise: ['SEO Strategy', 'Content Marketing', 'Conversion Optimization', 'Analytics'],
    caseStudies: ['urban-builders', 'nexus-tech']
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Creative Director',
    bio: 'Michael is a creative powerhouse specializing in brand identity, web design, and visual storytelling. His designs have won multiple awards and have helped brands stand out in competitive markets.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    email: 'michael@castells.agency',
    linkedin: 'https://linkedin.com/in/michaelchen',
    expertise: ['Brand Identity', 'Web Design', 'UI/UX', 'Creative Strategy'],
    caseStudies: ['stylehouse', 'bloom-wild']
  },
  {
    id: 'emily-davis',
    name: 'Emily Davis',
    role: 'Performance Marketing Lead',
    bio: 'Emily is a performance marketing expert with deep expertise in Meta Ads, Google Ads, and TikTok advertising. She has managed campaigns with $10M+ in ad spend and consistently delivers 3x+ ROAS.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    email: 'emily@castells.agency',
    linkedin: 'https://linkedin.com/in/emilydavis',
    expertise: ['Paid Advertising', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'Campaign Optimization'],
    caseStudies: ['bitstream', 'wright-logistics']
  },
  {
    id: 'david-park',
    name: 'David Park',
    role: 'Technical Lead',
    bio: 'David is a full-stack developer and marketing technologist who builds custom solutions for tracking, automation, and data integration. He specializes in creating scalable marketing infrastructure.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    email: 'david@castells.agency',
    linkedin: 'https://linkedin.com/in/davidpark',
    expertise: ['Marketing Automation', 'Technical Implementation', 'Data Integration', 'Custom Tracking'],
    caseStudies: ['techflow', 'greenleaf']
  }
];

export const findAuthorById = (id: string): Author | undefined => {
  return AUTHORS.find(author => author.id === id);
};

export const findAuthorByName = (name: string): Author | undefined => {
  return AUTHORS.find(author => 
    author.name.toLowerCase().includes(name.toLowerCase())
  );
};

