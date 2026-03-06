import type { PropsWithChildren } from 'react';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

export type ScreenProps = PropsWithChildren<{
  disableSafeArea?: boolean;
  safeAreaEdges?: Edge[];
  padding?: number;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  scrollViewProps?: Omit<ScrollViewProps, 'contentContainerStyle'>;
}>;
