import { Link, useNavigate } from 'react-router-dom';
import { useIsCurrentUser } from '@/features/auth';
import { useDeletePost } from '../hooks/useDeletePost';
import { Post } from '../types';

type PostDetailsProps = {
  post: Post;
};

export const PostDetails = ({ post }: PostDetailsProps) => {
  const navigate = useNavigate();
  const isCurrentUser = useIsCurrentUser(post?.user?.id);
  const {
    handleDeletePost,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeletePost({
    postId: post.id,
    onSuccess: () => {
      alert('Deleted! (not actually, just a demo)');
      navigate('/posts');
    },
  });

  const userName =
    `${post.user?.firstName ?? ''} ${post.user?.lastName ?? ''}`.trim() ??
    post.user?.email ??
    post.user?.username ??
    'Unknown';

  return (
    <>
      <span className='me-1'>Author:</span>
      <Link to={`/profile/${post.userId}`}>{userName}</Link>
      {isCurrentUser ? (
        <div className='mt-3'>
          <Link to={`/posts/${post.id}/edit`} className='btn btn-outline-primary btn-sm me-2'>
            Edit Post
          </Link>
          <button className='btn btn-outline-danger btn-sm me-2' onClick={handleDeletePost} disabled={isDeleteLoading}>
            Delete Post
          </button>
          {deleteError ? <div className='text-danger'>{deleteError}</div> : null}
        </div>
      ) : null}
    </>
  );
};
