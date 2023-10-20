import { CommentsList } from './CommentsList';
import { CreateComment } from './CreateComment';

type CommentsProps = {
  postId: string;
};

export const Comments = ({ postId }: CommentsProps) => {
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-md-10 col-lg-8 col-xl-6'>
        <CreateComment postId={postId} />
        <div className='mt-3'>
          <CommentsList postId={postId} itemsPerPage={2} />
        </div>
      </div>
    </div>
  );
};
