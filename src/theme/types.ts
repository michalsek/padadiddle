type ThemeVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Core legacy typography contract kept for backward compatibility.
 * Input parameters:
 * - None.
 * Output:
 * - Typography values that mirror the original `theme.text` shape.
 * Logic summary:
 * - Existing consumers can keep reading `theme.text.*` while migrated components
 *   adopt `theme.typography.*` tokens introduced for the semantic schema.
 */
export type ThemeText = {
  fontFamily: string;
  fontFamilyMedium: string;
  fontFamilyBold: string;
  size: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  lineHeight: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
};

/**
 * Theme spacing tokens for layout and control geometry.
 * Input parameters:
 * - None.
 * Output:
 * - New semantic spacing scale (`2xs` through `2xl`) plus legacy `xxl` alias.
 * Logic summary:
 * - `xxl` remains available so in-flight migrations do not break while `2xl`
 *   becomes the canonical key for new UI components.
 */
export type ThemeSpacing = {
  none: number;
  '2xs': number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  xxl: number;
};

type ThemeButtonColors = {
  background: string;
  border: string;
  text: string;
};

type ThemeSliderColors = {
  label: string;
  value: string;
  track: string;
  fill: string;
  thumb: string;
  thumbBorder: string;
};

type ThemeProgressBarColors = {
  track: string;
  fill: string;
};

/**
 * Color contract combining semantic groups and migration aliases.
 * Input parameters:
 * - None.
 * Output:
 * - Nested semantic tokens used by new `src/ui` components.
 * - Legacy aliases (`surface`, `textPrimary`, etc.) for transitional callers.
 * Logic summary:
 * - Foundation groups (`background`, `text`, `border`, `line`) serve as reusable
 *   primitives.
 * - `control` and `component` groups provide component-level semantics.
 * - Top-level alias fields (`surface`, `textPrimary`, etc.) remain available for
 *   in-flight migration callers.
 */
export type ThemeColors = {
  background: {
    canvas: string;
    canvasSubtle: string;
    surface: string;
    surfaceElevated: string;
    surfaceMuted: string;
    surfaceInverse: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    accent: string;
  };
  border: {
    subtle: string;
    default: string;
    strong: string;
    inverse: string;
  };
  line: {
    subtle: string;
  };
  control: {
    selected: {
      background: string;
      foreground: string;
      border: string;
      label: string;
    };
    unselected: {
      border: string;
      label: string;
    };
  };
  component: {
    button: Record<ThemeVariant, ThemeButtonColors>;
    slider: Record<ThemeVariant, ThemeSliderColors>;
    progressBar: Record<ThemeVariant, ThemeProgressBarColors>;
    dropDown: {
      trigger: {
        border: string;
        background: string;
        text: string;
        caret: string;
      };
      menu: {
        border: string;
        background: string;
      };
      option: {
        text: string;
        selectedBackground: string;
        selectedText: string;
      };
    };
    bottomSheet: {
      background: string;
      borderTop: string;
    };
    avatar: {
      background: string;
      initials: string;
    };
    icon: {
      tint: string;
    };
    spinner: {
      tint: string;
    };
    link: {
      text: string;
    };
    heading: {
      text: string;
    };
    bodyText: {
      default: string;
      muted: string;
    };
  };
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  danger: string;
};

/**
 * Semantic typography tokens for new component implementations.
 * Input parameters:
 * - None.
 * Output:
 * - Shared text sizing, line-height, and weight definitions for `src/ui`.
 * Logic summary:
 * - Heading/body/label roles receive separate scalable token sets.
 * - Weight values stay string-based for direct `fontWeight` compatibility.
 */
export type ThemeTypography = {
  body: {
    sm: number;
    md: number;
  };
  label: {
    sm: number;
    md: number;
  };
  heading: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
  };
  lineHeight: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  weight: {
    medium: string;
    semibold: string;
    bold: string;
  };
};

/**
 * Dimensional token contract for component sizing and radii.
 * Input parameters:
 * - None.
 * Output:
 * - Radius and size primitives for controls and layout targets.
 * Logic summary:
 * - Keeps geometry decisions centralized so component tasks avoid hard-coded
 *   dimensions.
 */
export type ThemeRadius = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  pill: number;
  full: number;
};

export type ThemeSize = {
  icon: {
    md: number;
  };
  avatar: {
    md: number;
  };
  checkbox: {
    md: number;
  };
  radio: {
    outer: number;
    dot: number;
  };
  slider: {
    thumb: number;
    track: number;
  };
  progressBar: {
    track: number;
  };
  touch: {
    minTarget: number;
  };
};

/**
 * Main theme contract for migration and backward compatibility.
 * Input parameters:
 * - None.
 * Output:
 * - Complete semantic token surface plus legacy aliases used by existing call-sites.
 * Logic summary:
 * - `colors`, `spacing`, `typography`, `radius`, `size`, `opacity`, and
 *   `elevation` support the migrated component layer.
 * - `text` is retained to keep pre-migration typography callers functioning.
 */
export type Theme = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  size: ThemeSize;
  typography: ThemeTypography;
  opacity: {
    disabled: number;
    pressed: number;
  };
  elevation: {
    menu: number;
  };
  text: ThemeText;
};

export type ThemeName = 'light' | 'dark';
