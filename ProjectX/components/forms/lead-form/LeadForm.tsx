"use client";

import { useState } from "react";
import { FormHeader } from "./FormHeader";
import { FormProgress } from "./FormProgress";
import { ContactInfoStep, ReviewInfoStep, VerificationStep, SuccessStep } from "./FormSteps";
import { motion, AnimatePresence } from "framer-motion";

interface LeadFormProps {
    onClose?: () => void;
}

export function LeadForm({ onClose }: LeadFormProps) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "Didi",
        phone: "(956) 315-3156",
        email: "Notmail@gmail.com",
        zip: "95638",
    });

    const totalSteps = 4;

    const handleUpdate = (newData: any) => {
        if (newData.step !== undefined) {
            setStep(newData.step);
        } else {
            setFormData(prev => ({ ...prev, ...newData }));
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

    const renderStep = () => {
        switch (step) {
            case 0:
                return <ContactInfoStep data={formData} onUpdate={handleUpdate} onNext={nextStep} />;
            case 1:
                return <ReviewInfoStep data={formData} onUpdate={handleUpdate} onNext={nextStep} onBack={prevStep} />;
            case 2:
                return <VerificationStep data={formData} onUpdate={handleUpdate} onNext={nextStep} onBack={prevStep} />;
            case 3:
                return <SuccessStep />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#121212] overflow-hidden flex flex-col font-sans">
            {/* Header */}
            <FormHeader
                showBack={step > 0 && step < 3}
                onBack={prevStep}
                onClose={onClose}
            />

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Progress */}
            {step < 3 && (
                <FormProgress totalSteps={totalSteps} currentStep={step} />
            )}
        </div>
    );
}
