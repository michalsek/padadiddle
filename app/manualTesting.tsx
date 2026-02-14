import { Suspense, lazy } from 'react';

const ManualTestingScreen = lazy(() => import('./screens/manualTestingScreen'));

export default function ManualTestingRoute() {
  return (
    <Suspense fallback={null}>
      <ManualTestingScreen />
    </Suspense>
  );
}
