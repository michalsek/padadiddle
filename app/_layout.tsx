import { Stack } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';

export default function RootLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="manualTesting" options={{ title: t('manualTestingHeader') }} />
      <Stack.Screen name="testSuite" options={{ title: t('testSuiteHeader') }} />
    </Stack>
  );
}
