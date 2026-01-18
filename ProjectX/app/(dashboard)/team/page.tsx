"use client";

import { useState, useEffect } from "react";

import { User, Mail, Shield, Plus, MoreVertical, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Users } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { HeaderActions } from "@/components/layout/HeaderActions";

interface TeamMember {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  role?: string; // Mocked for now
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/auth/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Mock roles since our MVP model doesn't have them yet
        const enriched = data.map((m: any) => ({
          ...m,
          role: m.id === 1 ? "Admin" : "Sales Agent"
        }));
        setMembers(enriched);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };





  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-[2rem]">
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </HeaderActions>

      {/* Filters */}
      <div className="flex gap-4 items-center bg-black/5 dark:bg-dark-surface/50 p-2 rounded-card w-fit">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent  text-sm text-white focus:ring-0 pl-9 w-64"
          />
        </div>
      </div>

      {/* Members Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {members.map((member) => (
          <div
            key={member.id}
            className="glass-panel p-6 rounded-card hover: transition-colors group relative"
          >
            <button className="absolute top-4 right-4 text-text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-inner">
                {member.full_name ? member.full_name.charAt(0) : member.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-white font-medium">{member.full_name || "Unknown"}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${member.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {member.role}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-text-tertiary" />
                {member.email}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-text-tertiary" />
                ID: {member.id}
              </div>
            </div>

            <div className="mt-6 pt-4  flex justify-between items-center text-xs">
              <span className={member.is_active ? "text-green-400" : "text-red-400"}>
                ● {member.is_active ? "Active" : "Inactive"}
              </span>
              <span className="text-text-tertiary">Joined recently</span>
            </div>
          </div>
        ))}

        {/* Placeholder for Add New */}
        <div
          className=" rounded-card p-6 flex flex-col items-center justify-center text-text-secondary hover:bg-black/5 dark:bg-dark-surface/50 hover: transition-all cursor-pointer min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-dark-surface/50 flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-text-tertiary" />
          </div>
          <span className="font-medium">Add Team Member</span>
        </div>
      </div>
    </div>
  );
}
