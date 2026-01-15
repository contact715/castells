"use client";

import React, { useMemo } from 'react';
import { Card } from "@/components/ui/Card";
import { Calendar as CalendarIcon } from "lucide-react";
import { SALES_PEOPLE, generateWorkSchedule } from "@/lib/sales-data";

export const SalesWorkSchedule = () => {
    // Hardcoded to Jan 2022 to match the provided historical data context
    const YEAR = 2022;
    const MONTH = 0; // January (0-indexed)

    const title = "Январь 2022 — Планирование смен";

    const { days, scheduleData } = useMemo(() => {
        const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        const generatedSchedule = generateWorkSchedule(YEAR, MONTH);

        const data = SALES_PEOPLE.map(person => {
            const shifts = generatedSchedule[person.id] || [];
            // Count total 'shift' types
            const total = shifts.filter(s => s.type === 'shift').length;

            return {
                id: person.id,
                name: person.name,
                shifts: shifts,
                total
            };
        });

        return { days: daysArray, scheduleData: data };
    }, []);

    const isWeekend = (day: number) => {
        const date = new Date(YEAR, MONTH, day);
        const d = date.getDay();
        return d === 0 || d === 6;
    };

    const getDayName = (day: number) => {
        const date = new Date(YEAR, MONTH, day);
        return date.toLocaleDateString('ru-RU', { weekday: 'short' });
    };

    return (
        <Card className="p-0 overflow-hidden bg-[#11141D] border-white/10">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-coral" />
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">График работы ОП</h3>
                        <p className="text-[10px] text-white/50 uppercase font-black mt-0.5">{title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-coral" />
                        <span className="text-[9px] font-black text-white/70 uppercase">Выходной</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <span className="text-[9px] font-black text-white/70 uppercase">Смены</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="sticky left-0 z-20 bg-[#11141D] p-4 text-left border-b border-r border-white/5 min-w-[140px]">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Сотрудник</span>
                            </th>
                            {days.map(day => (
                                <th key={day} className={`p-2 border-b border-r border-white/5 min-w-[40px] text-center ${isWeekend(day) ? 'bg-coral/10' : ''}`}>
                                    <div className="flex flex-col gap-0.5">
                                        <span className={`text-[8px] font-black hidden lg:block ${isWeekend(day) ? 'text-coral' : 'text-white/40'} uppercase`}>{getDayName(day)}</span>
                                        <span className={`text-[10px] font-black ${isWeekend(day) ? 'text-coral' : 'text-white'}`}>{day.toString().padStart(2, '0')}</span>
                                    </div>
                                </th>
                            ))}
                            <th className="p-4 border-b border-white/5 bg-white/5 min-w-[80px] text-center">
                                <span className="text-[9px] font-black text-white uppercase tracking-tighter">Итого</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleData.map((person, idx) => (
                            <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="sticky left-0 z-10 bg-[#11141D] p-4 font-black text-white text-xs border-r border-b border-white/5 group-hover:bg-[#1A1F2B]">
                                    {person.name}
                                </td>
                                {days.map(day => {
                                    const shift = person.shifts[day - 1]; // shifts array is 0-indexed, days are 1-indexed
                                    const isShift = shift?.type === 'shift';
                                    const isOff = shift?.type === 'off';

                                    return (
                                        <td key={day} className={`p-2 border-r border-b border-white/5 text-center transition-colors ${isWeekend(day) ? 'bg-coral/[0.02]' : ''}`}>
                                            <span className={`text-[10px] font-bold ${isShift ? 'text-coral' : isOff ? 'text-white/20' : 'text-transparent'}`}>
                                                {isShift ? '1' : isOff ? '0' : '-'}
                                            </span>
                                        </td>
                                    );
                                })}
                                <td className="p-4 bg-white/[0.03] text-center border-b border-white/5">
                                    <span className="text-xs font-black text-white">{person.total}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
