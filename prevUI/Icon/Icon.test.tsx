import { Home } from 'lucide-react-native';
import { render } from '@testing-library/react-native';

import Icon from '@app/ui/Icon/Icon';

describe('Icon', () => {
  it('renders a lucide icon component', () => {
    const { getByTestId } = render(<Icon icon={Home} testID="icon" />);

    expect(getByTestId('icon')).toBeTruthy();
  });
});
