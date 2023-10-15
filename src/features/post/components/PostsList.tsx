import { PostForPreview } from '../types/post';
import { PostPreview } from './PostPreview';

type PostsListProps = {
  posts: PostForPreview[];
};

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </>
  );
};
