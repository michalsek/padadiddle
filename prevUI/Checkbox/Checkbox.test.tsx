import { fireEvent, render } from '@testing-library/react-native';

import Checkbox from '@app/ui/Checkbox/Checkbox';

describe('Checkbox', () => {
  it('calls onChange with toggled value', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Checkbox checked={false} onChange={onChange} />);

    fireEvent.press(getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
  });
});
