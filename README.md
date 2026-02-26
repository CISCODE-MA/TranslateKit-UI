# Translate Core Library

## Introduction
The Translate Core Library is a React-based library designed to provide internationalization (i18n) support for web applications. It includes components and utilities to manage language selection, translations, and accessibility features.

## Getting Started
Follow these steps to get the library up and running in your project:

### Installation
Install the library and its peer dependencies:
```bash
npm install @ciscode/ui-translate-core react react-i18next i18next i18next-browser-languagedetector
```

### Software Dependencies
- React 18+
- i18next 25+
- react-i18next 15+

### Usage
Wrap your application with the `I18nProvider` and use the `LanguageSelectedLang` component to enable language selection:
```tsx
import { I18nProvider, LanguageSelectedLang } from '@ciscode/ui-translate-core';

<I18nProvider resources={resources} lng="en">
  <LanguageSelectedLang />
</I18nProvider>
```

## Build and Test
### Build
To build the library for production:
```bash
npm run build
```

### Test
Run unit and integration tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:cov
```

## Contribute
We welcome contributions to improve the library. Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests for your changes.
4. Submit a pull request.

For detailed contribution guidelines, refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License
This project is licensed under the ISC License.

---
For more information, refer to the [official documentation].