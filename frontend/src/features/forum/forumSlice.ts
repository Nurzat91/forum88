import { createSlice } from '@reduxjs/toolkit';

interface UsersState {

}
const initialState: UsersState = {

}
export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {

  },

});


export const forumReducer = forumSlice.reducer;
