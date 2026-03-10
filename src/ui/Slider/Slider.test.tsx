import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Slider } from './Slider';

describe('Slider', () => {
  it('renders label text and the normalized current value', () => {
    const { getByTestId } = render(
      <Slider
        label="Tempo"
        max={240}
        min={40}
        onChange={() => undefined}
        testID="slider"
        value={121}
      />,
    );

    expect(getByTestId('slider-label').props.children).toBe('Tempo');
    expect(getByTestId('slider-value').props.children).toBe(121);
  });

  it('calls onChange with the snapped value from track interaction', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Slider
        max={240}
        min={40}
        onChange={onChange}
        step={10}
        testID="slider"
        value={120}
      />,
    );
    const slider = getByRole('adjustable');

    fireEvent(slider, 'layout', { nativeEvent: { layout: { width: 100 } } });
    fireEvent(slider, 'responderGrant', { nativeEvent: { locationX: 100 } });

    expect(onChange).toHaveBeenCalledWith(240);
  });

  it('applies disabled accessibility semantics and blocks interaction', () => {
    const onChange = jest.fn();
    const { getByRole, getByTestId } = render(
      <Slider
        disabled
        label="Dynamics"
        max={100}
        min={0}
        onChange={onChange}
        testID="slider"
        value={50}
      />,
    );
    const slider = getByRole('adjustable');
    const flattenedFillStyle = StyleSheet.flatten(getByTestId('slider-fill').props.style);
    const flattenedThumbStyle = StyleSheet.flatten(getByTestId('slider-thumb').props.style);

    fireEvent(slider, 'layout', { nativeEvent: { layout: { width: 100 } } });
    fireEvent(slider, 'responderGrant', { nativeEvent: { locationX: 100 } });

    expect(slider.props.accessibilityState).toEqual({ disabled: true });
    expect(flattenedFillStyle.backgroundColor).toBe('#111827CC');
    expect(flattenedThumbStyle.borderColor).toBe('#111827CC');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('uses variant-driven colors for the track and thumb', () => {
    const { getByTestId } = render(
      <Slider
        max={100}
        min={0}
        onChange={() => undefined}
        testID="slider"
        value={25}
        variant="secondary"
      />,
    );
    const flattenedTrackStyle = StyleSheet.flatten(getByTestId('slider-track').props.style);
    const flattenedFillStyle = StyleSheet.flatten(getByTestId('slider-fill').props.style);
    const flattenedThumbStyle = StyleSheet.flatten(getByTestId('slider-thumb').props.style);

    expect(flattenedTrackStyle.backgroundColor).toBe('#D1D5DB');
    expect(flattenedFillStyle.backgroundColor).toBe('#64748B');
    expect(flattenedThumbStyle.borderColor).toBe('#64748B');
  });
});
