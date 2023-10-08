import { Head } from '../../components/Head/Head';
import { ContentLayout } from '../../layouts/ContentLayout';

export function Home() {
  return (
    <>
      <Head />
      <ContentLayout title='Home'>
        <p>Content in here</p>
      </ContentLayout>
    </>
  );
}
