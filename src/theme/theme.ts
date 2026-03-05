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
  color01: string;
  color02: string;
  color03: string;
  color04: string;
  color05: string;
  color06: string;
  color07: string;
  color08: string;
  color09: string;
  color10: string;
  color11: string;
  color12: string;
};

/**
 * Resolves a flat 12-color palette for a color-scheme variant.
 * Input parameters:
 * - `themeName`: requested color scheme.
 * Output:
 * - Flat palette (`color01`..`color12`) used to derive semantic theme tokens.
 * Logic summary:
 * - Keeps each scheme limited to 12 base colors.
 * - Avoids pre-encoding semantic groups (background/text/border/etc.) here.
 */
function getThemePalette(themeName: ThemeName): ThemePalette {
  if (themeName === 'dark') {
    return {
      color01: '#030712',
      color02: '#111827',
      color03: '#1f2937',
      color04: '#374151',
      color05: '#4b5563',
      color06: '#6b7280',
      color07: '#9ca3af',
      color08: '#d1d5db',
      color09: '#e5e7eb',
      color10: '#f3f4f6',
      color11: '#f9fafb',
      color12: '#93c5fd',
    };
  }

  return {
    color01: '#ffffff',
    color02: '#f9fafb',
    color03: '#f3f4f6',
    color04: '#e5e7eb',
    color05: '#d1d5db',
    color06: '#9ca3af',
    color07: '#6b7280',
    color08: '#4b5563',
    color09: '#374151',
    color10: '#111827',
    color11: '#2563eb',
    color12: '#64748b',
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
  const isDark = themeName === 'dark';

  if (isDark) {
    return {
      background: {
        canvas: palette.color01,
        canvasSubtle: palette.color04,
        surface: palette.color02,
        surfaceElevated: palette.color02,
        surfaceMuted: palette.color03,
        surfaceInverse: palette.color11,
      },
      text: {
        primary: palette.color11,
        secondary: palette.color08,
        muted: palette.color07,
        inverse: palette.color02,
        accent: palette.color12,
      },
      border: {
        subtle: palette.color04,
        default: palette.color05,
        strong: palette.color11,
        inverse: palette.color02,
      },
      line: {
        subtle: palette.color03,
      },
      control: {
        selected: {
          background: palette.color11,
          foreground: palette.color02,
          border: palette.color11,
          label: palette.color10,
        },
        unselected: {
          border: palette.color06,
          label: palette.color08,
        },
      },
      component: {
        button: {
          primary: {
            background: palette.color11,
            border: palette.color11,
            text: palette.color02,
          },
          secondary: {
            background: palette.color04,
            border: palette.color05,
            text: palette.color11,
          },
          ghost: {
            background: palette.color02,
            border: palette.color04,
            text: palette.color11,
          },
        },
        slider: {
          primary: {
            label: palette.color11,
            value: palette.color08,
            track: palette.color04,
            fill: palette.color11,
            thumb: palette.color02,
            thumbBorder: palette.color11,
          },
          secondary: {
            label: palette.color09,
            value: palette.color07,
            track: palette.color05,
            fill: palette.color08,
            thumb: palette.color03,
            thumbBorder: palette.color08,
          },
          ghost: {
            label: palette.color08,
            value: palette.color07,
            track: palette.color03,
            fill: palette.color07,
            thumb: palette.color01,
            thumbBorder: palette.color07,
          },
        },
        progressBar: {
          primary: {
            track: palette.color05,
            fill: palette.color11,
          },
          secondary: {
            track: palette.color04,
            fill: palette.color08,
          },
          ghost: {
            track: palette.color03,
            fill: palette.color07,
          },
        },
        dropDown: {
          trigger: {
            border: palette.color04,
            background: palette.color02,
            text: palette.color11,
            caret: palette.color08,
          },
          menu: {
            border: palette.color04,
            background: palette.color02,
          },
          option: {
            text: palette.color11,
            selectedBackground: palette.color11,
            selectedText: palette.color02,
          },
        },
        bottomSheet: {
          background: palette.color02,
          borderTop: palette.color03,
        },
        avatar: {
          background: palette.color03,
          initials: palette.color11,
        },
        icon: {
          tint: palette.color11,
        },
        spinner: {
          tint: palette.color11,
        },
        link: {
          text: palette.color12,
        },
        heading: {
          text: palette.color11,
        },
        bodyText: {
          default: palette.color11,
          muted: palette.color07,
        },
      },
    };
  }

  return {
    background: {
      canvas: palette.color02,
      canvasSubtle: palette.color03,
      surface: palette.color01,
      surfaceElevated: palette.color01,
      surfaceMuted: palette.color04,
      surfaceInverse: palette.color10,
    },
    text: {
      primary: palette.color10,
      secondary: palette.color09,
      muted: palette.color08,
      inverse: palette.color02,
      accent: palette.color11,
    },
    border: {
      subtle: palette.color04,
      default: palette.color05,
      strong: palette.color10,
      inverse: palette.color02,
    },
    line: {
      subtle: palette.color04,
    },
    control: {
      selected: {
        background: palette.color10,
        foreground: palette.color02,
        border: palette.color10,
        label: palette.color10,
      },
      unselected: {
        border: palette.color06,
        label: palette.color09,
      },
    },
    component: {
      button: {
        primary: {
          background: palette.color10,
          border: palette.color10,
          text: palette.color02,
        },
        secondary: {
          background: palette.color03,
          border: palette.color05,
          text: palette.color10,
        },
        ghost: {
          background: palette.color01,
          border: palette.color04,
          text: palette.color10,
        },
      },
      slider: {
        primary: {
          label: palette.color10,
          value: palette.color09,
          track: palette.color04,
          fill: palette.color10,
          thumb: palette.color01,
          thumbBorder: palette.color10,
        },
        secondary: {
          label: palette.color09,
          value: palette.color08,
          track: palette.color04,
          fill: palette.color12,
          thumb: palette.color02,
          thumbBorder: palette.color12,
        },
        ghost: {
          label: palette.color08,
          value: palette.color12,
          track: palette.color03,
          fill: palette.color06,
          thumb: palette.color01,
          thumbBorder: palette.color06,
        },
      },
      progressBar: {
        primary: {
          track: palette.color04,
          fill: palette.color10,
        },
        secondary: {
          track: palette.color04,
          fill: palette.color12,
        },
        ghost: {
          track: palette.color03,
          fill: palette.color06,
        },
      },
      dropDown: {
        trigger: {
          border: palette.color05,
          background: palette.color01,
          text: palette.color10,
          caret: palette.color07,
        },
        menu: {
          border: palette.color05,
          background: palette.color01,
        },
        option: {
          text: palette.color10,
          selectedBackground: palette.color10,
          selectedText: palette.color01,
        },
      },
      bottomSheet: {
        background: palette.color01,
        borderTop: palette.color04,
      },
      avatar: {
        background: palette.color04,
        initials: palette.color10,
      },
      icon: {
        tint: palette.color10,
      },
      spinner: {
        tint: palette.color10,
      },
      link: {
        text: palette.color11,
      },
      heading: {
        text: palette.color10,
      },
      bodyText: {
        default: palette.color10,
        muted: palette.color08,
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
