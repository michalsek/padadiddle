import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders the label and calls onChange with the toggled value', () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = render(
      <Checkbox checked={false} label="Practice mode" onChange={onChange} />,
    );

    fireEvent.press(getByRole('checkbox'));

    expect(getByText('Practice mode')).toBeTruthy();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies token-driven checked styling and disables interaction', () => {
    const onChange = jest.fn();
    const { getByRole, getByTestId } = render(
      <Checkbox
        checked
        disabled
        label="Muted"
        onChange={onChange}
        testID="checkbox"
      />,
    );
    const checkbox = getByRole('checkbox');
    const styleProp = checkbox.props.style;
    const resolvedStyle = typeof styleProp === 'function' ? styleProp({ pressed: false }) : styleProp;
    const flattenedPressableStyle = StyleSheet.flatten(resolvedStyle);
    const flattenedIndicatorStyle = StyleSheet.flatten(getByTestId('checkbox-indicator').props.style);
    const flattenedLabelStyle = StyleSheet.flatten(getByTestId('checkbox-label').props.style);

    fireEvent.press(checkbox);

    expect(checkbox.props.accessibilityState).toEqual({ checked: true, disabled: true });
    expect(flattenedPressableStyle.opacity).toBe(0.5);
    expect(flattenedIndicatorStyle.backgroundColor).toBe('#111827CC');
    expect(flattenedIndicatorStyle.borderColor).toBe('#111827CC');
    expect(flattenedLabelStyle.color).toBe('#64748B');
    expect(onChange).not.toHaveBeenCalled();
  });
});
