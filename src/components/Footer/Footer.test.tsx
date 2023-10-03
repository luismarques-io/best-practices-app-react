import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './Footer';

it('Should render', () => {
  render(
    <BrowserRouter basename='/'>
      <Footer />
    </BrowserRouter>
  );
});
