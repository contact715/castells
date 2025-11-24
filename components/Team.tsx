
import React from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import ScrollFloat from './ScrollFloat';

const TEAM = [
  { 
    name: 'Dmitrii Z.', 
    role: 'Agency Owner', 
    bio: 'Strategic direction & vision for scaling 8-figure brands.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
  },
  { 
    name: 'Sarah Mitchell', 
    role: 'Head of Paid Ads', 
    bio: 'Campaign architecture & algorithmic scaling strategies.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80'
  },
  { 
    name: 'David Park', 
    role: 'Data Analytics', 
    bio: 'Attribution modeling & server-side tracking infrastructure.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Creative Director',
    bio: 'Brand identity systems & high-conversion visual assets.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
  },
  {
    name: 'James Wilson',
    role: 'Lead Developer',
    bio: 'Full-stack engineering & custom automation workflows.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80'
  },
  {
    name: 'Michael Chang',
    role: 'Automation Specialist',
    bio: 'CRM architecture & AI agent deployment.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80'
  }
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-ivory border-t border-black/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-xl">
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 text-text-primary tracking-tight">
              <ScrollFloat as="span" containerClassName="inline-block mr-3">The</ScrollFloat>
              <span className="italic font-light text-coral">
                <ScrollFloat as="span" containerClassName="inline-block">Experts</ScrollFloat>
              </span>
            </h2>
            <p className="text-xl text-text-secondary font-light">
              The minds behind the millions. We don't outsource. We execute.
            </p>
          </div>
          
           <div className="hidden md:flex items-center gap-8">
             <div className="text-right">
                <span className="block font-display text-4xl font-bold">50M+</span>
                <span className="text-xs uppercase tracking-widest text-text-secondary">Generated Revenue</span>
             </div>
             <div className="h-12 w-px bg-black/10 dark:bg-white/10" />
             <div className="text-right">
                <span className="block font-display text-4xl font-bold">12+</span>
                <span className="text-xs uppercase tracking-widest text-text-secondary">Years Experience</span>
             </div>
          </div>
        </div>

        {/* Team Grid - Executive Landscape Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TEAM.map((member, idx) => (
            <div 
                key={idx} 
                className="group relative bg-white dark:bg-black border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col sm:flex-row h-full sm:h-64"
            >
              {/* Image Section (Left) */}
              <div className="w-full sm:w-2/5 h-64 sm:h-full relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-coral/20 transition-colors z-10" />
                 <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                 />
              </div>

              {/* Content Section (Right) */}
              <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center relative">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-coral transition-colors">
                        {member.name}
                     </h3>
                     <a href="#" className="p-2 -mt-2 -mr-2 text-text-secondary hover:text-coral transition-colors">
                        <Linkedin className="w-5 h-5" />
                     </a>
                  </div>
                  
                  <div className="w-12 h-0.5 bg-black/10 dark:bg-white/10 mb-4 group-hover:bg-coral/50 transition-colors" />

                  <p className="text-xs font-bold uppercase tracking-widest text-coral/80 mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed opacity-90 line-clamp-3">
                      {member.bio}
                  </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
