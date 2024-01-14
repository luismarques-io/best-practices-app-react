import { ContentLayout } from '@/layouts/ContentLayout';
import { Head } from '@/components/Head/Head';
import { PostsList } from '../components/PostsList';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { ErrorPageLayout } from '@/layouts/ErrorPageLayout';
import { Pagination } from '@/components/Pagination/Pagination';
import { DebouncedInputField } from '@/components/Form';
import { useSearchPostsWithPagination } from '../hooks/useSearchPostsWithPagination';

export const PostsListPage = () => {
  const { handleSearchChange, posts, query, skip, limit, total, isFetching, isLoading, error, generatePaginationLink } =
    useSearchPostsWithPagination();

  const renderContent = () => {
    switch (true) {
      case isFetching || isLoading:
        return <PageSpinner />;
      case !!error:
        return <ErrorPageLayout title='Error loading posts' message={error} />;
      case !posts.length:
        return <p className='mt-5 text-center text-body-secondary'>No posts found</p>;
      default:
        return (
          <>
            <div className='mt-3'>
              <PostsList posts={posts} />
            </div>
            <Pagination limit={limit} skip={skip} total={total} generateLink={generatePaginationLink} />
          </>
        );
    }
  };

  return (
    <>
      <Head title={'Posts'} />
      <ContentLayout title={'Posts'}>
        <div className='mt-3'>
          <DebouncedInputField
            label='Search'
            placeholder='Search'
            defaultValue={query}
            onDebouncedChange={handleSearchChange}
          />
        </div>
        {renderContent()}
      </ContentLayout>
    </>
  );
};
