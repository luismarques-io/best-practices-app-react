import { Post, PostEditor } from '..';
import { useNavigate } from 'react-router-dom';
import { ContentLayout } from '@/layouts/ContentLayout';
import { Head } from '@/components/Head/Head';

export const CreatePost = () => {
  const navigate = useNavigate();

  const handleSaveSuccess = async (payload: Post) => {
    navigate(`/posts/${payload.id}`);
  };

  return (
    <>
      <Head title='Create Post' />
      <ContentLayout title='Create Post'>
        <PostEditor onSuccess={handleSaveSuccess} />
      </ContentLayout>
    </>
  );
};
