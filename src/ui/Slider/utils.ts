import type { Theme } from '../../theme';
import { SliderVariants } from './constants';
import type { SliderVariant } from './types';

export type SliderPalette = {
  labelColor: string;
  valueColor: string;
  trackColor: string;
  fillColor: string;
  thumbColor: string;
  thumbBorderColor: string;
};

/**
 * Clamps and snaps the incoming slider value into the valid range.
 * Input parameters:
 * - `value`: uncontrolled numeric value that may fall outside the slider range.
 * - `min`: lower bound configured for the slider.
 * - `max`: upper bound configured for the slider.
 * - `step`: step interval used to snap values to discrete stops.
 * Output:
 * - A range-safe value aligned to the nearest valid step.
 * Logic summary:
 * - Normalizes reversed min/max inputs.
 * - Falls back to a step size of `1` when callers pass zero or a negative value.
 * - Rounds to the nearest step after clamping to the slider bounds.
 */
export function normalizeSliderValue(
  value: number,
  min: number,
  max: number,
  step: number,
): number {
  'worklet';

  const safeStep = step > 0 ? step : 1;
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const clampedValue = Math.max(safeMin, Math.min(safeMax, value));
  const stepCount = Math.round((clampedValue - safeMin) / safeStep);
  const snappedValue = safeMin + stepCount * safeStep;

  return Math.max(safeMin, Math.min(safeMax, snappedValue));
}

/**
 * Converts a slider value into a bounded progress ratio.
 * Input parameters:
 * - `value`: current slider value, typically already normalized.
 * - `min`: lower bound configured for the slider.
 * - `max`: upper bound configured for the slider.
 * Output:
 * - A ratio in the inclusive `[0, 1]` range.
 * Logic summary:
 * - Handles reversed min/max inputs.
 * - Returns `0` when the range is invalid or collapsed.
 * - Clamps the final ratio so rendering logic never overflows the track.
 */
export function getSliderRatio(value: number, min: number, max: number): number {
  'worklet';

  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const range = safeMax - safeMin;

  if (range <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(1, (value - safeMin) / range));
}

/**
 * Maps a local track X coordinate into a normalized slider value.
 * Input parameters:
 * - `positionX`: horizontal touch position relative to the slider track.
 * - `trackWidth`: measured width of the interactive slider track.
 * - `min`: lower bound configured for the slider.
 * - `max`: upper bound configured for the slider.
 * - `step`: step interval used to snap values to discrete stops.
 * Output:
 * - A normalized slider value representing the nearest touched step.
 * Logic summary:
 * - Guards against unmeasured tracks by falling back to the minimum bound.
 * - Converts the touch location into a bounded ratio before deriving a raw value.
 * - Reuses normalization so tap and drag behavior match controlled rendering.
 */
export function getSliderValueFromPosition(
  positionX: number,
  trackWidth: number,
  min: number,
  max: number,
  step: number,
): number {
  'worklet';

  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);

  if (trackWidth <= 0) {
    return normalizeSliderValue(safeMin, safeMin, safeMax, step);
  }

  const boundedRatio = Math.max(0, Math.min(1, positionX / trackWidth));
  const rawValue = safeMin + boundedRatio * (safeMax - safeMin);

  return normalizeSliderValue(rawValue, safeMin, safeMax, step);
}

/**
 * Resolves semantic slider colors for the requested variant and state.
 * Input parameters:
 * - `theme`: active semantic theme token object.
 * - `variant`: semantic visual variant requested by the caller.
 * - `disabled`: whether the slider should render muted non-interactive colors.
 * Output:
 * - Theme-derived colors for slider labels, track fill, and thumb styling.
 * Logic summary:
 * - Maps each slider variant back to the limited app theme tokens.
 * - Keeps the track neutral while varying the fill and thumb border by variant.
 * - Switches to transparent-contrast colors when interaction is disabled.
 */
export function getSliderPalette(
  theme: Theme,
  variant: SliderVariant,
  disabled: boolean,
): SliderPalette {
  const variantTokens = SliderVariants[variant];
  const activeFillColor = theme.colors[variantTokens.fillColorToken];

  if (disabled) {
    return {
      labelColor: theme.colors.secondary,
      valueColor: theme.colors.secondary,
      trackColor: theme.colors.backgroundTransparent,
      fillColor: theme.colors.backgroundContrastTransparent,
      thumbColor: theme.colors.background,
      thumbBorderColor: theme.colors.backgroundContrastTransparent,
    };
  }

  return {
    labelColor: theme.colors[variantTokens.labelColorToken],
    valueColor: theme.colors[variantTokens.valueColorToken],
    trackColor: theme.colors.border,
    fillColor: activeFillColor,
    thumbColor: theme.colors.background,
    thumbBorderColor: activeFillColor,
  };
}
