import { createSlice } from '@reduxjs/toolkit';
import { CommentsUser } from '../../types';
import { createComments, fetchComments } from './commentsThunks';
import { RootState } from '../../app/store';

interface CommentsState {
  items: CommentsUser[];
  fetchLoading: boolean;
  createLoading: boolean;
}
const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.items = data;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createComments.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createComments.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createComments.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const commentReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;
  export const selectCreateLoading = (state: RootState) => state.comments.createLoading;