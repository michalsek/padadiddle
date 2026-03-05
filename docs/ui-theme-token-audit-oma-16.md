# OMA-16: `prevUI` Token Audit and Semantic Theme Schema

## Goal

Define a decision-complete semantic token schema for `src/theme` based on the current `prevUI` implementation, so follow-up migration tasks can implement components without additional naming decisions.

## Audit Sources

- `src/theme/types.ts`
- `src/theme/theme.ts`
- `prevUI/Layout/*`
- `prevUI/Button/*`
- `prevUI/Link/*`
- `prevUI/Spinner/*`
- `prevUI/Avatar/*`
- `prevUI/Icon/*`
- `prevUI/Checkbox/*`
- `prevUI/RadioButton/*`
- `prevUI/Slider/*`
- `prevUI/ProgressBar/*`
- `prevUI/DropDown/*`
- `prevUI/BottomSheet/*`

## Proposed Semantic Token Contract

The schema below is the naming source of truth for `src/ui` migration tasks.

```ts
type Theme = {
  colors: {
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
      button: Record<'primary' | 'secondary' | 'ghost', { background: string; border: string; text: string }>;
      slider: Record<
        'primary' | 'secondary' | 'ghost',
        { label: string; value: string; track: string; fill: string; thumb: string; thumbBorder: string }
      >;
      progressBar: Record<'primary' | 'secondary' | 'ghost', { track: string; fill: string }>;
      dropDown: {
        trigger: { border: string; background: string; text: string; caret: string };
        menu: { border: string; background: string };
        option: { text: string; selectedBackground: string; selectedText: string };
      };
      bottomSheet: {
        background: string;
        borderTop: string;
      };
      avatar: {
        background: string;
        initials: string;
      };
      icon: { tint: string };
      spinner: { tint: string };
      link: { text: string };
      heading: { text: string };
      bodyText: { default: string; muted: string };
    };
  };
  spacing: Record<'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number>;
  radius: Record<'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'full', number>;
  size: {
    icon: { md: number };
    avatar: { md: number };
    checkbox: { md: number };
    radio: { outer: number; dot: number };
    slider: { thumb: number; track: number };
    progressBar: { track: number };
    touch: { minTarget: number };
  };
  typography: {
    body: { sm: number; md: number };
    label: { sm: number; md: number };
    heading: Record<'h1' | 'h2' | 'h3' | 'h4', number>;
    lineHeight: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl', number>;
    weight: { medium: string; semibold: string; bold: string };
  };
  opacity: {
    disabled: number;
    pressed: number;
  };
  elevation: {
    menu: number;
  };
};
```

## Foundation Token Inventory (Light/Dark)

| Semantic token | Light | Dark | Legacy references |
| --- | --- | --- | --- |
| `colors.background.canvas` | `#f9fafb` | `#030712` | `Layout/Screen` root background |
| `colors.background.canvasSubtle` | `#f3f4f6` | `#374151` | Button secondary surfaces |
| `colors.background.surface` | `#ffffff` | `#111827` | Row/Column surface, DropDown, Button ghost |
| `colors.background.surfaceElevated` | `#ffffff` | `#0b1220` | Box, BottomSheet |
| `colors.background.surfaceMuted` | `#e5e7eb` | `#1f2937` | Avatar fallback, Slider/Progress ghost tracks |
| `colors.background.surfaceInverse` | `#111827` | `#f9fafb` | Button primary, selected options |
| `colors.text.primary` | `#111827` | `#f9fafb` | Heading, Body default, controls |
| `colors.text.secondary` | `#374151` | `#d1d5db` | Unselected control labels |
| `colors.text.muted` | `#4b5563` | `#9ca3af` | Body muted, secondary value text |
| `colors.text.inverse` | `#f9fafb` | `#111827` | Text on inverse surfaces |
| `colors.text.accent` | `#2563eb` | `#93c5fd` | Link |
| `colors.border.subtle` | `#e5e7eb` | `#374151` | Spacer line, ghost borders |
| `colors.border.default` | `#d1d5db` | `#4b5563` | Secondary borders |
| `colors.border.strong` | `#111827` | `#f9fafb` | Primary borders, selected controls |
| `colors.border.inverse` | `#f9fafb` | `#111827` | Inverse outline use-cases |
| `colors.line.subtle` | `#e2e8f0` | `#1f2937` | BottomSheet/Progress/Slider track family |

## Sizing, Spacing, Radius, Typography Inventory

