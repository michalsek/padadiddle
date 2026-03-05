import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { RADIO_DOT_SIZE, RADIO_SIZE } from '@app/ui/RadioButton/constants';
import { type RadioButtonProps } from '@app/ui/RadioButton/types';
import { getRadioPalette } from '@app/ui/RadioButton/utils';

// Renders a themed radio button with optional label.
const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onSelect,
  label,
  disabled = false,
  style,
  labelStyle,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = getRadioPalette(isDark, selected);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onSelect}
      style={[styles.container, style]}
      {...rest}
    >
      <View
        style={[
          styles.outer,
          {
            width: RADIO_SIZE,
            height: RADIO_SIZE,
            borderColor: palette.ringColor,
          },
        ]}
      >
        <View
          style={[
            styles.dot,
            {
              width: RADIO_DOT_SIZE,
              height: RADIO_DOT_SIZE,
              backgroundColor: palette.dotColor,
            },
          ]}
        />
      </View>
      {label ? (
        <Text style={[styles.label, { color: palette.labelColor }, labelStyle]}>{label}</Text>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  outer: {
    borderWidth: 2,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 999,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RadioButton;
