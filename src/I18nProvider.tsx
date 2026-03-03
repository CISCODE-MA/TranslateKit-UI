//translate-core/src/I18nProvider.tsx
import React, { useEffect } from 'react';
import i18n, { Resource } from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation } from 'react-i18next';

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

  useEffect(() => {
    const setDirection = (language: string) => {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      const focusableElement = document.querySelector('[aria-label="Language Selector"]');
      if (focusableElement) {
        (focusableElement as HTMLElement).focus();
      }
    };
    setDirection(instance.language || fallbackLng);
    instance.on('languageChanged', setDirection);
    return () => {
      instance.off('languageChanged', setDirection);
    };
  }, [instance, fallbackLng]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}

export { useTranslation };
