import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
    },
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'cookie'], // Omit 'navigator' so it defaults to fallbackLng (fr) instead of browser language
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false, // React already safeguards from xss
    },
  });

export default i18n;
