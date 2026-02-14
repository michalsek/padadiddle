import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('homeWelcome')}</Text>
      <Button title={t('manualTestingButton')} onPress={() => router.push('/manualTesting')} />
      <Button title={t('testSuiteButton')} onPress={() => router.push('/testSuite')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
