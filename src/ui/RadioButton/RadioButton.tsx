import { Pressable, Text as NativeText, View } from 'react-native';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import {
  RadioButtonBorderWidth,
  RadioButtonDisabledOpacity,
  RadioButtonDotSize,
  RadioButtonGap,
  RadioButtonLabelFontWeight,
  RadioButtonPressedOpacity,
  RadioButtonSize,
} from './constants';
import type { RadioButtonProps } from './types';
import { getRadioButtonPalette } from './utils';

/**
 * Renders a themed radio button with optional label text and accessibility semantics.
 * Input parameters:
 * - `selected`: whether the radio button is the active choice.
 * - `onSelect`: callback invoked when the control is pressed while enabled.
 * - `label`: optional text rendered next to the control.
 * - `disabled`: whether interaction is blocked and muted styling is applied.
 * - `style`/`labelStyle`: optional container and label overrides merged last.
 * - `testID`: optional stable test identifier for the pressable root.
 * - `...rest`: remaining `Pressable` props except `onPress`, `style`, and `testID`.
 * Output:
 * - A React Native `Pressable` configured with radio-button accessibility semantics.
 * Logic summary:
 * - Resolves all colors from the active semantic theme.
 * - Preserves the legacy `selected/onSelect` API for parity with previous callers.
 * - Uses a simple inner dot indicator to avoid extra dependencies.
 */
export function RadioButton({
  selected,
  onSelect,
  label,
  disabled = false,
  style,
  labelStyle,
  testID,
  ...rest
}: RadioButtonProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const palette = getRadioButtonPalette(theme, selected, disabled);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onSelect}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: disabled ? RadioButtonDisabledOpacity : pressed ? RadioButtonPressedOpacity : 1,
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
            borderColor: palette.ringColor,
          },
        ]}
        testID={testID ? `${testID}-indicator` : undefined}
      >
        <View
          style={[
            styles.dot,
            {
              backgroundColor: palette.dotColor,
            },
          ]}
          testID={testID ? `${testID}-dot` : undefined}
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
    gap: RadioButtonGap,
  },
  indicator: {
    width: RadioButtonSize,
    height: RadioButtonSize,
    borderWidth: RadioButtonBorderWidth,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: RadioButtonDotSize,
    height: RadioButtonDotSize,
    borderRadius: theme.radius.full,
  },
  label: {
    fontSize: theme.typography.md,
    fontWeight: RadioButtonLabelFontWeight,
  },
}));
