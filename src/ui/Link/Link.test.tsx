import * as Linking from 'expo-linking';
import { StyleSheet } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { Link } from './Link';

jest.mock('expo-linking', () => ({
  openURL: jest.fn(() => Promise.resolve()),
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
    const link = getByTestId('link');
    const styleProp = link.props.style;
    const resolvedStyle = typeof styleProp === 'function' ? styleProp({ pressed: false }) : styleProp;
    const flattenedStyle = StyleSheet.flatten(resolvedStyle);

    fireEvent.press(link);

    expect(flattenedStyle.opacity).toBe(0.5);
    expect(Linking.openURL).not.toHaveBeenCalled();
  });

  it('logs when opening the href fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (Linking.openURL as jest.Mock).mockRejectedValueOnce(new Error('unsupported'));
    const { getByRole } = render(<Link href="bad-url" label="Broken" />);

    fireEvent.press(getByRole('link'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to open URL in Link component:',
        expect.any(Error),
      );
    });
  });
});
