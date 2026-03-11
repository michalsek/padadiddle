import type { SliderVariant } from "./types";

export const SliderDefaultStep = 1;
export const SliderDefaultVariant: SliderVariant = "primary";
export const SliderTrackHeight = 4;
export const SliderThumbSize = 16;
export const SliderThumbBorderWidth = 3.5;
export const SliderHeaderGap = 8;
export const SliderDisabledOpacity = 0.5;
export const SliderPressedOpacity = 0.85;
export const SliderLabelFontWeight = "600";
export const SliderValueFontWeight = "600";
export const SliderAnimationDuration = 120;

export const SliderVariants: Record<
  SliderVariant,
  {
    fillColorToken: "primary" | "secondary" | "backgroundContrastTransparent";
    labelColorToken: "textBase" | "secondary";
    valueColorToken: "secondary" | "textBase";
  }
> = {
  primary: {
    fillColorToken: "primary",
    labelColorToken: "textBase",
    valueColorToken: "secondary",
  },
  secondary: {
    fillColorToken: "secondary",
    labelColorToken: "textBase",
    valueColorToken: "secondary",
  },
  ghost: {
    fillColorToken: "backgroundContrastTransparent",
    labelColorToken: "secondary",
    valueColorToken: "secondary",
  },
};
