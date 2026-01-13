import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { MapPin, XCircle, CheckCircle2 } from "lucide-react";

interface ZipRestrictionFieldProps {
    value: string;
    onChange: (value: string) => void;
    allowedPrefixes?: string[]; // Example: ["100", "200", "902"]
    onValidationChange?: (isValid: boolean) => void;
    className?: string;
}

export function ZipRestrictionField({
    value,
    onChange,
    allowedPrefixes = ["100", "200", "300"], // Default demo prefixes
    onValidationChange,
    className
}: ZipRestrictionFieldProps) {
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (!value) {
            setError(null);
            setIsValid(false);
            onValidationChange?.(false);
            return;
        }

        if (!/^\d{5}$/.test(value)) {
            setError("Please enter a valid 5-digit ZIP code");
            setIsValid(false);
            onValidationChange?.(false);
            return;
        }

        const isMatch = allowedPrefixes.some(prefix => value.startsWith(prefix));

        if (!isMatch) {
            setError("Sorry, we don't serve this area yet.");
            setIsValid(false);
            onValidationChange?.(false);
        } else {
            setError(null);
            setIsValid(true);
            onValidationChange?.(true);
        }
    }, [value, allowedPrefixes, onValidationChange]);

    return (
        <div className={cn("space-y-2", className)}>
            <div className="relative">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="Enter ZIP code"
                    className={cn(
                        "pl-11",
                        error && "focus:ring-red-500/20",
                        isValid && "focus:ring-green-500/20"
                    )}
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />

                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isValid && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {error && value.length === 5 && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
            </div>

            {error && value.length > 0 && (
                <p className="text-xs text-red-400 pl-4 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {error}
                </p>
            )}

            {!error && isValid && (
                <p className="text-xs text-green-400 pl-4 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Great! We serve your area.
                </p>
            )}
        </div>
    );
}
