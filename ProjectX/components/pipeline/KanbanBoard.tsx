"use client";

import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { PipelineColumn } from './PipelineColumn';
import { DealCard } from './DealCard';
import { DealDetailModal } from './DealDetailModal';
import { Deal } from "@/types/deal";
import { INITIAL_DEALS_MAP } from "@/data/mockDeals";

interface Stage {
  id: string;
  name: string;
  color: string;
}

const MOCK_STAGES: Stage[] = [
  { id: 'new', name: 'Leads In', color: 'bg-bblue-500' },
  { id: 'contact', name: 'Contact Made', color: 'bg-yellow-500' },
  { id: 'qualified', name: 'Qualified', color: 'bg-purple-500' },
  { id: 'offer', name: 'Offer Sent', color: 'bg-orange-500' },
  { id: 'won', name: 'Closed Won', color: 'bg-green-500' },
];

export function KanbanBoard() {
  const [deals, setDeals] = useState(INITIAL_DEALS_MAP);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string) => {
    if (id in deals) return id;
    return Object.keys(deals).find(key => deals[key].find(d => d.id === id));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { deal } = active.data.current || {};
    setActiveDeal(deal);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(String(activeId));
    const overContainer = findContainer(String(overId));

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setDeals((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.findIndex((item) => item.id === activeId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overItems.findIndex((item) => item.id === overId) + modifier;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== activeId),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          activeItems[activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDeal(null);
  };

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex bg-gray-50 dark:bg-bblack/40 p-4 h-full overflow-x-auto items-start gap-4">
          {MOCK_STAGES.map((stage) => {
            const stageDeals = deals[stage.id] || [];
            const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

            return (
              <PipelineColumn
                key={stage.id}
                id={stage.id}
                title={stage.name}
                color={stage.color}
                deals={stageDeals}
                count={stageDeals.length}
                totalValue={totalValue}
                onDealClick={handleDealClick}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeDeal ? (
            <div className="rotate-2 cursor-grabbing">
              <DealCard deal={activeDeal} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <DealDetailModal
        deal={selectedDeal}
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
      />
    </>
  );
}
