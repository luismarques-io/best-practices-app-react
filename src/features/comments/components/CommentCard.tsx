import { Link } from 'react-router-dom';
import { Comment } from '../types';

type CommentCardProps = {
  comment: Comment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { body, user } = comment;
  return (
    <div className='card mb-3 bg-body-tertiary'>
      <div className='card-body'>
        <h6 className='mb-0'>
          <Link to={`/profile/${user.id}`}>{user.username}</Link>
        </h6>
        <div>{body}</div>
      </div>
    </div>
  );
};
