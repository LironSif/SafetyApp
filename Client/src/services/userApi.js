import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverApiUrl } from '../Constants/urls';
export const userApi = createApi({
  
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverApiUrl}/auth`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'], // Invalidate 'Auth' tagged queries upon successful login
    }),
    
    logoutUser: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'PUT',
      }),
      invalidatesTags: ['Auth'],
    }),
    checkAuthStatus: builder.query({
      query: () => 'login/success',
      providesTags: ['Auth'], // Tag this query for later invalidation
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCheckAuthStatusQuery,
} = userApi;
