import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Phone, Mail } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar"; // Assuming we have or will create Avatar
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Deal } from "@/types/deal";

interface DealCardProps {
  deal: Deal;
  onClick?: (deal: Deal) => void;
}

export function DealCard({ deal, onClick }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
    data: { type: 'deal', deal },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger click if not dragging
    if (!isDragging && onClick) {
      onClick(deal);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={twMerge(
        "group relative bg-surface dark:bg-dark-surface p-3 rounded-[2rem] shadow-sm transition-all",
        isDragging && "opacity-50 z-50 rotate-2 cursor-grabbing"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight mb-1">
            {deal.title}
          </h4>
          {deal.company && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {deal.company}
            </p>
          )}
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {deal.tags?.map(tag => (
          <span key={tag} className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 dark:text-gray-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2  ">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          {deal.tasksDue && (
            <div className="w-2 h-2 rounded-full bg-red-500" title="Tasks Due" />
          )}
        </div>
        <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
          ${deal.value.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
