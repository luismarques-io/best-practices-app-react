import { lazily } from 'react-lazily';
import { Route, Routes } from 'react-router-dom';

const { EditPost } = lazily(() => import('../pages/EditPost'));
const { CreatePost } = lazily(() => import('../pages/CreatePost'));
const { Post } = lazily(() => import('../pages/Post'));
const { NotFound } = lazily(() => import('../../../pages/NotFound/NotFound'));

export const PostRoutes = () => {
  return (
    <Routes>
      <Route path='' element={'TODO: List of posts'} />
      <Route path='/add' element={<CreatePost />} />
      <Route path=':postId/edit' element={<EditPost />} />
      <Route path=':postId' element={<Post />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
