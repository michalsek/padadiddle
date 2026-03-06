import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createStyleSheet, useStyles } from '../../../theme';
import { useTheme } from '../../../theme/useTheme';
import { ScreenDefaultSafeAreaEdges } from './constants';
import type { ScreenProps } from './types';
import { getScreenPadding } from './utils';

/**
 * Renders a page-level container with optional safe-area and scrolling behavior.
 * Input parameters:
 * - `children`: screen body content.
 * - `disableSafeArea`: when true, renders a plain `View` root and removes content padding.
 * - `safeAreaEdges`: safe-area edges used when `SafeAreaView` is active.
 * - `padding`: optional custom content padding.
 * - `scrollable`: when true, wraps content in `ScrollView`.
 * - `contentContainerStyle`: optional style overrides for the inner content container.
 * - `style`: optional style overrides for the root container.
 * - `testID`: optional test identifier.
 * - `scrollViewProps`: optional extra props forwarded to `ScrollView`.
 * Output:
 * - A themed screen container composed of either `SafeAreaView` or `View` root plus inner content wrapper.
 * Logic summary:
 * - Uses theme tokens for root background and default content padding.
 * - Supports optional scroll behavior while preserving content container styling semantics.
 */
export function Screen({
  children,
  disableSafeArea = false,
  safeAreaEdges = ScreenDefaultSafeAreaEdges,
  padding,
  scrollable = false,
  contentContainerStyle,
  style,
  testID,
  scrollViewProps,
}: ScreenProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const contentPadding = getScreenPadding(padding, disableSafeArea, theme);

  const content = scrollable ? (
    <ScrollView
      {...scrollViewProps}
      contentContainerStyle={[styles.content, { padding: contentPadding }, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, { padding: contentPadding }, contentContainerStyle]}>{children}</View>
  );

  if (disableSafeArea) {
    return (
      <View testID={testID} style={[styles.root, { backgroundColor: theme.colors.background }, style]}>
        {content}
      </View>
    );
  }

  return (
    <SafeAreaView
      testID={testID}
      style={[styles.root, { backgroundColor: theme.colors.background }, style]}
      edges={safeAreaEdges}
    >
      {content}
    </SafeAreaView>
  );
}

const styleSheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
}));
