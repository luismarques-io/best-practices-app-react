import { Params, useParams } from 'react-router-dom';
import { ContentLayout } from '@/layouts/ContentLayout';
import { Head } from '@/components/Head/Head';
import { useGetPostQuery } from '../api/postApi';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { getErrorMessage } from '@/api/utils';
import { ErrorPageLayout } from '@/layouts/ErrorPageLayout';
import { TagList } from '../components/TagList';
import { Comments } from '@/features/comments';
import { PostDetails } from '../components/PostDetails';

type QueryParamTypes = Params & {
  postId: string;
};

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>() as QueryParamTypes;
  const { data, isLoading, error } = useGetPostQuery({ postId });

  if (error) {
    return <ErrorPageLayout title='Post not found' message={getErrorMessage(error)} />;
  }

  if (isLoading || !data) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head title={data.title} />
      <ContentLayout title={data.title}>
        <div className='mb-4'>
          <PostDetails post={data} />
        </div>
        <p className='mb-4'>{data.body}</p>
        <div className='d-flex d-flex justify-content-between mb-3'>
          <div>
            <TagList tags={data.tags} />
          </div>
          {data.reactions ? (
            <div>
              <span className='badge text-bg-success'>
                {data.reactions} {data.reactions > 1 ? 'likes' : 'like'}
              </span>
            </div>
          ) : null}
        </div>

        <hr />

        <div className='mt-5'>
          <Comments postId={postId} />
        </div>
      </ContentLayout>
    </>
  );
};
