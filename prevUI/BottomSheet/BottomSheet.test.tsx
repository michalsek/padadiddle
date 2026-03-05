import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import BottomSheet from '@app/ui/BottomSheet/BottomSheet';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 1,
    bottom: 2,
    left: 3,
    right: 4,
  }),
}));

describe('BottomSheet', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BottomSheet disableSafeArea>
        <Text>Controls</Text>
      </BottomSheet>
    );

    expect(getByText('Controls')).toBeTruthy();
  });

  it('applies safe area insets as content padding', () => {
    const { getByTestId } = render(
      <BottomSheet testID="bottom-sheet">
        <Text>Controls</Text>
      </BottomSheet>
    );

    const content = getByTestId('bottom-sheet-content');
    const contentStyle = Array.isArray(content.props.style)
      ? Object.assign({}, ...content.props.style.filter(Boolean))
      : content.props.style;

    expect(contentStyle.paddingTop).toBe(10);
    expect(contentStyle.paddingBottom).toBe(16);
    expect(contentStyle.paddingLeft).toBe(16);
    expect(contentStyle.paddingRight).toBe(16);
  });

  it('respects configured safe area edges', () => {
    const { getByTestId } = render(
      <BottomSheet testID="bottom-sheet" safeAreaEdges={['left', 'right']}>
        <Text>Controls</Text>
      </BottomSheet>
    );

    const content = getByTestId('bottom-sheet-content');
    const contentStyle = Array.isArray(content.props.style)
      ? Object.assign({}, ...content.props.style.filter(Boolean))
      : content.props.style;

    expect(contentStyle.paddingTop).toBe(10);
    expect(contentStyle.paddingBottom).toBe(14);
    expect(contentStyle.paddingLeft).toBe(19);
    expect(contentStyle.paddingRight).toBe(20);
  });
});
