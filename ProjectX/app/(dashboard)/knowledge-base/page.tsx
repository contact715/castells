"use client";

import {
  AlertCircle,
  Phone,
  Mail,
  HelpCircle,
  ExternalLink,
  Settings as SettingsIcon,
  MessageSquare,
  Sliders,
  X,
  Plus as PlusIcon,
  Save,

  Database, // Re-added from original
  FileText, // Re-added from original
  Search, // Re-added from original
  Trash2, // Re-added from original
  Upload // Re-added from original, as it's used in HeaderActions
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select as SelectComponent } from "@/components/ui/Select"; // Added Select component import
import { HeaderActions } from "@/components/layout/HeaderActions";

export default function KnowledgeBasePage() {
  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 rounded-[2rem]">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </HeaderActions>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card variant="glass" className="lg:col-span-1 h-fit">
          <h3 className="font-bold text-white mb-4">Storage Usage</h3>
          <div className="relative w-40 h-40 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-white/10" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle className="text-cyan-500" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
            </svg>
            <div className="absolute text-center">
              <span className="block text-2xl font-bold text-white">24%</span>
              <span className="text-xs text-text-secondary">Used</span>
            </div>
          </div>
          <div className="text-center text-sm text-text-secondary">15 / 100 MB Used</div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-text-secondary"><span>PDFs</span> <span>12 MB</span></div>
            <div className="flex justify-between text-xs text-text-secondary"><span>Text</span> <span>3 MB</span></div>
          </div>
        </Card>

        <Card variant="default" className="lg:col-span-3">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            {[
              { name: "Pricing_Sheet_2025.pdf", size: "2.4 MB", date: "Oct 12, 2025", status: "Indexed" },
              { name: "HVAC_Service_Manual.pdf", size: "8.1 MB", date: "Sep 20, 2025", status: "Indexed" },
              { name: "Support_Script_v2.txt", size: "15 KB", date: "Aug 05, 2025", status: "Indexed" },
              { name: "Company_Policy.docx", size: "1.2 MB", date: "Jul 11, 2025", status: "Processing" },
            ].map((doc, i) => (
              <div key={i} className="flex items-center p-4 bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] hover: group transition-all">
                <div className="w-10 h-10 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 mr-4">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{doc.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-text-tertiary mt-1">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${doc.status === 'Indexed'
                    ? 'bg-green-500/10 text-green-500 '
                    : 'bg-yellow-500/10 text-yellow-500 animate-pulse'
                    }`}>
                    {doc.status}
                  </span>
                  <button className="p-2 hover:bg-red-500/10 text-text-secondary hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
