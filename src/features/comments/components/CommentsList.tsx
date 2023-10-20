import { useSearchParams } from 'react-router-dom';
import { getErrorMessage } from '../../../api/utils';
import { PageSpinner } from '../../../components/Elements/Spinner/PageSpinner';
import { ErrorPageLayout } from '../../../layouts/ErrorPageLayout';
import { useGetCommentsQuery } from '../api/commentsApi';
import { CommentsResponse } from '../types';
import { CommentCard } from './CommentCard';
import { Pagination } from '../../../components/Pagination/Pagination';

type CommentsListProps = {
  postId: string;
  itemsPerPage?: number;
};

export const CommentsList = ({ postId, itemsPerPage = 0 }: CommentsListProps) => {
  const [searchParams] = useSearchParams();
  const enablePagination = itemsPerPage > 0;
  const limit = !enablePagination ? 0 : parseInt(searchParams.get('limit') ?? itemsPerPage.toString());
  const skip = !enablePagination ? 0 : parseInt(searchParams.get('skip') ?? '0');

  const {
    data: { comments, total } = {} as CommentsResponse,
    isLoading,
    isFetching, // is true when changing page
    error,
  } = useGetCommentsQuery({ postId, skip, limit });

  if (error) {
    return <ErrorPageLayout title='Error loading posts' message={getErrorMessage(error)} />;
  }

  if (isLoading || isFetching || !comments) {
    return <PageSpinner />;
  }

  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}

      {enablePagination ? <Pagination limit={limit} skip={skip} total={total} /> : null}
    </>
  );
};
