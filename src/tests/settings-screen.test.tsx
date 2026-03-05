import { fireEvent, render, screen } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import SettingsScreen from '../app/settings';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const FIXED_TIMESTAMP = 1_700_000_000_000;

describe('SettingsScreen', () => {
  it('renders all navigation actions', () => {
    mockedUseRouter.mockReturnValue({
      dismiss: jest.fn(),
      push: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<SettingsScreen />);

    expect(screen.getByRole('button', { name: 'Go to player' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Go to editor new' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Go to editor' })).toBeTruthy();
  });

  it('dismisses the modal and pushes expected routes', () => {
    const dismissMock = jest.fn();
    const pushMock = jest.fn();

    mockedUseRouter.mockReturnValue({
      dismiss: dismissMock,
      push: pushMock,
    } as unknown as ReturnType<typeof useRouter>);

    jest.useFakeTimers();
    jest.setSystemTime(FIXED_TIMESTAMP);

    render(<SettingsScreen />);

    fireEvent.press(screen.getByRole('button', { name: 'Go to player' }));
    fireEvent.press(screen.getByRole('button', { name: 'Go to editor new' }));
    fireEvent.press(screen.getByRole('button', { name: 'Go to editor' }));

    expect(dismissMock).toHaveBeenCalledTimes(3);

    jest.runAllTimers();

    const expectedId = FIXED_TIMESTAMP.toString(36);
    expect(pushMock).toHaveBeenCalledTimes(3);
    expect(pushMock).toHaveBeenCalledWith(`/player/${expectedId}`);
    expect(pushMock).toHaveBeenCalledWith('/editor/new');
    expect(pushMock).toHaveBeenCalledWith(`/editor/${expectedId}`);
  });
});
