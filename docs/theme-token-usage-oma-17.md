# OMA-17 Theme Token Usage Guide

## Purpose

This document defines how component implementers should consume the OMA-17 semantic theme contract from `src/theme`.

## Canonical Token Paths

Use semantic groups as the primary source of values:

- `theme.colors.background.*` for canvas/surface backgrounds.
- `theme.colors.text.*` for text/foreground roles.
- `theme.colors.border.*` and `theme.colors.line.*` for separators and outlines.
- `theme.colors.control.*` for selection controls (`Checkbox`, `RadioButton`).
- `theme.colors.component.*` for component-specific variants (`button`, `slider`, `progressBar`, `dropDown`, `bottomSheet`, etc.).
- `theme.spacing`, `theme.radius`, `theme.size`, `theme.typography`, `theme.opacity`, and `theme.elevation` for non-color tokens.

## Variant Semantics

- `primary`: highest emphasis, highest contrast.
- `secondary`: medium emphasis with neutral contrast.
- `ghost`: lowest emphasis with subtle borders/fills.

Apply matching variant keys across slider/progress families (`primary | secondary | ghost`) to keep behavior and visual tone aligned.

## Migration Notes

- Migration aliases remain available on `theme.colors` (`surface`, `textPrimary`, `textSecondary`, `accent`, `danger`).
- New components should avoid introducing additional legacy aliases and should consume semantic paths directly.
