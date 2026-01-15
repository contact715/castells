"use client";

import { motion } from "framer-motion";
import { CheckCircle, Navigation, Camera, Phone, Clock, MapPin, Upload } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeaderActions } from "@/components/layout/HeaderActions";

export default function TechPortalPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <HeaderActions>
        <Button variant="outline" size="sm" className="rounded-[2rem]">
          <Camera className="w-4 h-4 mr-2" />
          Add Photos
        </Button>
        <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white rounded-[2rem]">
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark Complete
        </Button>
      </HeaderActions>

      {/* Current Job */}
      <Card className="bg-bblue-600 ">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">IN PROGRESS</span>
          <span className="text-white text-xs opacity-80">Started: 8:30 AM</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Smith Residence</h2>
        <div className="flex items-center gap-2 text-bblue-100 text-sm mb-6">
          <MapPin className="w-4 h-4" /> 123 Oak St, Beverly Hills
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-white text-bblue-600 hover:bg-bblue-50 w-full"><Navigation className="w-4 h-4 mr-2" /> Navigate</Button>
          <Button className="bg-bblue-500 text-white hover:bg-bblue-400 w-full "><Phone className="w-4 h-4 mr-2" /> Call</Button>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">Quick Actions</h3>
        <p className="text-xs text-text-secondary">PWA Mode: Online</p>
      </div>

      {/* Today's Schedule */}
      <div>
        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Next Jobs</h3>
        <div className="space-y-3">
          {[
            { time: "11:00 AM", name: "Starbucks HQ", type: "Preventative Maintenance", status: "Pending" },
            { time: "2:00 PM", name: "Metro Station", type: "Emergency Repair", status: "Pending" },
          ].map((job, i) => (
            <div key={i} className="bg-surface p-4 rounded-[2rem] flex items-center justify-between opacity-60">
              <div>
                <div className="text-lg font-bold text-white">{job.time}</div>
                <div className="text-sm font-medium text-text-primary">{job.name}</div>
                <div className="text-xs text-text-secondary">{job.type}</div>
              </div>
              <Button variant="ghost" size="sm" disabled>View</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
