import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentsUser, CommentsWithoutId } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const fetchComments = createAsyncThunk<CommentsUser[], string>(
  'comments/fetchComments',
  async (id) => {
    const commentsResponse = await axiosApi.get<CommentsUser[] | null>('/comments?postId=' + id);

    if (commentsResponse.data === null) {
      throw new Error('Not found comments!');
    }

    return commentsResponse.data.reverse();
  }
);

export const createComments = createAsyncThunk<void, CommentsWithoutId, {state: RootState}>(
  'comments/createComments',
  async (comment, {getState}) => {
    const user = getState().users.user;

    if (user) {
      const commentsData = {
        user: user._id,
        postId: comment.postId,
        comment: comment.comment,
      }

      await axiosApi.post('/comments', commentsData, {headers: {'Authorization': user.token}});
    } else {
      throw new Error('No user');
    }
  }
);