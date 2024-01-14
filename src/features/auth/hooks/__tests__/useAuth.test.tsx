import { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, setupStore } from '@/stores/store';
import { userGenerator } from '@/test/data-generators';
import { useAuth } from '../useAuth';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const initialState = {
  auth: {
    user: userGenerator(),
    remember: false,
    token: 'token123',
  },
};
const store = setupStore(initialState);

function Wrapper({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

describe('useAuth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user and userId', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    expect(result.current.user).toMatchObject(initialState.auth.user);
    expect(result.current.userId).toBe(initialState.auth.user.id);
  });

  it('should call the logout function', () => {
    const dispatchMock: jest.Mock<AppDispatch> = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    const { logout } = result.current;

    act(() => {
      logout();
    });

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'auth/logout' });
  });
});
