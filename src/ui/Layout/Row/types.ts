import type { PropsWithChildren } from 'react';
import type { FlexAlignType, StyleProp, ViewStyle } from 'react-native';

export type RowTone = 'transparent' | 'surface';

export type RowProps = PropsWithChildren<{
  gap?: number;
  align?: FlexAlignType;
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  tone?: RowTone;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}>;
