import type { PropsWithChildren } from 'react';
import type { FlexAlignType, StyleProp, ViewStyle } from 'react-native';

export type ColumnTone = 'transparent' | 'surface';

export type ColumnProps = PropsWithChildren<{
  gap?: number;
  align?: FlexAlignType;
  justify?: ViewStyle['justifyContent'];
  tone?: ColumnTone;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}>;
