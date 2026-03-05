import { render } from '@testing-library/react-native';

import BodyText from '@app/ui/Layout/Text/Text';

describe('Text', () => {
  it('renders text content', () => {
    const { getByText } = render(<BodyText>Body</BodyText>);

    expect(getByText('Body')).toBeTruthy();
  });
});
