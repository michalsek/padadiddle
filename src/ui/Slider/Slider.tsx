import { useEffect, useState } from "react";
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

  /**
   * Updates the slider's internal shared value from a gesture-local track position.
   * Input parameters:
   * - `positionX`: horizontal touch position relative to the measured track width.
   * Output:
   * - None. The function mutates only the internal shared value used for rendering.
   * Logic summary:
   * - Ignores updates while disabled or before layout reports a usable track width.
   * - Converts the gesture coordinate into a snapped slider value within bounds.
   * - Leaves external `onChange` notification to the finalize phase.
   */
  function updateInternalValue(positionX: number) {
    "worklet";

    if (disabled || animatedTrackWidth.value <= 0) {
      return;
    }

    animatedCurrentValue.value = getSliderValueFromPosition(
      positionX,
      animatedTrackWidth.value,
      min,
      max,
      step,
    );
  }

  /**
   * Finalizes the current gesture and commits the latest internal slider value.
   * Input parameters: none.
   * Output:
   * - None. The function schedules `onChange` exactly once when the value changed.
   * Logic summary:
   * - Marks the gesture as inactive so future controlled prop updates can resync the UI.
   * - Compares the current internal value with the last committed controlled value.
   * - Schedules `onChange` only when the finalized value differs from the committed value.
   */
  function finalizeValueChange() {
    "worklet";

    isGestureActive.value = false;

    const nextValue = animatedCurrentValue.value;

    if (nextValue === committedValue.value) {
      return;
    }

    committedValue.value = nextValue;
    scheduleOnRN(onChange, nextValue);
  }

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

  const gesture = Gesture.Pan()
    .enabled(!disabled)
    .minDistance(0)
    .withTestId(testID ? `${testID}-gesture` : "slider-gesture")
    .onBegin((event) => {
      isGestureActive.value = true;
      scheduleOnRN(setIsPressed, true);
      updateInternalValue(event.x);
    })
    .onUpdate((event) => {
      updateInternalValue(event.x);
    })
    .onFinalize(() => {
      scheduleOnRN(setIsPressed, false);
      finalizeValueChange();
    });

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
