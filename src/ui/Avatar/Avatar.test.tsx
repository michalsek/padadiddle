import { StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials fallback from the label', () => {
    const { getByText } = render(<Avatar label="Pad A" />);

    expect(getByText('PA')).toBeTruthy();
  });

  it('applies square shaping with themed border styling', () => {
    const { getByTestId } = render(<Avatar label="Pad A" shape="square" testID="avatar" />);
    const flattenedStyle = StyleSheet.flatten(getByTestId('avatar').props.style);

    expect(flattenedStyle.borderRadius).toBe(8);
    expect(flattenedStyle.borderColor).toBe('#D1D5DB');
  });
});
