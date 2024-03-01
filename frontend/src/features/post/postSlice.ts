import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchPosts } from './postThunks';
import { PostGet } from '../../types';
import { RootState } from '../../app/store';

interface UsersState {
  post: PostGet[];
  fetchLoading: boolean;
  createLoading: boolean;
}
const initialState: UsersState = {
  post: [],
  fetchLoading: false,
  createLoading: false,
}
export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
      state.fetchLoading = false;
      state.post = posts;
    });

    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createLoading = false;
    });
  }

});


export const postReducer = postSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.post;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.posts.createLoading;
