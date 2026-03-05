import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, 'onPress'>;
