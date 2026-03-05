import { Pressable, StyleSheet, Text } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { type ButtonProps } from '@app/ui/Button/types';
import { getButtonPalette } from '@app/ui/Button/utils';

// Renders a themed pressable button with variant styling.
const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
  labelStyle,
  testID,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = getButtonPalette(variant, isDark);

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
          opacity: disabled ? 0.5 : pressed ? 0.75 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: palette.textColor }, labelStyle]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Button;
