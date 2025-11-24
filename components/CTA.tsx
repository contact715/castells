
import React, { useState } from 'react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { RippleButton } from './RippleButton';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollFloat from './ScrollFloat';

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
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 bg-black/5 rounded text-[10px] font-bold uppercase tracking-widest text-text-secondary">
               <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse"></span>
               Limited Availability: Q2 2025
            </div>
            
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-8 leading-none tracking-tight">
              <ScrollFloat as="span" containerClassName="block">Ready to</ScrollFloat>
              <span className="italic font-light text-coral">
                  <ScrollFloat as="span" containerClassName="inline-block">Scale?</ScrollFloat>
              </span>
            </h2>
            
            <p className="text-text-secondary text-xl leading-relaxed mb-12 font-light">
              Stop guessing. Get a free, data-driven marketing audit and a custom growth roadmap tailored to your market.
            </p>
            
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
            <div className="bg-[#121212] text-white p-10 md:p-12 rounded-none md:rounded-lg shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-24 text-center h-full min-h-[500px]"
                        >
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white border border-white/20">
                                <Check className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-display font-medium mb-4">Application Received</h3>
                            <p className="text-white/60 max-w-xs leading-relaxed">
                                We've received your audit request. Our strategists are analyzing your market data and will contact you shortly.
                            </p>
                            <button 
                                onClick={() => setFormState('idle')}
                                className="mt-12 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors border-b border-white/20 pb-1"
                            >
                                Submit another request
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form 
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8" 
                            onSubmit={handleSubmit}
                        >
                            <div className="pb-8 border-b border-white/10">
                                <h3 className="font-display text-2xl text-white">Request Access</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">First Name</label>
                                    <input required type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-all text-base font-light rounded-none" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Last Name</label>
                                    <input required type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-all text-base font-light rounded-none" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Work Email</label>
                                <input required type="email" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-all text-base font-light rounded-none" placeholder="john@company.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Company Website</label>
                                <input required type="url" className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-all text-base font-light rounded-none" placeholder="https://company.com" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Industry</label>
                                    <div className="relative">
                                        <select required className="w-full bg-transparent border-b border-white/20 py-2 text-white appearance-none focus:outline-none focus:border-white transition-all text-base font-light cursor-pointer rounded-none">
                                            <option value="" disabled selected className="bg-[#121212]">Select...</option>
                                            <option value="hvac" className="bg-[#121212]">HVAC</option>
                                            <option value="roofing" className="bg-[#121212]">Roofing</option>
                                            <option value="solar" className="bg-[#121212]">Solar</option>
                                            <option value="construction" className="bg-[#121212]">Construction</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                     <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Monthly Budget</label>
                                     <div className="relative">
                                        <select required className="w-full bg-transparent border-b border-white/20 py-2 text-white appearance-none focus:outline-none focus:border-white transition-all text-base font-light cursor-pointer rounded-none">
                                            <option value="" disabled selected className="bg-[#121212]">Select...</option>
                                            <option value="5k" className="bg-[#121212]">$5k - $10k</option>
                                            <option value="10k" className="bg-[#121212]">$10k - $25k</option>
                                            <option value="25k" className="bg-[#121212]">$25k+</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <RippleButton 
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className="w-full bg-white text-black py-3.5 rounded-md font-bold text-sm tracking-widest uppercase shadow-none hover:bg-coral hover:text-white border-none transition-all duration-300"
                                    rippleColor={formState === 'submitting' ? 'transparent' : '#000'}
                                >
                                    {formState === 'submitting' ? (
                                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        <span className="flex items-center justify-center gap-3">
                                            Submit Application <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </RippleButton>
                            </div>
                            
                            <p className="text-center text-[10px] text-white/30 pt-4">
                                Protected by reCAPTCHA. Privacy Policy applies.
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
