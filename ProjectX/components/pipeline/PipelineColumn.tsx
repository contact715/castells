import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DealCard } from './DealCard';
import { clsx } from 'clsx';

import { Deal } from "@/types/deal";

interface PipelineColumnProps {
  id: string;
  title: string;
  color: string;
  deals: Deal[];
  count: number;
  totalValue: number;
  onDealClick?: (deal: Deal) => void;
}

export function PipelineColumn({ id, title, color, deals, count, totalValue, onDealClick }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: { type: 'column', id },
  });

  return (
    <div className="flex flex-col w-[300px] min-w-[300px] h-full">
      {/* Column Header - Kommo Style (Colored top strip) */}
      <div className="bg-surface dark:bg-dark-surface rounded-t-[2rem] dark:mb-2">
        <div className={`h-1 w-full rounded-t-[2rem] ${color}`} />
        <div className="p-3">
          <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wide flex justify-between items-center">
            {title}
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              {count} deals
            </span>
          </h3>
          <div className="mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
            ${totalValue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={clsx(
          "flex-1 flex flex-col gap-3 bg-black/5 dark:bg-white/5 rounded-b-[2rem] p-4 overflow-y-auto custom-scrollbar transition-colors",
          isOver ? "bg-coral/10 dark:bg-coral/20 ring-2 ring-coral/20" : ""
        )}
      >
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} onClick={onDealClick} />
        ))}
      </div>
    </div>
  );
}
