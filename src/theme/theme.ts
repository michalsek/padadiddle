import type { Theme, ThemeName } from './types';

/**
 * Creates a fresh text token object for a single theme instance.
 * Input: none.
 * Output: a new `Theme['text']` object with independent nested references (`size`, `lineHeight`).
 * Logic summary:
 * - Returns a new object tree each time to prevent cross-theme mutation coupling.
 */
function createTextTokens(): Theme['text'] {
  return {
    fontFamily: 'System',
    fontFamilyMedium: 'System',
    fontFamilyBold: 'System',
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 22,
      lg: 28,
      xl: 32,
    },
  };
}

/**
 * Creates a fresh spacing token object for a single theme instance.
 * Input parameters:
 * - None.
 * Output:
 * - A new semantic spacing map with migration alias support (`xxl` -> `2xl`).
 * Logic summary:
 * - Produces the OMA-16 spacing contract required by migrated components.
 * - Preserves `xxl` for in-flight callers until all usage is moved to `2xl`.
 */
function createSpacingTokens(): Theme['spacing'] {
  const twoXl = 32;

  return {
    none: 0,
    '2xs': 4,
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
    '2xl': twoXl,
    xxl: twoXl,
  };
}

/**
 * Creates corner radius tokens consumed by controls and layout primitives.
 * Input parameters:
 * - None.
 * Output:
 * - `Theme['radius']` object with semantic corner values and pill/full aliases.
 * Logic summary:
 * - Centralizes geometric radius values so component tasks avoid hard-coded numbers.
 */
function createRadiusTokens(): Theme['radius'] {
  return {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    pill: 999,
    full: 999,
  };
}

/**
 * Creates component size tokens used by migrated controls.
 * Input parameters:
 * - None.
 * Output:
 * - `Theme['size']` object containing shared dimensions for controls and targets.
 * Logic summary:
 * - Keeps all known geometry constants under one typed source of truth.
 */
function createSizeTokens(): Theme['size'] {
  return {
    icon: {
      md: 20,
    },
    avatar: {
      md: 40,
    },
    checkbox: {
      md: 20,
    },
    radio: {
      outer: 20,
      dot: 10,
    },
    slider: {
      thumb: 18,
      track: 22,
    },
    progressBar: {
      track: 4,
    },
    touch: {
      minTarget: 44,
    },
  };
}

/**
 * Creates semantic typography tokens for `src/ui` primitives.
 * Input parameters:
 * - None.
 * Output:
 * - `Theme['typography']` map for body, label, heading, line-height, and weight roles.
 * Logic summary:
 * - Mirrors audited values from legacy components while exposing role-based keys.
 */
