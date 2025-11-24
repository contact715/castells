import React from 'react';
import { MANIFESTO_TEXT } from '../constants';

const Manifesto: React.FC = () => {
  const repeatedText = Array(6).fill(MANIFESTO_TEXT).join(" — ");

  return (
    <section id="manifesto" className="py-24 bg-text-primary overflow-hidden relative">
        
        {/* Marquee */}
        <div className="whitespace-nowrap overflow-hidden flex py-12 border-y border-white/10">
            <div className="animate-[slide_40s_linear_infinite] flex items-center">
                <span className="text-7xl md:text-9xl font-display font-light italic text-white/90 px-4 tracking-tight">
                    {repeatedText}
                </span>
            </div>
            <div className="animate-[slide_40s_linear_infinite] flex items-center">
                <span className="text-7xl md:text-9xl font-display font-light italic text-white/90 px-4 tracking-tight">
                    {repeatedText}
                </span>
            </div>
        </div>
        
        <div className="container mx-auto px-6 mt-20 text-center relative z-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display font-light text-white leading-tight mb-8">
                    "We blend classic serif elegance with contemporary minimalism."
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto">
                    Our design language prioritizes timeless elegance, clarity, and premium user experience with a warm coral accent that adds energy and distinction.
                </p>
            </div>
        </div>

        <style>{`
            @keyframes slide {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
    </section>
  );
};

export default Manifesto;