// Returns themed color palette for bottom sheet surface.
export function getBottomSheetPalette(isDark: boolean) {
  return {
    backgroundColor: isDark ? '#0b1220' : '#ffffff',
    borderTopColor: isDark ? '#1f2937' : '#e2e8f0',
  };
}
