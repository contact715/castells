"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, AlertTriangle, CheckCircle, ArrowRight, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeaderActions } from "@/components/layout/HeaderActions";

export default function VisionPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const simulateAnalysis = async () => {
    setAnalyzing(true);
    setResult(null);

    try {
      // In a real app, this would be a file upload to S3, then passing the URL.
      // Here we simulate by calling the API with a mock URL
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/vision/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          lead_id: 1, // Hardcoded for demo
          image_url: "https://example.com/hvac-damage.jpg"
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Poll or wait - for the mock, we know the "Background Task" runs fast, 
        // but the API returns "processing". 
        // Let's cheat and wait 3 seconds then show a "fake" result derived from what the backend *would* produce
        // OR - we can rely on reading the 'vision_scans' table if we had an endpoint for it.
        // For the demo UI "wow" factor, I'll simulate the result appearing after delay.

        setTimeout(() => {
          setResult({
            equipment: "Trane XR14 (2015 Model)",
            issues: ["Rusted Condenser Coils", "Bent Fan Blade"],
            estimate: "$450 - $600",
            recommendation: "Immediate repair recommended to prevent compressor failure."
          });
          setAnalyzing(false);
        }, 3000);
      }
    } catch (e) {
      console.error(e);
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        {!analyzing && (
          <Button onClick={simulateAnalysis} className="rounded-[2rem]">
            <Upload className="w-4 h-4 mr-2" />
            Analyze Site Photo
          </Button>
        )}
      </HeaderActions>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
         rounded-[2rem] p-12 flex flex-col items-center justify-center text-center transition-all min-h-[400px]
        ${dragActive ? "blue-500 bg-bblue-500/10" : " bg-black/5 dark:bg-dark-surface/50 hover:"}
        ${analyzing ? "opacity-50 pointer-events-none" : ""}
      `}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            simulateAnalysis();
          }}
        >
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-bblue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg ${analyzing ? "animate-pulse" : ""}`}>
            {analyzing ? <ScanLine className="w-10 h-10 text-white animate-spin-slow" /> : <Camera className="w-10 h-10 text-white" />}
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {analyzing ? "Analyzing Image..." : "Drag & Drop Site Photos"}
          </h3>
          <p className="text-text-secondary mb-8">
            {analyzing ? "identifying make, model, and damage patterns" : "or click to browse from your device"}
          </p>

          {!analyzing && (
            <Button onClick={simulateAnalysis} className="bg-white text-black hover:bg-gray-200">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          )}
        </motion.div>

        {/* Results Panel */}
        <div className="space-y-4">
          {result && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="glass-panel p-6 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-500" />
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Analysis Complete
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-text-secondary uppercase font-medium">Detected Equipment</label>
                    <div className="text-xl text-white font-mono mt-1">{result.equipment}</div>
                  </div>

                  <div>
                    <label className="text-xs text-text-secondary uppercase font-medium">Damage Assessment</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.issues.map((issue: string, i: number) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm ed-500/20 flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3" />
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] mt-4">
                    <label className="text-xs text-text-secondary uppercase font-medium">AI Repair Estimate</label>
                    <div className="text-3xl font-bold text-green-400 mt-1">{result.estimate}</div>
                    <p className="text-sm text-text-secondary mt-2">{result.recommendation}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-bblue-600 hover:bg-bblue-500 text-white">
                Generate Client Proposal <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {!result && !analyzing && (
            <div className="h-full flex items-center justify-center text-text-tertiary  rounded-[2rem]">
              <p>Analysis results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
