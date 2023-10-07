import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PageSpinner } from './components/Elements/Spinner/PageSpinner';

import { AppRoutes } from './routes';

import { useInitAuthLoginToken } from './features/auth';

export function App() {
  const { loading } = useInitAuthLoginToken();

  return (
    <>
      {loading ? (
        <PageSpinner />
      ) : (
        <>
          <Header />
          <AppRoutes />
          <Footer />
        </>
      )}
    </>
  );
}
