// Returns themed colors for radio button visuals.
export function getRadioPalette(isDark: boolean, selected: boolean) {
  if (selected) {
    return {
      ringColor: isDark ? '#f9fafb' : '#111827',
      dotColor: isDark ? '#f9fafb' : '#111827',
      labelColor: isDark ? '#f3f4f6' : '#111827',
    };
  }

  return {
    ringColor: isDark ? '#6b7280' : '#9ca3af',
    dotColor: 'transparent',
    labelColor: isDark ? '#d1d5db' : '#374151',
  };
}
