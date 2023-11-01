import { PageSpinner } from './components/Elements/Spinner/PageSpinner';

import { AppRoutes } from './routes';

import { useInitAuth } from './features/auth';
import { MainLayout } from './layouts/MainLayout';

export function App() {
  const { isLoading } = useInitAuth();

  if (isLoading) {
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
