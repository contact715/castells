import { create } from "zustand";

export interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  allowedZips?: string[];
  logic?: {
    showIfFieldId?: string;
    showIfValue?: string;
  };
}

export interface WelcomeScreen {
  enabled: boolean;
  title: string;
  description: string;
  buttonText: string;
  incentiveText?: string; // e.g., "Get a $50 coupon after completion"
}

interface FormBuilderStore {
  formTitle: string;
  formFields: FormField[];
  buttonColor: string;
  backgroundImage: string | null;
  requireSMS: boolean;
  welcomeScreen: WelcomeScreen;
  addField: (field: FormField) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  setFormFields: (fields: FormField[]) => void;
  setFormTitle: (title: string) => void;
  setButtonColor: (color: string) => void;
  setBackgroundImage: (image: string | null) => void;
  setRequireSMS: (require: boolean) => void;
  setWelcomeScreen: (screen: WelcomeScreen) => void;
  resetForm: () => void;
}

export const useFormBuilderStore = create<FormBuilderStore>((set) => ({
  formTitle: "New Form",
  formFields: [],
  buttonColor: "#00C8FF",
  backgroundImage: null,
  requireSMS: false,
  welcomeScreen: {
    enabled: true,
    title: "Find Your Perfect Solution",
    description: "Answer a few questions to get a personalized quote in under 2 minutes.",
    buttonText: "Start Now"
  },
  addField: (field) =>
    set((state) => ({ formFields: [...state.formFields, field] })),
  removeField: (id) =>
    set((state) => ({
      formFields: state.formFields.filter((f) => f.id !== id),
    })),
  updateField: (id, updates) =>
    set((state) => ({
      formFields: state.formFields.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    })),
  setFormFields: (fields) => set({ formFields: fields }),
  setFormTitle: (title) => set({ formTitle: title }),
  setButtonColor: (color) => set({ buttonColor: color }),
  setBackgroundImage: (image) => set({ backgroundImage: image }),
  setRequireSMS: (require) => set({ requireSMS: require }),
  setWelcomeScreen: (screen) => set({ welcomeScreen: screen }),
  resetForm: () =>
    set({
      formTitle: "New Form",
      formFields: [],
      buttonColor: "#00C8FF",
      backgroundImage: null,
      requireSMS: false,
      welcomeScreen: {
        enabled: true,
        title: "Find Your Perfect Solution",
        description: "Answer a few questions to get a personalized quote in under 2 minutes.",
        buttonText: "Start Now"
      },
    }),
}));



