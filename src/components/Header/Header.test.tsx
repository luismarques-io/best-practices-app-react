import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { store } from '../../stores/store';
import { Header } from './Header';

it('Should render', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Header />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
});
