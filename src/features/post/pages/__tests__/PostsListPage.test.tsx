import { act, createPost, createUser, renderWithProviders, userEvent } from '@/test/test-utils';
import { PostsListPage } from '../PostsListPage';

window.scrollTo = jest.fn();

describe('PostsListPage', () => {
  it('should show empty message when no posts to show', async () => {
    const ui = await renderWithProviders(<PostsListPage />);
    expect(ui.getByText(/no posts found/i)).toBeInTheDocument();
  });

  it('should list posts with working pagination', async () => {
    const postsPerPage = 10;
    const totalPosts = 20;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const newUser = await createUser();
    const posts = await Promise.all(Array.from({ length: totalPosts }).map(() => createPost({ userId: newUser.id })));
    const postsByPage = Array.from({ length: totalPages }).map((_, i) =>
      posts.slice(i * postsPerPage, i * postsPerPage + postsPerPage)
    );

    const ui = await renderWithProviders(<PostsListPage />);

    Array.from({ length: postsByPage[0].length }).forEach((_, i) => {
      expect(ui.getByText(postsByPage[0][i].title)).toBeInTheDocument();
    });

    expect(ui.container.querySelectorAll('.pagination a').length).toBe(totalPages);

    act(() => {
      userEvent.click(ui.container.querySelectorAll('.pagination a')[1]);
    });
    await ui.findByText(postsByPage[1][0].title);

    Array.from({ length: postsByPage[1].length }).forEach((_, i) => {
      expect(ui.getByText(postsByPage[1][i].title)).toBeInTheDocument();
    });
  });

  it('should search posts', async () => {
    const postsPerPage = 10;
    const totalPosts = 20;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const newUser = await createUser();
    const posts = await Promise.all(Array.from({ length: totalPosts }).map(() => createPost({ userId: newUser.id })));
    Array.from({ length: totalPages }).map((_, i) => posts.slice(i * postsPerPage, i * postsPerPage + postsPerPage));
    const newPost = await createPost({ userId: newUser.id, title: 'My post', body: 'My post body' });

    const ui = await renderWithProviders(<PostsListPage />);
    const searchInput = ui.getByLabelText(/search/i);

    act(() => {
      userEvent.clear(searchInput);
      userEvent.type(searchInput, 'body of non existing post');
    });
    await ui.findByText(/no posts found/i);

    expect(ui.getByText(/no posts found/i)).toBeInTheDocument();

    act(() => {
      userEvent.clear(searchInput);
      userEvent.type(searchInput, 'My post body');
    });
    await ui.findByText(newPost.title);

    expect(ui.getByText(newPost.title)).toBeInTheDocument();
  });
});
