/**
 * i18n (Internationalization) utilities
 * Ready for multi-language support
 */

export type SupportedLocale = 'en' | 'es' | 'fr' | 'de' | 'ru' | 'zh';

export interface Translations {
  [key: string]: string | Translations;
}

// Default locale
export const DEFAULT_LOCALE: SupportedLocale = 'en';

// Supported locales
export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'es', 'fr', 'de', 'ru', 'zh'];

// Translation storage (can be replaced with API or JSON files)
const translations: Record<SupportedLocale, Translations> = {
  en: {
    common: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      blog: 'Blog',
      work: 'Work',
      team: 'Team',
      careers: 'Careers',
    },
  },
  es: {
    common: {
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      contact: 'Contacto',
      blog: 'Blog',
      work: 'Trabajo',
      team: 'Equipo',
      careers: 'Carreras',
    },
  },
  fr: {
    common: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      contact: 'Contact',
      blog: 'Blog',
      work: 'Travail',
      team: 'Équipe',
      careers: 'Carrières',
    },
  },
  de: {
    common: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Dienstleistungen',
      contact: 'Kontakt',
      blog: 'Blog',
      work: 'Arbeit',
      team: 'Team',
      careers: 'Karriere',
    },
  },
  ru: {
    common: {
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      contact: 'Контакты',
      blog: 'Блог',
      work: 'Работы',
      team: 'Команда',
      careers: 'Карьера',
    },
  },
  zh: {
    common: {
      home: '首页',
      about: '关于',
      services: '服务',
      contact: '联系',
      blog: '博客',
      work: '作品',
      team: '团队',
      careers: '职业',
    },
  },
};

/**
 * Get current locale from localStorage or browser
 */
export const getCurrentLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  
  const saved = localStorage.getItem('locale') as SupportedLocale;
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved;
  }
  
  const browserLang = navigator.language.split('-')[0] as SupportedLocale;
  if (SUPPORTED_LOCALES.includes(browserLang)) {
    return browserLang;
  }
  
  return DEFAULT_LOCALE;
};

/**
 * Set locale
 */
export const setLocale = (locale: SupportedLocale): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('locale', locale);
  document.documentElement.lang = locale;
};

/**
 * Get translation by key
 */
export const t = (key: string, locale?: SupportedLocale): string => {
  const currentLocale = locale || getCurrentLocale();
  const keys = key.split('.');
  let value: any = translations[currentLocale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations[DEFAULT_LOCALE];
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};

/**
 * Initialize i18n
 */
export const initI18n = (): void => {
  if (typeof window === 'undefined') return;
  const locale = getCurrentLocale();
  document.documentElement.lang = locale;
};

