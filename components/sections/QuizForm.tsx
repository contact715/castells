import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type QuizData = {
    goal: string;
    budget: string;
    industry: string;
    name: string;
    email: string;
    website: string;
};

const STEPS = [
    {
        id: 'goal',
        question: "What is your primary growth goal?",
        options: [
            "Scale Revenue Rapidly",
            "Improve ROAS / ROI",
            "Brand Awareness",
            "Lead Generation"
        ]
    },
    {
        id: 'budget',
        question: "What is your monthly ad spend?",
        options: [
            "Under $10k",
            "$10k - $25k",
            "$25k - $50k",
            "$50k+"
        ]
    },
    {
        id: 'industry',
        question: "Which industry best describes you?",
        options: [
            "E-commerce / DTC",
            "SaaS / B2B Tech",
            "Professional Services",
            "Local Business"
        ]
    },
    {
        id: 'details',
        question: "Where should we send your roadmap?",
        isForm: true
    }
];

const QuizForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState<QuizData>({
        goal: '',
        budget: '',
        industry: '',
        name: '',
        email: '',
        website: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleOptionSelect = (value: string) => {
        const stepId = STEPS[currentStep].id as keyof QuizData;
        setFormData(prev => ({ ...prev, [stepId]: value }));

        // Auto-advance
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setTimeout(() => setCurrentStep(prev => prev + 1), 250);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center h-full min-h-[500px]"
            >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white  -white/20">
                    <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display font-semibold mb-4 text-white">Application Received</h3>
                <p className="text-white/60 max-w-xs leading-relaxed">
                    We've received your audit request. Our strategists are analyzing your market data and will contact you shortly.
                </p>
                <button
                    onClick={() => {
                        setStatus('idle');
                        setCurrentStep(0);
                        setFormData({ goal: '', budget: '', industry: '', name: '', email: '', website: '' });
                    }}
                    className="mt-12 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors -b -white/20 pb-1"
                >
                    Start New Application
                </button>
            </motion.div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/5 mb-8 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-coral"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            <div className="flex-1 flex flex-col relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full"
                    >
                        <div className="mb-8">
                            <span className="text-coral text-xs font-bold uppercase tracking-widest mb-2 block">
                                Step {currentStep + 1} of {STEPS.length}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-semibold text-white leading-tight">
                                {STEPS[currentStep].question}
                            </h3>
                        </div>

                        {!STEPS[currentStep].isForm ? (
                            <div className="grid grid-cols-1 gap-3">
                                {STEPS[currentStep].options?.map((option) => {
                                    const isSelected = formData[STEPS[currentStep].id as keyof QuizData] === option;
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionSelect(option)}
                                            className={cn(
                                                "w-full text-left p-5 rounded-[2rem]  transition-all duration-200 group flex items-center justify-between",
                                                isSelected
                                                    ? "bg-white text-black -white"
                                                    : "bg-white/5 text-white/80 -white/10 hover:bg-white/10 hover:-white/30"
                                            )}
                                        >
                                            <span className="font-medium">{option}</span>
                                            {isSelected && <Check className="w-5 h-5 text-coral" />}
                                            {!isSelected && <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" />}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <Input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        type="text"
                                        variant="minimal"
                                        size="lg"
                                        label="Full Name"
                                        placeholder="John Doe"
                                    />
                                    <Input
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        variant="minimal"
                                        size="lg"
                                        label="Work Email"
                                        placeholder="john@company.com"
                                    />
                                    <Input
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        type="url"
                                        variant="minimal"
                                        size="lg"
                                        label="Company Website"
                                        placeholder="https://company.com"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        variant="secondary"
                                        className="w-full"
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? (
                                            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                        ) : (
                                            <span className="flex items-center justify-center gap-3">
                                                Get Your Roadmap <ArrowRight className="w-4 h-4" />
                                            </span>
                                        )}
                                    </Button>
                                </div>

                                <p className="text-center text-[10px] text-white/30">
                                    Protected by reCAPTCHA. Privacy Policy applies.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls (Only for non-form steps) */}
            {!STEPS[currentStep].isForm && currentStep > 0 && (
                <div className="mt-8 flex justify-start">
                    <button
                        onClick={prevStep}
                        className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                        ← Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizForm;
