import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { SLIDER_THUMB_SIZE } from '@app/ui/Slider/constants';
import type { SliderProps } from '@app/ui/Slider/types';
import {
  getSliderPalette,
  normalizeValue,
  positionToValue,
  valueToRatio,
} from '@app/ui/Slider/utils';

// Renders a stepped slider with touch drag and tap-to-seek interactions.
export default function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  variant = 'primary',
}: SliderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = getSliderPalette(variant, isDark);
  const [trackWidth, setTrackWidth] = useState(0);

  const normalizedValue = useMemo(
    () => normalizeValue(value, min, max, step),
    [max, min, step, value]
  );

  const ratio = valueToRatio(normalizedValue, min, max);
  const thumbLeft = Math.max(0, ratio * trackWidth - SLIDER_THUMB_SIZE / 2);

  const applyPosition = (x: number) => {
    const nextValue = positionToValue(x, trackWidth, min, max, step);
    if (nextValue !== normalizedValue) {
      onChange(nextValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: palette.labelColor }]}>{label ?? 'Value'}</Text>
        <Text testID="sliderValue" style={[styles.valueText, { color: palette.valueColor }]}>
          {normalizedValue}
        </Text>
      </View>

      <View
        testID="sliderTrack"
        style={[styles.track, { backgroundColor: palette.trackColor }]}
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
        onStartShouldSetResponderCapture={() => true}
        onMoveShouldSetResponderCapture={() => true}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={(event) => applyPosition(event.nativeEvent.locationX)}
        onResponderMove={(event) => applyPosition(event.nativeEvent.locationX)}
      >
        <View
          style={[styles.fill, { width: `${ratio * 100}%`, backgroundColor: palette.fillColor }]}
        />
        <View
          testID="sliderThumb"
          pointerEvents="none"
          style={[
            styles.thumb,
            {
              left: thumbLeft,
              backgroundColor: palette.thumbColor,
              borderColor: palette.thumbBorderColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 12,
    fontWeight: '600',
  },
  track: {
    height: 22,
    justifyContent: 'center',
    borderRadius: 11,
    overflow: 'visible',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 11,
  },
  thumb: {
    position: 'absolute',
    width: SLIDER_THUMB_SIZE,
    height: SLIDER_THUMB_SIZE,
    borderRadius: SLIDER_THUMB_SIZE / 2,
    borderWidth: 2,
  },
});
