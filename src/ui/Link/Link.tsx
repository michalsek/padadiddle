import { useCallback } from 'react';
import * as Linking from 'expo-linking';
import type { GestureResponderEvent } from 'react-native';
import { Pressable, Text as NativeText } from 'react-native';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import {
  LinkDefaultOpacity,
  LinkDisabledOpacity,
  LinkFontWeight,
  LinkPressedOpacity,
} from './constants';
import type { LinkProps } from './types';
import { getLinkColor } from './utils';

/**
 * Renders a themed inline link that optionally opens an external URL.
 * Input parameters:
 * - `label`: link copy rendered as text.
 * - `href`: optional URL opened with Expo Linking after the press handler runs.
 * - `onPress`: optional local press handler.
 * - `disabled`: whether presses are blocked and disabled visuals are shown.
 * - `style`/`containerStyle`: optional text and container style overrides merged last.
 * - `testID`: optional stable test identifier.
 * Output:
 * - A React Native `Pressable` with theme-aware link typography and interaction feedback.
 * Logic summary:
 * - Uses the primary theme color for active links and secondary tone for disabled links.
 * - Calls the provided press handler first, then opens `href` when present and enabled.
 */
export function Link({
  label,
  href,
  onPress,
  disabled = false,
  style,
  containerStyle,
  testID,
}: LinkProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) {
        return;
      }

      onPress?.(event);

      if (href) {
        void Linking.openURL(href);
      }
    },
    [disabled, href, onPress],
  );

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={handlePress}
      testID={testID}
      style={({ pressed }) => [
        styles.container,
        { opacity: disabled ? LinkDisabledOpacity : pressed ? LinkPressedOpacity : LinkDefaultOpacity },
        containerStyle,
      ]}
    >
      <NativeText style={[styles.label, { color: getLinkColor(disabled, theme) }, style]}>{label}</NativeText>
    </Pressable>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  container: {
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: theme.typography.md,
    fontWeight: LinkFontWeight,
    textDecorationLine: 'underline',
  },
}));
