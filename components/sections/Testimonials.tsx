import React from 'react';
import { VelocityScroll } from '../effects/ScrollBasedVelocity';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import AnimatedHeading from '../ui/AnimatedHeading';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jonathan Reed",
    role: "CEO, Apex Architecture",
    quote: "Castells didn't just run ads; they restructured our entire digital presence. Our inbound leads tripled in 90 days.",
    avatar: "JR"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Director, Lumina Health",
    quote: "The precision of their data targeting is unmatched. We saw a 450% ROI on our first campaign. Absolutely transformative.",
    avatar: "SJ"
  },
  {
    id: 3,
    name: "Michael Chang",
    role: "Founder, Vanguard Solar",
    quote: "Elegance meets performance. They elevated our brand aesthetic while driving record sales volumes. The perfect partner.",
    avatar: "MC"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "COO, Urban Builders",
    quote: "Finally, an agency that speaks our language. No fluff, just metrics that matter and creative that converts.",
    avatar: "ER"
  },
  {
    id: 5,
    name: "David Park",
    role: "CTO, Nexus Tech",
    quote: "Their technical understanding of our product was impressive. The campaigns felt authentic and drove high-quality trials.",
    avatar: "DP"
  },
  {
    id: 6,
    name: "Olivia Foster",
    role: "VP Marketing, StyleHouse",
    quote: "We've worked with many agencies, but Castells is in a league of their own. The creative output is simply stunning.",
    avatar: "OF"
  },
  {
    id: 7,
    name: "Marcus Chen",
    role: "Founder, BitStream",
    quote: "Scale was our biggest challenge. Castells built a system that allowed us to grow 10x without breaking our CPA targets.",
    avatar: "MC"
  },
  {
    id: 8,
    name: "Isabella Rossi",
    role: "Director, Luxe Interiors",
    quote: "They captured our brand voice perfectly. The ad creatives were beautiful and performed exceptionally well.",
    avatar: "IR"
  },
  {
    id: 9,
    name: "Thomas Wright",
    role: "CEO, Wright Logistics",
    quote: "Data-driven and results-oriented. They turned our marketing spend into a predictable revenue engine.",
    avatar: "TW"
  },
  {
    id: 10,
    name: "Sophie Anderson",
    role: "Founder, Bloom & Wild",
    quote: "The team is responsive, creative, and strategic. I feel like they are a true extension of our internal team.",
    avatar: "SA"
  },
  {
    id: 11,
    name: "James Wilson",
    role: "CMO, TechFlow",
    quote: "From day one, they brought fresh ideas to the table. Our engagement rates have never been higher.",
    avatar: "JW"
  },
  {
    id: 12,
    name: "Emily Davis",
    role: "CEO, GreenLeaf",
    quote: "Sustainable growth was our goal, and they delivered. Highly recommend for any mission-driven brand.",
    avatar: "ED"
  }
];

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, quote, avatar }) => (
  <div className="w-[350px] md:w-[450px] bg-white  -black/5 p-6 md:p-8 rounded-[2rem] mx-4 flex flex-col justify-between h-[220px] md:h-[240px] hover:-coral/20 hover: transition-all duration-300">
    <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed line-clamp-4">
      "{quote}"
    </p>
    <div className="flex items-center gap-4 mt-6">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-purple-500 flex items-center justify-center text-white font-bold text-sm ">
        {avatar}
      </div>
      <div>
        <h4 className="text-text-primary font-semibold text-sm md:text-base">{name}</h4>
        <p className="text-text-secondary/70 text-xs md:text-sm">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  // Split testimonials into rows
  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4, 8);
  const row3 = TESTIMONIALS.slice(8, 12);

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-coral/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-6 mb-20 relative z-10">
        <div className="max-w-3xl">
          <Badge className="mb-3">Testimonials</Badge>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight tracking-tight text-text-primary"
            delay={0.1}
          >
            Loved by founders<br />
            <span className="text-text-secondary">worldwide</span>
          </AnimatedHeading>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-8 md:gap-12">
        <VelocityScroll default_velocity={0.5} className="hover:cursor-grab active:cursor-grabbing">
          {row1.map((t) => (
            <TestimonialCard key={t.id} name={t.name} role={t.role} quote={t.quote} avatar={t.avatar} />
          ))}
        </VelocityScroll>

        <VelocityScroll default_velocity={-0.5} className="hover:cursor-grab active:cursor-grabbing">
          {row2.map((t) => (
            <TestimonialCard key={t.id} name={t.name} role={t.role} quote={t.quote} avatar={t.avatar} />
          ))}
        </VelocityScroll>

        <VelocityScroll default_velocity={0.5} className="hover:cursor-grab active:cursor-grabbing">
          {row3.map((t) => (
            <TestimonialCard key={t.id} name={t.name} role={t.role} quote={t.quote} avatar={t.avatar} />
          ))}
        </VelocityScroll>
      </div>

      {/* Fade Edges */}
      <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-ivory to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-ivory to-transparent z-20 pointer-events-none" />

    </section>
  );
};

export default Testimonials;
