import { lazily } from 'react-lazily';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth';

const { PostsListPage } = lazily(() => import('../pages/PostsListPage'));
const { UpdatePost } = lazily(() => import('../pages/UpdatePost'));
const { CreatePost } = lazily(() => import('../pages/CreatePost'));
const { PostPage } = lazily(() => import('../pages/PostPage'));
const { NotFound } = lazily(() => import('../../../pages/NotFound/NotFound'));

export const PostRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <Routes>
      <Route path='' element={<PostsListPage />} />
      {user ? (
        <>
          <Route path='/add' element={<CreatePost />} />
          <Route path=':postId/edit' element={<UpdatePost />} />
        </>
      ) : (
        <>
          <Route path='/add' element={<Navigate to={`/login?redirect=${location.pathname}`} replace />} />
          <Route path=':postId/edit' element={<Navigate to={`/login?redirect=${location.pathname}`} replace />} />
        </>
      )}
      <Route path=':postId' element={<PostPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
