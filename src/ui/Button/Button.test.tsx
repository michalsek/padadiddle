import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Button } from './Button';

describe('Button', () => {
  it('renders the label and calls onPress while enabled', () => {
    const onPress = jest.fn();
    const { getByRole, getByText } = render(<Button label="Save" onPress={onPress} />);

    fireEvent.press(getByRole('button'));

    expect(getByText('Save')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies token-driven secondary styling and disables interaction', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button disabled label="Disabled" onPress={onPress} testID="button" variant="secondary" />,
    );
    const button = getByTestId('button');
    const styleProp = button.props.style;
    const resolvedStyle = typeof styleProp === 'function' ? styleProp({ pressed: false }) : styleProp;
    const flattenedStyle = StyleSheet.flatten(resolvedStyle);

    fireEvent.press(button);

    expect(flattenedStyle.backgroundColor).toBe('#FFFFFFCC');
    expect(flattenedStyle.borderColor).toBe('#D1D5DB');
    expect(flattenedStyle.opacity).toBe(0.5);
    expect(onPress).not.toHaveBeenCalled();
  });
});
