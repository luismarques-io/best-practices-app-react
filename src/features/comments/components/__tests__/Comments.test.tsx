import { AppRoutes } from '@/routes';
import { createComment, createPost, createUser, renderWithProviders, userEvent, waitFor } from '@/test/test-utils';
import { act } from 'react-dom/test-utils';

window.alert = jest.fn();

describe('PostPage Comments', () => {
  it('should render public comment list with working pagination', async () => {
    const commentsPerPage = 2;
    const totalComments = 4;
    const totalPages = Math.ceil(totalComments / commentsPerPage);
    const newUser = await createUser();
    const newPost = await createPost({ userId: newUser.id });
    const comments = await Promise.all(
      Array.from({ length: totalComments }).map(() =>
        createComment({ postId: newPost.id, user: { id: newUser.id, username: newUser.username } })
      )
    );

    const ui = await renderWithProviders(<AppRoutes />, { route: `/posts/${newPost.id}`, user: null });

    expect(ui.queryAllByText(/post comment/i).length).toBe(0);
    expect(ui.getByText(comments[0].body)).toBeInTheDocument();
    expect(ui.getByText(comments[1].body)).toBeInTheDocument();
    expect(ui.queryAllByText(comments[2].body).length).toBe(0);
    expect(ui.container.querySelectorAll('.pagination a').length).toBe(totalPages);

    act(() => {
      userEvent.click(ui.container.querySelectorAll('.pagination a')[1]);
    });

    await ui.findByText(comments[2].body);

    expect(ui.queryAllByText(`${comments[2].body}`).length).toBe(1);
    expect(ui.queryAllByText(`${comments[3].body}`).length).toBe(1);
  });

  it('should create, update and delete a comment', async () => {
    const currentUser = await createUser();
    const otherUser = await createUser();
    const newPost = await createPost({ userId: otherUser.id });
    const ui = await renderWithProviders(<AppRoutes />, { route: `/posts/${newPost.id}`, user: currentUser });

    expect(ui.getByText(/post comment/i)).toBeInTheDocument();

    act(() => {
      userEvent.type(ui.getByLabelText(/write a comment/i), 'This is a comment');
      userEvent.click(ui.getByRole('button', { name: /post comment/i }));
    });

    await ui.findByText(/this is a comment/i);

    expect(ui.getByText(/this is a comment/i)).toBeInTheDocument();
    expect(ui.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(ui.getByRole('button', { name: /delete/i })).toBeInTheDocument();

    act(() => {
      userEvent.click(ui.getByRole('button', { name: /edit/i }));
    });

    await ui.findByRole('button', { name: /save/i });

    act(() => {
      userEvent.type(ui.getAllByRole('textbox', { name: /write a comment/i })[1], ' edited');
      userEvent.click(ui.getByRole('button', { name: /save/i }));
    });

    await waitFor(async () => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Saved'));
      (window.alert as jest.Mock).mockRestore();
      await ui.findByText(/this is a comment edited/i);
    });

    expect(ui.getByText(/this is a comment edited/i)).toBeInTheDocument();
    expect(ui.container.querySelectorAll('.comment').length).toBe(1);

    act(() => {
      userEvent.click(ui.getByRole('button', { name: /delete/i }));
    });

    await waitFor(async () => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Deleted'));
      (window.alert as jest.Mock).mockRestore();
    });

    await ui.findByText(/post comment/i);

    expect(ui.queryAllByText(/this is a comment edited/i).length).toBe(0);
    expect(ui.container.querySelectorAll('.comment').length).toBe(0);
  });
});
