import { useEffect } from 'react';
import { PostEditor, initializeEditor, loadPost, selectEditorPost, setUpdateComplete, setUpdateStarted } from '..';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';
import { useGetPostQuery, useUpdatePostMutation } from '../api/postApi';
import { ErrorPageLayout } from '../../../layouts/ErrorPageLayout';
import { PageSpinner } from '../../../components/Elements/Spinner/PageSpinner';
import { getErrorMessage } from '../../../api/utils';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';

type QueryParamTypes = Params & {
  postId: string;
};

export const EditPost = () => {
  const { postId } = useParams<{ postId: string }>() as QueryParamTypes;
  const { data, isLoading, error } = useGetPostQuery({ postId });
  const formState = useAppSelector(selectEditorPost);
  const [updatePost] = useUpdatePostMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeEditor());
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(loadPost(data));
    }
  }, [data]);

  if (error) {
    return <ErrorPageLayout title='Post not found' message={getErrorMessage(error)} />;
  }

  if (isLoading || !data) {
    return <PageSpinner />;
  }

  const onSubmit = async () => {
    try {
      dispatch(setUpdateStarted());
      const post = await updatePost({ ...formState, id: postId }).unwrap();

      navigate(`/posts/${post.id}`);
    } catch (err) {
      alert(JSON.stringify(err));
    }
    dispatch(setUpdateComplete());
  };

  return (
    <>
      <Head title='Edit Post' />
      <ContentLayout title='Edit Post'>
        <PostEditor onSubmit={onSubmit} />
      </ContentLayout>
    </>
  );
};
