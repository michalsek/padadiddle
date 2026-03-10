import { StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders a clamped fill width and accessibility value', () => {
    const { getByRole, getByTestId } = render(
      <ProgressBar progress={0.5} testID="progress" />,
    );
    const progressBar = getByRole('progressbar');
    const flattenedFillStyle = StyleSheet.flatten(getByTestId('progress-fill').props.style);

    expect(progressBar.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 50 });
    expect(flattenedFillStyle.width).toBe('50%');
  });

  it('clamps overflow progress values to the valid range', () => {
    const { getByTestId, rerender } = render(
      <ProgressBar progress={2} testID="progress" />,
    );

    expect(StyleSheet.flatten(getByTestId('progress-fill').props.style).width).toBe('100%');

    rerender(<ProgressBar progress={-1} testID="progress" />);

    expect(StyleSheet.flatten(getByTestId('progress-fill').props.style).width).toBe('0%');
  });

  it('applies variant-driven colors to the track and fill', () => {
    const { getByTestId } = render(
      <ProgressBar progress={0.25} testID="progress" variant="secondary" />,
    );
    const flattenedTrackStyle = StyleSheet.flatten(getByTestId('progress').props.style);
    const flattenedFillStyle = StyleSheet.flatten(getByTestId('progress-fill').props.style);

    expect(flattenedTrackStyle.backgroundColor).toBe('#D1D5DB');
    expect(flattenedFillStyle.backgroundColor).toBe('#64748B');
  });
});
