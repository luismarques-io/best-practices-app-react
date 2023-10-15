import { Link, useSearchParams } from 'react-router-dom';
import { PageSpinner } from '../../components/Elements/Spinner/PageSpinner';
import { Head } from '../../components/Head/Head';
import { useAuth } from '../../features/auth';
import { ContentLayout } from '../../layouts/ContentLayout';
import { PostsList, PostsResponse, useGetUserPostsQuery } from '../../features/post';
import { ErrorPageLayout } from '../../layouts/ErrorPageLayout';
import { getErrorMessage } from '../../api/helpers';
import { Pagination } from '../../components/Pagination/Pagination';

export function Profile() {
  const { user } = useAuth();

  // TODO: Show profile of other users than the logged in user

  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = parseInt(searchParams.get('skip') || '0');

  const {
    data: { posts, total } = {} as PostsResponse,
    isFetching,
    isLoading,
    error,
  } = useGetUserPostsQuery({ skip, limit, userId: user?.id || '' }, { skip: !user?.id });

  if (error) {
    return <ErrorPageLayout title='Error loading posts' message={getErrorMessage(error)} />;
  }

  if (isFetching || isLoading || !posts || !user) {
    return <PageSpinner />;
  }

  const postsPreview = posts.map((post) => ({ url: `/posts/${post.id}`, ...post }));

  return (
    <>
      <Head title='Profile' />
      <ContentLayout>
        <section className='h-100'>
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='rounded-top text-white d-flex flex-row bg-secondary' style={{ height: '200px' }}>
                  <div className='ms-4 mt-5 d-flex flex-column' style={{ width: '150px' }}>
                    <img
                      src={
                        user.image
                          ? user.image
                          : `https://image.dummyjson.com/300x300/008080/ffffff?text=${user.firstName}`
                      }
                      alt={user.username}
                      className='img-fluid img-thumbnail mt-4 mb-2'
                      style={{ width: '150px', zIndex: '1' }}
                    />

                    <Link
                      to='/settings'
                      className='btn btn-primary py-2 mt-2'
                      data-mdb-ripple-color='dark'
                      style={{ zIndex: '1' }}
                    >
                      Edit Profile
                    </Link>
                  </div>
                  <div className='ms-3' style={{ marginTop: '130px' }}>
                    <h5>
                      {user.firstName} {user.lastName}
                    </h5>
                    <p>{user.username}</p>
                  </div>
                </div>
                <div className='p-4 bg-body-tertiary'>
                  <div className='d-flex justify-content-end text-center py-1'>
                    <div>
                      <p className='mb-1 h5'>{total}</p>
                      <p className='small text-muted mb-0'>Posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <h2 className='mt-3'>User Posts</h2>
        <div className='mt-3'>
          <PostsList posts={postsPreview} />
        </div>
        <Pagination limit={limit} skip={skip} total={total} />
      </ContentLayout>
    </>
  );
}
