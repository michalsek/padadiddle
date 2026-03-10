import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

export type SliderVariant = 'primary' | 'secondary' | 'ghost';

export type SliderProps = Omit<
  ViewProps,
  | 'accessibilityRole'
  | 'accessibilityState'
  | 'accessibilityValue'
  | 'onLayout'
  | 'onMoveShouldSetResponder'
  | 'onMoveShouldSetResponderCapture'
  | 'onResponderGrant'
  | 'onResponderMove'
  | 'onStartShouldSetResponder'
  | 'onStartShouldSetResponderCapture'
  | 'style'
  | 'testID'
> & {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  variant?: SliderVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  testID?: string;
};
