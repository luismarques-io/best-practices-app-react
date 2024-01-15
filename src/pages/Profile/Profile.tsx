import { Params, useParams } from 'react-router-dom';
import { Head } from '@/components/Head/Head';
import { ContentLayout } from '@/layouts/ContentLayout';
import { ProfileDetails } from '@/features/users/components/ProfileDetails';
import { UserPosts } from '@/features/users/components/UserPosts';

type QueryParamTypes = Params & {
  userId: string;
};

export function Profile() {
  const { userId } = useParams<{ userId: string }>() as QueryParamTypes;

  return (
    <>
      <Head title='Profile' />
      <ContentLayout>
        <ProfileDetails userId={userId} />
        <UserPosts userId={userId} />
      </ContentLayout>
    </>
  );
}
