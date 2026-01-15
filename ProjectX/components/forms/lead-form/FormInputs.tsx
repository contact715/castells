"use client";

import { ChevronDown, Info } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    helperText?: string;
    showInfo?: boolean;
    as?: "input" | "textarea";
}

export function FloatingInput({ label, helperText, showInfo, className, as = "input", ...props }: FloatingInputProps) {
    const Component = as;
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <label className="text-[12px] font-bold text-white/40 uppercase tracking-wide">{label}</label>
                {showInfo && <Info className="w-3.5 h-3.5 text-white/30" />}
            </div>
            <div className="relative border-b border-white/10">
                <Component
                    {...(props as any)}
                    className={twMerge(
                        "w-full bg-transparent py-2 text-[20px] text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/5 font-medium",
                        as === "textarea" && "min-h-[100px] resize-none",
                        className
                    )}
                />
            </div>
            {helperText && <p className="text-[13px] text-white/40 leading-relaxed pt-1">{helperText}</p>}
        </div>
    );
}

export function PhoneInput({ label, helperText, ...props }: FloatingInputProps) {
    return (
        <div className="space-y-4">
            <label className="text-[12px] font-bold text-white/40 uppercase tracking-wide">{label}</label>
            <div className="flex items-center gap-4 border-b border-white/10 py-2 focus-within:border-white transition-colors">
                <button className="flex items-center gap-1 text-[20px] text-white font-medium">
                    US <ChevronDown className="w-4 h-4 text-white/30" />
                </button>
                <span className="text-[20px] text-white font-medium">+1</span>
                <input
                    {...(props as any)}
                    type="tel"
                    className="bg-transparent text-[20px] text-white focus:outline-none flex-1 placeholder:text-white/5 font-medium"
                />
            </div>
            {helperText && <p className="text-[13px] text-white/40 leading-relaxed pt-1">{helperText}</p>}
        </div>
    );
}

export function ZipInput({ label, ...props }: FloatingInputProps) {
    return (
        <div className="space-y-4">
            <label className="text-[12px] font-bold text-white/40 uppercase tracking-wide">{label}</label>
            <div className="flex items-center gap-4 border-b border-white/10 py-2 focus-within:border-white transition-colors">
                <button className="flex items-center gap-1 text-[20px] text-white font-medium">
                    US <ChevronDown className="w-4 h-4 text-white/30" />
                </button>
                <input
                    {...(props as any)}
                    type="text"
                    className="bg-transparent text-[20px] text-white focus:outline-none flex-1 placeholder:text-white/5 font-medium"
                />
            </div>
        </div>
    );
}

export function DropdownInput({ label, options = [], ...props }: FloatingInputProps & { options: string[] }) {
    return (
        <div className="space-y-4">
            <label className="text-[12px] font-bold text-white/40 uppercase tracking-wide">{label}</label>
            <div className="relative border-b border-white/10">
                <select
                    {...(props as any)}
                    className="w-full bg-transparent py-2 text-[20px] text-white focus:outline-none appearance-none transition-colors cursor-pointer font-medium"
                >
                    <option value="" disabled className="bg-[#121212]">Select an option</option>
                    {options.map((opt, i) => (
                        <option key={i} value={opt} className="bg-[#121212]">{opt}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
            </div>
        </div>
    );
}

export function AddressAutocompleteInput({ label, ...props }: FloatingInputProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-[12px] font-bold text-white/40 uppercase tracking-wide">{label}</label>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Enhanced</span>
            </div>
            <div className="relative border-b border-white/10 group focus-within:border-white transition-colors">
                <input
                    {...(props as any)}
                    className="w-full bg-transparent py-2 text-[20px] text-white focus:outline-none placeholder:text-white/10 font-medium pr-10"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-white/5 rounded-md group-focus-within:bg-blue-500/20 transition-colors">
                    <Info className="w-4 h-4 text-white/30" />
                </div>
            </div>
        </div>
    );
}

export function QualificationInput({ label, options = [], value, onChange }: any) {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <label className="text-[12px] font-bold text-white/40 uppercase tracking-wide">{label}</label>
                <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Qualification</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {options.map((option: string) => (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={twMerge(
                            "w-full p-4 rounded-[16px] border text-left transition-all duration-200 flex items-center justify-between group",
                            value === option
                                ? "bg-white/10 border-white/20"
                                : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
                        )}
                    >
                        <span className={twMerge(
                            "text-[17px] font-medium transition-colors",
                            value === option ? "text-white" : "text-white/60"
                        )}>
                            {option}
                        </span>
                        <div className={twMerge(
                            "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                            value === option
                                ? "bg-blue-500 border-blue-500"
                                : "border-white/10 group-hover:border-white/20"
                        )}>
                            {value === option && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
