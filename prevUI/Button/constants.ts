import type { ButtonVariant } from './types';

export const BUTTON_VARIANTS: Record<
  ButtonVariant,
  {
    lightBackground: string;
    darkBackground: string;
    lightBorder: string;
    darkBorder: string;
    lightText: string;
    darkText: string;
  }
> = {
  primary: {
    lightBackground: '#111827',
    darkBackground: '#f9fafb',
    lightBorder: '#111827',
    darkBorder: '#f9fafb',
    lightText: '#f9fafb',
    darkText: '#111827',
  },
  secondary: {
    lightBackground: '#f3f4f6',
    darkBackground: '#374151',
    lightBorder: '#d1d5db',
    darkBorder: '#4b5563',
    lightText: '#111827',
    darkText: '#f9fafb',
  },
  ghost: {
    lightBackground: '#ffffff',
    darkBackground: '#111827',
    lightBorder: '#e5e7eb',
    darkBorder: '#374151',
    lightText: '#111827',
    darkText: '#f9fafb',
  },
};
