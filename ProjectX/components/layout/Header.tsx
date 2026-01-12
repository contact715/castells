"use client";

import { Bell, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border border-black/5 dark:border-white/5 px-6 py-4 lg:rounded-[2rem] sticky top-0 md:static z-40"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.h1
            className="text-2xl font-display font-semibold text-text-primary dark:text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            M.O.S. Engine
          </motion.h1>
          <div className="hidden md:flex items-center gap-2 relative">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary dark:text-white/50" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-64 bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-text-secondary dark:text-white/70 font-sans">
            {format(currentTime, "MMM dd, yyyy, hh:mm a")}
          </div>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-coral rounded-full"></span>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
              <User className="w-5 h-5 text-coral" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-text-primary dark:text-white">Client Name</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}



