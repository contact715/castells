"use client";

import { ChevronLeft, X } from "lucide-react";

interface FormHeaderProps {
    onBack?: () => void;
    onClose?: () => void;
    showBack?: boolean;
}

export function FormHeader({ onBack, onClose, showBack = true }: FormHeaderProps) {
    return (
        <div className="relative flex items-center justify-between p-6 h-[88px]">
            {/* Back Button */}
            <div className="w-10 flex items-center justify-start">
                {showBack && (
                    <button
                        onClick={onBack}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Go back"
                    >
                        <ChevronLeft className="w-7 h-7 text-white stroke-[2.5]" />
                    </button>
                )}
            </div>


            {/* Close Button */}
            <div className="w-10 flex items-center justify-end">
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close form"
                >
                    <X className="w-7 h-7 text-white stroke-[2.5]" />
                </button>
            </div>
        </div>
    );
}
