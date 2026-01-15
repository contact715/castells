"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radar, ExternalLink, MessageCircle, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Opportunity {
  id: string;
  platform: string;
  post_content: string;
  author: string;
  detected_at: string;
  suggested_response: string;
  sentiment: string;
}

export default function NeighborhoodWatchPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/agent/spy/opportunities?zip_code=90210", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex justify-end p-4 lg:p-8 bg-surface dark:bg-dark-surface rounded-[2rem] shadow-sm">
        <div className="bg-red-500/10 text-red-500 dark:text-red-400 px-4 py-2 rounded-[2rem] flex items-center gap-2 text-sm border border-red-500/20 shadow-lg shadow-red-500/10">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          Watch Mode Active
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-20 text-text-secondary">Scanning local networks...</div>
        ) : (
          opportunities.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-[2rem] hover:ed-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <div>
                    <h4 className="text-white font-medium">{opp.author}</h4>
                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                      <span className="text-bblue-400">{opp.platform}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" /> {new Date(opp.detected_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs ed-500/20 uppercase font-bold tracking-wider">
                  {opp.sentiment}
                </span>
              </div>

              <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[2rem] mb-4 text-text-primary text-sm italic -2 ">
                &quot;{opp.post_content}&quot;
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-text-secondary uppercase font-medium">
                  <MessageCircle className="w-3 h-3" />
                  AI Suggested Reply
                </div>
                <textarea
                  className="w-full bg-bblack/20 rounded-[2rem] p-3 text-sm text-white focus:ring-1 focus:ring-bblue-500 outline-none"
                  readOnly
                  value={opp.suggested_response}
                />
                <div className="flex gap-3">
                  <Button className="bg-bblue-600 hover:bg-bblue-500 text-white flex-1">
                    <Check className="w-4 h-4" />
                    Approve & Post Reply
                  </Button>
                  <Button variant="outline" className="text-text-secondary hover:bg-black/5 dark:bg-dark-surface/50">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
