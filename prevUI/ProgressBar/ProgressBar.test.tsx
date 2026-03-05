import { makeMutable } from 'react-native-reanimated';
import { render } from '@testing-library/react-native';

import ProgressBar from '@app/ui/ProgressBar/ProgressBar';

describe('ProgressBar', () => {
  it('renders progress track', () => {
    const progress = makeMutable(0.5);
    const { getByTestId } = render(<ProgressBar testID="progressBar" progress={progress} />);

    expect(getByTestId('progressBar')).toBeTruthy();
  });
});
