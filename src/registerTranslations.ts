// translate-core/src/registerTranslations.ts
import type { ResourceLanguage } from 'i18next';
import i18n from 'i18next';

/**
 * Called by a feature‑library (menu‑module, auth‑module, …)
 * to inject its namespace resources into the shared i18n instance.
 *
 * Example:
 *   registerTranslations('menu', { en, fr })
 */
export function registerTranslations(
  namespace: string,
  bundles: Record<string, ResourceLanguage>   // <-- correct type
) {
  Object.entries(bundles).forEach(([lng, res]) => {
    i18n.addResourceBundle(lng, namespace, res, /* deep */ true, /* overwrite */ true);
  });
}


