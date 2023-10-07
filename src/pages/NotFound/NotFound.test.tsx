import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

it('Should render', () => {
  render(
    <BrowserRouter basename='/'>
      <NotFound />
    </BrowserRouter>
  );
});
