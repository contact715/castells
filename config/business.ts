/**
 * Single source of truth for all business contact information.
 * All components should import from here — never hardcode contacts.
 */

export const BUSINESS = {
  name: 'Castells Agency',
  legalName: 'Castells Agency Inc.',

  // Contact
  phone: '+19563153156',
  phoneFormatted: '+1 (956) 315-3156',
  phoneSchema: '+1-956-315-3156',
  email: 'contact@castells.media',

  // Location
  city: 'Santa Monica',
  state: 'CA',
  country: 'US',

  // Online
  website: 'https://castells.studio',

  // Messenger links
  whatsapp: 'https://wa.me/19563153156',
  telegram: 'https://t.me/+19563153156',
  bookCall: 'https://calendar.app.google/3ydSwahZK2uNw6EA8',

  // Social media (update when real profiles exist)
  social: {
    linkedin: '',
    instagram: '',
    twitter: '',
  },

  // Current availability badge
  availability: 'Q1 2026 — Limited Availability',
} as const;
