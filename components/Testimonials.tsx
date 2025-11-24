
import React from 'react';
import { Star } from 'lucide-react';
import { Highlighter } from './Highlighter';
import ScrollFloat from './ScrollFloat';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jonathan Reed",
    role: "CEO, Apex Architecture",
    quote: "Castells didn't just run ads; they restructured our entire digital presence. Our inbound leads tripled in 90 days.",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Director, Lumina Health",
    quote: "The precision of their data targeting is unmatched. We saw a 450% ROI on our first campaign. Absolutely transformative.",
  },
  {
    id: 3,
    name: "Michael Chang",
    role: "Founder, Vanguard Solar",
    quote: "Elegance meets performance. They elevated our brand aesthetic while driving record sales volumes. The perfect partner.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "COO, Urban Builders",
    quote: "Finally, an agency that speaks our language. No fluff, just metrics that matter and creative that converts.",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-ivory border-t border-black/5">
      <div className="container mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight tracking-tight">
            <ScrollFloat as="span" containerClassName="inline-block mr-3">Trusted by</ScrollFloat>
            <span className="italic font-light text-coral">
                <ScrollFloat as="span" containerClassName="inline-block">Visionaries</ScrollFloat>
            </span>
          </h2>
          <p className="text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
            Don't just take our word for it. Hear from the leaders who have transformed their businesses with Castells.
          </p>
        </div>

        {/* Masonry-style Grid - Clean & Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-surface p-10 border border-black/5 rounded-none md:rounded-xl hover:border-coral/30 transition-colors duration-300 flex flex-col justify-between min-h-[300px]">
                    <div>
                        <div className="flex gap-1 mb-6">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-coral text-coral" />)}
                        </div>
                        <blockquote className="font-display text-2xl md:text-3xl font-medium leading-snug text-text-primary mb-8">
                            "{t.quote}"
                        </blockquote>
                    </div>
                    <div className="border-t border-black/5 pt-6 mt-auto">
                        <cite className="not-italic text-sm font-bold uppercase tracking-widest text-text-primary block">
                            {t.name}
                        </cite>
                        <span className="text-xs text-text-secondary">
                            {t.role}
                        </span>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
