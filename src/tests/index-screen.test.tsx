import { render, screen } from '@testing-library/react-native';

import IndexScreen from '../app/index';

describe('IndexScreen', () => {
  it('renders the requested welcome text', () => {
    render(<IndexScreen />);

    expect(screen.getByText('Welcome to padadiddle')).toBeTruthy();
  });
});
