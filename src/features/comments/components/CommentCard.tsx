import { Link } from 'react-router-dom';
import { Comment } from '../types';
import { useIsCurrentUser } from '@/features/auth';
import { UpdateCommentForm } from './UpdateCommentForm';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useUpdateFormVisibility } from '../hooks/useUpdateFormVisibility';

type CommentCardProps = {
  comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { id: commentId, body, user } = comment;
  const isCurrentUser = useIsCurrentUser(user.id);
  const { isUpdateFormVisible, showUpdateForm, hideUpdateForm } = useUpdateFormVisibility(false);
  const {
    handleDeleteComment,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteComment({
    commentId,
    onSuccess: () => alert('Deleted! (not actually, just a demo)'),
  });

  if (isUpdateFormVisible) {
    return (
      <div className='card mb-3 bg-body-tertiary'>
        <div className='card-body'>
          <div className='d-flex'>
            <h6 className='mb-2 mt-1 flex-grow-1'>
              <Link to={`/profile/${user.id}`}>{user.username}</Link>
            </h6>
          </div>
          <div>
            <UpdateCommentForm comment={comment} onCancel={hideUpdateForm} onSuccess={hideUpdateForm} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='card mb-3 bg-body-tertiary comment'>
      <div className='card-body'>
        <div className='d-flex'>
          <h6 className='mb-2 mt-1 flex-grow-1'>
            <Link to={`/profile/${user.id}`}>{user.username}</Link>
          </h6>
          {isCurrentUser ? (
            <div>
              <button
                className='btn btn-outline-primary btn-sm ms-2'
                disabled={isDeleteLoading}
                onClick={showUpdateForm}
              >
                Edit
              </button>
              <button
                className='btn btn-outline-danger btn-sm ms-2'
                onClick={handleDeleteComment}
                disabled={isDeleteLoading}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
        {deleteError ? <div className='alert alert-danger mt-2'>{deleteError}</div> : null}
        <div>{body}</div>
      </div>
    </div>
  );
};
