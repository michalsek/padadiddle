import { fireEvent, render } from '@testing-library/react-native';

import Link from '@app/ui/Link/Link';

describe('Link', () => {
  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Link label="Open" onPress={onPress} />);

    fireEvent.press(getByRole('link'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
