import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { PROGRESS_BAR_DEFAULT_HEIGHT } from '@app/ui/ProgressBar/constants';
import { type ProgressBarProps } from '@app/ui/ProgressBar/types';
import { getProgressBarPalette } from '@app/ui/ProgressBar/utils';

// Renders an animated progress indicator driven by a shared value.
const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = PROGRESS_BAR_DEFAULT_HEIGHT,
  variant = 'primary',
  style,
  testID,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = getProgressBarPalette(variant, isDark);

  const fillStyle = useAnimatedStyle(() => {
    const clampedProgress = Math.max(0, Math.min(1, progress.value));

    return {
      width: `${clampedProgress * 100}%`,
    };
  });

  return (
    <View
      testID={testID}
      style={[
        styles.track,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: palette.trackColor,
        },
        style,
      ]}
    >
      <Animated.View
        testID={testID ? `${testID}Fill` : undefined}
        style={[
          styles.fill,
          fillStyle,
          {
            backgroundColor: palette.fillColor,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});

export default ProgressBar;
