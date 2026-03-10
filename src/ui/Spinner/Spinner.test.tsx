import { render } from '@testing-library/react-native';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with the themed primary color by default', () => {
    const { getByTestId } = render(<Spinner testID="spinner" />);

    expect(getByTestId('spinner').props.color).toBe('#2563EB');
  });

  it('uses the explicit color override when provided', () => {
    const { getByTestId } = render(<Spinner color="#123456" testID="spinner" />);

    expect(getByTestId('spinner').props.color).toBe('#123456');
  });
});
