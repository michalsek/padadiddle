import { render } from '@testing-library/react-native';

import Avatar from '@app/ui/Avatar/Avatar';

describe('Avatar', () => {
  it('renders initials from label', () => {
    const { getByText } = render(<Avatar label="Pad A" />);

    expect(getByText('PA')).toBeTruthy();
  });
});
