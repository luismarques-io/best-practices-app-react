import { Routes, Route } from 'react-router-dom';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Home } from '../Pages/Home/Home';
import { NotFound } from '../Pages/NotFound/NotFound';
import { Login } from '../Pages/Login/Login';
import { Register } from '../Pages/Register/Register';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
