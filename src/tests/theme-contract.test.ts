import { darkTheme, lightTheme, themes } from '../theme';

describe('theme contract', () => {
  it('provides the semantic token schema for light and dark themes', () => {
    for (const theme of [lightTheme, darkTheme]) {
      expect(theme.colors.background.canvas).toBeTruthy();
      expect(theme.colors.text.primary).toBeTruthy();
      expect(theme.colors.border.default).toBeTruthy();
      expect(theme.colors.line.subtle).toBeTruthy();

      expect(theme.colors.component.button.primary.background).toBeTruthy();
      expect(theme.colors.component.button.secondary.border).toBeTruthy();
      expect(theme.colors.component.button.ghost.text).toBeTruthy();

      expect(theme.colors.component.slider.primary.track).toBeTruthy();
      expect(theme.colors.component.progressBar.secondary.fill).toBeTruthy();
      expect(theme.colors.component.dropDown.menu.background).toBeTruthy();
      expect(theme.colors.component.bottomSheet.background).toBeTruthy();

      expect(theme.radius.pill).toBe(999);
      expect(theme.size.touch.minTarget).toBe(44);
      expect(theme.typography.heading.h1).toBe(32);
      expect(theme.opacity.disabled).toBe(0.5);
      expect(theme.elevation.menu).toBe(6);
    }
  });

  it('keeps migration aliases aligned with semantic source tokens', () => {
    for (const theme of [lightTheme, darkTheme]) {
      expect(theme.spacing.xxl).toBe(theme.spacing['2xl']);
      expect(theme.colors.surface).toBe(theme.colors.background.surface);
      expect(theme.colors.textPrimary).toBe(theme.colors.text.primary);
      expect(theme.colors.textSecondary).toBe(theme.colors.text.secondary);
      expect(theme.colors.accent).toBe(theme.colors.text.accent);
    }
  });

  it('keeps typed theme registry aligned with exported instances', () => {
    expect(themes.light).toEqual(lightTheme);
    expect(themes.dark).toEqual(darkTheme);
  });
});
