import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/store';
import { PostEditor, initializeEditor } from '..';
import { useParams } from 'react-router-dom';
import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';

export const EditPost = () => {
  const dispatch = useAppDispatch();

  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    dispatch(initializeEditor());
    // eslint-disable-next-line no-console
    console.log(postId);
  }, [postId]);

  return (
    <>
      <Head title='Edit Post' />
      <ContentLayout title='Edit Post'>
        <PostEditor onSubmit={onSubmit} />
      </ContentLayout>
    </>
  );
};

const onSubmit = (event: React.FormEvent) => {
  // eslint-disable-next-line no-console
  console.log(event);
};
