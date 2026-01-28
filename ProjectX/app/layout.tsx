import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Outfit, Instrument_Sans } from "next/font/google";
import "./globals.css";

// Primary font: Plus Jakarta Sans (similar to Lufga - geometric modern)
const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin", "latin-ext"],
    variable: "--font-plus-jakarta",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin", "latin-ext"],
    variable: "--font-outfit",
    display: "swap",
});

const instrumentSans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-instrument",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Mosco.ai - Home Services SaaS Platform",
    description: "AI-powered platform for home services management",
};

import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html 
            lang="en" 
            className={`${plusJakarta.variable} ${inter.variable} ${outfit.variable} ${instrumentSans.variable}`}
        >
            <body className="antialiased">
                <AuthProvider>
                    <ThemeProvider>
                        <div className="relative z-10 min-h-screen w-full">
                            {children}
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
