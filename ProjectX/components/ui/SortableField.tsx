"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { Trash2, GripVertical } from "lucide-react";
import { FormField } from "@/lib/store/formBuilderStore";

interface SortableFieldProps {
    field: FormField;
    onRemove: (id: string) => void;
    onUpdate: (id: string, updates: Partial<FormField>) => void;
    allFields?: FormField[]; // Added to support logic selection
}

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

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
    p-4 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 
    ${isDragging ? "ring-2 ring-coral" : ""}
   `}
        >
            <div className="flex items-center gap-2 mb-2">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-text-secondary dark:text-white/50 hover:text-coral transition-colors"
                >
                    <GripVertical className="w-4 h-4" />
                </button>
                <span className="text-sm font-sans font-medium text-text-primary dark:text-white flex-1">
                    {field.label}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(field.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
            {field.type === "text" ||
                field.type === "phone" ||
                field.type === "email" ||
                field.type === "zip" ? (
                <Input
                    placeholder={field.placeholder}
                    disabled
                    className="bg-black/5 dark:bg-dark-surface/50"
                />
            ) : field.type === "dropdown" ? (
                <Select disabled className="bg-black/5 dark:bg-dark-surface/50">
                    {field.options?.map((opt, i) => (
                        <option key={i}>{opt}</option>
                    ))}
                </Select>
            ) : (
                <label className="flex items-center gap-2">
                    <input type="checkbox" disabled />
                    <span className="text-sm font-sans text-text-primary dark:text-white">
                        {field.label}
                    </span>
                </label>
            )}
            {/* Field-Specific Controls */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-1.5 font-sans">
                        Field Label
                    </label>
                    <Input
                        value={field.label}
                        onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                        className="h-10 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-1.5 font-sans">
                        Placeholder
                    </label>
                    <Input
                        value={field.placeholder || ""}
                        onChange={(e) => onUpdate(field.id, { placeholder: e.target.value })}
                        className="h-10 text-sm"
                    />
                </div>
            </div>

            {/* Advanced Settings (Logic & ZIPs) */}
            <div className="mt-4 pt-4 bg-black/5 dark:bg-dark-surface/50 rounded-[1.5rem] p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 font-sans">
                        Conditional Logic (Branching)
                    </label>
                    <span className="text-[10px] bg-coral/20 text-coral px-2 py-0.5 rounded-full font-bold">SMART</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Select
                        value={field.logic?.showIfFieldId || ""}
                        onChange={(e) => onUpdate(field.id, {
                            logic: { ...field.logic, showIfFieldId: e.target.value }
                        })}
                        className="h-10 text-xs"
                    >
                        <option value="">Always Show</option>
                        {allFields.filter(f => f.id !== field.id && f.type === "dropdown").map(f => (
                            <option key={f.id} value={f.id}>Show if: {f.label}</option>
                        ))}
                    </Select>

                    {field.logic?.showIfFieldId && (
                        <Input
                            placeholder="Matching Value"
                            value={field.logic?.showIfValue || ""}
                            onChange={(e) => onUpdate(field.id, {
                                logic: { ...field.logic, showIfValue: e.target.value }
                            })}
                            className="h-10 text-xs"
                        />
                    )}
                </div>

                {field.type === "zip" && (
                    <div className="pt-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-1.5 font-sans">
                            Restricted ZIP Prefixes (comma separated)
                        </label>
                        <Input
                            placeholder="e.g. 100, 200, 300"
                            value={field.allowedZips?.join(", ") || ""}
                            onChange={(e) => onUpdate(field.id, {
                                allowedZips: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                            })}
                            className="h-10 text-sm"
                        />
                        <p className="text-[10px] text-white/30 mt-1 pl-1">Prevents leads from outside these areas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
