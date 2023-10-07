import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import { Register } from './Register';

it('Should render', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Register />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
});
