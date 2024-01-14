import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { type AppStore, store as _store } from '@/stores/store';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { ErrorFallback } from '@/pages/ErrorFallback/ErrorFallback';
import { AuthProvider } from '@/features/auth';

type AppProviderProps = {
  children: React.ReactNode;
  store?: AppStore;
};

export const AppProvider = ({ children, store = _store }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<PageSpinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <Provider store={store}>
            <AuthProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
