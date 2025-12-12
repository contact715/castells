import React, { useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck, Clock } from 'lucide-react';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';

const GrowthAudit: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        goal: '',
        website: '',
        revenue: '',
        name: '',
        email: ''
    });

    const goals = [
        "Scale Revenue Rapidly",
        "Improve ROAS / ROI",
        "Brand Awareness",
        "Lead Generation"
    ];

    const revenueRanges = [
        "<$50k / month",
        "$50k - $100k / month",
        "$100k - $500k / month",
        "$500k+ / month"
    ];

    const handleNext = () => {
        setStep(prev => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <section id="audit" className="py-32 bg-ivory border-t border-black/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Copy */}
                    <div className="flex flex-col items-start text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                Limited Availability: Q2 2025
                            </span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-6 leading-tight tracking-tight">
                            Ready to<br />
                            <span className="text-text-secondary">Scale?</span>
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-text-secondary">
                                <div className="w-8 h-8 rounded-xl bg-coral/10 flex items-center justify-center text-coral">
                                    <span className="font-bold text-xs">01</span>
                                </div>
                                No credit card required
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-text-secondary">
                                <div className="w-8 h-8 rounded-xl bg-coral/10 flex items-center justify-center text-coral">
                                    <span className="font-bold text-xs">02</span>
                                </div>
                                Response in 24 hours
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-md mx-auto lg:ml-auto"
                    >
                        <div className="bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 relative overflow-hidden min-h-[500px] flex flex-col shadow-lg">
                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-black/5">
                                <motion.div
                                    className="h-full bg-coral"
                                    initial={{ width: "25%" }}
                                    animate={{ width: `${step * 25}%` }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            </div>

                            {step < 4 && (
                                <div className="mb-8">
                                    <span className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2 block">Step {step} of 3</span>
                                    <h3 className="font-display text-2xl font-medium text-text-primary">
                                        {step === 1 && "What is your primary growth goal?"}
                                        {step === 2 && "Tell us about your business."}
                                        {step === 3 && "Where should we send your audit?"}
                                    </h3>
                                </div>
                            )}

                            <div className="flex-grow">
                                {step === 1 && (
                                    <div className="flex flex-col gap-3">
                                        {goals.map((goal) => (
                                            <button
                                                key={goal}
                                                onClick={() => updateField('goal', goal)}
                                                className={cn(
                                                    "w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group",
                                                    formData.goal === goal
                                                        ? "bg-black text-white border-black"
                                                        : "bg-white border-black/10 text-text-primary hover:bg-black/5 hover:border-black/30"
                                                )}
                                            >
                                                <span className="font-medium">{goal}</span>
                                                {formData.goal === goal && (
                                                    <Check className="w-5 h-5 text-white" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="flex flex-col gap-6">
                                        <Input
                                            type="text"
                                            label="Website URL"
                                            variant="dark"
                                            placeholder="example.com"
                                            value={formData.website}
                                            onChange={(e) => updateField('website', e.target.value)}
                                        />
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-widest text-text-secondary">Monthly Revenue</label>
                                            <div className="grid grid-cols-1 gap-2">
                                                {revenueRanges.map((range) => (
                                                    <button
                                                        key={range}
                                                        onClick={() => updateField('revenue', range)}
                                                        className={cn(
                                                            "w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between text-sm",
                                                            formData.revenue === range
                                                                ? "bg-black text-white border-black"
                                                                : "bg-white border-black/10 text-text-primary hover:bg-black/5 hover:border-black/30"
                                                        )}
                                                    >
                                                        {range}
                                                        {formData.revenue === range && <Check className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="flex flex-col gap-6">
                                        <Input
                                            type="text"
                                            label="Your Name"
                                            variant="dark"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                        />
                                        <Input
                                            type="email"
                                            label="Work Email"
                                            variant="dark"
                                            placeholder="john@company.com"
                                            value={formData.email}
                                            onChange={(e) => updateField('email', e.target.value)}
                                        />
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                        <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
                                            <ShieldCheck className="w-10 h-10" />
                                        </div>
                                        <h3 className="font-display text-3xl font-medium text-text-primary mb-4">Application Received</h3>
                                        <p className="text-text-secondary mb-8 max-w-xs">
                                            Thanks, {formData.name.split(' ')[0]}. We'll review your audit request and get back to you within 24 hours.
                                        </p>
                                        <div className="w-full bg-ivory rounded-xl p-4 border border-black/5">
                                            <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                                                <span>Estimated Review Time</span>
                                                <span>24 Hours</span>
                                            </div>
                                            <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-green-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {step < 4 && (
                                <div className="mt-8 flex gap-3">
                                    {step > 1 && (
                                        <button
                                            onClick={handleBack}
                                            className="px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-widest border border-black/10 text-text-primary hover:bg-black/5 transition-all"
                                        >
                                            Back
                                        </button>
                                    )}
                                    <button
                                        onClick={handleNext}
                                        disabled={
                                            (step === 1 && !formData.goal) ||
                                            (step === 2 && (!formData.website || !formData.revenue)) ||
                                            (step === 3 && (!formData.name || !formData.email))
                                        }
                                        className={cn(
                                            "flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2",
                                            ((step === 1 && formData.goal) ||
                                                (step === 2 && formData.website && formData.revenue) ||
                                                (step === 3 && formData.name && formData.email))
                                                ? "bg-black text-white hover:bg-black/90 shadow-lg hover:-translate-y-0.5"
                                                : "bg-black/10 text-text-secondary cursor-not-allowed"
                                        )}
                                    >
                                        {step === 3 ? "Submit Audit" : "Next Step"} <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default GrowthAudit;
