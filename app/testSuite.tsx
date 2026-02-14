import { Suspense, lazy } from 'react';

const TestSuiteScreen = lazy(() => import('./screens/testSuiteScreen'));

export default function TestSuiteRoute() {
  return (
    <Suspense fallback={null}>
      <TestSuiteScreen />
    </Suspense>
  );
}
