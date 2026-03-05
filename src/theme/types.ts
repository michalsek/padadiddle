type ThemeVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Theme spacing tokens for layout and control geometry.
 * Input parameters:
 * - None.
 * Output:
 * - Semantic spacing scale (`2xs` through `2xl`) for migrated UI components.
 * Logic summary:
 * - Keeps layout and component spacing values centralized under one typed map.
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
 * Color contract combining semantic foundation and component groups.
 * Input parameters:
 * - None.
 * Output:
 * - Nested semantic tokens used by new `src/ui` components.
 * Logic summary:
 * - Foundation groups (`background`, `text`, `border`, `line`) serve as reusable
 *   primitives.
 * - `control` and `component` groups provide component-level semantics.
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
 * Main semantic theme contract for migrated component implementations.
 * Input parameters:
 * - None.
 * Output:
 * - Complete semantic token surface for colors, geometry, typography, and effects.
 * Logic summary:
 * - `colors`, `spacing`, `typography`, `radius`, `size`, `opacity`, and
 *   `elevation` support the migrated component layer.
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
};

export type ThemeName = 'light' | 'dark';
