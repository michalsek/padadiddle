import { Text as NativeText, StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Box } from './Box';

describe('Box', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Box>
        <NativeText>content</NativeText>
      </Box>
    );

    expect(getByText('content')).toBeTruthy();
  });

  it('uses themed background color', () => {
    const { getByTestId } = render(<Box testID="box" />);
    const flattenedStyle = StyleSheet.flatten(getByTestId('box').props.style);

    expect(flattenedStyle.backgroundColor).toBe('#FFFFFF');
  });
});
