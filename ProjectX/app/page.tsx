"use client";

import React from "react";
import FloatingSky from "@/components/layout/FloatingSky";
import { MoscoNavbar } from "@/components/mosco/MoscoNavbar";
import { MoscoHero } from "@/components/mosco/MoscoHero";
import { MoscoSPINSections } from "@/components/mosco/MoscoSPINSections";
import { MoscoSolution } from "@/components/mosco/MoscoSolution";
import { MoscoSocialProof } from "@/components/mosco/MoscoSocialProof";
import { MoscoPricing } from "@/components/mosco/MoscoPricing";
import { MoscoFooter } from "@/components/mosco/MoscoFooter";

export default function LandingPage() {
  return (
    <div className="dash-light relative min-h-screen bg-[#1A1A1A] p-4 lg:p-5 overflow-hidden font-sans">
      <div className="fixed inset-0 -z-10 bg-[#1A1A1A]" />
      <FloatingSky />

      {/* Dashboard Wrapper Replacement */}
      <main className="relative h-[calc(100vh-2.5rem)] rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.2)] animate-gradient border border-white/10 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1F2326 0%, #1A2427 25%, #1C2528 50%, #1E2529 75%, #1F2326 100%)'
      }}>
        <div className="h-full overflow-y-auto no-scrollbar">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 pb-32">
            <MoscoNavbar />
            <MoscoHero />
            <MoscoSPINSections />
            <MoscoSolution />
            <MoscoPricing />
            <MoscoSocialProof />
            <MoscoFooter />
          </div>
        </div>
      </main>
    </div>
  );
}
