import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';

import { Slider } from './index';
import { getSliderPalette } from './utils';

describe('Slider', () => {
  it('renders label and current value', () => {
    const { getByText, getByTestId } = render(
      <Slider value={120} min={40} max={240} onChange={() => {}} label="Tempo" />
    );

    expect(getByText('Tempo')).toBeTruthy();
    expect(getByTestId('sliderValue').props.children).toBe(120);
  });

  it('calls onChange from track interaction', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Slider value={120} min={40} max={240} step={10} onChange={handleChange} />
    );

    const track = getByTestId('sliderTrack');
    fireEvent(track, 'layout', { nativeEvent: { layout: { width: 100, height: 20, x: 0, y: 0 } } });
    fireEvent(track, 'responderGrant', { nativeEvent: { locationX: 100 } });

    expect(handleChange).toHaveBeenCalledWith(240);
  });

  it('applies variant color palette', () => {
    const { getByTestId } = render(
      <Slider value={120} min={40} max={240} onChange={() => {}} variant="secondary" />
    );

    const expectedPalette = getSliderPalette('secondary', false);
    const track = getByTestId('sliderTrack');
    const thumb = getByTestId('sliderThumb');

    expect(track.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: expectedPalette.trackColor }),
      ])
    );
    expect(thumb.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: expectedPalette.thumbColor,
          borderColor: expectedPalette.thumbBorderColor,
        }),
      ])
    );
    expect(thumb.props.pointerEvents).toBe('none');
  });
});
