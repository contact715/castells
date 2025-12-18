
import React from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import AnimatedHeading from '../ui/AnimatedHeading';
import { PageView } from '../../App';

const TEAM = [
  {
    name: 'Dmitrii Z.',
    role: 'Agency Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Paid Ads',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80'
  },
  {
    name: 'David Park',
    role: 'Data Analytics',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
  },
  {
    name: 'James Wilson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80'
  },
  {
    name: 'Michael Chang',
    role: 'Automation Specialist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80'
  },
  {
    name: 'Anna Kowalski',
    role: 'Content Strategist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
  },
  {
    name: 'Marcus Thorne',
    role: 'Client Success',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80'
  },
  {
    name: 'Lisa Chen',
    role: 'SEO Specialist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    }
  },
};

interface TeamProps {
  onNavigate?: import('../../types').NavigateFn;
}

const Team: React.FC<TeamProps> = ({ onNavigate }) => {
  return (
    <section id="team" className="py-20 bg-ivory dark:bg-[#191919] border-t border-black/5 dark:border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Badge className="mb-4">Our Team</Badge>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary dark:text-white leading-tight tracking-tight mb-6"
            delay={0.1}
          >
            Meet the<br />
            <span className="text-text-secondary">Minds</span>
          </AnimatedHeading>
          <p className="text-lg text-text-secondary leading-relaxed">
            The people behind the millions. We don't outsource. We execute.
          </p>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay - Always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Content - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Name */}
                <h3 className="font-display text-lg font-semibold text-white mb-0.5">
                  {member.name}
                </h3>
                {/* Role */}
                <span className="text-xs text-white/70">
                  {member.role}
                </span>
              </div>

              {/* LinkedIn - Top Right */}
              <a
                href="#"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-coral hover:border-coral transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}

          {/* Join Team CTA Card */}
          <motion.div
            variants={cardVariants}
            onClick={() => onNavigate?.('careers')}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-surface cursor-pointer"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="teamGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.5" fill="#E08576" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#teamGrid)" />
              </svg>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-coral/20 via-transparent to-transparent group-hover:from-coral/30 transition-all duration-500" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-coral flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-7 h-7 text-white group-hover:rotate-45 transition-transform duration-300" />
              </div>

              {/* Text */}
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                Join Our Team
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                We're always looking for talented people
              </p>
            </div>

            {/* Border Effect */}
            <div className="absolute inset-0 rounded-xl border border-black/5 dark:border-white/10 group-hover:border-coral/50 transition-colors duration-300" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Team;

