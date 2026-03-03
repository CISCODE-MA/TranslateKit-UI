# Component Development Instructions - translate-core

> **Purpose**: React component development standards for internationalization (i18n) UI components.

---

## 🎯 Component Architecture

### Component Structure
```
ComponentName/
  ├── ComponentName.tsx       # Main component
  ├── ComponentName.test.tsx  # Tests
  ├── ComponentName.types.ts  # Props & types
  └── index.ts                # Exports
```

### I18n Component Template
```typescript
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSelectorProps } from './LanguageSelector.types';

/**
 * Language selector component for switching locales
 * @param {LanguageSelectorProps} props - Component props
 * @returns {JSX.Element} Rendered language selector
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  availableLanguages,
  currentLanguage,
  onLanguageChange,
  variant = 'dropdown',
  showFlags = true,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`language-selector ${className}`}>
      <label htmlFor="language-select">
        {t('common.selectLanguage')}
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        aria-label={t('common.changeLanguage')}
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {showFlags && lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

LanguageSelector.displayName = 'LanguageSelector';
```

---

## 📝 Props Standards

### I18n Component Props
```typescript
export interface LanguageSelectorProps {
  /** Available languages */
  availableLanguages: Language[];
  /** Currently selected language code */
  currentLanguage: string;
  /** Callback when language changes */
  onLanguageChange: (languageCode: string) => void;
  /** Display variant */
  variant?: 'dropdown' | 'buttons' | 'menu';
  /** Show flag icons */
  showFlags?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export interface Language {
  /** ISO 639-1 language code */
  code: string;
  /** Display name in native language */
  name: string;
  /** Optional flag emoji */
  flag?: string;
  /** Text direction (LTR/RTL) */
  dir?: 'ltr' | 'rtl';
}
```

---

## ♿ Accessibility (A11y)

### Language Selector Accessibility
```typescript
// ✅ Good - Accessible language selector
<div role="navigation" aria-label="Language selection">
  <label htmlFor="lang-select" id="lang-label">
    {t('selectLanguage')}
  </label>
  <select
    id="lang-select"
    value={currentLang}
    onChange={handleChange}
    aria-labelledby="lang-label"
    aria-describedby="lang-hint"
  >
    {languages.map(lang => (
      <option key={lang.code} value={lang.code} lang={lang.code}>
        {lang.name}
      </option>
    ))}
  </select>
  <span id="lang-hint" className="visually-hidden">
    {t('languageChangeHint')}
  </span>
</div>

// ❌ Bad - Inaccessible
<div>
  <div>Language:</div>
  <select onChange={e => setLang(e.target.value)}>
    {languages.map(l => <option value={l.code}>{l.name}</option>)}
  </select>
</div>
```

### RTL (Right-to-Left) Support
```typescript
// Detect and apply text direction
useEffect(() => {
  const lang = languages.find(l => l.code === currentLanguage);
  document.documentElement.dir = lang?.dir || 'ltr';
  document.documentElement.lang = currentLanguage;
}, [currentLanguage]);
```

### Required Accessibility Features
- ✅ `lang` attribute on HTML elements
- ✅ `dir` attribute for RTL languages
- ✅ Proper labels for language selectors
- ✅ ARIA attributes for dynamic content
- ✅ Keyboard navigation support

---

## 🎨 Theming & Styling

### RTL-Aware Styles
```typescript
// Use logical properties for RTL support
const styles = css`
  margin-inline-start: 1rem;  /* Instead of margin-left */
  padding-inline-end: 0.5rem; /* Instead of padding-right */
  border-inline-start: 1px solid; /* Instead of border-left */
  
  /* For directional specific styles */
  [dir='rtl'] & {
    text-align: right;
  }
  
  [dir='ltr'] & {
    text-align: left;
  }
`;
```

### Language-Specific Font Loading
```typescript
const fontFamilies = {
  en: "'Inter', sans-serif",
  ar: "'Cairo', 'Arial', sans-serif",
  ja: "'Noto Sans JP', sans-serif",
  zh: "'Noto Sans SC', sans-serif",
  ko: "'Noto Sans KR', sans-serif",
};

const getLanguageFont = (lang: string) => {
  return fontFamilies[lang] || fontFamilies.en;
};
```

---

## 🧪 Component Testing

