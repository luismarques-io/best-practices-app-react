import { Params, useParams, Link } from 'react-router-dom';
import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';
import { useDeletePostMutation, useGetPostQuery } from '../api/postApi';
import { PageSpinner } from '../../../components/Elements/Spinner/PageSpinner';
import { getErrorMessage } from '../../../api/utils';
import { ErrorPageLayout } from '../../../layouts/ErrorPageLayout';
import { TagList } from '../components/TagList';
import { useAuth } from '../../auth';
import { Comments } from '../../comments';

type QueryParamTypes = Params & {
  postId: string;
};

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>() as QueryParamTypes;
  const { data, isLoading, error } = useGetPostQuery({ postId });

  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === data?.user?.id;

  const [deletePost, { isLoading: isDeleteLoading, error: deleteError, data: deleteResult }] = useDeletePostMutation();
  if (deleteResult) {
    window.location.assign(window.location.origin);
  }

  if (error) {
    return <ErrorPageLayout title='Post not found' message={getErrorMessage(error)} />;
  }

  if (isLoading || !data) {
    return <PageSpinner />;
  }

  const userName = data.user?.firstName
    ? `${data.user?.firstName} ${data.user?.lastName}`
    : data.user?.email ?? 'Unknown';

  return (
    <>
      <Head title={data.title} />
      <ContentLayout title={data.title}>
        <div className='mb-4'>
          <span className='me-1'>Author:</span>
          <Link to={`/profile/${data.userId}`}>{userName}</Link>
          {isCurrentUser ? (
            <div className='mt-3'>
              <Link to={`/posts/${data.id}/edit`} className='btn btn-outline-primary btn-sm me-2'>
                Edit Post
              </Link>
              <button
                className='btn btn-outline-danger btn-sm me-2'
                onClick={() => deletePost({ id: data.id })}
                disabled={isDeleteLoading}
              >
                Delete Post
              </button>
              {deleteError ? <div className='text-danger'>{getErrorMessage(deleteError)}</div> : null}
            </div>
          ) : null}
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
