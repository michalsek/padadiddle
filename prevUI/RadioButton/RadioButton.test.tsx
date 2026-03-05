import { fireEvent, render } from '@testing-library/react-native';

import RadioButton from '@app/ui/RadioButton/RadioButton';

describe('RadioButton', () => {
  it('calls onSelect when pressed', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<RadioButton selected={false} onSelect={onSelect} />);

    fireEvent.press(getByRole('radio'));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
