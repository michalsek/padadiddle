import { fireEvent, render } from '@testing-library/react-native';

import Button from '@app/ui/Button/Button';

describe('Button', () => {
  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Tap" onPress={onPress} />);

    fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
