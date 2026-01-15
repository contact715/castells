"use client";

import { useState } from "react";
import { LeadForm } from "@/components/forms/lead-form/LeadForm";
import { Button } from "@/components/ui/Button";

export default function FormDemoPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
            <div className="max-w-md w-full text-center space-y-8">
                <h1 className="text-4xl font-bold text-white mb-4">Premium Form Demo</h1>
                <p className="text-white/60 mb-8">
                    Click the button below to see the mobile-native form experience.
                </p>

                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-[2rem] px-12 py-6 text-xl"
                >
                    Open Lead Form
                </Button>
            </div>

            {isOpen && (
                <LeadForm onClose={() => setIsOpen(false)} />
            )}
        </div>
    );
}
