import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { App } from './App';
import { store } from './stores/store';

it('Should render', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
});
