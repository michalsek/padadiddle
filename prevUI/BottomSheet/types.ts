import type { PropsWithChildren } from 'react';
import type { Edge } from 'react-native-safe-area-context';
import type { StyleProp, ViewStyle } from 'react-native';

export type BottomSheetProps = PropsWithChildren<{
  disableSafeArea?: boolean;
  safeAreaEdges?: Edge[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}>;
