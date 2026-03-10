import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { RadioButton } from './RadioButton';

describe('RadioButton', () => {
  it('renders the label and calls onSelect while enabled', () => {
    const onSelect = jest.fn();
    const { getByRole, getByText } = render(
      <RadioButton label="Swing" onSelect={onSelect} selected={false} />,
    );

    fireEvent.press(getByRole('radio'));

    expect(getByText('Swing')).toBeTruthy();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('applies token-driven selected styling and disables interaction', () => {
    const onSelect = jest.fn();
    const { getByRole, getByTestId } = render(
      <RadioButton
        disabled
        label="Triplets"
        onSelect={onSelect}
        selected
        testID="radio"
      />,
    );
    const radio = getByRole('radio');
    const styleProp = radio.props.style;
    const resolvedStyle = typeof styleProp === 'function' ? styleProp({ pressed: false }) : styleProp;
    const flattenedPressableStyle = StyleSheet.flatten(resolvedStyle);
    const flattenedIndicatorStyle = StyleSheet.flatten(getByTestId('radio-indicator').props.style);
    const flattenedDotStyle = StyleSheet.flatten(getByTestId('radio-dot').props.style);
    const flattenedLabelStyle = StyleSheet.flatten(getByTestId('radio-label').props.style);

    fireEvent.press(radio);

    expect(radio.props.accessibilityState).toEqual({ checked: true, disabled: true });
    expect(flattenedPressableStyle.opacity).toBe(0.5);
    expect(flattenedIndicatorStyle.borderColor).toBe('#111827CC');
    expect(flattenedDotStyle.backgroundColor).toBe('#111827CC');
    expect(flattenedLabelStyle.color).toBe('#64748B');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('preserves computed accessibility semantics when runtime props try to override them', () => {
    const onSelect = jest.fn();
    const props = {
      selected: true,
      disabled: true,
      onSelect,
      accessibilityRole: 'button',
      accessibilityState: { checked: false, disabled: false },
    } as any;
    const { getByRole } = render(<RadioButton {...props} />);
    const radio = getByRole('radio');

    expect(radio.props.accessibilityRole).toBe('radio');
    expect(radio.props.accessibilityState).toEqual({ checked: true, disabled: true });
  });
});
