import { Head } from '../../components/Head/Head';
import { SettingsForm } from '../../features/settings';
import { ContentLayout } from '../../layouts/ContentLayout';

export function Settings() {
  return (
    <>
      <Head title='Settings' />
      <ContentLayout title={'Settings'}>
        <div className='col-lg-6 col-xs-12'>
          <SettingsForm />
        </div>
      </ContentLayout>
    </>
  );
}
