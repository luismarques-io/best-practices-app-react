import { Link } from 'react-router-dom';
import { Post } from '../types/post';

type PostPreviewProps = {
  post: Post;
};

export const PostPreview = ({ post: { id, title, body } }: PostPreviewProps) => {
  return (
    <div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
      <div className='col p-4 d-flex flex-column position-static'>
        <h3 className='mb-0'>{title}</h3>
        <div className='mb-1 text-muted'></div>
        <p className='card-text mb-auto text-truncate'>{body}</p>
        <Link to={`${id}`} className='stretched-link'>
          Continue reading
        </Link>
      </div>
    </div>
  );
};
