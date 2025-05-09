//useT.ts
import { useTranslation } from 'react-i18next';

/**
 * Convenience wrapper so libraries can just
 * const t = useT('menu');   — returns a fn not an object
 */
export function useT(ns: string) {
  const { t } = useTranslation(ns);
  return t;
}
