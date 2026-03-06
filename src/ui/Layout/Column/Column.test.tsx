import { Text as NativeText, StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Column } from './Column';

describe('Column', () => {
  it('renders children in container', () => {
    const { getByText } = render(
      <Column>
        <NativeText>A</NativeText>
      </Column>
    );

    expect(getByText('A')).toBeTruthy();
  });

  it('uses default themed gap', () => {
    const { getByTestId } = render(
      <Column testID="column">
        <NativeText>A</NativeText>
      </Column>
    );
    const flattenedStyle = StyleSheet.flatten(getByTestId('column').props.style);

    expect(flattenedStyle.gap).toBe(8);
  });
});
