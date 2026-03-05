import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useColorScheme } from '@app/hooks/useColorScheme';
import { SPINNER_DEFAULT_SIZE } from '@app/ui/Spinner/constants';
import { type SpinnerProps } from '@app/ui/Spinner/types';
import { getSpinnerColor } from '@app/ui/Spinner/utils';

// Renders a themed loading spinner.
const Spinner: React.FC<SpinnerProps> = ({ size = SPINNER_DEFAULT_SIZE, style, testID }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator testID={testID} size={size} color={getSpinnerColor(isDark)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Spinner;