### Test Coverage Requirements
```typescript
describe('LanguageSelector', () => {
  const mockLanguages: Language[] = [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
    { code: 'es', name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  ];

  it('renders all available languages', () => {
    render(
      <LanguageSelector
        availableLanguages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={jest.fn()}
      />
    );
    
    expect(screen.getByRole('option', { name: /English/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /العربية/ })).toBeInTheDocument();
  });

  it('calls onLanguageChange when language is selected', async () => {
    const onLanguageChange = jest.fn();
    render(
      <LanguageSelector
        availableLanguages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={onLanguageChange}
      />
    );
    
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: /Español/ })
    );
    
    expect(onLanguageChange).toHaveBeenCalledWith('es');
  });

  it('shows flags when enabled', () => {
    render(
      <LanguageSelector
        availableLanguages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={jest.fn()}
        showFlags
      />
    );
    
    expect(screen.getByText(/🇸🇦/)).toBeInTheDocument();
  });

  it('sets document direction on language change', async () => {
    const { rerender } = render(
      <LanguageSelector
        availableLanguages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={jest.fn()}
      />
    );
    
    expect(document.documentElement.dir).toBe('ltr');
    
    rerender(
      <LanguageSelector
        availableLanguages={mockLanguages}
        currentLanguage="ar"
        onLanguageChange={jest.fn()}
      />
    );
    
    // Component should trigger dir change
    expect(document.documentElement.dir).toBe('rtl');
  });
});
```

### Translation Hook Testing
```typescript
describe('useTranslation', () => {
  it('returns translated text', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <I18nProvider locale="en" translations={mockTranslations}>
          {children}
        </I18nProvider>
      ),
    });
    
    expect(result.current.t('common.hello')).toBe('Hello');
  });

  it('falls back to key when translation missing', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t('missing.key')).toBe('missing.key');
  });

  it('interpolates variables', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t('welcome.user', { name: 'John' })).toBe('Welcome, John!');
  });
});
```

---

## 🔄 State Management

### I18n Context Provider
```typescript
import { createContext, useContext, useState, useCallback } from 'react';

interface I18nContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{
  children: React.ReactNode;
  defaultLocale: string;
  translations: Record<string, any>;
}> = ({ children, defaultLocale, translations }) => {
  const [locale, setLocaleState] = useState(defaultLocale);

  const setLocale = useCallback((newLocale: string) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    // Update dir based on locale
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    document.documentElement.dir = rtlLanguages.includes(newLocale) ? 'rtl' : 'ltr';
  }, []);

  const t = useCallback((key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    let value = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') return key;
    
    // Simple interpolation
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] || '');
    }
    
    return value;
  }, [locale, translations]);

  const dir = ['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};
```

---

## 📦 Component Exports

### Public API (index.ts)
```typescript
// Export provider and hooks
export { I18nProvider, useTranslation } from './I18nContext';
export { LanguageSelector } from './LanguageSelector';

// Export utilities
export { formatDate, formatNumber, formatCurrency } from './utils/formatters';
export { loadTranslations } from './utils/loaders';

// Export types
export type { Language, I18nConfig, TranslationKey } from './types';
```

---

## 🚫 Anti-Patterns to Avoid

### ❌ Hardcoded Text
```typescript
// Bad - Hardcoded English text
<button>Click Me</button>

// Good - Translated text
<button>{t('buttons.click')}</button>
```

### ❌ Ignoring RTL
```typescript
// Bad - Assumes LTR
<div style={{ textAlign: 'left', marginLeft: 20 }}>

// Good - Direction-aware
<div style={{ textAlign: 'start', marginInlineStart: 20 }}>
```

### ❌ Date/Number Formatting Without Locale
```typescript
// Bad - Uses default locale
const formatted = new Date().toLocaleDateString();

// Good - Uses current locale
const { locale } = useTranslation();
const formatted = new Date().toLocaleDateString(locale);
```

---

## 📋 Pre-Commit Checklist

- [ ] All user-facing text uses `t()` function
- [ ] RTL support implemented (dir, logical properties)
- [ ] `lang` attribute set on document/elements
- [ ] Language selector is keyboard accessible
- [ ] Date/number formatting uses current locale
- [ ] Pluralization rules handled correctly
- [ ] Translation keys follow naming convention
- [ ] Fallback text provided for missing translations
- [ ] Tests cover different locales
- [ ] Component works in RTL mode

---

## 📚 Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [W3C Internationalization](https://www.w3.org/International/)
- [RTL Styling Guide](https://rtlstyling.com/)
- [Unicode CLDR](https://cldr.unicode.org/)
- [Intl API (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
