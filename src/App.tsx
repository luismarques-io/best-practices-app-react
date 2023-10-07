import { Routes, Route } from 'react-router-dom';
import { lazily } from 'react-lazily';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
const { Home } = lazily(() => import('./pages/Home/Home'));
const { NotFound } = lazily(() => import('./pages/NotFound/NotFound'));
const { Login } = lazily(() => import('./pages/Login/Login'));
const { Register } = lazily(() => import('./pages/Register/Register'));
import { PageSpinner } from './components/Elements/Spinner/PageSpinner';

import { useInitAuthLoginToken } from './features/auth';

export function App() {
  const { loading } = useInitAuthLoginToken();

  return (
    <>
      {loading ? (
        <PageSpinner />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}
