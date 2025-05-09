// src/I18nProvider.tsx
import React from 'react';
import i18n, { Resource } from 'i18next';
import { initReactI18next, I18nextProvider} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export interface I18nProviderProps {
  resources?: Resource;
  lng?: string;
  fallbackLng?: string;
  children: React.ReactNode;
}

export function I18nProvider({
  resources = {},
  lng,
  fallbackLng = 'en',
  children,
}: I18nProviderProps) {
  const [instance] = React.useState(() => {
    const inst = i18n.createInstance();
    inst
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        lng,
        fallbackLng,
        interpolation: { escapeValue: false },
        detection: {
          order: ['querystring', 'cookie', 'localStorage', 'navigator'],
          caches: ['localStorage', 'cookie'],
        },
      });
    return inst;
  });

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}


