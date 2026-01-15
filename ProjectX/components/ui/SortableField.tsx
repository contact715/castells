"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { FormField } from "@/lib/store/formBuilderStore";
import {
    Type,
    Phone as PhoneIcon,
    Mail as MailIcon,
    ChevronDown,
    CheckSquare,
    MapPin,
    Trash2,
    GripVertical,
    Settings2
} from "lucide-react";

interface SortableFieldProps {
    field: FormField;
    onRemove: (id: string) => void;
    onUpdate: (id: string, updates: Partial<FormField>) => void;
    allFields?: FormField[];
}

const fieldIcons: Record<string, any> = {
    text: Type,
    phone: PhoneIcon,
    email: MailIcon,
    dropdown: ChevronDown,
    checkbox: CheckSquare,
    zip: MapPin,
};

export function SortableField({
    field,
    onRemove,
    onUpdate,
    allFields = [],
}: SortableFieldProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const Icon = fieldIcons[field.type] || Type;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
        group relative flex flex-col gap-3 p-4 rounded-3xl bg-surface/50 dark:bg-dark-surface/30 
        border border-white/5 hover:border-coral/20 transition-all
        ${isDragging ? "ring-2 ring-coral border-transparent z-50" : ""}
      `}
        >
            {/* Top Row: Type & Actions */}
            <div className="flex items-center gap-3">
                <div
                    {...attributes}
                    {...listeners}
                    className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 cursor-grab active:cursor-grabbing hover:bg-coral/20 hover:text-coral transition-colors"
                >
                    <GripVertical className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-white/5">
                    <Icon className="w-3 h-3 text-coral" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary dark:text-white/40">
                        {field.type === 'zip' ? 'ZIP Code' : field.type}
                    </span>
                </div>

                <div className="flex-1" />

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(field.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </Button>
            </div>

            {/* Inputs Row: Label & Placeholder (Compact Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Input
                        placeholder="Field Label"
                        value={field.label}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(field.id, { label: e.target.value })}
                        className="h-9 text-xs rounded-xl bg-black/5 dark:bg-white/5 border-transparent focus:border-coral/30"
                    />
                </div>
                {(field.type !== 'checkbox' && field.type !== 'dropdown') && (
                    <div className="space-y-1.5">
                        <Input
                            placeholder="Placeholder Text"
                            value={field.placeholder || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(field.id, { placeholder: e.target.value })}
                            className="h-9 text-xs rounded-xl bg-black/5 dark:bg-white/5 border-transparent focus:border-coral/30"
                        />
                    </div>
                )}
                {field.type === 'dropdown' && (
                    <div className="space-y-1.5">
                        <Input
                            placeholder="Options (comma separated)"
                            value={field.options?.join(", ") || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(field.id, {
                                options: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                            })}
                            className="h-9 text-xs rounded-xl bg-black/5 dark:bg-white/5 border-transparent focus:border-coral/30"
                        />
                    </div>
                )}
            </div>

            {/* Advanced Logic (Integrated Row) */}
            <div className="pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 group/logic">
                    <Settings2 className="w-3 h-3 text-white/20 group-hover/logic:text-coral transition-colors" />
                    <div className="flex-1 flex items-center gap-2">
                        <Select
                            value={field.logic?.showIfFieldId || ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onUpdate(field.id, {
                                logic: { ...field.logic, showIfFieldId: e.target.value }
                            })}
                            className="h-7 py-0 px-2 text-[10px] w-32 rounded-lg bg-black/5 dark:bg-white/5 border-transparent"
                        >
                            <option value="">Always Show</option>
                            {allFields.filter(f => f.id !== field.id && f.type === "dropdown").map(f => (
                                <option key={f.id} value={f.id}>If: {f.label}</option>
                            ))}
                        </Select>

                        {field.logic?.showIfFieldId && (
                            <Input
                                placeholder="Matches..."
                                value={field.logic?.showIfValue || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(field.id, {
                                    logic: { ...field.logic, showIfValue: e.target.value }
                                })}
                                className="h-7 py-0 px-2 text-[10px] flex-1 rounded-lg bg-black/5 dark:bg-white/5 border-transparent"
                            />
                        )}
                    </div>

                    {field.type === 'zip' && (
                        <div className="flex-1">
                            <Input
                                placeholder="ZIP Prefixes (100, 200...)"
                                value={field.allowedZips?.join(", ") || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(field.id, {
                                    allowedZips: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                                })}
                                className="h-7 py-0 px-2 text-[10px] w-full rounded-lg bg-black/5 dark:bg-white/5 border-transparent"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
