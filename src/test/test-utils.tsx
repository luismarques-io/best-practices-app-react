import { PropsWithChildren } from 'react';
import { render, screen, waitForElementToBeRemoved, RenderOptions, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PreloadedState } from '@reduxjs/toolkit';

import { setupStore } from '@/stores/store';
import type { AppStore, RootState } from '@/stores/store';
import { AppProvider } from '@/providers/AppProvider';

import { commentGenerator, postGenerator, userGenerator } from './data-generators';
import { db } from './server/db';
import { authenticate, hash } from './server/utils';
import storage from '@/utils/storage';

export const createUser = async (properties?: any) => {
  const user = userGenerator(properties);
  db.user.create({ ...user, password: hash(user.password) });
  return user;
};

export const loginAsUser = async (credentials: any) => {
  const { user, jwt: token } = authenticate(credentials);
  storage.setToken(token);
  return { user, token };
};

export const createPost = async (properties?: any) => {
  const post = postGenerator(properties);
  const res = await db.post.create(post);
  return res;
};

export const createComment = async (properties?: any) => {
  const comment = commentGenerator(properties);
  const res = await db.comment.create(comment);
  return res;
};

export const waitForLoadingToFinish = async () => {
  const tmpLoadingElements = [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)];
  if (tmpLoadingElements.length > 0) {
    await waitFor(
      async () => {
        await waitForElementToBeRemoved(() => [
          ...screen.queryAllByTestId(/loading/i),
          ...screen.queryAllByText(/loading/i),
        ]);
      },
      { timeout: 10000 }
    );
  }
};

const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    return await loginAsUser(await createUser());
  } else if (user) {
    return await loginAsUser(user);
  } else {
    return null;
  }
};

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  route?: string;
  user?: any;
}

export const renderWithProviders = async (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    route = '/',
    user,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element {
    return <AppProvider store={store}>{children}</AppProvider>;
  }

  // if you want to render the app unauthenticated then pass "null" as the user
  const auth = await initializeUser(user);

  window.history.pushState({}, 'Test page', route);

  const returnValue = { store, auth, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, render };
