import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PostEditorState } from '../types/postEditor';
import type { RootState } from '../../../stores/store';

const initialState: PostEditorState = {
  post: { title: '', body: '', tags: [] },
  isLoading: false,
};

const slice = createSlice({
  name: 'postEditor',
  initialState,
  reducers: {
    initializeEditor: () => initialState,
    updateField: (
      state,
      { payload: { name, value } }: PayloadAction<{ name: keyof PostEditorState['post']; value: string }>
    ) => {
      if (name === 'tags') {
        state.post[name] = value.split(',').map((tag) => tag.trim());
        return;
      }

      state.post[name] = value;
    },
    setUpdateStarted: (state) => {
      state.isLoading = true;
    },
    setUpdateComplete: (state) => {
      state.isLoading = false;
    },
  },
});

export const { initializeEditor, updateField, setUpdateStarted, setUpdateComplete } = slice.actions;

export default slice.reducer;

export const selectEditorPost = (state: RootState) => state.postEditor.post;

export const selectIsLoading = (state: RootState) => state.postEditor.isLoading;
