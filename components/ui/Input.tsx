import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { validate, type ValidationRule } from '../../lib/formValidation';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { trackFormFieldInteraction } from '../../lib/analytics';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'minimal' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  validationRules?: ValidationRule[];
  formName?: string;
  showValidationIcon?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

/**
 * Standardized Input component for consistent form styling
 * 
 * Variants:
 * - default: Light background with  (for light forms)
 * - minimal: Transparent with bottom  (for dark forms)
 * - dark: Dark background (for dark forms)
 * 
 * Sizes:
 * - sm: px-4 py-2 text-sm
 * - md: px-4 py-3 text-base (default)
 * - lg: px-8 py-4 text-xl
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error: externalError,
      helperText,
      variant = 'default',
      size = 'md',
      className,
      id,
      validationRules,
      formName,
      showValidationIcon = false,
      onValidationChange,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const [internalError, setInternalError] = useState<string | undefined>();
    const [isValid, setIsValid] = useState<boolean | undefined>();
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState<string>((props.value as string) || '');

    // Real-time validation
    useEffect(() => {
      if (validationRules && value && isFocused) {
        try {
          const result = validate(value, validationRules);
          setInternalError(result.error);
          setIsValid(result.isValid);
          onValidationChange?.(result.isValid);
        } catch (err) {
          // Silently fail validation if there's an error
          if (process.env.NODE_ENV === 'development') {
            console.warn('Validation error:', err);
          }
        }
      } else {
        setInternalError(undefined);
        setIsValid(undefined);
      }
    }, [value, validationRules, isFocused, onValidationChange]);

    const error = externalError || internalError;
    const showIcon = showValidationIcon && value && !isFocused && isValid !== undefined;

    const baseStyles = "w-full focus:outline-none transition-all font-sans";
    
    const variants = {
      default: "bg-black/5 dark:bg-white/5  -black/5 dark:-white/5 rounded-[2rem] focus:-coral dark:focus:-coral focus:bg-white dark:focus:bg-white/10 placeholder:text-black/20 dark:placeholder:text-white/20",
      minimal: "bg-transparent -b -white/20 rounded-none focus:-white placeholder:text-white/20 text-white",
      dark: "bg-ivory  -black/10 rounded-[2rem] focus:-coral placeholder:text-text-secondary/40"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-8 py-4 text-xl rounded-[2rem]"
    };

    const labelSizes = {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm"
    };

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block font-bold uppercase tracking-widest",
              labelSizes[size],
              variant === 'minimal' ? "text-white/40" : "text-text-secondary",
              "ml-1"
            )}
          >
            {label}
            {props.required && <span className="text-coral ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e);
              if (formName) {
                trackFormFieldInteraction(formName, props.name || label || 'field', 'change');
              }
            }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
              if (formName) {
                trackFormFieldInteraction(formName, props.name || label || 'field', 'focus');
              }
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
              if (formName) {
                trackFormFieldInteraction(formName, props.name || label || 'field', 'blur');
              }
              // Validate on blur
              if (validationRules && value) {
                const result = validate(value, validationRules);
                setInternalError(result.error);
                setIsValid(result.isValid);
                onValidationChange?.(result.isValid);
              }
            }}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              error && "-red-500 focus:-red-500",
              showIcon && isValid && "-green-500",
              showIcon && "pr-10",
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...(props as any)}
          />
          {showIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isValid ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
              )}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-red-500 text-xs mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className={cn(
            "text-xs mt-1",
            variant === 'minimal' ? "text-white/40" : "text-text-secondary"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

