import { Head } from '../../components/Head/Head';
import { ContentLayout } from '../../layouts/ContentLayout';

export function Profile() {
  return (
    <>
      <Head title='Profile' />
      <ContentLayout title='Profile'>
        <p>Content in here</p>
      </ContentLayout>
    </>
  );
}
