import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@app/hooks/useColorScheme';
import {
  BOTTOM_SHEET_DEFAULT_BOTTOM_PADDING,
  BOTTOM_SHEET_DEFAULT_HORIZONTAL_PADDING,
  BOTTOM_SHEET_DEFAULT_TOP_PADDING,
} from '@app/ui/BottomSheet/constants';
import { type BottomSheetProps } from '@app/ui/BottomSheet/types';
import { getBottomSheetPalette } from '@app/ui/BottomSheet/utils';

// Renders a bottom-anchored surface container for persistent controls.
const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  disableSafeArea = false,
  safeAreaEdges = ['bottom'],
  style,
  testID,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = getBottomSheetPalette(isDark);
  const insets = useSafeAreaInsets();

  const safeAreaPadding = disableSafeArea
    ? null
    : {
        paddingTop:
          BOTTOM_SHEET_DEFAULT_TOP_PADDING + (safeAreaEdges.includes('top') ? insets.top : 0),
        paddingBottom:
          BOTTOM_SHEET_DEFAULT_BOTTOM_PADDING +
          (safeAreaEdges.includes('bottom') ? insets.bottom : 0),
        paddingLeft:
          BOTTOM_SHEET_DEFAULT_HORIZONTAL_PADDING +
          (safeAreaEdges.includes('left') ? insets.left : 0),
        paddingRight:
          BOTTOM_SHEET_DEFAULT_HORIZONTAL_PADDING +
          (safeAreaEdges.includes('right') ? insets.right : 0),
      };

  return (
    <View testID={testID} style={styles.root}>
      <View
        testID={testID ? `${testID}-content` : undefined}
        style={[
          styles.content,
          {
            backgroundColor: palette.backgroundColor,
            borderTopColor: palette.borderTopColor,
          },
          safeAreaPadding,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    borderTopWidth: 1,
    paddingTop: BOTTOM_SHEET_DEFAULT_TOP_PADDING,
    paddingBottom: BOTTOM_SHEET_DEFAULT_BOTTOM_PADDING,
    paddingLeft: BOTTOM_SHEET_DEFAULT_HORIZONTAL_PADDING,
    paddingRight: BOTTOM_SHEET_DEFAULT_HORIZONTAL_PADDING,
    gap: 8,
  },
});

export default BottomSheet;