function createTypographyTokens(): Theme['typography'] {
  return {
    body: {
      sm: 12,
      md: 14,
    },
    label: {
      sm: 12,
      md: 13,
    },
    heading: {
      h1: 32,
      h2: 26,
      h3: 22,
      h4: 18,
    },
    lineHeight: {
      sm: 16,
      md: 20,
      lg: 22,
      xl: 28,
      '2xl': 32,
      '3xl': 38,
      '4xl': 44,
    },
    weight: {
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  };
}

/**
 * Creates opacity tokens shared across interactive components.
 * Input parameters:
 * - None.
 * Output:
 * - `Theme['opacity']` containing disabled/pressed behavior constants.
 * Logic summary:
 * - Keeps interaction alpha values centralized for consistent feedback states.
 */
function createOpacityTokens(): Theme['opacity'] {
  return {
    disabled: 0.5,
    pressed: 0.75,
  };
}

/**
 * Creates elevation tokens used by layered surfaces.
 * Input parameters:
 * - None.
 * Output:
 * - `Theme['elevation']` with known elevation levels needed by migrated components.
 * Logic summary:
 * - Establishes a typed container for future platform-specific elevation values.
 */
function createElevationTokens(): Theme['elevation'] {
  return {
    menu: 6,
  };
}

type ThemePalette = {
  background: Theme['colors']['background'];
  text: Theme['colors']['text'];
  border: Theme['colors']['border'];
  line: Theme['colors']['line'];
  control: Theme['colors']['control'];
  slider: Theme['colors']['component']['slider'];
  progressBar: Theme['colors']['component']['progressBar'];
  dropDown: Theme['colors']['component']['dropDown'];
  bottomSheet: Theme['colors']['component']['bottomSheet'];
  danger: string;
};

/**
 * Resolves the audited semantic palette for a color-scheme variant.
 * Input parameters:
 * - `themeName`: requested color scheme.
 * Output:
 * - Normalized foundation/component colors used to build `Theme['colors']`.
 * Logic summary:
 * - Encapsulates all light/dark values in one place.
 * - Keeps `createColorTokens` focused on schema composition and alias wiring.
 */
function getThemePalette(themeName: ThemeName): ThemePalette {
  if (themeName === 'dark') {
    return {
      background: {
        canvas: '#030712',
        canvasSubtle: '#374151',
        surface: '#111827',
        surfaceElevated: '#0b1220',
        surfaceMuted: '#1f2937',
        surfaceInverse: '#f9fafb',
      },
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        muted: '#9ca3af',
        inverse: '#111827',
        accent: '#93c5fd',
      },
      border: {
        subtle: '#374151',
        default: '#4b5563',
        strong: '#f9fafb',
        inverse: '#111827',
      },
      line: {
        subtle: '#1f2937',
      },
      control: {
        selected: {
          background: '#f9fafb',
          foreground: '#111827',
          border: '#f9fafb',
          label: '#f3f4f6',
        },
        unselected: {
          border: '#6b7280',
          label: '#d1d5db',
        },
      },
      slider: {
        primary: {
          label: '#f9fafb',
          value: '#d1d5db',
          track: '#374151',
          fill: '#f9fafb',
          thumb: '#111827',
          thumbBorder: '#f9fafb',
        },
        secondary: {
          label: '#e5e7eb',
          value: '#9ca3af',
          track: '#4b5563',
          fill: '#d1d5db',
          thumb: '#1f2937',
          thumbBorder: '#d1d5db',
        },
        ghost: {
          label: '#d1d5db',
          value: '#9ca3af',
          track: '#1f2937',
          fill: '#9ca3af',
          thumb: '#0f172a',
          thumbBorder: '#9ca3af',
        },
      },
      progressBar: {
        primary: {
          track: '#334155',
          fill: '#f9fafb',
        },
        secondary: {
          track: '#374151',
          fill: '#d1d5db',
        },
        ghost: {
          track: '#1f2937',
          fill: '#9ca3af',
        },
      },
      dropDown: {
        trigger: {
          border: '#374151',
          background: '#111827',
          text: '#f9fafb',
          caret: '#d1d5db',
        },
        menu: {
          border: '#374151',
          background: '#111827',
        },
        option: {
          text: '#f9fafb',
          selectedBackground: '#f9fafb',
          selectedText: '#111827',
        },
      },
      bottomSheet: {
        background: '#0b1220',
        borderTop: '#1f2937',
      },
      danger: '#FDA29B',
    };
  }

  return {
    background: {
      canvas: '#f9fafb',
      canvasSubtle: '#f3f4f6',
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      surfaceMuted: '#e5e7eb',
      surfaceInverse: '#111827',
    },
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#4b5563',
      inverse: '#f9fafb',
      accent: '#2563eb',
    },
    border: {
      subtle: '#e5e7eb',
      default: '#d1d5db',
      strong: '#111827',
      inverse: '#f9fafb',
    },
    line: {
      subtle: '#e2e8f0',
    },
    control: {
      selected: {
        background: '#111827',
        foreground: '#f9fafb',
        border: '#111827',
        label: '#111827',
      },
      unselected: {
        border: '#9ca3af',
        label: '#374151',
      },
    },
    slider: {
      primary: {
        label: '#0f172a',
        value: '#334155',
        track: '#e2e8f0',
        fill: '#0f172a',
        thumb: '#ffffff',
        thumbBorder: '#0f172a',
      },
      secondary: {
        label: '#1f2937',
        value: '#475569',
        track: '#e5e7eb',
        fill: '#64748b',
        thumb: '#f8fafc',
        thumbBorder: '#64748b',
      },
      ghost: {
        label: '#334155',
        value: '#64748b',
        track: '#f1f5f9',
        fill: '#94a3b8',
        thumb: '#ffffff',
        thumbBorder: '#94a3b8',
      },
    },
    progressBar: {
      primary: {
        track: '#e2e8f0',
        fill: '#0f172a',
      },
      secondary: {
        track: '#e5e7eb',
        fill: '#64748b',
      },
      ghost: {
        track: '#f1f5f9',
        fill: '#94a3b8',
      },
    },
    dropDown: {
      trigger: {
        border: '#d4d4d8',
        background: '#ffffff',
        text: '#111827',
        caret: '#6b7280',
      },
      menu: {
        border: '#d4d4d8',
        background: '#ffffff',
      },
      option: {
        text: '#111827',
        selectedBackground: '#111827',
        selectedText: '#ffffff',
      },
    },
    bottomSheet: {
      background: '#ffffff',
      borderTop: '#e2e8f0',
    },
    danger: '#D92D20',
  };
}

