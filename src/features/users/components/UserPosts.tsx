import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { Pagination } from '@/components/Pagination/Pagination';
import { PostsList, useSearchPostsWithPagination } from '@/features/post';

type UserPostsProps = {
  userId: string;
};

export const UserPosts = ({ userId }: UserPostsProps) => {
  const { posts, skip, limit, total, isLoading } = useSearchPostsWithPagination({ userId });
  const postsPreview = posts?.map((post) => ({ url: `/posts/${post.id}`, ...post }));

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <div className='mt-3'>
        <PostsList posts={postsPreview} />
      </div>
      <Pagination limit={limit} skip={skip} total={total} />
    </>
  );
};
