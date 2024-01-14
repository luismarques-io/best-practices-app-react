import { AppRoutes } from '@/routes';
import { MainLayout } from '@/layouts/MainLayout';

export function App() {
  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </>
  );
}
