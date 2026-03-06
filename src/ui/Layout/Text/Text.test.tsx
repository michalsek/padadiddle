import { StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Text } from './Text';

describe('Text', () => {
  it('renders text content', () => {
    const { getByText } = render(<Text>Body</Text>);

    expect(getByText('Body')).toBeTruthy();
  });

  it('uses muted token color for muted variant', () => {
    const { getByTestId } = render(
      <Text testID="body-text" variant="muted">
        Body
      </Text>
    );
    const flattenedStyle = StyleSheet.flatten(getByTestId('body-text').props.style);

    expect(flattenedStyle.color).toBe('#64748B');
  });
});
