"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  Phone,
  Mail,
  Plus,
  Search,
  MessageSquare,
  BarChart3,
  Image,
  Package,
  Settings,
  User,
  Building2,
  ExternalLink,
  Clock,
  Calendar,
  FileText,
  Send,
  ListChecks,
  Flag,
  MoreHorizontal as MoreHorizontalIcon,
  Circle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

import { Deal } from "@/types/deal";

interface DealDetailModalProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  dueTime: string;
  completed: boolean;
  type: string;
}

export function DealDetailModal({ deal, isOpen, onClose }: DealDetailModalProps) {
  const [activeTab, setActiveTab] = useState("main");
  const [noteText, setNoteText] = useState("");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    type: "call",
    dueDate: "Today",
    dueTime: "12:00"
  });
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Initial call",
      dueDate: "Today",
      dueTime: "12:00",
      completed: false,
      type: "call",
    }
  ]);

  if (!deal) return null;

  const tabs = [
    { id: "main", label: "Main", icon: <User className="w-3.5 h-3.5" /> },
    { id: "statistics", label: "Statistics", icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: "media", label: "Media", icon: <Image className="w-3.5 h-3.5" /> },
    { id: "products", label: "Products", icon: <Package className="w-3.5 h-3.5" /> },
    { id: "setup", label: "Setup", icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  const activityItems = [
    ...tasks.map(t => ({
      id: `task-${t.id}`,
      time: `${t.dueDate} at ${t.dueTime}`,
      action: `scheduled a ${t.type} task: ${t.title}`,
      user: "You",
      type: "task",
      isTask: true,
      completed: t.completed,
      originalId: t.id
    })),
    {
      id: "event-1",
      time: "Today at 09:15",
      action: "manually created a deal",
      user: "You",
      linkText: `Lead #${deal.id}`,
      type: "event",
      isTask: false
    },
  ];

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      type: newTask.type,
      dueDate: newTask.dueDate,
      dueTime: newTask.dueTime,
      completed: false
    };
    setTasks(prev => [...prev, task]);
    setShowAddTaskModal(false);
    setNewTask({ title: "", type: "call", dueDate: "Today", dueTime: "12:00" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bblack/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-[1200px] bg-white dark:bg-[#1A1A1A] z-50 flex shadow-2xl"
          >
            {/* Left Sidebar - Deal Info */}
            <div className="w-[350px]  dark:flex flex-col bg-gray-50 dark:bg-[#242424]">
              {/* Header */}
              <div className="p-4  dark:flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Lead #{deal.id}</h2>
                  <button className="text-xs text-coral hover:underline flex items-center gap-1 mt-0.5">
                    Open full <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-[2rem] hover:bg-gray-200 dark:hover:bg-black/5 dark:bg-white/10 transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Initial Contact Dropdown */}
              <div className="p-4  ">
                <button className="w-full flex items-center justify-between text-left p-3 rounded-[2rem] bg-white dark:bg-[#2C2C2C]  dark:hover:/50 transition-all">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Initial contact: <span className="text-coral">Показ</span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 px-4 py-2  dark:overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-[2rem] text-xs font-medium whitespace-nowrap transition-all",
                      activeTab === tab.id
                        ? "bg-coral text-white"
                        : "text-gray-500 hover:bg-gray-200 dark:hover:bg-black/5 dark:bg-white/10"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeTab === "main" && (
                  <>
                    {/* Deal Fields */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2  ">
                        <span className="text-xs text-gray-500">Responsible user</span>
                        <span className="text-sm text-gray-900 dark:text-white font-medium">Castells Media</span>
                      </div>
                      <div className="flex justify-between items-center py-2  ">
                        <span className="text-xs text-gray-500">Sale</span>
                        <span className="text-sm text-coral font-bold">${deal.value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2  ">
                        <span className="text-xs text-gray-500">TikTok ad URL</span>
                        <span className="text-sm text-gray-400">—</span>
                      </div>
                      <div className="flex justify-between items-center py-2  ">
                        <span className="text-xs text-gray-500">TikTok ad name</span>
                        <span className="text-sm text-gray-400">—</span>
                      </div>
                      <div className="flex justify-between items-center py-2  ">
                        <span className="text-xs text-gray-500">TikTok ad ID</span>
                        <span className="text-sm text-gray-400">—</span>
                      </div>
                    </div>

                    {/* Add Contact */}
                    <button className="w-full flex items-center gap-2 p-3 rounded-[2rem]   dark:text-gray-500 hover: hover:text-coral transition-all">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Add contact</span>
                    </button>

                    {/* Company Section */}
                    <div className="  dark:pt-4">
                      <button className="w-full flex items-center gap-2 p-3 rounded-[2rem]   dark:text-gray-500 hover: hover:text-coral transition-all">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Add company</span>
                      </button>
                    </div>
                  </>
                )}

                {activeTab === "statistics" && (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="text-4xl font-bold text-coral mb-1">0</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Days in Funnel</div>
                      <div className="text-xs text-gray-400 mt-1">modified / 01/12/2024</div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { label: "Calls answered/initiated", value: "0/0" },
                        { label: "Emails", value: "0" },
                        { label: "Today overdue", value: "0", highlight: true },
                        { label: "Tasks", value: `${tasks.length}` },
                        { label: "Chats / Bots", value: "0" },
                        { label: "Internal Chats", value: "0" },
                      ].map((stat) => (
                        <div key={stat.label} className="flex justify-between items-center py-2">
                          <span className={`text-sm ${stat.highlight ? "text-coral" : "text-gray-600 dark:text-gray-400"}`}>
                            {stat.label}
                          </span>
                          <span className={`text-sm font-medium ${stat.highlight ? "text-coral" : "text-gray-900 dark:text-white"}`}>
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4  ">
                      <div className="text-xs font-bold text-gray-500 uppercase mb-2">Tracking data</div>
                      <div className="text-sm text-gray-500">
                        External ID: <span className="text-gray-900 dark:text-white">{deal.id}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "media" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Image className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-sm text-gray-500">No media files attached</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Media
                    </Button>
                  </div>
                )}

                {activeTab === "products" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-sm text-gray-500">No products linked</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                )}

                {activeTab === "setup" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-[2rem] bg-white dark:bg-[#2C2C2C]  ">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Pipeline Settings</h4>
                      <p className="text-xs text-gray-500">Configure deal stage automations and notifications.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content - Activity Feed */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1E1E1E]">
              {/* Top Bar */}
              <div className="p-4  dark:flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search and filter..."
                    className="pl-10 bg-gray-50 dark:bg-bblack/20  "
                  />
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="px-3 py-1.5 rounded-[2rem] text-xs font-medium bg-gray-100 dark:bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                    Today
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  {activityItems.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                          item.isTask
                            ? item.completed
                              ? "bg-green-500/20 text-green-500"
                              : "bg-bblue-500/20 text-bblue-500"
                            : "bg-coral/20 text-coral"
                        )}>
                          {item.isTask ? <ListChecks className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 w-px bg-gray-200 dark:bg-black/5 dark:bg-white/10 mt-2" />
                      </div>
                      <div className="flex-1 pb-6 relative">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="text-xs text-gray-400">{item.time}</span>
                              {" "}
                              <span className="font-medium text-gray-900 dark:text-white">{item.user}</span>
                              {" "}
                              {item.action}
                              {" "}
                              {item.linkText && <a href="#" className="text-coral hover:underline">{item.linkText}</a>}
                            </p>
                            {item.isTask && !item.completed && (
                              <div className="mt-2 flex items-center gap-2">
                                <button
                                  onClick={() => toggleTask(item.originalId)}
                                  className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-[2rem] bg-green-500 text-white hover:bg-green-600 transition-colors"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  Complete
                                </button>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                                  Pending
                                </span>
                              </div>
                            )}
                          </div>
                          {item.isTask && (
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                              <MoreHorizontalIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Input */}
              <div className="  dark:p-4">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                      ⚠ {tasks.filter(t => !t.completed).length > 0
                        ? `${tasks.filter(t => !t.completed).length} pending tasks`
                        : "No data stored, due 3 days"}
                    </span>
                    <button
                      onClick={() => setShowAddTaskModal(true)}
                      className="text-coral hover:underline ml-auto text-xs font-semibold uppercase tracking-wider"
                    >
                      Schedule task
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <button className="px-3 py-1.5 rounded-[2rem] text-xs font-medium bg-coral text-white hover:bg-coral/90 transition-colors shadow-sm">
                        Note
                      </button>
                      <button className="px-3 py-1.5 rounded-[2rem] text-xs font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-black/5 dark:bg-white/10 transition-all">
                        Syst Note
                      </button>
                    </div>
                    <Input
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Write a note..."
                      className="flex-1"
                    />
                    <Button size="sm" className="bg-coral hover:bg-coral/90 text-white rounded-[2rem] shadow-sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Edge - Chats Tab */}
            <div className="w-10 bg-purple-600 flex flex-col items-center justify-center shadow-inner">
              <button className="text-white -rotate-90 whitespace-nowrap text-xs font-medium tracking-wider active:scale-95 transition-transform">
                <MessageSquare className="w-4 h-4 mr-1 inline rotate-90" />
                Chats
              </button>
            </div>
          </motion.div>

          {/* Schedule Task Modal */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 transform-gpu">
            <AnimatePresence>
              {showAddTaskModal && (
                <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-bblack/40 backdrop-blur-sm"
                    onClick={() => setShowAddTaskModal(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white dark:bg-[#2C2C2C] rounded-[2rem] p-6 w-full max-w-md shadow-2xl "
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Schedule Task</h3>
                      <button onClick={() => setShowAddTaskModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-black/5 dark:bg-white/10 rounded-full">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Task Title</label>
                        <Input
                          value={newTask.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, title: e.target.value })}
                          placeholder="What needs to be done?"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Type</label>
                          <select
                            value={newTask.type}
                            onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-bblack/20  dark:rounded-[2rem] p-2.5 text-sm focus:ring-2 focus:ring-coral/20 transition-all outline-none"
                          >
                            <option value="call">📞 Call</option>
                            <option value="meeting">📅 Meeting</option>
                            <option value="email">✉️ Email</option>
                            <option value="other">📋 Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Time</label>
                          <Input
                            type="time"
                            value={newTask.dueTime}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, dueTime: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setShowAddTaskModal(false)} className="flex-1 rounded-[2rem]">Cancel</Button>
                        <Button onClick={handleAddTask} className="flex-1 bg-coral hover:bg-coral/90 text-white rounded-[2rem] shadow-lg shadow-coral/20">Schedule</Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
