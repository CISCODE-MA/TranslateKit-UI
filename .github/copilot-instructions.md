# Copilot Instructions - @ciscode/ui-translate-kit

> **Purpose**: Development guidelines for @ciscode/ui-translate-kit - centralized i18n provider and translation utilities for React apps.

---

## 🎯 Package Overview

**Package**: `@ciscode/ui-translate-kit`  
**Type**: React Frontend i18n Library  
**Purpose**: Centralized internationalization and translation management for React apps

### This Package Provides:

- `I18nProvider` - React context provider for i18n
- `useT` - Hook for accessing translation function
- Translation registration utilities
- Language selection components
- Type-safe translation keys
- RTL/LTR language support
- Multiple language management

---

## 🏗️ Project Structure

```
src/
  ├── I18nProvider.tsx           # Main context provider
  ├── i18nSingleton.ts           # Singleton instance
  ├── LanguageSelectedLang.tsx   # Language selection component
  ├── registerTranslations.ts    # Translation registration
  ├── useT.ts                    # Translation hook
  └── index.ts                   # Public exports
```

---

## 📝 Naming Conventions

**Components**: `PascalCase.tsx`

- `I18nProvider.tsx`
- `LanguageSelectedLang.tsx`

**Hooks**: `camelCase.ts` with `use` prefix

- `useT.ts`

**Functions**: `camelCase.ts`

- `registerTranslations.ts`

**Utilities**: `camelCase.ts`

- `i18nSingleton.ts`

---

## 🧪 Testing Standards

### Coverage Target: 80%+

**Unit Tests:**

- ✅ Translation hook functionality
- ✅ Language switching
- ✅ Translation loading
- ✅ Context providers

**Integration Tests:**

- ✅ End-to-end translation flow
- ✅ Language persistence
- ✅ Multi-language switching

---

## 📚 Documentation

### JSDoc Required For:

- All exported components
- All exported hooks
- All exported functions
- All public utilities

### Example:

```typescript
/**
 * Hook to access the translation function
 * @returns Translation function (key: string) => string
 */
export function useT(): (key: string) => string;
```

---

## 🎨 Code Style

- ESLint with TypeScript support
- Prettier formatting
- TypeScript strict mode
- Functional components only
- Pure functions for translation logic

---

## 🔄 Development Workflow

### Branch Naming:

```bash
feature/TC-123-add-language
bugfix/TC-456-fix-translation
refactor/TC-789-improve-performance
```

### Before Publishing:

- [ ] All tests passing
- [ ] Coverage >= 80%
- [ ] ESLint checks pass
- [ ] TypeScript strict mode passes
- [ ] All public APIs documented
- [ ] Changeset created

---

## 📦 Versioning

**MAJOR** (x.0.0): Breaking API changes
**MINOR** (0.x.0): New features (backward compatible)
**PATCH** (0.0.x): Bug fixes

Always create a changeset using `npm run changeset`.

---

## 🔐 Security

- Never expose translation keys with sensitive data
- Validate language codes
- Sanitize user-provided strings in translations
- No eval() or dynamic code execution

---

## 🚫 Restrictions

**NEVER without approval:**

- Breaking changes to translation function signatures
- Removing language support
- Changing storage mechanism

**CAN do autonomously:**

- Adding new languages
- Bug fixes
- Performance improvements
- Documentation updates

---

## 💬 Communication

- Brief and direct
- This package affects all @ciscode/\* apps
- Coordinate language changes with design team
- Flag breaking changes immediately

---

---

_Last Updated: March 3, 2026_
_Version: 1.0.0_
_Package\*\*: @ciscode/ui-translate-kit_
