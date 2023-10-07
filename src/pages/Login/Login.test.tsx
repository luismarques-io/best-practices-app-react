import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../stores/store';

import { Login } from './Login';

it('Should render', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Login />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
});
