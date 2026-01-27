// translate-core/src/LanguageSelector.tsx
import React from 'react';
import { useTranslation } from './I18nProvider';

export interface LanguageSelectorProps {
  /** List of supported language codes (ISO), defaults to */
  supportedLangs?: string[];
  /** Optional CSS className for styling the <select> */
  className?: string;
}

const defaultLangs = ['en', 'fr', 'es', 'ar', 'it'];

/**
 * A dropdown to switch the current i18n language at runtime.
 * Reads/writes via react-i18next, and updates document direction automatically
 * (RTL if set up in your I18nProvider).
 */
export function LanguageSelectedLang({
  supportedLangs = defaultLangs,
  className,
}: LanguageSelectorProps) {
  const { i18n } = useTranslation();

  const current = i18n.language || supportedLangs[0];

  return (
    <select
      value={current}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
      }}
      className={className}
    >
      {supportedLangs.map((lng) => (
        <option key={lng} value={lng}>
          {lng.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
