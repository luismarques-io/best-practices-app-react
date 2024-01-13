import * as router from 'react-router';
import {
  createComment,
  createPost,
  createUser,
  renderWithProviders,
  screen,
  userEvent,
  waitFor,
  act,
} from '../../../../test/test-utils';

import { AppRoutes } from '../../../../routes';

const navigate = jest.fn();
window.alert = jest.fn();

const renderPost = async ({ authenticateUser } = { authenticateUser: false }) => {
  const newUser = await createUser();
  const newPost = await createPost({ userId: newUser.id });
  const newComment = await createComment({
    postId: newPost.id,
    user: { id: newUser.id, username: newUser.username },
  });

  const utils = await renderWithProviders(<AppRoutes />, {
    route: `/posts/${newPost.id}`,
    user: authenticateUser ? newUser : null,
  });

  return { ...utils, newPost, newUser, newComment };
};

describe('PostPage', () => {
  it('should render public post page', async () => {
    const { newPost, newUser, newComment } = await renderPost();

    expect(screen.getByText(newPost.title)).toBeInTheDocument();
    expect(screen.queryAllByText(`${newUser.firstName} ${newUser.lastName}`).length).toBeGreaterThan(0);
    for (const tag of newPost.tags) {
      expect(screen.getByText(tag as string)).toBeInTheDocument();
    }
    expect(screen.getByText(newComment.body)).toBeInTheDocument();

    expect(screen.queryAllByText(/edit post/i).length).toBe(0);
    expect(screen.queryAllByText(/delete post/i).length).toBe(0);
  });

  it('should show edit and delete button to authenticated users', async () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    const { newPost } = await renderPost({ authenticateUser: true });
    const editButton = screen.getByText(/edit post/i);
    const deleteButton = screen.getByText(/delete post/i);

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(editButton);
    });

    await waitFor(async () => {
      expect(navigate).toHaveBeenCalledWith(`/posts/${newPost.id}/edit`, expect.anything());
      navigate.mockRestore();
    });

    await act(async () => {
      userEvent.click(deleteButton);
    });

    await waitFor(async () => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(`/posts`);
      navigate.mockRestore();
    });
  });
  // TODO: create separate file for comments in comments feature???
});
