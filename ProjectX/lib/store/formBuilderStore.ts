import { create } from "zustand";

export interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  allowedZips?: string[];
}

interface FormBuilderStore {
  formTitle: string;
  formFields: FormField[];
  buttonColor: string;
  backgroundImage: string | null;
  requireSMS: boolean;
  addField: (field: FormField) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  setFormFields: (fields: FormField[]) => void;
  setFormTitle: (title: string) => void;
  setButtonColor: (color: string) => void;
  setBackgroundImage: (image: string | null) => void;
  setRequireSMS: (require: boolean) => void;
  resetForm: () => void;
}

export const useFormBuilderStore = create<FormBuilderStore>((set) => ({
  formTitle: "New Form",
  formFields: [],
  buttonColor: "#00C8FF",
  backgroundImage: null,
  requireSMS: false,
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
  resetForm: () =>
    set({
      formTitle: "New Form",
      formFields: [],
      buttonColor: "#00C8FF",
      backgroundImage: null,
      requireSMS: false,
    }),
}));



