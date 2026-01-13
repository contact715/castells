"use client";

import { KanbanBoard } from "@/components/pipeline/KanbanBoard";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Settings, Plus, LayoutPanelLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

export default function PipelinePage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#191919]">
      {/* Module Description */}
      <div className="p-4 bg-white dark:bg-[#1E1E1E]  ">
        <ModuleDescription
          moduleName="Deals Pipeline"
          icon={<LayoutPanelLeft className="w-6 h-6" />}
          shortDescription="Визуальное управление вашим отделом продаж. Этот модуль в стиле Kommo объединяет все входящие лиды в единую воронку, автоматически перемещает сделки по этапам и показывает, где именно вы теряете деньги."
          problem="Лиды теряются в почте, Telegram или блокнотах менеджеров. Нет четкого понимания, сколько денег сейчас в работе и когда они придут. Менеджеры забывают перезванивать вовремя, что снижает конверсию из заявки в продажу на 40%."
          businessValue="Для клиента: Полная прозрачность процесса продаж. Автоматизация рутины: создание задач, отправка email и передвижение сделок роботами. Прогнозируемая выручка на основе данных воронки."
          monetization="Входит в базовый пакет Smart CRM. Расширенные воронки и автоматизации — +$50/мес за каждую дополнительную воронку."
          roi="Рост конверсии из лида в сделку на 25-30% за счет контроля каждого этапа. Сокращение цикла сделки (времени от заявки до оплаты) на 20%. Полное исключение 'потерянных' лидов."
          example="Пример: После внедрения Deals Pipeline компания обнаружила, что 70% лидов 'зависали' на этапе оценки. Настройка авто-напоминаний мастерам помогла ускорить этот этап в 2 раза, что привело к росту выручки на $15,000 в первый же месяц."
        />
      </div>
      {/* Header / Toolbar - Kommo Style */}
      <div className="flex items-center justify-between p-4  dark:bg-white dark:bg-[#1E1E1E]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Leads
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-black/5 dark:bg-white/10 text-xs font-normal text-gray-500">
              Pipeline
            </span>
          </h1>

          <div className="h-8 w-[1px] bg-gray-200 dark:bg-black/5 dark:bg-white/10 mx-2" />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500 rounded-[2rem]">
              List
            </Button>
            <Button variant="secondary" size="sm" className="bg-coral text-white rounded-[2rem] font-medium">
              Board
            </Button>
          </div>
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
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Setup
          </Button>

          <Button size="sm" className="bg-coral hover:bg-coral/90 text-white rounded-[2rem]">
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}

