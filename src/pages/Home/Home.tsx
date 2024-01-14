import { Navigate } from 'react-router-dom';
import { Head } from '@/components/Head/Head';
import { ContentLayout } from '@/layouts/ContentLayout';

export function Home() {
  return (
    <>
      <Head />
      <ContentLayout title='Home'>
        <Navigate to={`/posts`} replace />
      </ContentLayout>
    </>
  );
}
