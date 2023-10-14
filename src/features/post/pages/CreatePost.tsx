import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { PostEditor, initializeEditor, selectEditorPost } from '..';
import { useCreatePostMutation } from '../api/postApi';
import { setUpdateStarted, setUpdateComplete } from '../stores/postEditorSlice';
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';

export const CreatePost = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectEditorPost);
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(initializeEditor());
  }, [null]);

  if (!user) {
    return null;
  }

  const onSubmit = async () => {
    try {
      dispatch(setUpdateStarted());
      const post = await createPost({ ...formState, userId: user.id }).unwrap();
      // eslint-disable-next-line no-console
      console.log({ post });
      // TODO: Implement a backend that can actually create posts
      // navigate(`/posts/${post.id}`);
      navigate(`/posts/1`);
    } catch (err) {
      alert(JSON.stringify(err));
    }
    dispatch(setUpdateComplete());
  };

  return (
    <>
      <Head title='Create Post' />
      <ContentLayout title='Create Post'>
        <PostEditor onSubmit={onSubmit} />
      </ContentLayout>
    </>
  );
};
