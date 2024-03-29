import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiPostGet, PostGet, PostMutation } from '../../types';
import { RootState } from '../../app/store';

export const fetchPosts = createAsyncThunk<PostGet[]>(
  'posts/fetchPosts',
  async () => {
    const postsResponse = await axiosApi.get<PostGet[]>('/posts');
    return postsResponse.data.reverse();
  }
);

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState}>(
  'posts/create',
  async (data, {getState}) => {
    const user = getState().users.user;

    if(user){

      const formData = new FormData();

      const keys = Object.keys(data) as (keyof PostMutation)[];
      keys.forEach(key => {
        const value = data[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post('/posts', formData, {headers: {'Authorization':  user.token}});
    }else {
      throw new Error('No user');
    }
  }
);

export const fetchOnePosts = createAsyncThunk<ApiPostGet, string>(
  'posts/fetchOne',
  async (postId) => {
    const postsResponse = await axiosApi.get<ApiPostGet | null>('/posts/' + postId);

    if (postsResponse.data === null) {
      throw new Error('Not found');
    }

    return postsResponse.data;
  }
);