import * as Linking from 'expo-linking';
import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Link } from './Link';

jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
}));

describe('Link', () => {
  it('calls onPress and opens href when enabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Link href="https://example.com" label="Open" onPress={onPress} />);

    fireEvent.press(getByRole('link'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith('https://example.com');
  });

  it('shows disabled styling and blocks navigation', () => {
    const { getByTestId } = render(
      <Link disabled href="https://example.com" label="Disabled" testID="link" />,
    );
    const flattenedStyle = StyleSheet.flatten(getByTestId('link').props.style);

    fireEvent.press(getByTestId('link'));

    expect(flattenedStyle.opacity).toBe(0.5);
    expect(Linking.openURL).not.toHaveBeenCalled();
  });
});
