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
}

export function SortableField({
  field,
  onRemove,
  onUpdate,
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
        p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5
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
          className="bg-black/5 dark:bg-white/5"
        />
      ) : field.type === "dropdown" ? (
        <Select disabled className="bg-black/5 dark:bg-white/5">
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
      {field.type === "zip" && (
        <div className="mt-2">
          <Input
            placeholder="Allowed ZIP codes (comma separated)"
            className="text-sm"
            onChange={(e) =>
              onUpdate(field.id, {
                allowedZips: e.target.value.split(","),
              })
            }
          />
        </div>
      )}
    </div>
  );
}
