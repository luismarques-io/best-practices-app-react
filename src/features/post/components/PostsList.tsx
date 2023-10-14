import { Post } from '../types/post';
import { PostPreview } from './PostPreview';

type PostsListProps = {
  posts: Post[];
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
