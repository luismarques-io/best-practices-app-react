import { Link } from 'react-router-dom';
import { Comment } from '../types';
import { useAuth } from '../../auth';
import { getErrorMessage } from '../../../api/utils';
import { UpdateCommentForm } from './UpdateCommentForm';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useUpdateFormVisibility } from '../hooks/useUpdateFormVisibility';

type CommentCardProps = {
  comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { id, body, user } = comment;
  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === user.id;
  // const isCurrentUser = true ?? currentUser; // Used to test update and delete of multiple comments

  const { isUpdateFormVisible, showUpdateForm, hideUpdateForm } = useUpdateFormVisibility(false);

  const { deleteCommentHandler, mutationState: deleteMutationState } = useDeleteComment({
    id,
    onSuccess: () => alert('Deleted! (not actually, just a demo)'),
  });
  const { isLoading: isDeleteLoading, error: deleteError } = deleteMutationState;

  const onUpdateSuccess = () => {
    hideUpdateForm();
    alert('Saved! (not actually, just a demo)');
  };

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
            <UpdateCommentForm comment={comment} onCancel={hideUpdateForm} onSuccess={onUpdateSuccess} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='card mb-3 bg-body-tertiary'>
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
                onClick={deleteCommentHandler}
                disabled={isDeleteLoading}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
        {deleteError ? <div className='text-danger'>{getErrorMessage(deleteError)}</div> : null}
        <div>{body}</div>
      </div>
    </div>
  );
};
