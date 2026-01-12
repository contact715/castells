"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Check, AlertTriangle, ShieldCheck, MapPin, User, Mail, Phone, Home } from "lucide-react";
// import confetti from "canvas-confetti"; // Optional: Add later for wow effect

interface LeadFormInput {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
}

export function SmartLeadForm() {
    const [step, setStep] = useState<"form" | "otp" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);
    const [leadId, setLeadId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LeadFormInput>();
    const [otp, setOtp] = useState("");

    const onSubmit = async (data: LeadFormInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/api/v1/leads/ingest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, organization_id: 1, phone: data.phone }), // Ensure proper formatting in prod
            });

            if (!response.ok) {
                throw new Error("Failed to submit lead");
            }

            const result = await response.json();
            setLeadId(result.id);
            setStep("otp");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onVerifyOtp = async () => {
        if (!leadId) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/api/v1/leads/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lead_id: leadId, otp_code: otp }),
            });

            if (!response.ok) {
                throw new Error("Invalid OTP");
            }

            setStep("success");
            // confetti(); // Trigger wow effect
        } catch (err: any) {
            setError(err.message || "Validation failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral/5 blur-[80px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
                {step === "form" && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-display font-bold text-white mb-2">Get Started</h2>
                            <p className="text-white/50 text-sm">Validating availability in your area...</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                                        <Input {...register("first_name", { required: true })} placeholder="First Name" className="pl-10 bg-white/5 border-white/10" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Input {...register("last_name", { required: true })} placeholder="Last Name" className="bg-white/5 border-white/10" />
                                </div>
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                                <Input {...register("email", { required: true })} placeholder="Email Address" type="email" className="pl-10 bg-white/5 border-white/10" />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                                <Input {...register("phone", { required: true })} placeholder="Phone Number" type="tel" className="pl-10 bg-white/5 border-white/10" />
                            </div>

                            <div className="relative">
                                <Home className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                                <Input {...register("address", { required: true })} placeholder="Street Address" className="pl-10 bg-white/5 border-white/10" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input {...register("city", { required: true })} placeholder="City" className="bg-white/5 border-white/10" />
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                                    <Input {...register("zip_code", { required: true })} placeholder="ZIP Code" className="pl-10 bg-white/5 border-white/10" />
                                </div>
                            </div>

                            {/* Hidden state field for now */}
                            <input type="hidden" {...register("state")} value="CA" />

                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full h-12 bg-coral hover:bg-orange-600 text-white font-bold rounded-xl" disabled={isLoading}>
                                {isLoading ? <Spinner className="w-5 h-5" /> : "Check Availability"}
                            </Button>
                        </form>
                    </motion.div>
                )}

                {step === "otp" && (
                    <motion.div
                        key="otp"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="text-center space-y-6 py-8"
                    >
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-400 mb-4">
                            <ShieldCheck className="w-8 h-8" />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Verify Phone Number</h3>
                            <p className="text-white/50 text-sm">We sent a code to your phone. <br /> (Test Code: 123456)</p>
                        </div>

                        <div className="max-w-[200px] mx-auto">
                            <Input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000 000"
                                className="text-center text-2xl tracking-widest bg-white/5 border-white/10 h-14"
                                maxLength={6}
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm">{error}</div>
                        )}

                        <Button onClick={onVerifyOtp} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl" disabled={isLoading}>
                            {isLoading ? <Spinner className="w-5 h-5 text-white" /> : "Verify Code"}
                        </Button>
                    </motion.div>
                )}

                {step === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6 py-12"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                            <Check className="w-10 h-10" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">You're All Set!</h3>
                            <p className="text-white/50">An agent is reviewing your request and will call you within 28 seconds.</p>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-8">
                            <div className="text-xs uppercase tracking-widest text-white/30 mb-1">Estimated Wait Time</div>
                            <div className="text-xl font-mono text-green-400">00:28</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
