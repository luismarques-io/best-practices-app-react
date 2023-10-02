import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Home } from '../Pages/Home/Home';
import { NotFound } from '../Pages/NotFound/NotFound';

function App() {
  return (
    <Fragment>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
