import React, { useState } from 'react';
import { validate, validatePhone, type ValidationRule } from '../../lib/formValidation';
import type { NavigateFn } from '../../types';

/* ===================== CONSTANTS ===================== */
const STEPS = [
  { id: 'service', title: 'What does your shop specialize in?', subtitle: 'Select your main service' },
  { id: 'location', title: 'Where is your shop located?', subtitle: 'Enter your city' },
  { id: 'contact', title: 'Contact info', subtitle: 'How can we reach you?' },
];

const SERVICE_OPTIONS = [
  'Window Tinting',
  'PPF (Paint Protection Film)',
  'Ceramic Coating',
  'Detailing',
  'Wraps',
  'Multiple Services',
];

const GRADIENT_COLORS = ['#F58529', '#DD2A7B', '#8134AF', '#515BD4'];
const ACCENT = '#515BD4';

interface FormData {
  name: string;
  phone: string;
  companyName: string;
  city: string;
  serviceInterest: string;
  tcpaConsent: boolean;
}

const requiredRule: ValidationRule[] = [{ type: 'required' }];

/* ===================== MAIN COMPONENT ===================== */
const LeadFormPage: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    companyName: '',
    city: '',
    serviceInterest: '',
    tcpaConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string | undefined> = {};

    if (step === 0) {
      if (!form.serviceInterest) newErrors.serviceInterest = 'Please select a service';
    } else if (step === 1) {
      const cityResult = validate(form.city, requiredRule);
      if (!cityResult.isValid) newErrors.city = cityResult.error;
    } else if (step === 2) {
      const nameResult = validate(form.name, requiredRule);
      if (!nameResult.isValid) newErrors.name = nameResult.error;
      const phoneResult = validatePhone(form.phone);
      if (!phoneResult.isValid) newErrors.phone = phoneResult.error;
      if (!form.tcpaConsent) newErrors.tcpaConsent = 'You must agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitError('');
    setIsSubmitting(true);

    // Create AudioContext NOW — synchronously during user click, BEFORE any await.
    // After await, the user gesture context expires and AudioContext would start suspended.
    let preAudioCtx: AudioContext | null = null;
    try {
      preAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {}

    try {
      const res = await fetch('/api/lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.name,
          phone: form.phone,
          cityState: form.city,
          serviceInterest: form.serviceInterest,
          companyName: form.companyName,
        }),
      });

      if (res.ok) {
        (window as any).__leadAudioCtx = preAudioCtx;
        preAudioCtx = null; // don't close it in finally
        onNavigate('lead-thank-you');
        return;
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Close AudioContext if submission failed (wasn't passed to thank-you page)
      preAudioCtx?.close().catch(() => {});
    }
  };

  const isLastStep = step === STEPS.length - 1;
  const currentStep = STEPS[step];

  return (
    <>
      <style>{`
        @keyframes lf-fade-in { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
        .lf-page { position: fixed; inset: 0; background: #0a0a0f; color: #fff; display: flex; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; z-index: 50; }
        .lf-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 0; flex-shrink: 0; }
        .lf-header-btn { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; padding: 8px 12px; opacity: 0.7; transition: opacity 0.15s; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        .lf-header-btn:hover { opacity: 1; }
        .lf-progress { display: flex; gap: 4px; padding: 12px 20px 0; flex-shrink: 0; }
        .lf-progress-seg { flex: 1; height: 3px; border-radius: 2px; transition: background 0.3s; }
        .lf-body { flex: 1; padding: 28px 20px 20px; overflow-y: auto; animation: lf-fade-in 0.3s ease-out; }
        .lf-title { font-size: 22px; font-weight: 700; margin: 0 0 4px; line-height: 1.3; }
        .lf-subtitle { font-size: 14px; color: rgba(255,255,255,0.5); margin: 0 0 24px; }
        .lf-footer { padding: 16px 20px; padding-bottom: max(16px, env(safe-area-inset-bottom)); flex-shrink: 0; }
        .lf-btn { width: 100%; padding: 16px; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; color: #fff; cursor: pointer; transition: opacity 0.15s; background: ${ACCENT}; touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none; }
        .lf-btn:hover { opacity: 0.9; }
        .lf-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .lf-radio { display: flex; align-items: center; padding: 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; margin-bottom: 10px; cursor: pointer; transition: border-color 0.15s, background 0.15s; touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none; }
        .lf-radio:hover { border-color: rgba(255,255,255,0.3); }
        .lf-radio.selected { border-color: ${ACCENT}; background: rgba(81,91,212,0.1); }
        .lf-radio-circle { width: 24px; height: 24px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); margin-left: auto; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color 0.15s, background 0.15s; }
        .lf-radio.selected .lf-radio-circle { border-color: ${ACCENT}; background: ${ACCENT}; }
        .lf-radio-label { font-size: 16px; color: #fff; }
        .lf-input-wrap { margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 10px 16px; transition: border-color 0.15s; display: flex; align-items: center; gap: 8px; }
        .lf-input-wrap:focus-within { border-color: ${ACCENT}; }
        .lf-input-wrap.has-error { border-color: #FF4757; }
        .lf-input-inner { flex: 1; }
        .lf-input-label { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 2px; }
        .lf-input { width: 100%; background: none; border: none; outline: none; color: #fff; font-size: 16px; padding: 0; font-family: inherit; }
        .lf-input::placeholder { color: rgba(255,255,255,0.2); }
        .lf-check-icon { width: 24px; height: 24px; border-radius: 50%; background: #2ED573; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .lf-error { color: #FF4757; font-size: 12px; margin-top: 4px; padding-left: 16px; }
        .lf-privacy { font-size: 12px; color: rgba(255,255,255,0.35); line-height: 1.5; margin-top: 16px; }
        .lf-submit-error { padding: 12px; background: rgba(255,71,87,0.1); border: 1px solid rgba(255,71,87,0.3); border-radius: 8px; color: #FF4757; font-size: 13px; margin-bottom: 12px; }
        .lf-consent { display: flex; align-items: flex-start; gap: 12px; margin-top: 20px; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        .lf-consent-box { width: 22px; height: 22px; border-radius: 6px; border: 2px solid rgba(255,255,255,0.3); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color 0.15s, background 0.15s; margin-top: 1px; }
        .lf-consent-box.checked { border-color: ${ACCENT}; background: ${ACCENT}; }
        .lf-consent-box.has-error { border-color: #FF4757; }
        .lf-consent-text { font-size: 11px; color: rgba(255,255,255,0.45); line-height: 1.6; }
        .lf-consent-text a, .lf-consent-text button { color: rgba(255,255,255,0.7); text-decoration: underline; background: none; border: none; font: inherit; cursor: pointer; padding: 0; }
        .lf-consent-text a:hover, .lf-consent-text button:hover { color: #fff; }
        .lf-legal-footer { font-size: 10px; color: rgba(255,255,255,0.25); line-height: 1.5; text-align: center; margin-top: 12px; }
        .lf-legal-footer a, .lf-legal-footer button { color: rgba(255,255,255,0.4); text-decoration: underline; background: none; border: none; font: inherit; cursor: pointer; padding: 0; }
      `}</style>

      <div className="lf-page">
        {/* Header */}
        <div className="lf-header">
          <button className="lf-header-btn" onClick={handleBack} style={{ visibility: step > 0 ? 'visible' : 'hidden' }}>
            &#8249;
          </button>
          <button className="lf-header-btn" style={{ visibility: 'hidden' }}>&#10005;</button>
        </div>

        {/* Progress bar */}
        <div className="lf-progress">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="lf-progress-seg"
              style={{
                background: i <= step
                  ? `linear-gradient(90deg, ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]}, ${GRADIENT_COLORS[(i + 1) % GRADIENT_COLORS.length]})`
                  : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>

        {/* Body */}
        <div className="lf-body" key={step}>
          <h1 className="lf-title">{currentStep.title}</h1>
          <p className="lf-subtitle">{currentStep.subtitle}</p>

          {/* Step 1: Service selection */}
          {step === 0 && (
            <div>
              {SERVICE_OPTIONS.map((svc) => (
                <div
                  key={svc}
                  className={`lf-radio ${form.serviceInterest === svc ? 'selected' : ''}`}
                  onClick={() => handleChange('serviceInterest', svc)}
                >
                  <span className="lf-radio-label">{svc}</span>
                  <div className="lf-radio-circle">
                    {form.serviceInterest === svc && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
              {errors.serviceInterest && <div className="lf-error">{errors.serviceInterest}</div>}
            </div>
          )}

          {/* Step 2: Location */}
          {step === 1 && (
            <div>
              <InputField label="City" name="city" value={form.city} error={errors.city} onChange={handleChange} placeholder="e.g. McAllen, TX" />
            </div>
          )}

          {/* Step 3: Contact info */}
          {step === 2 && (
            <div>
              <InputField label="Your name" name="name" value={form.name} error={errors.name} onChange={handleChange} placeholder="Your name" />
              <InputField label="Phone number" name="phone" type="tel" value={form.phone} error={errors.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
              <InputField label="Company name" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Your shop name (optional)" />

              {/* TCPA Consent Checkbox */}
              <div
                className="lf-consent"
                onClick={() => {
                  setForm((prev) => ({ ...prev, tcpaConsent: !prev.tcpaConsent }));
                  if (errors.tcpaConsent) setErrors((prev) => ({ ...prev, tcpaConsent: undefined }));
                }}
              >
                <div className={`lf-consent-box ${form.tcpaConsent ? 'checked' : ''} ${errors.tcpaConsent ? 'has-error' : ''}`}>
                  {form.tcpaConsent && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="lf-consent-text">
                  By checking this box, I consent to receive calls and SMS/text messages from Castells Media Inc at the phone number provided, including messages sent by autodialer. Message and data rates may apply. Message frequency varies (typically 1–5/month). Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See our{' '}
                  <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('privacy-policy'); }}>Privacy Policy</button>{' '}and{' '}
                  <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('terms'); }}>Terms of Service</button>.
                </span>
              </div>
              {errors.tcpaConsent && <div className="lf-error">{errors.tcpaConsent}</div>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="lf-footer">
          {submitError && <div className="lf-submit-error">{submitError}</div>}
          <button
            className="lf-btn"
            disabled={isSubmitting}
            onClick={isLastStep ? handleSubmit : handleNext}
          >
            {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit' : 'Continue'}
          </button>
          {isLastStep && (
            <p className="lf-legal-footer">
              By submitting, you agree to our{' '}
              <button type="button" onClick={() => onNavigate('privacy-policy')}>Privacy Policy</button>{' '}and{' '}
              <button type="button" onClick={() => onNavigate('terms')}>Terms of Service</button>.
              Your information will be used solely to contact you about marketing services for your business.
              We do not sell or share your personal data with third parties.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

/* ===================== INPUT FIELD ===================== */
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  onChange: (name: string, value: string) => void;
}> = ({ label, name, value, error, type = 'text', placeholder, onChange }) => {
  const filled = value.trim().length > 0;
  const valid = filled && !error;

  return (
    <>
      <div className={`lf-input-wrap ${error ? 'has-error' : ''}`}>
        <div className="lf-input-inner">
          <div className="lf-input-label">{label}</div>
          <input
            className="lf-input"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </div>
        {valid && (
          <div className="lf-check-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>
      {error && <div className="lf-error">{error}</div>}
    </>
  );
};

export default LeadFormPage;
