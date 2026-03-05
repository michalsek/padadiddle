// Returns checkbox colors for selected state and color scheme.
export function getCheckboxPalette(isDark: boolean, checked: boolean) {
  if (checked) {
    return {
      backgroundColor: isDark ? '#f9fafb' : '#111827',
      borderColor: isDark ? '#f9fafb' : '#111827',
      markColor: isDark ? '#111827' : '#f9fafb',
      labelColor: isDark ? '#f3f4f6' : '#111827',
    };
  }

  return {
    backgroundColor: 'transparent',
    borderColor: isDark ? '#6b7280' : '#9ca3af',
    markColor: 'transparent',
    labelColor: isDark ? '#d1d5db' : '#374151',
  };
}
