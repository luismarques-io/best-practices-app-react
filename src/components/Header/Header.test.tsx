import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

it('Should render', () => {
  render(
    <BrowserRouter basename='/'>
      <Header />
    </BrowserRouter>
  );
});
