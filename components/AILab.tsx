
import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateCreativeConcept } from '../services/geminiService';
import { GeneratedConcept, LoadingState } from '../types';
import { RippleButton } from './ui/RippleButton';
import { Highlighter } from './ui/Highlighter';
import ScrollFloat from './effects/ScrollFloat';

const AILab: React.FC = () => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
    const [concept, setConcept] = useState<GeneratedConcept | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setStatus(LoadingState.LOADING);
        setConcept(null);

        try {
            const result = await generateCreativeConcept(input);
            setConcept(result);
            setStatus(LoadingState.SUCCESS);
        } catch (error) {
            setStatus(LoadingState.ERROR);
        }
    };

    return (
        <section id="ailab" className="py-32 relative overflow-hidden bg-ivory">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coral/5 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-left mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest mb-6 text-text-secondary">
                            <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                            Gemini 2.5 Powered
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display text-text-primary mb-8 tracking-tight">
                            <Highlighter action="highlight" color="rgba(224, 133, 118, 0.2)">
                                <ScrollFloat as="span" containerClassName="inline-block">Concept Lab</ScrollFloat>
                            </Highlighter>
                        </h2>
                        <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10 mb-8" />
                        <p className="text-xl text-text-secondary font-light max-w-2xl">
                            Describe your business. We'll envision its brand future.
                        </p>
                    </div>

                    <form onSubmit={handleGenerate} className="relative mb-16 group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g., An architectural firm specializing in sustainable skyscrapers..."
                            className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl py-8 px-8 text-text-primary placeholder-gray-400 text-xl focus:outline-none focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all shadow-none hover:shadow-lg"
                        />
                        <div className="absolute right-3 top-3 bottom-3">
                            <RippleButton
                                type="submit"
                                disabled={status === LoadingState.LOADING || !input}
                                className="bg-black text-white dark:bg-white dark:text-black rounded-xl px-8 font-bold disabled:opacity-50 h-full border-none"
                                rippleColor="#E08576"
                            >
                                {status === LoadingState.LOADING ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <ArrowRight />
                                )}
                            </RippleButton>
                        </div>
                    </form>

                    {status === LoadingState.ERROR && (
                        <div className="text-center text-coral bg-red-50 p-4 rounded-lg border border-red-100">
                            System unavailable. Please try again later.
                        </div>
                    )}

                    {/* Result Card - Solid Opaque */}
                    {status === LoadingState.SUCCESS && concept && (
                        <div className="bg-white dark:bg-black border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-16 shadow-none hover:shadow-2xl transition-all duration-500 animate-float">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div>
                                    <h3 className="text-xs text-coral font-bold tracking-widest uppercase mb-3">Brand Concept</h3>
                                    <h4 className="text-4xl md:text-5xl font-display text-text-primary mb-8 leading-tight">{concept.title}</h4>

                                    <h3 className="text-xs text-coral font-bold tracking-widest uppercase mb-3">Tagline</h3>
                                    <p className="text-2xl text-text-primary italic font-display mb-8">"{concept.tagline}"</p>
                                </div>
                                <div className="space-y-10">
                                    <div className="bg-ivory dark:bg-white/5 p-6 rounded-xl border border-black/5 dark:border-white/5">
                                        <h3 className="text-xs text-coral font-bold tracking-widest uppercase mb-3">Strategic Vision</h3>
                                        <p className="text-text-secondary leading-relaxed text-lg">{concept.description}</p>
                                    </div>
                                    <div className="bg-ivory dark:bg-white/5 p-6 rounded-xl border border-black/5 dark:border-white/5">
                                        <h3 className="text-xs text-coral font-bold tracking-widest uppercase mb-3">Visual Direction</h3>
                                        <p className="text-text-secondary leading-relaxed text-lg">{concept.visualCues}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AILab;
