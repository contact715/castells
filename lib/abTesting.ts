/**
 * A/B Testing utilities
 * Feature flags and experiment management
 */

export interface Experiment {
  id: string;
  name: string;
  variants: string[];
  defaultVariant: string;
}

export interface ExperimentResult {
  experimentId: string;
  variant: string;
  timestamp: number;
}

// Storage for experiments
const experiments: Map<string, Experiment> = new Map();

// Storage for user assignments
const userAssignments: Map<string, string> = new Map();

/**
 * Register an experiment
 */
export const registerExperiment = (experiment: Experiment): void => {
  experiments.set(experiment.id, experiment);
};

/**
 * Get variant for an experiment
 */
export const getVariant = (experimentId: string): string => {
  // Check if user already has an assignment
  if (userAssignments.has(experimentId)) {
    return userAssignments.get(experimentId)!;
  }

  // Get experiment
  const experiment = experiments.get(experimentId);
  if (!experiment) {
    return 'default';
  }

  // Assign variant (simple random assignment, can be improved with consistent hashing)
  const variant = experiment.variants[
    Math.floor(Math.random() * experiment.variants.length)
  ] || experiment.defaultVariant;

  // Store assignment
  userAssignments.set(experimentId, variant);

  // Persist to localStorage
  if (typeof window !== 'undefined') {
    const assignments = JSON.parse(
      localStorage.getItem('ab_assignments') || '{}'
    );
    assignments[experimentId] = variant;
    localStorage.setItem('ab_assignments', JSON.stringify(assignments));
  }

  return variant;
};

/**
 * Check if variant is active
 */
export const isVariant = (experimentId: string, variant: string): boolean => {
  return getVariant(experimentId) === variant;
};

/**
 * Track experiment view
 */
export const trackExperimentView = (
  experimentId: string,
  variant: string
): void => {
  if (typeof window === 'undefined') return;

  // Track in analytics
  if (window.gtag) {
    window.gtag('event', 'experiment_view', {
      experiment_id: experimentId,
      variant: variant,
    });
  }
};

/**
 * Track experiment conversion
 */
export const trackExperimentConversion = (
  experimentId: string,
  variant: string,
  conversionType: string
): void => {
  if (typeof window === 'undefined') return;

  // Track in analytics
  if (window.gtag) {
    window.gtag('event', 'experiment_conversion', {
      experiment_id: experimentId,
      variant: variant,
      conversion_type: conversionType,
    });
  }
};

/**
 * Initialize A/B testing (load saved assignments)
 */
export const initABTesting = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const assignments = JSON.parse(
      localStorage.getItem('ab_assignments') || '{}'
    );
    Object.entries(assignments).forEach(([experimentId, variant]) => {
      userAssignments.set(experimentId, variant as string);
    });
  } catch (e) {
    console.error('Failed to load A/B test assignments:', e);
  }
};

/**
 * Example experiment definitions
 */
export const EXAMPLE_EXPERIMENTS: Experiment[] = [
  {
    id: 'hero_cta_text',
    name: 'Hero CTA Text',
    variants: ['variant_a', 'variant_b'],
    defaultVariant: 'variant_a',
  },
  {
    id: 'pricing_display',
    name: 'Pricing Display Style',
    variants: ['card', 'table', 'list'],
    defaultVariant: 'card',
  },
];

