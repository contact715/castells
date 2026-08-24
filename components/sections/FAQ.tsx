import React from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Highlighter } from '../ui/Highlighter';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { SectionHeader } from '../ui/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import SchemaMarkup from '../ui/SchemaMarkup';

const FAQS = [
  {
    question: "Do you guarantee results?",
    answer: "We do not promise a number, because nobody can promise what a market will do. What we do instead: month to month, no contract, so if a month goes badly you stop and owe nothing further. The ad accounts stay in your name, so leaving costs you nothing but the notice."
  },
  {
    question: "What is your minimum engagement?",
    answer: "None. It is month to month, and that is the same answer on our prices page. We ask for nothing up front beyond the first month, and there is no notice period and no cancellation fee. Two or three months is usually what it takes to see whether a channel works, but that is our advice, not a term you sign."
  },
  {
    question: "How much budget do I need?",
    answer: "It depends on your city and your trade, and anyone who names a number before asking those two things is guessing. What we can say: the budget is paid by you straight to Google, Meta or Yelp, we never take a cut of it, and we will tell you before we start whether your budget is enough for the area you want to cover."
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
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory relative">
      <SchemaMarkup 
        type="FAQPage" 
        data={{
          mainEntity: FAQS.map(faq => ({
            question: faq.question,
            answer: faq.answer
          }))
        }}
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">

          {/* Left Column: Header & CTA */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="mb-8">
              <Badge className="mb-3">FAQ</Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight mb-4">
                Common<br />
                <span className="text-text-secondary">Queries</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Transparency is key to our partnership. Here are the answers to the questions you're likely thinking about.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="text-sm font-semibold tracking-wide text-text-primary">
                Have another question?
              </p>
              <Button
                href="#contact"
                size="md"
                className="inline-flex items-center gap-2 group"
              >
                Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Column: Q&A List */}
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`border-b border-black/10 dark:border-white/15 ${idx === 0 ? 'border-t' : ''}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full py-8 flex items-start justify-between gap-6 text-left group"
                    >
                      <h3 className={`font-display font-semibold text-2xl md:text-3xl transition-colors group-hover:text-accent-text ${isOpen ? 'text-accent-text' : 'text-text-primary'}`}>
                        {faq.question}
                      </h3>
                      <span className="shrink-0 mt-1">
                        {isOpen ? (
                          <Minus className="w-6 h-6 text-accent-text" />
                        ) : (
                          <Plus className="w-6 h-6 text-text-secondary group-hover:text-accent-text transition-colors" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl pb-8 font-light">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
