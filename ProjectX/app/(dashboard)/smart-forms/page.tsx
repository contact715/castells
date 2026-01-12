"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { useFormBuilderStore, FormField } from "@/lib/store/formBuilderStore";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Plus,
  Trash2,
  Eye,
  Save,
  Code,
  Link as LinkIcon,
  Upload,
  X,
  FileText,
} from "lucide-react";
import { SortableField } from "@/components/ui/SortableField";

export default function SmartFormsPage() {
  const {
    formTitle,
    formFields,
    buttonColor,
    requireSMS,
    addField,
    removeField,
    updateField,
    setFormTitle,
    setButtonColor,
    setRequireSMS,
    setFormFields,
  } = useFormBuilderStore();

  const [showPreview, setShowPreview] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState("text");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formFields.findIndex((f) => f.id === active.id);
      const newIndex = formFields.findIndex((f) => f.id === over.id);
      const newFields = arrayMove(formFields, oldIndex, newIndex);
      setFormFields(newFields);
    }
  };

  const handleAddField = () => {
    const fieldTypes: Record<string, Partial<FormField>> = {
      text: { type: "text", label: "Text Input", placeholder: "Enter text" },
      phone: {
        type: "phone",
        label: "Phone Number",
        placeholder: "+1 (555) 000-0000",
      },
      email: { type: "email", label: "Email", placeholder: "email@example.com" },
      dropdown: {
        type: "dropdown",
        label: "Dropdown",
        options: ["Option 1", "Option 2"],
      },
      checkbox: { type: "checkbox", label: "Checkbox" },
      zip: {
        type: "zip",
        label: "ZIP Code Input",
        placeholder: "Enter ZIP code",
        allowedZips: [],
      },
    };

    const field: FormField = {
      id: Date.now().toString(),
      ...fieldTypes[selectedFieldType],
    } as FormField;

    addField(field);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Module Description */}
      <ModuleDescription
        moduleName="Smart Forms"
        icon={<FileText className="w-6 h-6" />}
        shortDescription="Визуальный drag-and-drop конструктор форм для создания высококонверсионных форм захвата. Включает проверку ZIP-кодов, SMS-верификацию, интеграцию с GMB и автоматическую маршрутизацию лидов. Снижает количество невалидных лидов на 70-80% и увеличивает конверсию формы на 200-300%."
        problem="40-60% лидов с форм — невалидны (боты, неправильные номера, вне зоны обслуживания). Конверсия традиционных форм: 2-5%. Бизнес тратит $1,500-3,000/мес на обработку мусорных лидов, а менеджеры часами проверяют контакты вручную."
        businessValue="Для клиентов: Снижение невалидных лидов на 70-80%, рост конверсии формы на 200-300%, экономия времени менеджеров на обработку мусора ($1,500-3,000/мес), автоматическая интеграция в CRM и систему уведомлений. Формы сами фильтруют ботов, проверяют зоны обслуживания и верифицируют телефоны до попадания к менеджеру."
        monetization="Base tier: До 5 форм, входит в подписку. Pro tier: Безлимит форм, кастомный дизайн, A/B тесты — +$150/мес. Enterprise: White-label формы, API — +$500/мес."
        roi="Экономия на обработке невалида: $1,500-3,000/мес. Рост валидных лидов на 200-300% = доп. выручка $5,000-15,000/мес. Общий ROI: 400-600%."
        example="Пример: Клиент получает 100 лидов с форм/мес. 50% невалид = 50 лидов. С Smart Forms: 85-90 валидных лидов (отсев лишь 10-15%). Дополнительно 35-40 валидных лидов × $500 средний чек × 30% конверсия = $5,250-6,000 доп. ежемесячной выручки. Стоимость форм: $150/мес. ROI: 3,400-3,900%."
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">Smart Forms Builder</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview Form
            </Button>
            <Button variant="secondary">
              <Save className="w-4 h-4 mr-2" />
              Save Form
            </Button>
            <Button variant="outline">
              <Code className="w-4 h-4 mr-2" />
              Get Embed Code
            </Button>
            <Button variant="outline">
              <LinkIcon className="w-4 h-4 mr-2" />
              Integrate with GMB
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Form Settings Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card variant="default">
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Form Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                    Form Title
                  </label>
                  <Input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                    Background Image
                  </label>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                    Button Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="default">
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Available Fields</h3>
              <div className="space-y-2">
                {[
                  "Text Input",
                  "Phone Number",
                  "Email",
                  "Dropdown",
                  "Checkbox",
                  "ZIP Code Input",
                ].map((field) => (
                  <Button
                    key={field}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedFieldType(
                        field.toLowerCase().replace(" ", "-").split("-")[0]
                      );
                      handleAddField();
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {field}
                  </Button>
                ))}
              </div>
            </Card>

            <Card variant="default">
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Industry Templates</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: "HVAC", icon: "❄️", fields: [
                      { id: "t1", type: "text", label: "Full Name", placeholder: "John Doe", required: true },
                      { id: "t2", type: "phone", label: "Phone Number", placeholder: "(555) 123-4567", required: true },
                      { id: "t3", type: "zip", label: "ZIP Code", placeholder: "10001", allowedZips: [] },
                      { id: "t4", type: "dropdown", label: "Service Type", options: ["Repair", "Installation", "Maintenance"] },
                      { id: "t5", type: "text", label: "Issue Description", placeholder: "AC is making noise..." }
                    ]
                  },
                  {
                    name: "Roofing", icon: "🏠", fields: [
                      { id: "r1", type: "text", label: "Homeowner Name", placeholder: "Jane Smith", required: true },
                      { id: "r2", type: "phone", label: "Phone Number", placeholder: "(555) 987-6543", required: true },
                      { id: "r3", type: "dropdown", label: "Roof Type", options: ["Shingle", "Metal", "Tile", "Flat"] },
                      { id: "r4", type: "dropdown", label: "Property Age", options: ["0-10 years", "10-20 years", "20+ years"] },
                      { id: "r5", type: "checkbox", label: "Emergency Leak?" }
                    ]
                  },
                  {
                    name: "Plumbing", icon: "💧", fields: [
                      { id: "p1", type: "text", label: "Name", placeholder: "Your Name", required: true },
                      { id: "p2", type: "phone", label: "Phone", placeholder: "(555) 000-0000", required: true },
                      { id: "p3", type: "dropdown", label: "Unit Type", options: ["Residential", "Commercial"] },
                      { id: "p4", type: "text", label: "Problem", placeholder: "Leaking faucet, etc." }
                    ]
                  },
                  {
                    name: "Solar", icon: "☀️", fields: [
                      { id: "s1", type: "text", label: "Name", required: true },
                      { id: "s2", type: "text", label: "Address", required: true },
                      { id: "s3", type: "text", label: "Monthly Bill Avg", placeholder: "$150" },
                      { id: "s4", type: "checkbox", label: "Own the home?" }
                    ]
                  }
                ].map(template => (
                  <Button
                    key={template.name}
                    variant="outline"
                    className="flex flex-col h-20 items-center justify-center gap-1 hover:border-coral/50 hover:bg-coral/5"
                    onClick={() => {
                      setFormTitle(`${template.name} Quote Request`);
                      setFormFields(template.fields.map(f => ({ ...f, id: Date.now().toString() + Math.random() } as any)));
                    }}
                  >
                    <span className="text-xl">{template.icon}</span>
                    <span className="text-xs">{template.name}</span>
                  </Button>
                ))}
              </div>
            </Card>

            <Card variant="default">
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Validation Rules</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireSMS}
                    onChange={(e) => setRequireSMS(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Require SMS Verification</span>
                </label>
              </div>
            </Card>
          </div>

          {/* Form Builder Canvas */}
          <div className="lg:col-span-3">
            <Card variant="default" className="min-h-[600px]">
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Form Builder Canvas</h3>
              {formFields.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[500px] border-2 border-dashed border-black/10 dark:border-white/10 rounded-[2rem]">
                  <div className="text-center">
                    <p className="text-text-secondary dark:text-white/50 mb-4 font-sans">
                      Click on fields in the sidebar to add them to your form
                    </p>
                  </div>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={formFields.map((f) => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {formFields.map((field) => (
                        <SortableField
                          key={field.id}
                          field={field}
                          onRemove={removeField}
                          onUpdate={updateField}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
        <Modal
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setIsSuccess(false);
          }}
          title="Form Preview"
          size="lg"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-semibold mb-4 text-text-primary dark:text-white">{formTitle}</h2>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-8 text-center bg-green-500/10 rounded-xl"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-2">Thank You!</h3>
                <p className="text-text-secondary dark:text-white/70">Your information has been received. We will contact you shortly.</p>
              </motion.div>
            ) : (
              <>
                {formFields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium mb-1">
                      {field.label}
                      {field.required && <span className="text-red-400">*</span>}
                    </label>
                    {field.type === "text" ||
                      field.type === "phone" ||
                      field.type === "email" ||
                      field.type === "zip" ? (
                      <Input placeholder={field.placeholder} />
                    ) : field.type === "dropdown" ? (
                      <Select>
                        {field.options?.map((opt, i) => (
                          <option key={i}>{opt}</option>
                        ))}
                      </Select>
                    ) : (
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>{field.label}</span>
                      </label>
                    )}
                  </div>
                ))}
                {requireSMS && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      SMS Verification Code
                    </label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" />
                      <Button>Send Code</Button>
                    </div>
                  </div>
                )}
                <Button
                  className="w-full"
                  style={{ backgroundColor: buttonColor }}
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setIsSuccess(true);
                    }, 1500);
                  }}
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </Button>
              </>
            )}
          </div>
        </Modal>
      </div>
    </motion.div>
  );
}



