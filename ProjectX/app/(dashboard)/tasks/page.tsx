"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  User,
  Building2,
  Phone,
  Mail,
  MessageSquare,
  MoreHorizontal,
  ChevronDown,
  RefreshCw,
  Flag,
  Share2,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DealDetailModal } from "@/components/pipeline/DealDetailModal";
import { MOCK_DEALS } from "@/data/mockDeals";
import { Deal } from "@/types/deal";

interface Task {
  id: string;
  title: string;
  type: "call" | "meeting" | "email" | "follow_up" | "other";
  dueDate: string;
  dueTime?: string;
  completed: boolean;
  dealId?: string;
  dealTitle?: string;
  contactName?: string;
  contactCompany?: string;
  priority: "low" | "medium" | "high";
}

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Follow up on proposal",
    type: "call",
    dueDate: "today",
    dueTime: "14:00",
    completed: false,
    dealId: "1",
    dealTitle: "Website Redesign",
    contactName: "John Smith",
    contactCompany: "Acme Corp",
    priority: "high",
  },
  {
    id: "2",
    title: "Send contract",
    type: "email",
    dueDate: "today",
    dueTime: "16:00",
    completed: false,
    dealId: "3",
    dealTitle: "Marketing Campaign",
    contactName: "Sarah Johnson",
    contactCompany: "TechStart Inc",
    priority: "medium",
  },
  {
    id: "3",
    title: "Schedule demo call",
    type: "meeting",
    dueDate: "tomorrow",
    dueTime: "10:00",
    completed: false,
    dealId: "4",
    dealTitle: "App Development",
    contactName: "Mike Williams",
    contactCompany: "MobileFirst",
    priority: "medium",
  },
  {
    id: "4",
    title: "Review SEO report",
    type: "other",
    dueDate: "tomorrow",
    dueTime: "11:30",
    completed: false,
    dealId: "2",
    dealTitle: "SEO Audit",
    contactName: "Lisa Brown",
    contactCompany: "Local Biz",
    priority: "low",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow">("today");
  const [filterType, setFilterType] = useState<"todo" | "routine">("todo");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    type: "call",
    dueDate: "today",
    dueTime: "",
    priority: "medium",
    dealTitle: "",
    contactName: "",
  });

  const todayTasks = tasks.filter(t => t.dueDate === "today" && !t.completed);
  const tomorrowTasks = tasks.filter(t => t.dueDate === "tomorrow" && !t.completed);
  const allTasks = tasks.filter(t => !t.completed);

  const displayTasks = activeTab === "today" ? todayTasks : tomorrowTasks;

  const toggleComplete = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleTaskClick = (task: Task) => {
    if (task.dealId) {
      const deal = MOCK_DEALS.find(d => d.id === task.dealId);
      if (deal) {
        setSelectedDeal(deal);
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="w-4 h-4" />;
      case "meeting": return <Calendar className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "follow_up": return <RefreshCw className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-500/10";
      case "medium": return "text-yellow-500 bg-yellow-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const handleAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      type: newTask.type as Task["type"],
      dueDate: newTask.dueDate,
      dueTime: newTask.dueTime,
      completed: false,
      dealTitle: newTask.dealTitle || undefined,
      contactName: newTask.contactName || undefined,
      priority: newTask.priority as Task["priority"],
    };
    setTasks([...tasks, task]);
    setShowAddModal(false);
    setNewTask({
      title: "",
      type: "call",
      dueDate: "today",
      dueTime: "",
      priority: "medium",
      dealTitle: "",
      contactName: "",
    });
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-[2rem]">
            Pipeline
          </Button>
          <Button variant="outline" size="sm" className="rounded-[2rem]">
            <RefreshCw className="w-4 h-4 mr-2" />
            SYNC
          </Button>
          <Button
            size="sm"
            className="bg-coral hover:bg-coral/90 text-white rounded-[2rem]"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </HeaderActions>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 lg:p-6 bg-surface dark:bg-dark-surface rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-[2rem] transition-colors">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm text-gray-500">Sort, group, section</span>
          </div>

          <div className="h-8 w-[1px] bg-black/10 dark:bg-white/10 mx-2" />

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className={`rounded-[2rem] px-6 ${filterType === "todo"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                }`}
              onClick={() => setFilterType("todo")}
            >
              To-Do
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`rounded-[2rem] px-6 ${filterType === "routine"
                ? "bg-coral text-white hover:bg-coral/90"
                : "text-gray-500 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              onClick={() => setFilterType("routine")}
            >
              Routine
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center bg-surface dark:bg-dark-surface rounded-[2rem] shadow-sm overflow-hidden">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-8 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === "today"
            ? "border-coral text-coral"
            : "border-transparent text-text-secondary dark:text-white/70 hover:text-coral"
            }`}
        >
          <div className="text-xs uppercase tracking-wider mb-1">To-Do Today</div>
          <div className="text-lg font-bold">{todayTasks.length} items</div>
        </button>
        <button
          onClick={() => setActiveTab("tomorrow")}
          className={`px-8 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === "tomorrow"
            ? "border-coral text-coral"
            : "border-transparent text-text-secondary dark:text-white/70 hover:text-coral"
            }`}
        >
          <div className="text-xs uppercase tracking-wider mb-1">To-Do Tomorrow</div>
          <div className="text-lg font-bold">{tomorrowTasks.length} items</div>
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="max-w-4xl mx-auto space-y-3">
          <AnimatePresence>
            {displayTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-gray-200 dark:text-gray-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 mb-2">
                  All caught up!
                </h3>
                <p className="text-gray-400 dark:text-gray-600 max-w-md">
                  No tasks due {activeTab === "today" ? "today" : "tomorrow"}.
                  Add a new task to stay on top of your deals.
                </p>
              </motion.div>
            ) : (
              displayTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleTaskClick(task)}
                  className="group bg-surface dark:bg-dark-surface rounded-[2rem] p-4 hover:shadow-xl hover:shadow-coral/10 transition-all cursor-pointer border border-transparent hover:border-coral/20"
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={(e) => toggleComplete(task.id, e)}
                      className="mt-1 text-gray-400 hover:text-coral transition-all active:scale-90"
                    >
                      <Circle className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`p-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {getTypeIcon(task.type)}
                        </span>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h4>
                        {task.priority === "high" && (
                          <Flag className="w-3.5 h-3.5 text-red-500" />
                        )}
                      </div>

                      {task.dealTitle && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-coral font-bold group-hover:underline">{task.dealTitle}</span>
                          {task.contactName && (
                            <>
                              <span>•</span>
                              <span>{task.contactName}</span>
                            </>
                          )}
                          {task.contactCompany && (
                            <>
                              <span>•</span>
                              <span className="text-gray-400">{task.contactCompany}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-sm">
                      {task.dueTime && (
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          {task.dueTime}
                        </span>
                      )}
                      <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Edge - Chats Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 w-10 h-32 bg-purple-600 flex items-center justify-center rounded-l-[2rem] shadow-lg z-30">
        <button className="text-white -rotate-90 whitespace-nowrap text-xs font-medium tracking-wider">
          <MessageSquare className="w-4 h-4 mr-1 inline rotate-90" />
          Chats
        </button>
      </div>

      {/* Deal Detail Modal */}
      <DealDetailModal
        deal={selectedDeal}
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
      />

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Task"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title
            </label>
            <Input
              placeholder="e.g., Follow up with client"
              value={newTask.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <Select
                value={newTask.type}
                onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
              >
                <option value="call">📞 Call</option>
                <option value="meeting">📅 Meeting</option>
                <option value="email">✉️ Email</option>
                <option value="follow_up">🔄 Follow Up</option>
                <option value="other">📋 Other</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <Select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Due Date
              </label>
              <Select
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time
              </label>
              <Input
                type="time"
                value={newTask.dueTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, dueTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Related Deal (optional)
            </label>
            <Input
              placeholder="e.g., Website Redesign"
              value={newTask.dealTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, dealTitle: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Name (optional)
            </label>
            <Input
              placeholder="e.g., John Smith"
              value={newTask.contactName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({ ...newTask, contactName: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              className="bg-coral hover:bg-coral/90 text-white"
              onClick={handleAddTask}
              disabled={!newTask.title}
            >
              Add Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
