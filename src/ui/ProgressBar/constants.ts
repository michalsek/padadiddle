import type { ProgressBarVariant } from './types';

export const ProgressBarDefaultHeight = 6;
export const ProgressBarDefaultVariant: ProgressBarVariant = 'primary';
export const ProgressBarAnimationDuration = 180;

export const ProgressBarVariants: Record<
  ProgressBarVariant,
  {
    fillColorToken: 'primary' | 'secondary' | 'backgroundContrastTransparent';
    trackColorToken: 'border' | 'backgroundTransparent';
  }
> = {
  primary: {
    fillColorToken: 'primary',
    trackColorToken: 'border',
  },
  secondary: {
    fillColorToken: 'secondary',
    trackColorToken: 'border',
  },
  ghost: {
    fillColorToken: 'backgroundContrastTransparent',
    trackColorToken: 'backgroundTransparent',
  },
};
