import { useNavigate } from 'react-router-dom';
import { postGenerator } from '@/test/data-generators';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/test-utils';

import { CreatePost } from '../CreatePost';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

window.alert = jest.fn();

describe('CreatePost', () => {
  it('should render create post ', async () => {
    await renderWithProviders(<CreatePost />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/write your post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /publish/i })).toBeInTheDocument();
  });

  it('should create new post and redirect o new post page', async () => {
    const navigateMock: jest.Mock<typeof useNavigate> = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    const newPost = postGenerator();
    await renderWithProviders(<CreatePost />);

    userEvent.type(screen.getByLabelText(/title/i), newPost.title);
    userEvent.type(screen.getByLabelText(/write your post/i), newPost.body);
    userEvent.type(screen.getByLabelText(/tags/i), newPost.tags.join(','));
    userEvent.click(screen.getByRole('button', { name: /publish/i }));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
      // expect(navigateMock).toHaveBeenCalledWith(`/posts/${newPost.id}`);
    });
  });
});
