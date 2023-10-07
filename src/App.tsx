import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Login } from './pages/Login/Login';
// import { Register } from './pages/Register/Register.component';

import { useInitAuthLoginToken } from './features/auth';

export function App() {
  const { loading } = useInitAuthLoginToken();

  return (
    <>
      {!loading && (
        <>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />} />
            {/* <Route path='/register' element={<Register />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}
