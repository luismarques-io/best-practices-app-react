import { Link } from 'react-router-dom';
import { Comment } from '../types';
import { useAuth } from '../../auth';
import { getErrorMessage } from '../../../api/utils';
import { useDeleteCommentMutation } from '../api/commentsApi';
import { useState } from 'react';
import { EditCommentForm } from './EditCommentForm';

type CommentCardProps = {
  comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { id, body, user } = comment;
  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === user.id;
  // const isCurrentUser = true ?? currentUser; // Used to test update and delete of multiple comments

  const [enableEditComment, setEnableEditComment] = useState(false);
  const [deleteComment, { isLoading: isDeleteLoading, error: deleteError }] = useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    try {
      await deleteComment({ id }).unwrap();
      alert('Deleted (not actually, just a demo)');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  if (enableEditComment) {
    return (
      <div className='card mb-3 bg-body-tertiary'>
        <div className='card-body'>
          <div className='d-flex'>
            <h6 className='mb-2 mt-1 flex-grow-1'>
              <Link to={`/profile/${user.id}`}>{user.username}</Link>
            </h6>
          </div>
          <div>
            <EditCommentForm
              comment={comment}
              onCancel={() => setEnableEditComment(false)}
              onSuccess={() => setEnableEditComment(false)}
            />
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
                onClick={() => setEnableEditComment(true)}
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
              {deleteError ? <div className='text-danger'>{getErrorMessage(deleteError)}</div> : null}
            </div>
          ) : null}
        </div>
        <div>{body}</div>
      </div>
    </div>
  );
};
