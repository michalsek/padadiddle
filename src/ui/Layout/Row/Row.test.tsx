import { Text as NativeText, StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Row } from './Row';

describe('Row', () => {
  it('renders children in container', () => {
    const { getByText } = render(
      <Row>
        <NativeText>A</NativeText>
      </Row>
    );

    expect(getByText('A')).toBeTruthy();
  });

  it('uses default themed gap and applies wrapping when requested', () => {
    const { getByTestId } = render(
      <Row wrap testID="row">
        <NativeText>A</NativeText>
      </Row>
    );
    const flattenedStyle = StyleSheet.flatten(getByTestId('row').props.style);

    expect(flattenedStyle.gap).toBe(8);
    expect(flattenedStyle.flexWrap).toBe('wrap');
  });
});
