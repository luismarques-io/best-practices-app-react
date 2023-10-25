import { PostEditor, PostForEditor } from '..';
import { useCreatePostMutation } from '../api/postApi';
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { ContentLayout } from '../../../layouts/ContentLayout';
import { Head } from '../../../components/Head/Head';

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const { userId = '' } = useAuth();

  const handleSave = async (payload: PostForEditor) => {
    const { id } = await createPost({ ...payload, userId }).unwrap();
    alert(`Post published! (not actually, just a demo)`);
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <Head title='Create Post' />
      <ContentLayout title='Create Post'>
        <PostEditor onSubmit={handleSave} />
      </ContentLayout>
    </>
  );
};
