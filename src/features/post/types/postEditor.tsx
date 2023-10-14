import { PostForEditor } from '..';

export type PostEditorState = {
  post: PostForEditor;
  // isSubmitting: boolean;
  isLoading: boolean;
};
