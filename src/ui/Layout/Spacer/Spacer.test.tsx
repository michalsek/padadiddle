import { StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders spacer view', () => {
    const { getByTestId } = render(<Spacer testID="spacer" />);

    expect(getByTestId('spacer')).toBeTruthy();
  });

  it('supports horizontal axis dimensions', () => {
    const { getByTestId } = render(<Spacer axis="horizontal" size={20} testID="spacer" />);
    const flattenedStyle = StyleSheet.flatten(getByTestId('spacer').props.style);

    expect(flattenedStyle.width).toBe(20);
    expect(flattenedStyle.height).toBe(1);
  });
});
