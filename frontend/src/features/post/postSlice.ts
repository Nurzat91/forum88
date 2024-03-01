import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './postThunks';
import { PostGet } from '../../types';
import { RootState } from '../../app/store';

interface UsersState {
  post: PostGet[];
  fetchLoading: boolean;
}
const initialState: UsersState = {
  post: [],
  fetchLoading: false,
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
  }

});


export const postReducer = postSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.post;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;
