import { Head } from '../../components/Head/Head';
import { useAuth } from '../../features/auth';
import { ContentLayout } from '../../layouts/ContentLayout';

export function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Head title='Profile' />
      <ContentLayout title={'Profile'}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='card mb-4'>
              <div className='card-body text-center'>
                {user?.image && (
                  <img src={user.image} alt='avatar' className='rounded-circle img-fluid' style={{ width: '150px' }} />
                )}
                <h5 className='my-3'>
                  {user?.firstName} {user?.lastName}
                </h5>
                <p className='text-muted mb-1'>{user?.username}</p>
                <p className='text-muted mb-4'>{user?.email}</p>
                {/* <div className='d-flex justify-content-center mb-2'>
                  <button type='button' className='btn btn-primary'>
                    Follow
                  </button>
                  <button type='button' className='btn btn-outline-primary ms-1'>
                    Message
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
