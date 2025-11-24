
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Highlighter } from './Highlighter';
import ScrollFloat from './ScrollFloat';

const FAQS = [
  {
    question: "Do you guarantee results?",
    answer: "We guarantee our work. While no agency can legally guarantee specific ad platform returns due to market volatility, we work on a performance basis for qualified partners. If we don't hit our agreed-upon KPIs, we work for free until we do."
  },
  {
    question: "What is your minimum engagement?",
    answer: "We typically require a 3-month initial commitment. Real growth takes time to optimize. However, we do not lock you into long-term yearly contracts. We believe our results should keep you staying, not a piece of paper."
  },
  {
    question: "How much budget do I need?",
    answer: "To see significant results with our systems, we recommend a minimum ad spend of $3,000/month, excluding our agency fee. This ensures we have enough data to optimize algorithms effectively."
  },
  {
    question: "Do you handle the creative work?",
    answer: "Yes. We are a full-stack agency. We handle copywriting, graphic design, and video editing for ads. We may ask for raw assets (photos/videos) from you, but we polish them into high-converting ads."
  },
  {
    question: "How fast can we launch?",
    answer: "Once onboarding is complete (typically 48 hours), our team needs about 7-10 days to build the strategy, set up tracking, and produce creatives. We aim to have ads live within 14 days of signing."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Header */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 tracking-tight">
              <ScrollFloat as="span" containerClassName="block">Common</ScrollFloat>
              <Highlighter action="highlight" color="rgba(224, 133, 118, 0.2)">
                 <ScrollFloat as="span" containerClassName="inline-block">Queries</ScrollFloat>
              </Highlighter>
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Transparency is key to our partnership. Here are the answers to the questions you're likely thinking about.
            </p>
            <a href="#contact" className="text-sm font-bold uppercase tracking-widest text-coral border-b border-coral/30 pb-1 hover:border-coral transition-colors inline-block">
                Have another question?
            </a>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-all duration-300 ${openIndex === idx ? 'bg-ivory border-black/10' : 'bg-transparent border-black/5 hover:border-black/10'}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                  >
                    <span className={`font-display text-xl md:text-2xl font-medium transition-colors ${openIndex === idx ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-full transition-colors ${openIndex === idx ? 'bg-coral text-white' : 'bg-black/5 text-text-primary'}`}>
                      {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 text-text-secondary leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
