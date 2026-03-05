import type { Theme, ThemeName } from './types';

/**
 * Creates a fresh spacing token object for a single theme instance.
 * Input parameters:
 * - None.
 * Output:
 * - A semantic spacing map aligned with the OMA-16 schema.
 * Logic summary:
 * - Produces the OMA-16 spacing contract required by migrated components.
 */
function createSpacingTokens(): Theme['spacing'] {
  return {
    none: 0,
    '2xs': 4,
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
    '2xl': 32,
  };
}

/**
 * Creates corner radius tokens consumed by controls and layout primitives.
 * Input parameters:
 * - None.
 * Output:
 * - `Theme['radius']` object with semantic corner values.
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
 * - Mirrors audited component values while exposing role-based keys.
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
};

/**
 * Resolves the audited semantic palette for a color-scheme variant.
 * Input parameters:
 * - `themeName`: requested color scheme.
 * Output:
 * - Normalized foundation/component colors used to build `Theme['colors']`.
 * Logic summary:
 * - Encapsulates all light/dark values in one place.
 * - Limits each scheme to a compact base palette (12 colors max) and maps all
 *   semantic tokens from that palette.
 * - Keeps `createColorTokens` focused on schema composition.
 */
function getThemePalette(themeName: ThemeName): ThemePalette {
  if (themeName === 'dark') {
    const palette = {
      canvas: '#030712',
      surface: '#111827',
      surfaceMuted: '#1f2937',
      surfaceSubtle: '#374151',
      borderDefault: '#4b5563',
      borderMuted: '#6b7280',
      textMuted: '#9ca3af',
      textSecondary: '#d1d5db',
      textSoft: '#e5e7eb',
      textOnDark: '#f3f4f6',
      textPrimary: '#f9fafb',
      accent: '#93c5fd',
    } as const;

    return {
      background: {
        canvas: palette.canvas,
        canvasSubtle: palette.surfaceSubtle,
        surface: palette.surface,
        surfaceElevated: palette.surface,
        surfaceMuted: palette.surfaceMuted,
        surfaceInverse: palette.textPrimary,
      },
      text: {
        primary: palette.textPrimary,
        secondary: palette.textSecondary,
        muted: palette.textMuted,
        inverse: palette.surface,
        accent: palette.accent,
      },
      border: {
        subtle: palette.surfaceSubtle,
        default: palette.borderDefault,
        strong: palette.textPrimary,
        inverse: palette.surface,
      },
      line: {
        subtle: palette.surfaceMuted,
      },
      control: {
        selected: {
          background: palette.textPrimary,
          foreground: palette.surface,
          border: palette.textPrimary,
          label: palette.textOnDark,
        },
        unselected: {
          border: palette.borderMuted,
          label: palette.textSecondary,
        },
      },
      slider: {
        primary: {
          label: palette.textPrimary,
          value: palette.textSecondary,
          track: palette.surfaceSubtle,
          fill: palette.textPrimary,
          thumb: palette.surface,
          thumbBorder: palette.textPrimary,
        },
        secondary: {
          label: palette.textSoft,
          value: palette.textMuted,
          track: palette.borderDefault,
          fill: palette.textSecondary,
          thumb: palette.surfaceMuted,
          thumbBorder: palette.textSecondary,
        },
        ghost: {
          label: palette.textSecondary,
          value: palette.textMuted,
          track: palette.surfaceMuted,
          fill: palette.textMuted,
          thumb: palette.canvas,
          thumbBorder: palette.textMuted,
        },
      },
      progressBar: {
        primary: {
          track: palette.borderDefault,
          fill: palette.textPrimary,
        },
        secondary: {
          track: palette.surfaceSubtle,
          fill: palette.textSecondary,
        },
        ghost: {
          track: palette.surfaceMuted,
          fill: palette.textMuted,
        },
      },
      dropDown: {
        trigger: {
          border: palette.surfaceSubtle,
          background: palette.surface,
          text: palette.textPrimary,
          caret: palette.textSecondary,
        },
        menu: {
          border: palette.surfaceSubtle,
          background: palette.surface,
        },
        option: {
          text: palette.textPrimary,
          selectedBackground: palette.textPrimary,
          selectedText: palette.surface,
        },
      },
      bottomSheet: {
        background: palette.surface,
        borderTop: palette.surfaceMuted,
      },
    };
  }

  const palette = {
    surface: '#ffffff',
    canvas: '#f9fafb',
    canvasSubtle: '#f3f4f6',
    borderSubtle: '#e5e7eb',
    borderDefault: '#d1d5db',
    borderMuted: '#9ca3af',
    caret: '#6b7280',
    textMuted: '#4b5563',
    textSecondary: '#374151',
    textPrimary: '#111827',
    accent: '#2563eb',
    toneSecondary: '#64748b',
  } as const;

  return {
    background: {
      canvas: palette.canvas,
      canvasSubtle: palette.canvasSubtle,
      surface: palette.surface,
      surfaceElevated: palette.surface,
      surfaceMuted: palette.borderSubtle,
      surfaceInverse: palette.textPrimary,
    },
    text: {
      primary: palette.textPrimary,
      secondary: palette.textSecondary,
      muted: palette.textMuted,
      inverse: palette.canvas,
      accent: palette.accent,
    },
    border: {
      subtle: palette.borderSubtle,
      default: palette.borderDefault,
      strong: palette.textPrimary,
      inverse: palette.canvas,
    },
    line: {
      subtle: palette.borderSubtle,
    },
    control: {
      selected: {
        background: palette.textPrimary,
        foreground: palette.canvas,
        border: palette.textPrimary,
        label: palette.textPrimary,
      },
      unselected: {
        border: palette.borderMuted,
        label: palette.textSecondary,
      },
    },
    slider: {
      primary: {
        label: palette.textPrimary,
        value: palette.textSecondary,
        track: palette.borderSubtle,
        fill: palette.textPrimary,
        thumb: palette.surface,
        thumbBorder: palette.textPrimary,
      },
      secondary: {
        label: palette.textSecondary,
        value: palette.textMuted,
        track: palette.borderSubtle,
        fill: palette.toneSecondary,
        thumb: palette.canvas,
        thumbBorder: palette.toneSecondary,
      },
      ghost: {
        label: palette.textMuted,
        value: palette.toneSecondary,
        track: palette.canvasSubtle,
        fill: palette.borderMuted,
        thumb: palette.surface,
        thumbBorder: palette.borderMuted,
      },
    },
    progressBar: {
      primary: {
        track: palette.borderSubtle,
        fill: palette.textPrimary,
      },
      secondary: {
        track: palette.borderSubtle,
        fill: palette.toneSecondary,
      },
      ghost: {
        track: palette.canvasSubtle,
        fill: palette.borderMuted,
      },
    },
    dropDown: {
      trigger: {
        border: palette.borderDefault,
        background: palette.surface,
        text: palette.textPrimary,
        caret: palette.caret,
      },
      menu: {
        border: palette.borderDefault,
        background: palette.surface,
      },
      option: {
        text: palette.textPrimary,
        selectedBackground: palette.textPrimary,
        selectedText: palette.surface,
      },
    },
    bottomSheet: {
      background: palette.surface,
      borderTop: palette.borderSubtle,
    },
  };
}

/**
 * Creates the full semantic color token tree.
 * Input parameters:
 * - `themeName`: requested color scheme.
 * Output:
 * - `Theme['colors']` containing foundation, control, and component semantic tokens.
 * Logic summary:
 * - Builds semantic groups first.
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
  };
}

/**
 * Creates a complete theme token object for a color-scheme variant.
 * Input parameters:
 * - `themeName`: requested color scheme.
 * Output:
 * - Fully populated `Theme` object including semantic tokens for all categories.
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
