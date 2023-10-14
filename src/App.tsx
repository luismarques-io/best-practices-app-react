import { PageSpinner } from './components/Elements/Spinner/PageSpinner';

import { AppRoutes } from './routes';

import { useInitAuthLoginToken } from './features/auth';
import { MainLayout } from './layouts/MainLayout';

export function App() {
  const { loading } = useInitAuthLoginToken();

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </>
  );
}
