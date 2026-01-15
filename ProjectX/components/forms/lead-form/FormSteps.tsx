"use client";

import { FloatingInput, PhoneInput, ZipInput, DropdownInput } from "./FormInputs";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, Info, ChevronRight, Check } from "lucide-react";

interface StepProps {
    data: any;
    onUpdate: (data: any) => void;
    onNext: () => void;
    onBack?: () => void;
}

export function WelcomeStep({ title, description, buttonText, buttonColor, onNext }: any) {
    return (
        <div className="text-center p-6 space-y-10 py-12">
            <h2 className="text-[34px] lg:text-[48px] font-bold text-white tracking-tight leading-tight">
                {title}
            </h2>
            <p className="text-[18px] text-white/60 max-w-md mx-auto leading-relaxed">
                {description}
            </p>
            <Button
                size="lg"
                style={{ backgroundColor: buttonColor || "#2563eb" }}
                className="px-12 py-6 text-xl rounded-[16px] h-[64px] shadow-lg transition-all hover:scale-105 mx-auto font-bold"
                onClick={onNext}
            >
                {buttonText}
            </Button>
        </div>
    );
}

export function ContactInfoStep({ data, onUpdate, onNext }: StepProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-10">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <h2 className="text-[32px] font-bold text-white tracking-tight">Contact information</h2>
                        <Info className="w-6 h-6 text-white/30" />
                    </div>
                    <p className="text-[16px] text-white/60 leading-relaxed">
                        Please fill out the form below to receive a free HVAC cost estimate and consultation from our licensed specialists.
                    </p>
                </div>

                <div className="space-y-8">
                    <FloatingInput
                        label="First name"
                        placeholder="Didi"
                        value={data.firstName || ""}
                        onChange={(e: any) => onUpdate({ firstName: e.target.value })}
                    />
                    <PhoneInput
                        label="Phone number"
                        placeholder="(956) 315-3156"
                        helperText="This is the phone number from your profile. You can provide a different one."
                        value={data.phone || ""}
                        onChange={(e: any) => onUpdate({ phone: e.target.value })}
                    />
                    <FloatingInput
                        label="Email"
                        placeholder="Notmail@gmail.com"
                        helperText="Romans Service Cooling & Heating may contact you to follow up."
                        value={data.email || ""}
                        onChange={(e: any) => onUpdate({ email: e.target.value })}
                    />
                    <ZipInput
                        label="ZIP code"
                        placeholder="95638"
                        value={data.zip || ""}
                        onChange={(e: any) => onUpdate({ zip: e.target.value })}
                    />
                </div>

                <div className="pt-4">
                    <p className="text-[13px] text-white/40 leading-relaxed">
                        In addition to submitting to Romans Service Cooling & Heating , Meta may send a 4-digit verification code to the phone number you&apos;ve provided. SMS fees may apply.
                    </p>
                </div>
            </div>

            <div className="pt-8 bg-[#121212]">
                <Button
                    onClick={onNext}
                    className="w-full bg-[#3578E5] hover:bg-[#2D6AD1] text-white rounded-[12px] h-[58px] text-[18px] font-bold tracking-wide transition-all active:scale-[0.98]"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export function ReviewInfoStep({ data, onUpdate, onNext }: StepProps) {
    return (
        <div className="absolute inset-0 z-[60] bg-black/60 flex flex-col justify-end">
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                className="bg-[#1C1C1E] rounded-t-[20px] p-6 space-y-8"
            >
                <div className="w-10 h-1 bg-white/10 rounded-full mx-auto" />

                <h3 className="text-[20px] font-bold text-white text-center pt-2">Review your info</h3>

                <div className="space-y-6 px-2">
                    <div className="space-y-1">
                        <label className="text-[13px] font-bold text-white/40 uppercase tracking-wider">Contact information</label>
                        <div className="space-y-1 pt-2">
                            <p className="text-[17px] text-white font-medium">{data.firstName}</p>
                            <p className="text-[17px] text-white font-medium">{data.phone}</p>
                            <p className="text-[17px] text-white font-medium">{data.email}</p>
                            <p className="text-[17px] text-white font-medium">{data.zip}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pb-8">
                    <Button
                        onClick={onNext}
                        className="w-full bg-[#007AFF] hover:bg-[#0066D6] text-white rounded-[12px] h-[54px] text-[17px] font-bold transition-all active:scale-[0.98]"
                    >
                        Continue
                    </Button>
                    <Button
                        onClick={() => onUpdate({ step: 0 })}
                        className="w-full bg-white/5 hover:bg-white/10 text-white rounded-[12px] h-[54px] text-[17px] font-bold transition-all active:scale-[0.98]"
                    >
                        Edit
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

export function SMSCodeStep({ phone, onNext }: { phone: string; onNext: () => void }) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8">
                <div className="space-y-3">
                    <h2 className="text-[32px] font-bold text-white tracking-tight">Enter verification code</h2>
                    <p className="text-[16px] text-white/60 leading-relaxed">
                        We&apos;ve sent a 4-digit code to <span className="text-white font-bold">{phone}</span>
                    </p>
                </div>

                <div className="flex justify-between gap-4 py-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex-1 h-[72px] bg-white/5 border border-white/10 rounded-[12px] flex items-center justify-center">
                            <span className="text-2xl font-bold text-white opacity-20">—</span>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="text-[15px] font-bold text-[#007AFF] hover:text-[#0066D6] transition-colors">
                        Resend code
                    </button>
                    <p className="text-[13px] text-white/30 mt-2">Available in 45s</p>
                </div>
            </div>

            <div className="pt-8">
                <Button
                    onClick={onNext}
                    className="w-full bg-[#3578E5] hover:bg-[#2D6AD1] text-white rounded-[12px] h-[58px] text-[18px] font-bold tracking-wide transition-all active:scale-[0.98]"
                >
                    Verify
                </Button>
            </div>
        </div>
    );
}

export function VerificationStep({ onNext }: StepProps) {
    return (
        <div className="flex flex-col h-full space-y-10">
            <div className="space-y-10 flex-1">
                <div className="space-y-3">
                    <h2 className="text-[22px] font-bold text-white tracking-tight">Privacy policy</h2>
                    <p className="text-[14px] text-white/60 leading-relaxed">
                        By clicking Submit, you agree to send your info to Romans Service Cooling & Heating  whose data use is subject to their privacy policy. Facebook will also use it subject to our Data Policy, including to auto-fill forms for ads.
                        <span className="text-blue-400"> View Meta&apos;s Privacy Policy. </span>
                        <span className="text-blue-400"> Visit Romans Service Cooling & Heating &apos;s Privacy Policy.</span>
                    </p>
                </div>

                <div className="flex items-center justify-between p-5 bg-[#1C1C1E] rounded-[16px] border border-white/5">
                    <div className="space-y-1">
                        <h4 className="text-[15px] font-bold text-white">Message Romans Service Cooling & Heating on WhatsApp</h4>
                        <p className="text-[13px] text-white/40 leading-relaxed">
                            We&apos;ll open WhatsApp so you can more easily and directly connect with this business.
                        </p>
                    </div>
                    <div className="w-6 h-6 rounded bg-[#007AFF] flex items-center justify-center shrink-0 ml-4">
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="w-full h-[54px] bg-[#1C1C1E] rounded-full border border-white/10 flex items-center px-4 gap-3">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-black stroke-[4]" />
                    </div>
                    <span className="text-[17px] text-white font-medium">Your mobile number is now verified.</span>
                </div>

                <div className="bg-[#121212] pb-6">
                    <Button
                        onClick={onNext}
                        className="w-full bg-[#007AFF] hover:bg-[#0066D6] text-white rounded-[12px] h-[58px] text-[18px] font-bold tracking-wide transition-all active:scale-[0.98]"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function SuccessStep() {
    return (
        <div className="flex flex-col h-full items-center text-center">
            <div className="flex-1 flex flex-col items-center pt-8">
                <div className="w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center p-0.5 shadow-2xl overflow-hidden mb-6">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" // Placeholder business logo
                            alt="Logo"
                            className="w-16 h-16 object-contain filter grayscale opacity-80"
                        />
                    </div>
                </div>

                <h3 className="text-[14px] font-medium text-white/60 mb-8">Romans Service Cooling & Heating</h3>

                <div className="space-y-6 px-4">
                    <h2 className="text-[28px] font-bold text-white leading-[1.15] tracking-tight">Thank you! Your request has been received.</h2>
                    <p className="text-[16px] text-white/60 leading-relaxed mt-4">
                        Our licensed HVAC specialist will review your request and contact you shortly to discuss your project and provide a free cost estimat... <span className="text-white/40">See more</span>
                    </p>
                </div>

                <div className="w-full max-w-[320px] h-px bg-white/5 my-8" />

                <div className="flex items-center gap-2 justify-center py-2 px-6">
                    <Info className="w-4 h-4 text-white/30" />
                    <span className="text-[14px] text-white/40 italic">You successfully submitted your responses.</span>
                </div>
            </div>

            <div className="w-full pb-8">
                <Button
                    className="w-full bg-[#00A884] hover:bg-[#008F6F] text-white rounded-[10px] h-[54px] text-[17px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5 invert" alt="WA" />
                    Chat on WhatsApp
                </Button>
            </div>
        </div>
    );
}
