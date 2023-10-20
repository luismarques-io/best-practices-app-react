export type Comment = {
  id: string;
  body: string;
  postId: string;
  user: {
    id: string;
    username: string;
  };
};

export type CommentEditorState = {
  body: string;
};

export type CommentsResponse = {
  comments: Comment[];
  total: number;
  limit: number;
  skip: number;
};

export type GetCommentsDTO = {
  postId: string;
  limit?: number;
  skip?: number;
};

export type CreateCommentDTO = {
  postId: string;
  body: string;
  userId: string;
};
