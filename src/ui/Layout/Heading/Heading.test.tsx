import { StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

import { Heading } from './Heading';

describe('Heading', () => {
  it('renders heading content', () => {
    const { getByText } = render(<Heading level={2}>Title</Heading>);

    expect(getByText('Title')).toBeTruthy();
  });

  it('resolves heading level styles', () => {
    const { getByTestId } = render(
      <Heading level={4} testID="heading">
        Title
      </Heading>
    );
    const flattenedStyle = StyleSheet.flatten(getByTestId('heading').props.style);

    expect(flattenedStyle.fontSize).toBe(18);
    expect(flattenedStyle.lineHeight).toBe(24);
  });
});
