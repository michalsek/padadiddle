import { render } from '@testing-library/react-native';

import Spinner from '@app/ui/Spinner/Spinner';

describe('Spinner', () => {
  it('renders activity indicator', () => {
    const { getByTestId } = render(<Spinner testID="spinner" />);

    expect(getByTestId('spinner')).toBeTruthy();
  });
});
