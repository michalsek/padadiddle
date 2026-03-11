import { StyleSheet } from 'react-native';
import { act, fireEvent, render } from '@testing-library/react-native';
import { State } from 'react-native-gesture-handler';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';

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

  it('calls onChange with the snapped value from track interaction', async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Slider
        max={240}
        min={40}
        onChange={onChange}
        step={10}
        testID="slider"
        value={120}
      />,
    );
    const sliderTrack = getByTestId('slider-track');

    await act(async () => {
      fireEvent(sliderTrack, 'layout', { nativeEvent: { layout: { width: 100 } } });
      fireGestureHandler(getByGestureTestId('slider-gesture'), [
        { state: State.BEGAN, x: 100 },
        { state: State.ACTIVE, x: 100 },
        { state: State.END, x: 100 },
      ]);
      await Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith(240);
  });

  it('applies disabled styling and blocks interaction', async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
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
    const sliderTrack = getByTestId('slider-track');
    const flattenedFillStyle = StyleSheet.flatten(getByTestId('slider-fill').props.style);
    const flattenedThumbStyle = StyleSheet.flatten(getByTestId('slider-thumb').props.style);

    await act(async () => {
      fireEvent(sliderTrack, 'layout', { nativeEvent: { layout: { width: 100 } } });
      fireGestureHandler(getByGestureTestId('slider-gesture'), [
        { state: State.BEGAN, x: 100 },
        { state: State.ACTIVE, x: 100 },
        { state: State.END, x: 100 },
      ]);
      await Promise.resolve();
    });

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
