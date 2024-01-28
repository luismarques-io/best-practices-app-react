import { ErrorPageLayout } from '@/layouts/ErrorPageLayout';
import { getErrorMessage } from '@/api/utils';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { Link } from 'react-router-dom';
import { useProfileDetails } from '../hooks/useProfileDetails';
import { Head } from '@/components/Head/Head';

type ProfileDetailsProps = {
  userId: string;
};

export const ProfileDetails = ({ userId }: ProfileDetailsProps) => {
  const { user, error, isLoading, isCurrentUser } = useProfileDetails({ userId });

  if (error) {
    return <ErrorPageLayout title='Error loading user' message={getErrorMessage(error)} />;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head title={`${user?.firstName} ${user?.lastName}`} />
      <section className='h-100'>
        <div className='row'>
          <div className='col'>
            <div className='card'>
              <div className='rounded-top text-white d-flex flex-row bg-secondary' style={{ height: '200px' }}>
                <div className='ms-4 mt-5 d-flex flex-column' style={{ width: '150px' }}>
                  <img
                    src={
                      user?.image
                        ? user?.image
                        : `https://image.dummyjson.com/300x300/008080/ffffff?text=${user?.firstName}`
                    }
                    alt={user?.username}
                    className='img-fluid img-thumbnail mt-4 mb-2'
                    style={{ width: '150px', zIndex: '1' }}
                  />
                </div>
                <div className='ms-3' style={{ marginTop: '130px' }}>
                  <h1 className='h5'>
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p>{user?.username}</p>
                </div>
              </div>
              <div className='p-4 bg-body-tertiary'>
                <div className='d-flex justify-content-between'>
                  {isCurrentUser ? (
                    <div className='mr-auto py-1 pb-0'>
                      <Link
                        to='/settings'
                        className='btn btn-primary py-2 mt-2'
                        data-mdb-ripple-color='dark'
                        style={{ zIndex: '1', minWidth: '150px' }}
                      >
                        Edit Profile
                      </Link>
                    </div>
                  ) : null}
                  {/* <div className='ps-3'>
                    <p className='mb-1 h5'>TODO: Get post count</p>
                    <p className='small text-muted mb-0'>Posts</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
