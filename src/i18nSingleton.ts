// translate-core/src/i18nSingleton.ts
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // 1️⃣ detect user language from querystring, cookie, localStorage, navigator
  .use(LanguageDetector)
  // 2️⃣ hook into react-i18next
  .use(initReactI18next)
  // 3️⃣ initialize with your defaults
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    resources: {},                  // feature-libs will register later
    interpolation: { escapeValue: false },
    react: { useSuspense: false },  // or true if you handle suspense
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      cookieMinutes: 10,
      cookieDomain: window.location.hostname
    }
  });

export const i18nSingleton = i18n;
