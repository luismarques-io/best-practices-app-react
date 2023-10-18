// import { useEffect } from 'react';

import { Params, useParams } from 'react-router-dom';
import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';
import { useDeletePostMutation, useGetPostQuery } from '../api/postApi';
import { PageSpinner } from '../../../components/Elements/Spinner/PageSpinner';
import { getErrorMessage } from '../../../api/helpers';
import { ErrorPageLayout } from '../../../layouts/ErrorPageLayout';
import { InputField } from '../../../components/Form';
import { Link } from 'react-router-dom';
import { TagList } from '../components/TagList';
import { useAuth } from '../../auth';

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
        {/* {isCurrentUser ? (
          <div className='text-center'>
            <Link to={`/posts/${data.id}/edit`} className='btn btn-primary btn-sm ms-2'>
              Edit Post
            </Link>
            <button className='btn btn-danger btn-sm ms-2'>Delete Post</button>
          </div>
        ) : null} */}
        <div>
          <div className='row d-flex justify-content-center mt-4'>
            {/* TODO: Add user info on top of textarea */}
            <div className='col-md-10 col-lg-8 col-xl-6'>
              <InputField
                type='textarea'
                className='form-control'
                placeholder='Write a comment...'
                name='comment'
                style={{ height: '100px' }}
                label='Write a comment...'
                invalidFeedback='Valid comment is required.'
                required
              />
              <div className='float-end mt-2'>
                <button className='btn btn-primary py-2' type='submit'>
                  Post comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
