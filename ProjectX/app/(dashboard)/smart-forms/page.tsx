"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { useFormBuilderStore, FormField } from "@/lib/store/formBuilderStore";
import { IncentiveBanner } from "@/components/ui/IncentiveBanner";
import { ZipRestrictionField } from "@/components/ui/ZipRestrictionField";
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
    welcomeScreen,
    addField,
    removeField,
    updateField,
    setFormTitle,
    setButtonColor,
    setRequireSMS,
    setFormFields,
    setWelcomeScreen,
  } = useFormBuilderStore();

  const [showPreview, setShowPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome, 1+ = fields
  const [selectedFieldType, setSelectedFieldType] = useState("text");
  const [previewValues, setPreviewValues] = useState<Record<string, string>>({});
  const [validationError, setValidationError] = useState<string | null>(null);
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
    <div
      className="space-y-6"
    >
      {/* Module Description */}
      <ModuleDescription
        moduleName="Smart Forms"
        icon={<FileText className="w-6 h-6" />}
        shortDescription="Визуальный конструктор форм захвата лидов с автоматической квалификацией. Включает проверку ZIP-кодов, SMS-верификацию и мгновенное попадание в CRM. Эти формы не просто собирают контакты, они фильтруют и подготавливают клиента к покупке."
        problem="Обычные формы на сайтах собирают много «мусорных» лидов (боты, неправильные номера, клиенты вне зоны обслуживания). Менеджеры тратят до 50% времени на обзвон тех, кто никогда не купит. Это демотивирует команду и сжигает бюджет."
        businessValue="Для клиента: Снижение невалидных заявок на 80% за счет SMS-кода и ZIP-фильтра. Рост конверсии на 200-300% благодаря удобному пошаговому интерфейсу. Мгновенная интеграция: лид попадает в работу через 1 секунду."
        monetization="Base tier: До 5 форм — включено. Pro tier: Безлимит форм, кастомный дизайн, A/B тесты — +$150/мес. Enterprise: White-label решение для агентств — +$500/мес."
        roi="Экономия на обработке невалида: $1,500-3,000/мес. Рост количества качественных лидов на 50-100% при том же рекламном бюджете. ROI модуля составляет 400-600% уже в первый квартал."
        example="Пример: Кровельная компания получала 100 лидов/мес, из них 50 невалид. После ввода Smart Forms: 85-90 лидов, все валидны. Добавочные 35 лидов × $8,000 ср. чек × 10% закрытие = $28,000 доп. прибыли. Цена: $150. ROI: 18,500%."
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
        </div>

        {/* Form Settings Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="fields" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6 bg-black/5 dark:bg-white/10 p-1 rounded-[2rem] ">
              <TabsTrigger
                value="fields"
                className="rounded-[2rem] py-3 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg dark:data-[state=active]:bg-coral dark:data-[state=active]:text-white dark:text-white/60"
              >
                Builder
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-[2rem] py-3 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg dark:data-[state=active]:bg-coral dark:data-[state=active]:text-white dark:text-white/60"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fields" className="space-y-6">
              {/* Available Fields */}
              <Card variant="default">
                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Add Fields</h3>
                <div className="space-y-3">
                  {[
                    "Text Input",
                    "Phone Number",
                    "Email",
                    "Dropdown",
                    "Checkbox",
                    "ZIP Code Input",
                  ].map((field) => (
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      key={field}
                      className="w-full flex items-center p-3 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 hover:bg-black/5 dark:bg-white/10 hover:/30 transition-colors group text-left"
                      onClick={() => {
                        setSelectedFieldType(
                          field.toLowerCase().replace(" ", "-").split("-")[0]
                        );
                        handleAddField();
                      }}
                    >
                      <div className="p-2 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 mr-3 group-hover:bg-coral/20 group-hover:text-coral transition-colors">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-text-primary dark:text-white/90">{field}</span>
                    </motion.button>
                  ))}
                </div>
              </Card>

              <Card variant="default">
                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Templates</h3>
                <div className="grid grid-cols-2 gap-3">
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
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      key={template.name}
                      className="flex flex-col h-24 items-center justify-center gap-2 p-4 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 hover:bg-coral/10 hover:/30 hover:shadow-lg hover:shadow-coral/10 transition-all cursor-pointer"
                      onClick={() => {
                        setFormTitle(`${template.name} Quote Request`);
                        setFormFields(template.fields.map(f => ({ ...f, id: Date.now().toString() + Math.random() } as any)));
                      }}
                    >
                      <span className="text-2xl filter drop-shadow-md">{template.icon}</span>
                      <span className="text-xs font-semibold tracking-wide text-text-primary dark:text-white/90">{template.name}</span>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Welcome Screen Settings */}
              <Card variant="default">
                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Welcome Screen</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={welcomeScreen.enabled}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWelcomeScreen({ ...welcomeScreen, enabled: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Enable Start Page</span>
                  </label>
                  {welcomeScreen.enabled && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">Headline</label>
                        <Input
                          value={welcomeScreen.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWelcomeScreen({ ...welcomeScreen, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">Description</label>
                        <Textarea
                          value={welcomeScreen.description}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWelcomeScreen({ ...welcomeScreen, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">Button Text</label>
                        <Input
                          value={welcomeScreen.buttonText}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWelcomeScreen({ ...welcomeScreen, buttonText: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">Incentive / Bonus Text</label>
                        <Input
                          value={welcomeScreen.incentiveText || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWelcomeScreen({ ...welcomeScreen, incentiveText: e.target.value })}
                          placeholder="e.g. Complete to get a 10% discount"
                        />
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* General Settings */}
              <Card variant="default">
                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                      Form Internal Name
                    </label>
                    <Input
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="My Awesome Form"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                      Primary Color
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
                  <label className="flex items-center gap-2 cursor-pointer pt-2">
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
            </TabsContent>
          </Tabs>
        </div>

        {/* Form Builder Canvas */}
        <div className="lg:col-span-3">
          <Card variant="default" className="min-h-[600px]">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Form Builder Canvas</h3>
            {formFields.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[500px] rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="text-center relative z-10 p-8">
                  <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-dark-surface/50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 ">
                    <Plus className="w-8 h-8 text-white/30" />
                  </div>
                  <h4 className="text-xl font-display font-semibold text-white mb-2">Start Building</h4>
                  <p className="text-text-secondary dark:text-white/50 mb-4 font-sans max-w-xs mx-auto">
                    Select a field from the left sidebar or choose a template to get started instantly.
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
                        allFields={formFields}
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
          setValidationError(null);
          setPreviewValues({});
          setCurrentStep(0);
        }}
        title="" // Hide title for custom look
        size="lg"
      >
        {/* Progress Bar */}
        {!isSuccess && currentStep > 0 && (
          <div className="w-full h-1 bg-black/5 dark:bg-white/10 mb-6 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-coral"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / formFields.length) * 100}%` }}
            />
          </div>
        )}

        <div className="min-h-[300px] flex flex-col justify-center">
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 text-4xl shadow-lg shadow-green-500/20">
                ✓
              </div>
              <h3 className="text-2xl font-display font-semibold text-text-primary dark:text-white mb-2">Thank You!</h3>
              <p className="text-text-secondary dark:text-white/70 max-w-sm mx-auto">Your information has been received. {welcomeScreen.incentiveText ? `Expect your ${welcomeScreen.incentiveText} via email.` : "We will contact you shortly."}</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {currentStep === 0 && welcomeScreen.enabled ? (
                // Welcome Screen
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center p-6 space-y-6"
                >
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-text-primary dark:text-white leading-tight">
                    {welcomeScreen.title}
                  </h2>
                  <p className="text-lg text-text-secondary dark:text-white/70 max-w-md mx-auto font-sans">
                    {welcomeScreen.description}
                  </p>
                  <Button
                    size="lg"
                    style={{ backgroundColor: buttonColor }}
                    className="px-12 py-6 text-lg rounded-[2rem] shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    onClick={() => setCurrentStep(1)}
                  >
                    {welcomeScreen.buttonText}
                  </Button>
                </motion.div>
              ) : (
                // Form Fields (One Step Per Screen)
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 px-4"
                >
                  {/* Render ONLY current field if step > 0 */}
                  {(() => {
                    // "Shifted" index: currentStep 1 -> field index 0
                    const fieldIndex = currentStep - 1;

                    // If we went past last field (logic error check), or logic handled elsewhere
                    if (fieldIndex >= formFields.length) return null;

                    const field = formFields[fieldIndex];

                    return (
                      <div className="max-w-md mx-auto">
                        <label className="block text-xl md:text-2xl font-display font-semibold text-text-primary dark:text-white mb-6 text-center">
                          {field.label}
                          {field.required && <span className="text-coral ml-1">*</span>}
                        </label>

                        <div className="bg-transparent">
                          <IncentiveBanner text={welcomeScreen.incentiveText || ""} />

                          {field.type === "zip" ? (
                            <ZipRestrictionField
                              value={previewValues[field.id] || ""}
                              allowedPrefixes={field.allowedZips}
                              onChange={(val) => setPreviewValues({ ...previewValues, [field.id]: val })}
                              onValidationChange={(isValid) => {
                                if (isValid) setValidationError(null);
                              }}
                            />
                          ) : field.type === "text" || field.type === "phone" || field.type === "email" ? (
                            <Input
                              autoFocus
                              placeholder={field.placeholder}
                              value={previewValues[field.id] || ""}
                              onChange={(e) => {
                                setPreviewValues({ ...previewValues, [field.id]: e.target.value });
                                setValidationError(null);
                              }}
                              className="h-14 text-lg focus:ring-coral/20 transition-colors"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const nextBtn = document.getElementById('next-step-btn');
                                  if (nextBtn) nextBtn.click();
                                }
                              }}
                            />
                          ) : field.type === "dropdown" ? (
                            <Select
                              value={previewValues[field.id] || ""}
                              onChange={(e) => setPreviewValues({ ...previewValues, [field.id]: e.target.value })}
                              className="h-14 text-lg focus:ring-coral/20"
                            >
                              <option value="" disabled>Select an option</option>
                              {field.options?.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </Select>
                          ) : (
                            <label className="flex items-center gap-4 p-4 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 hover:bg-black/5 dark:bg-white/10 cursor-pointer transition-all">
                              <input
                                type="checkbox"
                                className="w-6 h-6 rounded text-coral focus:ring-coral"
                                checked={previewValues[field.id] === "true"}
                                onChange={(e) => setPreviewValues({ ...previewValues, [field.id]: e.target.checked ? "true" : "false" })}
                              />
                              <span className="text-lg font-sans font-medium">{field.label} (Yes)</span>
                            </label>
                          )}
                        </div>

                        {validationError && (
                          <p className="text-coral font-medium text-center mt-3 animate-pulse">
                            ⚠ {validationError}
                          </p>
                        )}

                        <div className="flex justify-between items-center mt-8">
                          {/* Logic for Submit vs Next */}
                          {fieldIndex < formFields.length - 1 ? (
                            <Button
                              id="next-step-btn"
                              size="lg"
                              className="w-full text-lg py-6 rounded-[2rem]"
                              style={{ backgroundColor: buttonColor }}
                              onClick={() => {
                                // Basic Validation for Required
                                if (field.required && !previewValues[field.id]) {
                                  setValidationError("This field is required.");
                                  return;
                                }

                                // ZIP Validation (internal) - The component handles UI, we just block 'Next' here
                                if (field.type === "zip" && field.allowedZips && field.allowedZips.length > 0) {
                                  const userZip = previewValues[field.id];
                                  const isAllowed = field.allowedZips.some(prefix => userZip?.startsWith(prefix));
                                  if (!isAllowed) {
                                    setValidationError("Sorry, we don't serve this area yet.");
                                    return;
                                  }
                                }

                                // Branching Logic for Jumping steps
                                let nextStep = currentStep + 1;
                                while (nextStep <= formFields.length) {
                                  const checkField = formFields[nextStep - 1];
                                  if (checkField.logic?.showIfFieldId) {
                                    const dependentValue = previewValues[checkField.logic.showIfFieldId];
                                    if (dependentValue !== checkField.logic.showIfValue) {
                                      nextStep++;
                                      continue;
                                    }
                                  }
                                  break;
                                }

                                if (nextStep > formFields.length) {
                                  setIsSuccess(true);
                                } else {
                                  setCurrentStep(nextStep);
                                }
                              }}
                            >
                              Next Step →
                            </Button>
                          ) : (
                            <Button
                              size="lg"
                              className="w-full text-lg py-6 rounded-[2rem]"
                              style={{ backgroundColor: buttonColor }}
                              disabled={isSubmitting}
                              onClick={() => {
                                if (field.required && !previewValues[field.id]) {
                                  setValidationError("This field is required.");
                                  return;
                                }

                                setIsSubmitting(true);
                                setTimeout(() => {
                                  setIsSubmitting(false);
                                  setIsSuccess(true);
                                }, 1000);
                              }}
                            >
                              {isSubmitting ? "Processing..." : "Finish & Submit"}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </Modal>
    </div>
  );
}



