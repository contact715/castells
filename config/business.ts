/**
 * Single source of truth for all business contact information.
 * All components should import from here — never hardcode contacts.
 */

export const BUSINESS = {
  name: 'Castells Media',
  legalName: 'Castells Media Inc.',

  // Contact
  phone: '+19166196006',
  phoneFormatted: '+1 (916) 619-6006',
  phoneSchema: '+1-916-619-6006',
  email: 'contact@castells.media',

  // Location — адрес подтверждён владельцем 22 августа 2026
  street: '1298 Antelope Creek Drive',
  city: 'Roseville',
  state: 'CA',
  zip: '',
  country: 'US',

  // Online
  website: 'https://www.castells.media',

  // Messenger links
  whatsapp: 'https://wa.me/19166196006',
  telegram: 'https://t.me/+19166196006',
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
