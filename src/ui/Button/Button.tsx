import { Pressable, Text as NativeText } from 'react-native';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import {
  ButtonDefaultVariant,
  ButtonDisabledOpacity,
  ButtonHorizontalPadding,
  ButtonLabelFontWeight,
  ButtonMinHeight,
  ButtonPressedOpacity,
  ButtonVerticalPadding,
} from './constants';
import type { ButtonProps } from './types';
import { getButtonPalette } from './utils';

/**
 * Renders a themed pressable button for primary actions and secondary affordances.
 * Input parameters:
 * - `label`: button copy rendered inside the pressable surface.
 * - `onPress`: optional press handler invoked when the button is enabled.
 * - `disabled`: whether the button blocks interaction and switches to disabled visuals.
 * - `variant`: semantic button style variant.
 * - `style`/`labelStyle`: optional container and label overrides merged last.
 * - `testID`: optional stable test identifier.
 * Output:
 * - A React Native `Pressable` with token-driven button visuals and pressed-state feedback.
 * Logic summary:
 * - Uses the active theme to resolve per-variant palette values.
 * - Applies pressed opacity only while enabled.
 * - Preserves the previous lightweight `label` API to minimize migration cost.
 */
export function Button({
  label,
  onPress,
  disabled = false,
  variant = ButtonDefaultVariant,
  style,
  labelStyle,
  testID,
}: ButtonProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const palette = getButtonPalette(variant, theme, disabled);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
          opacity: disabled ? ButtonDisabledOpacity : pressed ? ButtonPressedOpacity : palette.opacity,
        },
        style,
      ]}
    >
      <NativeText style={[styles.label, { color: palette.textColor }, labelStyle]}>{label}</NativeText>
    </Pressable>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  container: {
    minHeight: ButtonMinHeight,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: ButtonHorizontalPadding,
    paddingVertical: ButtonVerticalPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.typography.md,
    fontWeight: ButtonLabelFontWeight,
  },
}));
