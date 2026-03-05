import type { ProgressBarVariant } from './types';

export const PROGRESS_BAR_DEFAULT_HEIGHT = 4;

export const PROGRESS_BAR_VARIANTS: Record<
  ProgressBarVariant,
  {
    lightTrack: string;
    darkTrack: string;
    lightFill: string;
    darkFill: string;
  }
> = {
  primary: {
    lightTrack: '#e2e8f0',
    darkTrack: '#334155',
    lightFill: '#0f172a',
    darkFill: '#f9fafb',
  },
  secondary: {
    lightTrack: '#e5e7eb',
    darkTrack: '#374151',
    lightFill: '#64748b',
    darkFill: '#d1d5db',
  },
  ghost: {
    lightTrack: '#f1f5f9',
    darkTrack: '#1f2937',
    lightFill: '#94a3b8',
    darkFill: '#9ca3af',
  },
};
