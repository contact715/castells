"use client";

import { KanbanBoard } from "@/components/pipeline/KanbanBoard";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Settings, Plus, LayoutPanelLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { HeaderActions } from "@/components/layout/HeaderActions";

export default function PipelinePage() {
  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        <Button size="sm" className="bg-coral hover:bg-coral/90 text-white rounded-[2rem]">
          <Plus className="w-4 h-4 mr-2" />
          New Deal
        </Button>
      </HeaderActions>

      {/* Header / Toolbar - Kommo Style */}
      <div className="flex items-center justify-between p-4 lg:p-8 bg-surface dark:bg-dark-surface rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-500 rounded-[2rem]">
            List
          </Button>
          <Button variant="secondary" size="sm" className="bg-coral text-white rounded-[2rem] font-medium">
            Board
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="bg-gray-50 dark:bg-bblack/20  dark:pl-9 h-9 text-sm"
            />
          </div>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
            Setup
          </Button>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="bg-surface dark:bg-dark-surface rounded-[2rem] shadow-sm overflow-hidden flex-1 min-h-0">
        <KanbanBoard />
      </div>
    </div>
  );
}

