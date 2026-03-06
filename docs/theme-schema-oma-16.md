# OMA-16 Theme Schema And prevUI Mapping

## Final semantic theme contract

### Colors (flat map, 12 keys)

| key | light | dark | intent |
| --- | --- | --- | --- |
| `primary` | `#2563EB` | `#93C5FD` | Primary interactive/accent color |
| `secondary` | `#64748B` | `#94A3B8` | Secondary emphasis and muted accents |
| `danger` | `#D92D20` | `#FDA29B` | Error/destructive emphasis |
| `warning` | `#D97706` | `#FBBF24` | Warning/caution emphasis |
| `success` | `#15803D` | `#4ADE80` | Success/positive emphasis |
| `textBase` | `#111827` | `#F9FAFB` | Default text/icon color on `background` |
| `textContrast` | `#F9FAFB` | `#111827` | Text/icon color on `backgroundContrast` |
| `background` | `#FFFFFF` | `#030712` | Default page/surface background |
| `backgroundContrast` | `#111827` | `#F9FAFB` | Inverted contrast surface |
| `border` | `#D1D5DB` | `#374151` | Default border/divider |
| `backgroundTransparent` | `#FFFFFFCC` | `#030712CC` | Transparent overlay on default background |
| `backgroundContrastTransparent` | `#111827CC` | `#F9FAFBCC` | Transparent overlay on contrast background |

### Spacing

| key | value |
| --- | --- |
| `'2sm'` | `4` |
| `sm` | `8` |
| `md` | `12` |
| `lg` | `16` |
| `xl` | `24` |
| `'2xl'` | `32` |

### Radius

| key | value |
| --- | --- |
| `sm` | `8` |
| `md` | `10` |
| `lg` | `12` |
| `full` | `999` |

### Typography

| key | value |
| --- | --- |
| `sm` | `12` |
| `md` | `14` |
| `lg` | `16` |
| `xl` | `20` |
| `'2xl'` | `24` |

### Explicit exclusions from theme

- `opacity` is not in theme.
- `elevation` is not in theme.
- `size` is not in theme.

## prevUI color mapping matrix

| Component group | prevUI palette summary | New shared token mapping | Keep local in component |
| --- | --- | --- | --- |
| `Avatar` | neutral bg + neutral text (`#1f2937/#e5e7eb`, `#f9fafb/#111827`) | bg `backgroundContrast` or `background`, text `textContrast` or `textBase` | Avatar-specific fallback bg tuning, dynamic image-size-based values |
| `BottomSheet` | sheet bg (`#0b1220/#ffffff`), top border (`#1f2937/#e2e8f0`) | bg `background`, border `border` | none |
| `Button` | `primary/secondary/ghost` variant tables | `primary`, `secondary`, `background`, `backgroundContrast`, `textBase`, `textContrast`, `border` | pressed/disabled opacity handling stays local |
| `Checkbox` | checked/unchecked neutral palette | checked fill `backgroundContrast`, checked mark `textContrast`, label `textBase`, unchecked border `border` | mark glyph styling |
| `DropDown` | trigger/menu/selected option colors with neutral ramp | trigger/menu bg `background`, border `border`, option text `textBase`, selected bg `backgroundContrast`, selected text `textContrast` | menu layering and per-state visual emphasis details |
| `Icon` | neutral icon tint | `textBase` | none |
| `Layout/Box` | themed container bg | `background` | none |
| `Layout/Column` | `transparent` and `surface` tones | `background` for `surface` tone | `transparent` tone remains local literal |
| `Layout/Heading` | heading text neutral | `textBase` | per-level typography sizing stays local/component-level |
| `Layout/Row` | `transparent` and `surface` tones | `background` for `surface` tone | `transparent` tone remains local literal |
| `Layout/Screen` | page bg (`#030712/#f9fafb`) | `background` | none |
| `Layout/Spacer` | `line` divider tone + transparent | `border` for `line` tone | `transparent` tone remains local literal |
| `Layout/Text` | `default` and `muted` neutral text | `default -> textBase`, `muted -> secondary` | none |
| `Link` | blue link color (`#2563eb/#93c5fd`) | `primary` | none |
| `ProgressBar` | track/fill variant palettes | track `border` or `backgroundTransparent`, fill `primary` / `secondary` / `backgroundContrast` depending variant | fine-grained variant-level contrast tuning |
| `RadioButton` | selected/unselected neutral palette | selected ring/dot `backgroundContrast`, selected label `textBase`, unselected ring `border` | none |
| `Slider` | `primary/secondary/ghost` full palette | label/value `textBase`/`secondary`, track `border`, fill `primary` or `secondary`, thumb `background`/`backgroundContrast`, thumb border `border` | variant-specific visual nuance where shared tokens are insufficient |
| `Spinner` | neutral spinner tint | `textBase` | none |

## Variant semantics and light/dark behavior

- Variants now express intent, not raw color names:
  - `primary` means high-emphasis action or selected-state fill.
  - `secondary` means medium-emphasis action or muted emphasis.
  - `ghost` means low-emphasis surface with border-led separation.
- Light and dark themes use the same semantic keys and switch only values.
- Components must first consume the 12 shared color tokens; if a needed color cannot be expressed semantically without overfitting the global theme, it should remain a local component color token.

## Non-color token migration notes

- Shared spacing should map to `'2sm' | sm | md | lg | xl | '2xl'`.
- Shared radius should map to `sm | md | lg | full`.
- Shared typography should map to `sm | md | lg | xl | '2xl'`.
- Values outside these sets used in `prevUI` (examples: gap `6`, radius `11`, type size `13`, heading `26/32`) are intentionally component-local unless a future token expansion is approved.
