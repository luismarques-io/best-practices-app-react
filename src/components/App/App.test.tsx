import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

it('Should render', () => {
  render(
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  );
});
