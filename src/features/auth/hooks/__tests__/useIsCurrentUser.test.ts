import { renderHook } from '@/test/test-utils';
import { useAuth } from '../useAuth';
import { useIsCurrentUser } from '../useIsCurrentUser';

jest.mock('../useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('useIsCurrentUser', () => {
  it('should return true when the user ID matches', () => {
    // Mock the user object returned by useAuth
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'user123' },
    });

    const { result } = renderHook(() => useIsCurrentUser('user123'));
    expect(result.current).toBe(true);
  });

  it('should return false when the user ID does not match', () => {
    // Mock the user object returned by useAuth
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'user123' },
    });

    const { result } = renderHook(() => useIsCurrentUser('otherUser'));
    expect(result.current).toBe(false);
  });

  it('should return false when there is no user', () => {
    // Mock the user object returned by useAuth as undefined
    (useAuth as jest.Mock).mockReturnValue({
      user: undefined,
    });

    const { result } = renderHook(() => useIsCurrentUser('user123'));
    expect(result.current).toBe(false);
  });

  it('should return false when the user ID is undefined', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'user123' },
    });

    const { result } = renderHook(() => useIsCurrentUser(undefined));
    expect(result.current).toBe(false);
  });
});
