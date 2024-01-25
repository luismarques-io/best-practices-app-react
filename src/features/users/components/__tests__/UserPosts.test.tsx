import { UserPosts } from '../UserPosts';
import { act, createPost, createUser, renderWithProviders, userEvent } from '@/test/test-utils';

window.scrollTo = jest.fn();

describe('UserPosts', () => {
  it('should show empty message when no posts to show', async () => {
    const newUser = await createUser();
    const ui = await renderWithProviders(<UserPosts userId={newUser.id} />);
    expect(ui.container.querySelectorAll('.pagination a').length).toBe(0);
  });

  it('should list user posts with working pagination', async () => {
    const postsPerPage = 10;
    const totalPosts = 20;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const newUser = await createUser();
    const posts = await Promise.all(Array.from({ length: totalPosts }).map(() => createPost({ userId: newUser.id })));
    const totalPostsOtherUser = 60;
    const otherUser = await createUser();
    await Promise.all(Array.from({ length: totalPostsOtherUser }).map(() => createPost({ userId: otherUser.id })));
    const postsByPage = Array.from({ length: totalPages }).map((_, i) =>
      posts.slice(i * postsPerPage, i * postsPerPage + postsPerPage)
    );

    const ui = await renderWithProviders(<UserPosts userId={newUser.id} />);

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
});
