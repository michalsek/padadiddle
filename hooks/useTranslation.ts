import en from '@/locales/en';

type TranslationKey = keyof typeof en;

export function useTranslation() {
  const t = (key: TranslationKey): string => en[key];

  return { t };
}
