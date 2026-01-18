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
  Settings,
  Smartphone,
  Info,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SortableField } from "@/components/ui/SortableField";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { FormHeader } from "@/components/forms/lead-form/FormHeader";
import { FormProgress } from "@/components/forms/lead-form/FormProgress";
import { WelcomeStep, SuccessStep, ContactInfoStep, ReviewInfoStep, VerificationStep, SMSCodeStep } from "@/components/forms/lead-form/FormSteps";
import { FloatingInput, PhoneInput, ZipInput, DropdownInput, AddressAutocompleteInput, QualificationInput } from "@/components/forms/lead-form/FormInputs";

export default function SmartFormsPage() {
  const {
    formTitle,
    formFields,
    buttonColor,
    requireSMS,
    welcomeScreen,
    qualitySettings,
    addField,
    removeField,
    updateField,
    setFormTitle,
    setButtonColor,
    setRequireSMS,
    setFormFields,
    setWelcomeScreen,
    setQualitySettings,
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
      qualification: {
        type: "qualification",
        label: "Qualification Question",
        options: ["$50k - $100k", "$100k - $250k", "$250k+"]
      },
      address: {
        type: "address",
        label: "Full Address",
        placeholder: "Start typing your address..."
      },
    };

    const field: FormField = {
      id: Date.now().toString(),
      ...fieldTypes[selectedFieldType],
    } as FormField;

    addField(field);
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        <Button variant="outline" onClick={() => setShowPreview(true)} className="rounded-[2rem]">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button variant="secondary" className="rounded-[2rem]">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" className="rounded-[2rem]">
          <Code className="w-4 h-4 mr-2" />
          Embed
        </Button>
        <Button variant="outline" className="rounded-[2rem]">
          <LinkIcon className="w-4 h-4 mr-2" />
          Sync GMB
        </Button>
      </HeaderActions>

      <div className="flex flex-col gap-8">
        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Form Settings & Fields */}
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="fields" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4 bg-black/5 dark:bg-black/40 p-1 rounded-full border border-black/5 dark:border-white/5 shadow-sm">
                <TabsTrigger
                  value="fields"
                  className="rounded-full py-2 text-xs font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-primary dark:data-[state=active]:text-white shadow-sm"
                >
                  Builder
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="rounded-full py-2 text-xs font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-primary dark:data-[state=active]:text-white shadow-sm"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fields" className="space-y-4 m-0">
                {/* Available Fields */}
                <Card variant="default" className="p-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-4 px-2">Add Fields</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: "Text Input", type: "text" },
                      { name: "Phone", type: "phone" },
                      { name: "Email", type: "email" },
                      { name: "Dropdown", type: "dropdown" },
                      { name: "Checkbox", type: "checkbox" },
                      { name: "ZIP Code", type: "zip" },
                      { name: "Qualification", type: "qualification" },
                      { name: "Address", type: "address" },
                    ].map((field) => (
                      <motion.button
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        key={field.name}
                        className="w-full flex items-center p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-coral/10 border border-transparent hover:border-coral/20 transition-all text-left"
                        onClick={() => {
                          setSelectedFieldType(field.type);
                          handleAddField();
                        }}
                      >
                        <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 mr-3 group-hover:bg-coral/20">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium">{field.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </Card>

                {/* Templates */}
                <Card variant="default" className="p-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-4 px-2">Templates</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "HVAC", icon: "❄️", templateId: "HVAC" },
                      { name: "Roofing", icon: "🏠", templateId: "Roofing" },
                      { name: "Plumbing", icon: "💧", templateId: "Plumbing" },
                      { name: "Solar", icon: "☀️", templateId: "Solar" },
                    ].map(template => (
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        key={template.name}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-coral/10 transition-all border border-transparent hover:border-coral/20"
                        onClick={() => {
                          const t = [
                            {
                              name: "HVAC", fields: [
                                { id: "t1", type: "text", label: "Full Name", placeholder: "John Doe", required: true },
                                { id: "t2", type: "phone", label: "Phone Number", placeholder: "(555) 123-4567", required: true },
                                { id: "t3", type: "zip", label: "ZIP Code", placeholder: "10001" },
                                { id: "t4", type: "dropdown", label: "Service Type", options: ["Repair", "Installation", "Maintenance"] }
                              ]
                            },
                            {
                              name: "Roofing", fields: [
                                { id: "r1", type: "text", label: "Homeowner Name", required: true },
                                { id: "r2", type: "phone", label: "Phone Number", required: true },
                                { id: "r3", type: "dropdown", label: "Roof Type", options: ["Shingle", "Metal", "Tile"] }
                              ]
                            },
                            {
                              name: "Plumbing", fields: [
                                { id: "p1", type: "text", label: "Name", required: true },
                                { id: "p2", type: "phone", label: "Phone", required: true },
                                { id: "p3", type: "text", label: "Problem", placeholder: "Leaking faucet..." }
                              ]
                            },
                            {
                              name: "Solar", fields: [
                                { id: "s1", type: "text", label: "Name", required: true },
                                { id: "s2", type: "text", label: "Address", required: true },
                                { id: "s3", type: "checkbox", label: "Own home?" }
                              ]
                            }
                          ].find(x => x.name === template.templateId);
                          if (t) {
                            setFormTitle(`${t.name} Request`);
                            setFormFields(t.fields.map(f => ({ ...f, id: Date.now().toString() + Math.random() } as any)));
                          }
                        }}
                      >
                        <span className="text-xl mb-1">{template.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{template.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 m-0">
                <Card variant="default" className="p-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-4 px-2">General</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-1 ml-2">Name</label>
                      <Input
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="h-10 text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-1 ml-2">Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={buttonColor}
                          onChange={(e) => setButtonColor(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <Input
                          value={buttonColor}
                          onChange={(e) => setButtonColor(e.target.value)}
                          className="h-10 text-xs font-mono rounded-xl"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <input
                        type="checkbox"
                        checked={requireSMS}
                        onChange={(e) => setRequireSMS(e.target.checked)}
                        className="w-4 h-4 rounded text-coral"
                      />
                      <span className="text-xs font-medium">Require SMS</span>
                    </label>
                  </div>
                </Card>

                <Card variant="default" className="p-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-4 px-2">Start Page</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer pb-2 border-b border-white/5">
                      <input
                        type="checkbox"
                        checked={welcomeScreen.enabled}
                        onChange={(e) => setWelcomeScreen({ ...welcomeScreen, enabled: e.target.checked })}
                        className="w-4 h-4 rounded text-coral"
                      />
                      <span className="text-xs font-bold uppercase tracking-widest">Enable</span>
                    </label>
                    {welcomeScreen.enabled && (
                      <div className="space-y-3 pt-2">
                        <Input
                          placeholder="Headline"
                          value={welcomeScreen.title}
                          onChange={(e) => setWelcomeScreen({ ...welcomeScreen, title: e.target.value })}
                          className="h-9 text-xs rounded-lg"
                        />
                        <Textarea
                          placeholder="Description"
                          value={welcomeScreen.description}
                          onChange={(e) => setWelcomeScreen({ ...welcomeScreen, description: e.target.value })}
                          className="text-xs rounded-lg bg-black/5 dark:bg-white/5 border-0 focus:ring-1"
                          rows={2}
                        />
                        <Input
                          placeholder="Button Text"
                          value={welcomeScreen.buttonText}
                          onChange={(e) => setWelcomeScreen({ ...welcomeScreen, buttonText: e.target.value })}
                          className="h-9 text-xs rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </Card>

                <Card variant="default" className="p-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-4 px-2">Lead Quality</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <input
                        type="checkbox"
                        checked={qualitySettings.addressAutocomplete}
                        onChange={(e) => setQualitySettings({ addressAutocomplete: e.target.checked })}
                        className="w-4 h-4 rounded text-coral"
                      />
                      <span className="text-xs font-medium">Address Autocomplete</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <input
                        type="checkbox"
                        checked={qualitySettings.voipFilter}
                        onChange={(e) => setQualitySettings({ voipFilter: e.target.checked })}
                        className="w-4 h-4 rounded text-coral"
                      />
                      <span className="text-xs font-medium">VOIP Filter</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <input
                        type="checkbox"
                        checked={qualitySettings.botDetection}
                        onChange={(e) => setQualitySettings({ botDetection: e.target.checked })}
                        className="w-4 h-4 rounded text-coral"
                      />
                      <span className="text-xs font-medium">Bot Detection</span>
                    </label>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Builder Canvas */}
          <div className="lg:col-span-3">
            <Card variant="default" className="min-h-[700px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-display font-semibold text-text-primary dark:text-white">Designer</h3>
                  <p className="text-xs text-text-secondary dark:text-white/50">Drag and drop fields to reorder</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-coral/10 text-coral text-[10px] font-bold uppercase tracking-widest">
                  Live View
                </div>
              </div>

              <div className="flex-1 bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] p-6 lg:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                <div className="max-w-2xl mx-auto relative z-10">
                  {formFields.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                        <Plus className="w-6 h-6 text-white/20" />
                      </div>
                      <h4 className="text-lg font-display font-semibold text-white/50">Empty Canvas</h4>
                      <p className="text-xs text-white/30 max-w-[200px] mt-2">
                        Start by adding fields or choosing a template from the builder menu.
                      </p>
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
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div >

      {/* Preview Modal */}
      < Modal
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false);
          setIsSuccess(false);
          setValidationError(null);
          setPreviewValues({});
          setCurrentStep(0);
        }
        }
        className="bg-[#121212] p-0 overflow-hidden"
        size="lg"
      >
        <div className="flex flex-col h-full bg-[#121212] min-h-[812px] relative font-sans">
          <FormHeader
            onBack={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            onClose={() => setShowPreview(false)}
            showBack={currentStep > 0 && !isSuccess}
          />

          <div className="flex-1 overflow-hidden px-6 pt-2">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                  <SuccessStep />
                </motion.div>
              ) : currentStep === 0 && welcomeScreen.enabled ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <WelcomeStep
                    title={welcomeScreen.title}
                    description={welcomeScreen.description}
                    buttonText={welcomeScreen.buttonText}
                    buttonColor={buttonColor}
                    onNext={() => setCurrentStep(1)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  {(() => {
                    const fieldIndex = currentStep - (welcomeScreen.enabled ? 1 : 0);
                    const field = formFields[fieldIndex];
                    if (!field) return null;

                    // If it's one of the first 4 fields and we want to show them together
                    if (fieldIndex < 4 && formFields.length >= 4 && currentStep === (welcomeScreen.enabled ? 1 : 0)) {
                      return (
                        <div className="flex-1">
                          <ContactInfoStep
                            data={{
                              firstName: previewValues[formFields[0]?.id] || "",
                              phone: previewValues[formFields[1]?.id] || "",
                              email: previewValues[formFields[2]?.id] || "",
                              zip: previewValues[formFields[3]?.id] || "",
                            }}
                            onUpdate={(newData) => {
                              setPreviewValues(prev => {
                                const next = { ...prev };
                                if (newData.firstName !== undefined && formFields[0]) next[formFields[0].id] = newData.firstName;
                                if (newData.phone !== undefined && formFields[1]) next[formFields[1].id] = newData.phone;
                                if (newData.email !== undefined && formFields[2]) next[formFields[2].id] = newData.email;
                                if (newData.zip !== undefined && formFields[3]) next[formFields[3].id] = newData.zip;
                                return next;
                              });
                            }}
                            onNext={() => {
                              if (requireSMS) {
                                setCurrentStep(98);
                              } else if (formFields.length > 4) {
                                setCurrentStep(prev => prev + 4);
                              } else {
                                setCurrentStep(99);
                              }
                            }}
                          />
                        </div>
                      );
                    }

                    // Otherwise show individual field steps
                    return (
                      <div className="flex-1 space-y-8">
                        {field.type === "qualification" ? (
                          <QualificationInput
                            label={field.label}
                            options={field.options || []}
                            value={previewValues[field.id] || ""}
                            onChange={(val: string) => setPreviewValues({ ...previewValues, [field.id]: val })}
                          />
                        ) : field.type === "address" ? (
                          <AddressAutocompleteInput
                            label={field.label}
                            placeholder={field.placeholder}
                            value={previewValues[field.id] || ""}
                            onChange={(e: any) => setPreviewValues({ ...previewValues, [field.id]: e.target.value })}
                          />
                        ) : (
                          <div className="pt-12">
                            <FloatingInput
                              label={field.label}
                              placeholder={field.placeholder}
                              value={previewValues[field.id] || ""}
                              onChange={(e: any) => setPreviewValues({ ...previewValues, [field.id]: e.target.value })}
                            />
                          </div>
                        )}

                        <div className="pt-8">
                          <Button
                            onClick={() => {
                              const nextField = formFields[fieldIndex + 1];
                              if (requireSMS && field.type === "phone") {
                                setCurrentStep(98);
                              } else if (fieldIndex < formFields.length - 1) {
                                setCurrentStep(prev => prev + 1);
                              } else {
                                setCurrentStep(99);
                              }
                            }}
                            className="w-full bg-[#3578E5] hover:bg-[#2D6AD1] text-white rounded-[12px] h-[58px] text-[18px] font-bold tracking-wide transition-all active:scale-[0.98]"
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {/* SMS Verification Step */}
              {!isSuccess && currentStep === 98 && (
                <motion.div
                  key="sms"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <SMSCodeStep
                    phone={previewValues[formFields.find(f => f.type === "phone")?.id || ""] || "(956) 315-3156"}
                    onNext={() => setCurrentStep(99)}
                  />
                </motion.div>
              )}

              {/* Complex flow components for builder (Review & Verification) */}
              {!isSuccess && currentStep === 99 && (
                <ReviewInfoStep
                  data={{
                    firstName: previewValues[formFields[0]?.id] || "Didi",
                    phone: previewValues[formFields.find(f => f.type === "phone")?.id || ""] || "(956) 315-3156",
                    email: previewValues[formFields.find(f => f.type === "email")?.id || ""] || "Notmail@gmail.com",
                    zip: previewValues[formFields.find(f => f.type === "zip")?.id || ""] || "95638"
                  }}
                  onUpdate={(newData: any) => {
                    if (newData.step !== undefined) setCurrentStep(newData.step);
                  }}
                  onNext={() => setCurrentStep(100)}
                />
              )}
              {!isSuccess && currentStep === 100 && (
                <VerificationStep
                  data={{}}
                  onUpdate={() => { }}
                  onNext={() => setIsSuccess(true)}
                />
              )}
            </AnimatePresence>
          </div>

          {!isSuccess && currentStep > 0 && currentStep < 90 && (
            <div className="pb-4">
              <FormProgress
                totalSteps={formFields.length}
                currentStep={currentStep - (welcomeScreen.enabled ? 1 : 0)}
                color={buttonColor}
              />
            </div>
          )}
        </div>
      </Modal >
    </div >
  );
}



