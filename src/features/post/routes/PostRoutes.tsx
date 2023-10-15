import { lazily } from 'react-lazily';
import { Route, Routes } from 'react-router-dom';

const { PostsListPage } = lazily(() => import('../pages/PostsListPage'));
const { EditPost } = lazily(() => import('../pages/EditPost'));
const { CreatePost } = lazily(() => import('../pages/CreatePost'));
const { PostPage } = lazily(() => import('../pages/PostPage'));
const { NotFound } = lazily(() => import('../../../pages/NotFound/NotFound'));

export const PostRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<PostsListPage />} />
      <Route path='/add' element={<CreatePost />} />
      <Route path=':postId/edit' element={<EditPost />} />
      <Route path=':postId' element={<PostPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
