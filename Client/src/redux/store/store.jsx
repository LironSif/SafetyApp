import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../../services/userApi';
import userReducer from '../slices/UserSlice'; // Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer, // Add your user slice reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
