import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import {
  ProgressBarAnimationDuration,
  ProgressBarDefaultHeight,
  ProgressBarDefaultVariant,
} from './constants';
import type { ProgressBarProps } from './types';
import { getProgressBarPalette, normalizeProgressValue } from './utils';

/**
 * Renders a themed horizontal progress bar for bounded completion values.
 * Input parameters:
 * - `progress`: numeric completion ratio expected in the `[0, 1]` range.
 * - `height`: optional track height used for both the track and fill radius.
 * - `variant`: semantic visual variant for the fill color.
 * - `style`: optional outer track style overrides merged last.
 * - `testID`: optional stable root identifier used to derive the fill test id.
 * Output:
 * - A themed progress track with a clamped animated fill width.
 * Logic summary:
 * - Clamps incoming progress values before rendering.
 * - Reuses the limited theme token contract for neutral track and semantic fill colors.
 * - Keeps rendering deterministic by expressing fill width as a plain percentage string.
 */
export function ProgressBar({
  progress,
  height = ProgressBarDefaultHeight,
  variant = ProgressBarDefaultVariant,
  style,
  testID,
}: ProgressBarProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const normalizedProgress = normalizeProgressValue(progress);
  const palette = getProgressBarPalette(theme, variant);
  const animatedProgress = useSharedValue(normalizedProgress);

  /**
   * Synchronizes the React progress prop into a shared value for UI-thread animation.
   * Input parameters: none.
   * Output:
   * - No direct return value; updates the shared progress with a timing animation.
   * Logic summary:
   * - Clamps the incoming prop before animating.
   * - Keeps width changes on the UI thread while preserving a simple numeric API.
   */
  useEffect(() => {
    animatedProgress.value = withTiming(normalizedProgress, {
      duration: ProgressBarAnimationDuration,
      easing: Easing.out(Easing.quad),
    });
  }, [animatedProgress, normalizedProgress]);

  /**
   * Animates the fill width from the shared progress value.
   * Input parameters: none.
   * Output:
   * - Animated style object for the progress fill width.
   * Logic summary:
   * - Reads progress only from a shared value inside the worklet.
   * - Converts the bounded ratio into a percentage width string on the UI thread.
   */
  const animatedFillStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <View
      style={[
        styles.track,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: palette.trackColor,
        },
        style,
      ]}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            borderRadius: height / 2,
            backgroundColor: palette.fillColor,
          },
          animatedFillStyle,
        ]}
        testID={testID ? `${testID}-fill` : undefined}
      />
    </View>
  );
}

const styleSheet = createStyleSheet(() => ({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
}));
