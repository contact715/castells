"use client";

import { motion } from "framer-motion";
import { MapPin, Image as ImageIcon, TrendingUp, RefreshCw, UploadCloud, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeaderActions } from "@/components/layout/HeaderActions";

export default function LocalSEOPage() {
  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        <Button className="bg-bblue-600 hover:bg-bblue-500 text-white shadow-lg shadow-bblue-600/20 rounded-[2rem]">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync GMB Data
        </Button>
      </HeaderActions>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="default" className="lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-4">Rank Tracking (Map Pack)</h3>
          <div className="h-64 flex items-center justify-center bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] ">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-bblue-500/50 mx-auto mb-2" />
              <p className="text-text-secondary">Dominates &quot;Near Me&quot; searches by syncing with 50+ directories.</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col h-full gap-8">
          <Card variant="glass" className="p-6">
            <div className="text-sm text-text-secondary mb-1">Total Profile Views</div>
            <div className="text-4xl font-bold text-white">4,291</div>
            <div className="text-xs text-green-400 mt-2">+12% vs last month</div>
          </Card>
          <Card variant="glass" className="p-6">
            <div className="text-sm text-text-secondary mb-1">Calls from GMB</div>
            <div className="text-4xl font-bold text-white">128</div>
            <div className="text-xs text-green-400 mt-2">+8% vs last month</div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white flex gap-2 items-center"><ImageIcon className="w-5 h-5 text-purple-400" /> Geo-Tagged Photo Injection</h3>
            <Button size="sm" variant="outline">Upload New</Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] ">
                <img src="https://placehold.co/600x400/101010/FFF?text=SEO+Map+Grid" alt="SEO Map Grid" className="rounded-[2rem] shadow-2xl " />
                <div className="w-16 h-12 bg-bblack/40 rounded flex items-center justify-center text-xs text-text-tertiary">IMG_{i}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Project_Site_{i}.jpg</div>
                  <div className="text-xs text-green-400">EXIF Injected: 34.0522° N, 118.2437° W</div>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            ))}
          </div>
        </Card>

        <Card variant="default" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-bblue-500/5 z-0" />
          <div className="relative z-10 text-center py-12">
            <UploadCloud className="w-16 h-16 text-bblue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Automated Posting</h3>
            <p className="text-text-secondary max-w-sm mx-auto mb-6">
              AI will automatically post &quot;Project Spotlights&quot; to your GMB profile 3x a week to boost local relevance.
            </p>
            <Button className="bg-white text-black hover:bg-gray-200">Configure Schedule</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