| Token | Value(s) | Legacy references |
| --- | --- | --- |
| `spacing.2xs` | `4` | ProgressBar height, DropDown menu offset |
| `spacing.xs` | `8` | Row/Column gap, control gap, BottomSheet gap |
| `spacing.sm` | `10` | Button/DropDown vertical padding, BottomSheet top padding |
| `spacing.md` | `12` | Spacer default, Screen inner spacing, DropDown horizontal padding |
| `spacing.lg` | `14` | Button horizontal padding, BottomSheet bottom padding |
| `spacing.xl` | `16` | Screen default padding, BottomSheet horizontal padding |
| `radius.sm` | `6` | Checkbox corner radius |
| `radius.md` | `8` | Avatar square, DropDown/menu radius |
| `radius.lg` | `10` | Button radius |
| `radius.xl` | `12` | Avatar rounded shape |
| `radius.full` | `999` | Radio outer/dot |
| `size.touch.minTarget` | `44` | Button minimum height |
| `size.avatar.md` | `40` | Avatar default size |
| `size.icon.md` | `20` | Icon default size |
| `size.checkbox.md` | `20` | Checkbox size |
| `size.radio.outer` / `size.radio.dot` | `20` / `10` | Radio sizes |
| `size.slider.thumb` / `size.slider.track` | `18` / `22` | Slider sizes |
| `size.progressBar.track` | `4` | ProgressBar default height |
| `typography.body.md` | `14` | Body text, Button label, Link label, controls |
| `typography.label.sm` | `12` | Slider value, DropDown caret |
| `typography.label.md` | `13` | Slider label |
| `typography.heading.h1/h2/h3/h4` | `32/26/22/18` | Heading levels |
| `opacity.disabled` / `opacity.pressed` | `0.5` / `0.75` | Button and control interaction |
| `elevation.menu` | `6` | DropDown menu elevation |

## Component Group Mapping Matrix

| Group | Legacy source(s) | Proposed semantic tokens for `src/ui` |
| --- | --- | --- |
| Layout: `Box` | `prevUI/Layout/Box/utils.ts` | `colors.background.surfaceElevated` |
| Layout: `Screen` | `prevUI/Layout/Screen/Screen.tsx` | `colors.background.canvas`, `spacing.xl` |
| Layout: `Row` + `Column` | `prevUI/Layout/Row/constants.ts`, `prevUI/Layout/Column/constants.ts` | `colors.background.surface` for `surface` tone, transparent passthrough, `spacing.xs` gap |
| Layout: `Spacer` | `prevUI/Layout/Spacer/constants.ts` | `colors.line.subtle`, `spacing.md` default size |
| Typography: `Text` + `Heading` | `prevUI/Layout/Text/constants.ts`, `prevUI/Layout/Heading/*` | `colors.component.bodyText.*`, `colors.component.heading.text`, `typography.body.*`, `typography.heading.*`, `typography.lineHeight.*` |
| `Button` | `prevUI/Button/constants.ts` | `colors.component.button.primary|secondary|ghost.{background,border,text}`, `radius.lg`, `size.touch.minTarget`, `opacity.disabled`, `opacity.pressed` |
| `Link` | `prevUI/Link/utils.ts` | `colors.component.link.text`, `typography.body.md`, `typography.weight.medium` |
| `Spinner` | `prevUI/Spinner/utils.ts` | `colors.component.spinner.tint` |
| `Avatar` + `Icon` | `prevUI/Avatar/*`, `prevUI/Icon/*` | `colors.component.avatar.{background,initials}`, `colors.component.icon.tint`, `size.avatar.md`, `size.icon.md`, `radius.md|xl|full` |
| `Checkbox` + `RadioButton` | `prevUI/Checkbox/utils.ts`, `prevUI/RadioButton/utils.ts` | `colors.control.selected.*`, `colors.control.unselected.*`, `size.checkbox.md`, `size.radio.*`, `radius.sm|full`, `spacing.xs`, `typography.body.md` |
| `Slider` | `prevUI/Slider/constants.ts`, `prevUI/Slider/Slider.tsx` | `colors.component.slider.primary|secondary|ghost.{label,value,track,fill,thumb,thumbBorder}`, `size.slider.*`, `radius.pill` |
| `ProgressBar` | `prevUI/ProgressBar/constants.ts` | `colors.component.progressBar.primary|secondary|ghost.{track,fill}`, `size.progressBar.track`, `radius.pill` |
| `DropDown` | `prevUI/DropDown/constants.ts`, `prevUI/DropDown/DropDown.tsx` | `colors.component.dropDown.trigger.*`, `colors.component.dropDown.menu.*`, `colors.component.dropDown.option.*`, `spacing.sm|md`, `radius.md`, `elevation.menu` |
| `BottomSheet` | `prevUI/BottomSheet/constants.ts`, `prevUI/BottomSheet/utils.ts` | `colors.component.bottomSheet.{background,borderTop}`, `spacing.sm|lg|xl`, `colors.background.surfaceElevated` |

## Variant Semantics

- `primary`: high-contrast emphasis, inverse text on strong background.
- `secondary`: neutral emphasis, moderate contrast, default border.
- `ghost`: low-emphasis surface blend, subtle border and muted fills.
- `selected` vs `unselected` controls: selection changes border, foreground, and label prominence; unselected uses muted labels.
- Progress/slider `primary|secondary|ghost` variants must stay numerically and tonally aligned so these components can share theme variant keys.

## Light/Dark Behavior Rules

- Keep token names constant across schemes; only values switch by scheme.
- Use `inverse` tokens for surfaces that flip foreground/background roles in dark mode.
- Reuse foundation tokens first (`background`, `text`, `border`, `line`), then component tokens for true component-specific semantics.
- Preserve transparent tones as explicit opt-out (`transparent`) rather than theme values.

## OMA-17 Implementation Checklist Input

- Extend `src/theme/types.ts` with `radius`, `size`, `typography`, `opacity`, `elevation`, and nested `colors.component` groups above.
- Populate both `lightTheme` and `darkTheme` in `src/theme/theme.ts` with this schema.
- Remove legacy fallback aliases once migrated components consume semantic token paths.
