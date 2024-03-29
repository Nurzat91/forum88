import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '../features/users/usersSlice';
import { postReducer } from '../features/post/postSlice';
import { commentReducer } from '../features/comments/commentsSlice';

const usersPersistConfig = {
  key: 'post:users',
  storage,
  whitelist: ['post'],
};
const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  posts: postReducer,
  comments: commentReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;