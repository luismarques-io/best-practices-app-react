import { renderHook } from '@testing-library/react';
import { useLoginTokenMutation } from '../../api/loginApi';
import storage from '@/utils/storage';
import { useInitAuth } from '../useInitAuth';

jest.mock('../../api/loginApi', () => ({
  useLoginTokenMutation: jest.fn(),
}));

jest.mock('@/utils/storage', () => ({
  getToken: jest.fn(),
}));

describe('useInitAuth', () => {
  beforeEach(() => {
    (useLoginTokenMutation as jest.Mock).mockReset();
    (storage.getToken as jest.Mock).mockReset();
  });

  it('should call useLoginTokenMutation with the token from storage', () => {
    (storage.getToken as jest.Mock).mockReturnValue('token123');
    const loginTokenMock = jest.fn();
    (useLoginTokenMutation as jest.Mock).mockReturnValue([loginTokenMock, {}]);

    renderHook(() => useInitAuth());

    expect(loginTokenMock).toHaveBeenCalledWith({ token: 'token123' });
  });

  it('should not call useLoginTokenMutation when there is no token and should not be any loading', () => {
    (storage.getToken as jest.Mock).mockReturnValue(undefined);
    const loginTokenMock = jest.fn();
    (useLoginTokenMutation as jest.Mock).mockReturnValue([loginTokenMock, {}]);

    const { result } = renderHook(() => useInitAuth());

    expect(loginTokenMock).not.toHaveBeenCalled();
    expect(result.current).toEqual({ isLoading: undefined, isSuccess: undefined, isError: undefined });
  });

  it('should return the correct loading state when there is a token', () => {
    (storage.getToken as jest.Mock).mockReturnValue('token123');
    (useLoginTokenMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isUninitialized: false, isLoading: true, isSuccess: false, isError: false },
    ]);

    const { result } = renderHook(() => useInitAuth());

    expect(result.current).toEqual({ isLoading: true, isSuccess: false, isError: false });
  });

  it('should return the correct loading state when there is a token as is unitialized', () => {
    (storage.getToken as jest.Mock).mockReturnValue('token123');
    (useLoginTokenMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isUninitialized: true, isLoading: false, isSuccess: false, isError: false },
    ]);

    const { result } = renderHook(() => useInitAuth());

    expect(result.current).toEqual({ isLoading: true, isSuccess: false, isError: false });
  });

  it('should return the correct success state', () => {
    (storage.getToken as jest.Mock).mockReturnValue('token123');
    (useLoginTokenMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isUninitialized: false, isLoading: false, isSuccess: true, isError: false },
    ]);

    const { result } = renderHook(() => useInitAuth());

    expect(result.current).toEqual({ isLoading: false, isSuccess: true, isError: false });
  });

  it('should return the correct error state', () => {
    (storage.getToken as jest.Mock).mockReturnValue('token123');
    (useLoginTokenMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isUninitialized: false, isLoading: false, isSuccess: false, isError: true },
    ]);

    const { result } = renderHook(() => useInitAuth());

    expect(result.current).toEqual({ isLoading: false, isSuccess: false, isError: true });
  });
});
