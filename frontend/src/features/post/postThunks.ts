import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { PostGet } from '../../types';

export const fetchPosts = createAsyncThunk<PostGet[]>(
  'posts/fetchPosts',
  async () => {
    const postsResponse = await axiosApi.get<PostGet[]>('/posts');
    return postsResponse.data;
  }
);