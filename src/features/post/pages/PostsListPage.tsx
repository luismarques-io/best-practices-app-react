import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';
import { PostsList } from '../components/PostsList';
import { useGetPostsQuery } from '../api/postApi';
import { getErrorMessage } from '../../../api/utils';
import { PageSpinner } from '../../../components/Elements/Spinner/PageSpinner';
import { ErrorPageLayout } from '../../../layouts/ErrorPageLayout';
import { PostsResponse } from '../types/post';
import { Pagination } from '../../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

export const PostsListPage = () => {
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get('limit') ?? '10');
  const skip = parseInt(searchParams.get('skip') ?? '0');

  const {
    data: { posts, total } = {} as PostsResponse,
    isFetching,
    isLoading, // is true when changing page
    error,
  } = useGetPostsQuery({ skip, limit });

  if (error) {
    return <ErrorPageLayout title='Error loading posts' message={getErrorMessage(error)} />;
  }

  if (isFetching || isLoading || !posts) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head title={'Posts'} />
      <ContentLayout title={'Posts'}>
        <div className='mt-3'>
          <PostsList posts={posts} />
        </div>
        <Pagination limit={limit} skip={skip} total={total} />
      </ContentLayout>
    </>
  );
};
