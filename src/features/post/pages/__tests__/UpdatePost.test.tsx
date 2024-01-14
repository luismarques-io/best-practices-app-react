import { useNavigate } from 'react-router-dom';
import { act, createPost, createUser, renderWithProviders, screen, userEvent, waitFor } from '@/test/test-utils';

import { PostRoutes } from '../../routes/PostRoutes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

window.alert = jest.fn();

describe('UpdatePost', () => {
  it('should render update post', async () => {
    const newUser = await createUser();
    const newPost = await createPost({ userId: newUser.id });

    await renderWithProviders(<PostRoutes />, { route: `/${newPost.id}/edit`, user: newUser });

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/write your post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /publish/i })).toBeInTheDocument();
  });

  it('should not render invalid post to update', async () => {
    await renderWithProviders(<PostRoutes />, { route: `/invalid-post-id/edit` });

    expect(screen.getByText(/post with id 'invalid-post-id' not found/i)).toBeInTheDocument();
    expect(screen.getByText(/go back to home/i)).toBeInTheDocument();
  });

  it('should update post and redirect to post page', async () => {
    const navigateMock: jest.Mock<typeof useNavigate> = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    const newUser = await createUser();
    const newPost = await createPost({ userId: newUser.id });
    await renderWithProviders(<PostRoutes />, { route: `/${newPost.id}/edit`, user: newUser });

    act(() => {
      userEvent.type(screen.getByLabelText(/title/i), newPost.title);
      userEvent.type(screen.getByLabelText(/write your post/i), newPost.body);
      userEvent.type(screen.getByLabelText(/tags/i), newPost.tags.join(','));
      userEvent.click(screen.getByRole('button', { name: /publish/i }));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(`/posts/${newPost.id}`);
    });
  });
});
