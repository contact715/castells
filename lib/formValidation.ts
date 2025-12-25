/**
 * Form validation utilities
 * Real-time validation with helpful error messages
 */

export type ValidationRule = 
  | { type: 'required'; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | { type: 'custom'; validator: (value: string) => boolean; message?: string };

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate a value against rules
 */
export const validate = (value: string, rules: ValidationRule[]): ValidationResult => {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value || value.trim().length === 0) {
          return {
            isValid: false,
            error: rule.message || 'This field is required',
          };
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          return {
            isValid: false,
            error: rule.message || 'Please enter a valid email address',
          };
        }
        break;

      case 'minLength':
        if (value && value.length < rule.value) {
          return {
            isValid: false,
            error: rule.message || `Minimum length is ${rule.value} characters`,
          };
        }
        break;

      case 'maxLength':
        if (value && value.length > rule.value) {
          return {
            isValid: false,
            error: rule.message || `Maximum length is ${rule.value} characters`,
          };
        }
        break;

      case 'pattern':
        if (value && !rule.value.test(value)) {
          return {
            isValid: false,
            error: rule.message || 'Invalid format',
          };
        }
        break;

      case 'custom':
        if (value && !rule.validator(value)) {
          return {
            isValid: false,
            error: rule.message || 'Invalid value',
          };
        }
        break;
    }
  }

  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  return { isValid: true };
};

/**
 * Validate URL
 */
export const validateURL = (url: string): ValidationResult => {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

/**
 * Get helpful error message with suggestions
 */
export const getErrorMessage = (field: string, errorType: string, value?: string): string => {
  const suggestions: Record<string, string> = {
    email: 'Make sure to include @ and a domain (e.g., example@domain.com)',
    phone: 'Format: (123) 456-7890 or +1 123 456 7890',
    required: 'This field cannot be empty',
    minLength: `Please enter at least ${value} characters`,
    maxLength: `Please limit to ${value} characters`,
  };

  return suggestions[errorType] || `Please check your ${field}`;
};

