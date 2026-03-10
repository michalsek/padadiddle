import { Pressable, Text as NativeText, View } from 'react-native';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import {
  CheckboxBorderWidth,
  CheckboxCheckHeight,
  CheckboxCheckWidth,
  CheckboxDisabledOpacity,
  CheckboxGap,
  CheckboxLabelFontWeight,
  CheckboxPressedOpacity,
  CheckboxSize,
} from './constants';
import type { CheckboxProps } from './types';
import { getCheckboxPalette } from './utils';

/**
 * Renders a themed checkbox with optional label text and token-driven states.
 * Input parameters:
 * - `checked`: whether the control is selected.
 * - `onChange`: callback invoked with the toggled selection value when pressed.
 * - `label`: optional text rendered next to the control.
 * - `disabled`: whether interaction is blocked and muted styling is applied.
 * - `style`/`labelStyle`: optional container and label overrides merged last.
 * - `testID`: optional stable test identifier for the pressable root.
 * - `...rest`: remaining `Pressable` props except `onPress`, `style`, and `testID`.
 * Output:
 * - A React Native `Pressable` configured with checkbox accessibility semantics.
 * Logic summary:
 * - Resolves all colors from the active semantic theme.
 * - Preserves the legacy `checked/onChange` API for parity with previous callers.
 * - Uses a lightweight check mark shape rather than depending on an external icon.
 */
export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  style,
  labelStyle,
  testID,
  ...rest
}: CheckboxProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const palette = getCheckboxPalette(theme, checked, disabled);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: disabled ? CheckboxDisabledOpacity : pressed ? CheckboxPressedOpacity : 1,
        },
        style,
      ]}
      testID={testID}
      {...rest}
    >
      <View
        style={[
          styles.indicator,
          {
            backgroundColor: palette.backgroundColor,
            borderColor: palette.borderColor,
          },
        ]}
        testID={testID ? `${testID}-indicator` : undefined}
      >
        <View
          style={[
            styles.check,
            {
              borderColor: palette.checkColor,
            },
          ]}
        />
      </View>
      {label ? (
        <NativeText
          style={[styles.label, { color: palette.labelColor }, labelStyle]}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label}
        </NativeText>
      ) : null}
    </Pressable>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CheckboxGap,
  },
  indicator: {
    width: CheckboxSize,
    height: CheckboxSize,
    borderWidth: CheckboxBorderWidth,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    width: CheckboxCheckWidth,
    height: CheckboxCheckHeight,
    borderRightWidth: CheckboxBorderWidth,
    borderBottomWidth: CheckboxBorderWidth,
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },
  label: {
    fontSize: theme.typography.md,
    fontWeight: CheckboxLabelFontWeight,
  },
}));
