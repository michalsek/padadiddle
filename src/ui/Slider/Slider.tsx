import { useEffect, useState } from 'react';
import { Text as NativeText, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { createStyleSheet, useStyles } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import {
  SliderAnimationDuration,
  SliderDefaultStep,
  SliderDefaultVariant,
  SliderDisabledOpacity,
  SliderHeaderGap,
  SliderLabelFontWeight,
  SliderPressedOpacity,
  SliderThumbBorderWidth,
  SliderThumbSize,
  SliderTrackHeight,
  SliderValueFontWeight,
} from './constants';
import type { SliderProps } from './types';
import {
  getSliderPalette,
  getSliderRatio,
  getSliderValueFromPosition,
  normalizeSliderValue,
} from './utils';

/**
 * Renders a controlled themed slider with tap and drag interaction support.
 * Input parameters:
 * - `value`: current controlled slider value.
 * - `min`/`max`: numeric bounds for the slider range.
 * - `step`: optional step interval used to snap drag positions.
 * - `onChange`: callback fired when interaction selects a different normalized value.
 * - `label`: optional descriptive label shown above the slider, defaulting to `Value`.
 * - `variant`: semantic visual variant controlling fill and thumb colors.
 * - `disabled`: whether interaction should be blocked and visuals muted.
 * - `style`/`labelStyle`/`valueStyle`: optional style overrides merged after themed defaults.
 * - `testID`: optional stable root identifier used to derive child test ids.
 * - `...rest`: additional React Native `View` props forwarded to the interactive track.
 * Output:
 * - A slider with current value text and themed track/fill/thumb styling.
 * Logic summary:
 * - Normalizes incoming values so controlled rendering always matches legal step boundaries.
 * - Measures the track width once layout is known, then maps responder positions back to values.
 * - Keeps interaction local to the track while exposing stable child test ids for unit tests.
 */
export function Slider({
  value,
  min,
  max,
  step = SliderDefaultStep,
  onChange,
  label,
  variant = SliderDefaultVariant,
  disabled = false,
  style,
  labelStyle,
  valueStyle,
  testID,
  ...rest
}: SliderProps) {
  const styles = useStyles(styleSheet);
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const normalizedValue = normalizeSliderValue(value, min, max, step);
  const ratio = getSliderRatio(normalizedValue, min, max);
  const palette = getSliderPalette(theme, variant, disabled);
  const animatedRatio = useSharedValue(ratio);
  const animatedTrackWidth = useSharedValue(trackWidth);
  const animatedCurrentValue = useSharedValue(normalizedValue);

  /**
   * Synchronizes the controlled slider value into a shared value used by animated styles.
   * Input parameters: none.
   * Output:
   * - No direct return value; updates the shared ratio with a short timing animation.
   * Logic summary:
   * - Mirrors React-controlled value changes onto the UI thread.
   * - Keeps fill and thumb movement smooth when parent state updates after interaction.
   */
  useEffect(() => {
    animatedRatio.value = withTiming(ratio, {
      duration: SliderAnimationDuration,
      easing: Easing.out(Easing.quad),
    });
    animatedCurrentValue.value = normalizedValue;
  }, [animatedCurrentValue, animatedRatio, normalizedValue, ratio]);

  /**
   * Synchronizes measured track width into a shared value for thumb positioning worklets.
   * Input parameters: none.
   * Output:
   * - No direct return value; mirrors the latest layout width to the UI thread.
   * Logic summary:
   * - Allows thumb translation to be computed inside animated styles without JS reads.
   * - Keeps the animated thumb position aligned with responder-driven layout changes.
   */
  useEffect(() => {
    animatedTrackWidth.value = trackWidth;
  }, [animatedTrackWidth, trackWidth]);

  /**
   * Applies a gesture position to the controlled slider value from a worklet callback.
   * Input parameters:
   * - `positionX`: local X coordinate from the active gesture event.
   * Output:
   * - No direct return value; animates shared values and invokes `onChange` through `scheduleOnRN`.
   * Logic summary:
   * - Reads track width and current value from shared values so the calculation stays on the UI thread.
   * - Converts the touch location into a normalized stepped value using the measured track width.
   * - Prevents redundant `onChange` calls when interaction lands on the current value.
   */
  function applyPosition(positionX: number) {
    'worklet';

    if (disabled || animatedTrackWidth.value <= 0) {
      return;
    }

    const nextValue = getSliderValueFromPosition(
      positionX,
      animatedTrackWidth.value,
      min,
      max,
      step,
    );
    const nextRatio = getSliderRatio(nextValue, min, max);
    const previousValue = animatedCurrentValue.value;

    animatedRatio.value = withTiming(nextRatio, {
      duration: SliderAnimationDuration,
      easing: Easing.out(Easing.quad),
    });
    animatedCurrentValue.value = nextValue;

    if (nextValue !== previousValue) {
      scheduleOnRN(onChange, nextValue);
    }
  }

  /**
   * Animates the slider fill width from the shared ratio.
   * Input parameters: none.
   * Output:
   * - Animated style object for the filled track segment.
   * Logic summary:
   * - Reads only shared values inside the worklet.
   * - Keeps width interpolation on the UI thread for smoother updates.
   */
  const animatedFillStyle = useAnimatedStyle(() => ({
    width: `${animatedRatio.value * 100}%`,
  }));

  /**
   * Animates the thumb translation using the shared ratio and measured track width.
   * Input parameters: none.
   * Output:
   * - Animated style object for horizontal thumb positioning.
   * Logic summary:
   * - Derives thumb offset entirely from shared values.
   * - Uses transform-based movement so the thumb stays animation-driven.
   */
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: Math.max(
          0,
          animatedRatio.value * animatedTrackWidth.value - SliderThumbSize / 2,
        ),
      },
    ],
  }));

  /**
   * Builds the gesture-handler pan gesture used for both taps and drags on the slider track.
   * Input parameters: none.
   * Output:
   * - Gesture-handler configuration consumed by `GestureDetector`.
   * Logic summary:
   * - Activates immediately so a simple tap updates the slider without extra gesture types.
   * - Routes value calculations through the worklet-based `applyPosition` helper.
   * - Uses `scheduleOnRN` only for the pressed visual state and React-side callbacks.
   */
  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .minDistance(0)
    .withTestId(testID ? `${testID}-gesture` : 'slider-gesture')
    .onBegin((event) => {
      scheduleOnRN(setIsPressed, true);
      applyPosition(event.x);
    })
    .onUpdate((event) => {
      applyPosition(event.x);
    })
    .onFinalize(() => {
      scheduleOnRN(setIsPressed, false);
    });

  return (
    <View
      style={[
        styles.container,
        { opacity: disabled ? SliderDisabledOpacity : isPressed ? SliderPressedOpacity : 1 },
        style,
      ]}
      testID={testID}
    >
      <View style={styles.header}>
        <NativeText
          style={[styles.label, { color: palette.labelColor }, labelStyle]}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label ?? 'Value'}
        </NativeText>
        <NativeText
          style={[styles.value, { color: palette.valueColor }, valueStyle]}
          testID={testID ? `${testID}-value` : undefined}
        >
          {normalizedValue}
        </NativeText>
      </View>

      <GestureDetector gesture={panGesture}>
        <View
          {...rest}
          onLayout={(event) => {
            const nextTrackWidth = event.nativeEvent.layout.width;

            setTrackWidth(nextTrackWidth);
            animatedTrackWidth.value = nextTrackWidth;
          }}
          style={[styles.track, { backgroundColor: palette.trackColor }]}
          testID={testID ? `${testID}-track` : undefined}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              styles.fill,
              {
                backgroundColor: palette.fillColor,
              },
              animatedFillStyle,
            ]}
            testID={testID ? `${testID}-fill` : undefined}
          />
          <Animated.View
            pointerEvents="none"
            style={[
              styles.thumb,
              {
                backgroundColor: palette.thumbColor,
                borderColor: palette.thumbBorderColor,
              },
              animatedThumbStyle,
            ]}
            testID={testID ? `${testID}-thumb` : undefined}
          />
        </View>
      </GestureDetector>
    </View>
  );
}

const styleSheet = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    gap: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SliderHeaderGap,
  },
  label: {
    fontSize: theme.typography.sm,
    fontWeight: SliderLabelFontWeight,
  },
  value: {
    fontSize: theme.typography.sm,
    fontWeight: SliderValueFontWeight,
  },
  track: {
    height: SliderTrackHeight,
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    overflow: 'visible',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: theme.radius.full,
  },
  thumb: {
    position: 'absolute',
    top: (SliderTrackHeight - SliderThumbSize) / 2,
    left: 0,
    width: SliderThumbSize,
    height: SliderThumbSize,
    borderRadius: theme.radius.full,
    borderWidth: SliderThumbBorderWidth,
  },
}));
