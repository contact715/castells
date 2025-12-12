
import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import ScrollFloat from '../effects/ScrollFloat';
import QuizForm from './QuizForm';

const CTA: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setTimeout(() => {
            setFormState('success');
        }, 1500);
    };

    return (
        <section id="audit" className="py-32 bg-ivory text-black relative">
            <div className="container mx-auto px-6 relative z-10">

                {/* Main Layout Grid */}
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Left: Text Content */}
                    <div className="max-w-xl sticky top-24">
                        <Badge className="mb-3">Limited Availability: Q2 2025</Badge>

                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-8 leading-none tracking-tight">
                            Ready to<br />
                            <span className="text-text-secondary">Scale?</span>
                        </h2>

                        <div className="flex flex-col gap-6">
                            {/* Feature Points */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-coral group-hover:bg-coral group-hover:text-white transition-colors">
                                        <span className="text-xs font-bold">01</span>
                                    </div>
                                    <span className="text-sm font-bold text-text-primary tracking-wide">No credit card required</span>
                                </div>
                                <div className="w-px h-6 bg-black/5 ml-4"></div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-coral group-hover:bg-coral group-hover:text-white transition-colors">
                                        <span className="text-xs font-bold">02</span>
                                    </div>
                                    <span className="text-sm font-bold text-text-primary tracking-wide">Response in 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Form (Matte Black Aesthetic) */}
                    <div className="relative w-full">
                        <div className="bg-[#121212] text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col border border-white/5">
                            <QuizForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
