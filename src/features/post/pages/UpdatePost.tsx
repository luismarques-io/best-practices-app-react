import { PostEditor, PostForEditor } from '..';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { ContentLayout } from '@/layouts/ContentLayout';
import { ErrorPageLayout } from '@/layouts/ErrorPageLayout';
import { Head } from '@/components/Head/Head';
import { useGetPostQuery, useUpdatePostMutation } from '../api/postApi';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { getErrorMessage } from '@/api/utils';

type QueryParamTypes = Params & {
  postId: string;
};

export const UpdatePost = () => {
  const { postId } = useParams<{ postId: string }>() as QueryParamTypes;
  const { data, isLoading, isFetching, error } = useGetPostQuery({ postId });
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();

  if (isLoading || isFetching) {
    return <PageSpinner />;
  }

  if (error || !data) {
    const errorMessage = error ? getErrorMessage(error) : 'Post not found';
    return <ErrorPageLayout title='Edit Post' message={errorMessage} />;
  }

  const handleSave = async (payload: PostForEditor) => {
    const { id } = await updatePost({ ...payload, id: postId }).unwrap();
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <Head title='Edit Post' />
      <ContentLayout title='Edit Post'>
        <PostEditor onSubmit={handleSave} defaultValues={data} />
      </ContentLayout>
    </>
  );
};
