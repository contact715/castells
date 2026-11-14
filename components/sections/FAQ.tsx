import React from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Highlighter } from '../ui/Highlighter';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { SectionHeader } from '../ui/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import SchemaMarkup from '../ui/SchemaMarkup';

/*
  Вопросы переписаны 14 ноября 2026 под полное ежемесячное ведение. Прежние
  ответы отсылали к странице цен и к «двум тарифам». Цену теперь называют на
  созвоне, отдельные настройки не продаются, и FAQ должен говорить это теми
  же словами, что config/offer.mjs.
*/
const FAQS = [
  {
    question: "What exactly do you take over?",
    answer: "All of it: the website, your Google and Yelp profiles, ads on Google, Meta and Yelp, the CRM and follow-up, reviews, tracking and the weekly report. If something is missing, we build it. After that we run it every month. You keep doing the jobs and answering the customers we bring."
  },
  {
    question: "How much does it cost?",
    answer: "It is one monthly fee for all of the work. The number depends on your trade, your city and how much has to be built first, so we name it on the first call, before you pay anything. The ad budget is separate: you pay it straight to Google, Meta or Yelp, and we never take a cut of it."
  },
  {
    question: "Is there a setup fee or a contract?",
    answer: "Neither. The website, the ad accounts and the CRM are built as part of the monthly work, not billed as separate projects. It is month to month: no minimum term, no notice period, no cancellation fee."
  },
  {
    question: "Can I buy just a website or just an ad setup?",
    answer: "No. We used to sell them separately and stopped. A site with no traffic and a campaign nobody watches both look like marketing and bring nothing. We take a business on when we can run the whole path, from the search to the booked job."
  },
  {
    question: "Who owns the site and the ad accounts?",
    answer: "You do. The website, the domain, the ad accounts and the customer list are in your name from day one. If we stop working together, all of it stays with you."
  },
  {
    question: "Do you guarantee results?",
    answer: "We do not promise a number, because nobody can promise what a market will do. What we do instead: month to month, no contract, so if a month goes badly you stop and owe nothing further."
  },
  {
    question: "What do you need from me?",
    answer: "Photos and short videos from real jobs, a phone is enough. Someone who answers the requests we bring. And a few minutes a week to read the report and tell us what turned into paid work."
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 md:gap-24">

          {/* Left Column: Header & CTA */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="mb-8">
              <Badge className="mb-3">FAQ</Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight mb-4">
                Questions{' '}<br />
                <span className="text-text-secondary">owners ask</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                The ones that come up on almost every first call, answered before you have to ask.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="text-sm font-semibold tracking-wide text-text-primary">
                Have another question?
              </p>
              <Button
                href="/contact"
                size="md"
                className="inline-flex items-center gap-2 group"
              >
                Talk to us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Column: Q&A List */}
          <div className="">
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
