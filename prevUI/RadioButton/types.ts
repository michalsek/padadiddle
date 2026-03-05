import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type RadioButtonProps = {
  selected: boolean;
  onSelect: () => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, 'onPress'>;
