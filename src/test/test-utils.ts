import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent } from 'react';

import { AppProvider } from '../providers/AppProvider';

export const getExistingUser = () => {
  return {
    username: 'kminchelle',
    email: 'kminchelle@qq.com',
    password: '0lelplR',
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    image: 'https://robohash.org/autquiaut.png',
  };
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)], {
    timeout: 4000,
  });

export const renderWithProviders = async (
  ui: any,
  { route = '/', user, ...renderOptions }: Record<string, any> = {}
) => {
  // // if you want to render the app unauthenticated then pass "null" as the user
  // user = await initializeUser(user);

  window.history.pushState({}, 'Test page', route);

  const returnValue = {
    ...render(ui, {
      wrapper: AppProvider as FunctionComponent<unknown>,
      ...renderOptions,
    }),
    user,
  };

  // await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, render };
