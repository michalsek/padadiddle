import type { SliderVariant } from './types';

export const SLIDER_THUMB_SIZE = 18;

export const SLIDER_VARIANTS: Record<
  SliderVariant,
  {
    lightLabel: string;
    darkLabel: string;
    lightValue: string;
    darkValue: string;
    lightTrack: string;
    darkTrack: string;
    lightFill: string;
    darkFill: string;
    lightThumb: string;
    darkThumb: string;
    lightThumbBorder: string;
    darkThumbBorder: string;
  }
> = {
  primary: {
    lightLabel: '#0f172a',
    darkLabel: '#f9fafb',
    lightValue: '#334155',
    darkValue: '#d1d5db',
    lightTrack: '#e2e8f0',
    darkTrack: '#374151',
    lightFill: '#0f172a',
    darkFill: '#f9fafb',
    lightThumb: '#ffffff',
    darkThumb: '#111827',
    lightThumbBorder: '#0f172a',
    darkThumbBorder: '#f9fafb',
  },
  secondary: {
    lightLabel: '#1f2937',
    darkLabel: '#e5e7eb',
    lightValue: '#475569',
    darkValue: '#9ca3af',
    lightTrack: '#e5e7eb',
    darkTrack: '#4b5563',
    lightFill: '#64748b',
    darkFill: '#d1d5db',
    lightThumb: '#f8fafc',
    darkThumb: '#1f2937',
    lightThumbBorder: '#64748b',
    darkThumbBorder: '#d1d5db',
  },
  ghost: {
    lightLabel: '#334155',
    darkLabel: '#d1d5db',
    lightValue: '#64748b',
    darkValue: '#9ca3af',
    lightTrack: '#f1f5f9',
    darkTrack: '#1f2937',
    lightFill: '#94a3b8',
    darkFill: '#9ca3af',
    lightThumb: '#ffffff',
    darkThumb: '#0f172a',
    lightThumbBorder: '#94a3b8',
    darkThumbBorder: '#9ca3af',
  },
};