/**
 * Creates the full semantic color token tree plus migration aliases.
 * Input parameters:
 * - `themeName`: requested color scheme.
 * Output:
 * - `Theme['colors']` containing foundation, control, component, and alias tokens.
 * Logic summary:
 * - Builds semantic groups first.
 * - Derives alias values from semantic sources so updates stay in sync.
 */
function createColorTokens(themeName: ThemeName): Theme['colors'] {
  const palette = getThemePalette(themeName);

  return {
    background: palette.background,
    text: palette.text,
    border: palette.border,
    line: palette.line,
    control: palette.control,
    component: {
      button: {
        primary: {
          background: palette.background.surfaceInverse,
          border: palette.border.strong,
          text: palette.text.inverse,
        },
        secondary: {
          background: palette.background.canvasSubtle,
          border: palette.border.default,
          text: palette.text.primary,
        },
        ghost: {
          background: palette.background.surface,
          border: palette.border.subtle,
          text: palette.text.primary,
        },
      },
      slider: palette.slider,
      progressBar: palette.progressBar,
      dropDown: palette.dropDown,
      bottomSheet: palette.bottomSheet,
      avatar: {
        background: palette.background.surfaceMuted,
        initials: palette.text.primary,
      },
      icon: {
        tint: palette.text.primary,
      },
      spinner: {
        tint: palette.text.primary,
      },
      link: {
        text: palette.text.accent,
      },
      heading: {
        text: palette.text.primary,
      },
      bodyText: {
        default: palette.text.primary,
        muted: palette.text.muted,
      },
    },
    surface: palette.background.surface,
    textPrimary: palette.text.primary,
    textSecondary: palette.text.secondary,
    accent: palette.text.accent,
    danger: palette.danger,
  };
}

/**
 * Creates a complete theme token object for a color-scheme variant.
 * Input parameters:
 * - `themeName`: requested color scheme.
 * Output:
 * - Fully populated `Theme` object including semantic tokens and migration aliases.
 * Logic summary:
 * - Aggregates all token factories so light/dark themes stay structurally aligned.
 */
function createTheme(themeName: ThemeName): Theme {
  return {
    colors: createColorTokens(themeName),
    spacing: createSpacingTokens(),
    radius: createRadiusTokens(),
    size: createSizeTokens(),
    typography: createTypographyTokens(),
    opacity: createOpacityTokens(),
    elevation: createElevationTokens(),
    text: createTextTokens(),
  };
}

/**
 * Light theme token set.
 * Input parameters:
 * - None.
 * Output:
 * - A complete `Theme` object configured for light mode semantics.
 * Logic summary:
 * - Delegates creation to `createTheme` to avoid duplicate schema wiring.
 */
export const lightTheme: Theme = createTheme('light');

/**
 * Dark theme token set.
 * Input parameters:
 * - None.
 * Output:
 * - A complete `Theme` object configured for dark mode semantics.
 * Logic summary:
 * - Delegates creation to `createTheme` to ensure parity with light schema keys.
 */
export const darkTheme: Theme = createTheme('dark');

/**
 * Theme bundle exported for app-wide consumption.
 * Input: none.
 * Output: typed collection keyed by color scheme names (`light`, `dark`).
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} satisfies Record<ThemeName, Theme>;
