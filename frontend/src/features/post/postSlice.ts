import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchOnePosts, fetchPosts } from './postThunks';
import { PostGet } from '../../types';
import { RootState } from '../../app/store';

interface PostsState {
  posts: PostGet[];
  post: PostGet | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
}
const initialState: PostsState = {
  posts: [],
  post: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
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
      state.posts = posts;
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

    builder.addCase(fetchOnePosts.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOnePosts.fulfilled, (state, {payload: post}) => {
      state.fetchOneLoading = false;
      state.post = post;
    });
    builder.addCase(fetchOnePosts.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }

});


export const postReducer = postSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectOnePost = (state: RootState) => state.posts.post;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.posts.createLoading;
export const selectOnePostLoading = (state: RootState) => state.posts.fetchOneLoading;
