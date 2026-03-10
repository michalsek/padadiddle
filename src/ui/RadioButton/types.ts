import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type RadioButtonProps = {
  selected: boolean;
  onSelect: () => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
} & Omit<
  PressableProps,
  'accessibilityRole' | 'accessibilityState' | 'children' | 'disabled' | 'onPress' | 'style' | 'testID'
>;
