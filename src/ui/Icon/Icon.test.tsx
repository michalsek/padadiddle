jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  function createMockIcon(displayName: string) {
    const MockIcon = ({ color, name, size }: { color: string; name: string; size: number }) => (
      <Text>{`${displayName}:${name}:${size}:${color}`}</Text>
    );

    MockIcon.displayName = displayName;

    return MockIcon;
  }

  return {
    Feather: createMockIcon('Feather'),
    Ionicons: createMockIcon('Ionicons'),
    MaterialIcons: createMockIcon('MaterialIcons'),
  };
});

import { render } from '@testing-library/react-native';

import { Icon } from './Icon';

describe('Icon', () => {
  it('renders the selected Expo icon family with theme-derived color', () => {
    const { getByText } = render(
      <Icon family="feather" name="play-circle" size={24} testID="icon" tone="primary" />,
    );

    expect(getByText('Feather:play-circle:24:#2563EB')).toBeTruthy();
  });

  it('prefers explicit color overrides over semantic tones', () => {
    const { getByText } = render(
      <Icon color="#123456" family="material" name="music-note" tone="danger" />,
    );

    expect(getByText('MaterialIcons:music-note:20:#123456')).toBeTruthy();
  });
});
