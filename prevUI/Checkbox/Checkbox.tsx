import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { CHECKBOX_SIZE } from '@app/ui/Checkbox/constants';
import { type CheckboxProps } from '@app/ui/Checkbox/types';
import { getCheckboxPalette } from '@app/ui/Checkbox/utils';

// Renders a themed checkbox with optional label.
const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  style,
  labelStyle,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = getCheckboxPalette(isDark, checked);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={[styles.container, style]}
      {...rest}
    >
      <View
        style={[
          styles.box,
          {
            width: CHECKBOX_SIZE,
            height: CHECKBOX_SIZE,
            borderColor: palette.borderColor,
            backgroundColor: palette.backgroundColor,
          },
        ]}
      >
        <Text style={[styles.mark, { color: palette.markColor }]}>✓</Text>
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
  box: {
    borderWidth: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    fontWeight: '700',
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Checkbox;
