import { StyleSheet, View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { COLUMN_DEFAULT_GAP } from '@app/ui/Layout/Column/constants';
import { type ColumnProps } from '@app/ui/Layout/Column/types';
import { getColumnBackgroundColor, getColumnStyle } from '@app/ui/Layout/Column/utils';

// Stacks children vertically with configurable alignment and spacing.
const Column: React.FC<ColumnProps> = ({
  children,
  gap = COLUMN_DEFAULT_GAP,
  align,
  justify,
  tone = 'transparent',
  style,
  testID,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        getColumnStyle(gap),
        { backgroundColor: getColumnBackgroundColor(tone, isDark) },
        align ? { alignItems: align } : null,
        justify ? { justifyContent: justify } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

export default Column;
