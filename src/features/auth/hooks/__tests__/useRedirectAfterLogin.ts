import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useRedirectAfterLogin } from '../useRedirectAfterLogin';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useRedirectAfterLogin', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReset();
    (useSearchParams as jest.Mock).mockReset();
  });

  it('should navigate to the provided redirect URL', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    const searchParamsMock = new URLSearchParams();
    searchParamsMock.set('redirect', '/dashboard');
    (useSearchParams as jest.Mock).mockReturnValue([searchParamsMock]);

    const { result } = renderHook(() => useRedirectAfterLogin());
    act(() => {
      result.current();
    });

    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('should navigate to the default URL when redirect param is not provided', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    const searchParamsMock = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue([searchParamsMock]);

    const { result } = renderHook(() => useRedirectAfterLogin());
    act(() => {
      result.current();
    });

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
