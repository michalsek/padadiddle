import { useEffect, useMemo, useState } from "react";
import {
  Text as NativeText,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { createStyleSheet, useStyles } from "../../theme";
import { useTheme } from "../../theme/useTheme";
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
} from "./constants";
import type { SliderProps } from "./types";
import {
  getSliderPalette,
  getSliderRatio,
  getSliderValueFromPosition,
  normalizeSliderValue,
} from "./utils";

type SliderValueAnimatedProps = TextInputProps & {
  text?: string;
  defaultValue?: string;
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

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
  const normalizedValue = normalizeSliderValue(value, min, max, step);
  const palette = getSliderPalette(theme, variant, disabled);
  const animatedTrackWidth = useSharedValue(0);
  const animatedCurrentValue = useSharedValue(normalizedValue);
  const committedValue = useSharedValue(normalizedValue);
  const isGestureActive = useSharedValue(false);

  useEffect(() => {
    committedValue.value = normalizedValue;

    if (isGestureActive.value) {
      return;
    }

    animatedCurrentValue.value = withTiming(normalizedValue, {
      duration: SliderAnimationDuration,
      easing: Easing.out(Easing.linear),
    });
  }, [animatedCurrentValue, committedValue, isGestureActive, normalizedValue]);

  const animatedRatio = useDerivedValue(() =>
    getSliderRatio(animatedCurrentValue.value, min, max),
  );

  const animatedValueProps = useAnimatedProps<SliderValueAnimatedProps>(() => {
    const nextValue = String(animatedCurrentValue.value);

    return {
      defaultValue: nextValue,
      text: nextValue,
    };
  });

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: `${animatedRatio.value * 100}%`,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: (() => {
      const clampedRatio = Math.max(0, Math.min(1, animatedRatio.value));
      const maxTranslate = Math.max(
        0,
        animatedTrackWidth.value - SliderThumbSize,
      );

      return [
        {
          translateX: clampedRatio * maxTranslate,
        },
      ];
    })(),
  }));

  /**
   * Builds the pan gesture used by the slider track.
   * Input parameters: none. The worklet closes over the latest slider props and shared values.
   * Output:
   * - A stable pan gesture instance that updates internal state during movement and commits once on finalize.
   * Logic summary:
   * - Memoizes the gesture so press-state rerenders do not recreate handlers mid-drag.
   * - Updates only the internal shared value during begin/update events.
   * - Commits the finalized value through `onChange` exactly once when the gesture ends.
   */
  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!disabled)
        .minDistance(0)
        .withTestId(testID ? `${testID}-gesture` : "slider-gesture")
        .onBegin((event) => {
          "worklet";

          isGestureActive.value = true;
          scheduleOnRN(setIsPressed, true);

          if (animatedTrackWidth.value <= 0) {
            return;
          }

          animatedCurrentValue.value = getSliderValueFromPosition(
            event.x,
            animatedTrackWidth.value,
            min,
            max,
            step,
          );
        })
        .onUpdate((event) => {
          "worklet";

          if (disabled || animatedTrackWidth.value <= 0) {
            return;
          }

          animatedCurrentValue.value = getSliderValueFromPosition(
            event.x,
            animatedTrackWidth.value,
            min,
            max,
            step,
          );
        })
        .onFinalize(() => {
          "worklet";

          isGestureActive.value = false;
          scheduleOnRN(setIsPressed, false);

          const nextValue = animatedCurrentValue.value;

          if (nextValue === committedValue.value) {
            return;
          }

          committedValue.value = nextValue;
          scheduleOnRN(onChange, nextValue);
        }),
    [
      animatedCurrentValue,
      animatedTrackWidth,
      committedValue,
      disabled,
      isGestureActive,
      max,
      min,
      onChange,
      step,
      testID,
    ],
  );

  return (
    <View
      style={[
        styles.container,
        {
          opacity: disabled
            ? SliderDisabledOpacity
            : isPressed
              ? SliderPressedOpacity
              : 1,
        },
        style,
      ]}
      testID={testID}
    >
      <View style={styles.header}>
        <NativeText
          style={[styles.label, { color: palette.labelColor }, labelStyle]}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label ?? "Value"}
        </NativeText>
        <AnimatedTextInput
          animatedProps={animatedValueProps}
          defaultValue={String(normalizedValue)}
          editable={false}
          pointerEvents="none"
          style={[styles.value, { color: palette.valueColor }, valueStyle]}
          testID={testID ? `${testID}-value` : undefined}
        />
      </View>

      <GestureDetector gesture={gesture}>
        <View
          {...rest}
          onLayout={(event) => {
            const nextTrackWidth = event.nativeEvent.layout.width;

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
    width: "100%",
    gap: theme.spacing.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SliderHeaderGap,
  },
  label: {
    fontSize: theme.typography.sm,
    fontWeight: SliderLabelFontWeight,
  },
  value: {
    fontSize: theme.typography.sm,
    fontWeight: SliderValueFontWeight,
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlign: "right",
  },
  track: {
    height: SliderTrackHeight,
    borderRadius: theme.radius.full,
    justifyContent: "center",
    overflow: "visible",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: theme.radius.full,
  },
  thumb: {
    position: "absolute",
    top: (SliderTrackHeight - SliderThumbSize) / 2,
    left: 0,
    width: SliderThumbSize,
    height: SliderThumbSize,
    borderRadius: theme.radius.full,
    borderWidth: SliderThumbBorderWidth,
  },
}));
