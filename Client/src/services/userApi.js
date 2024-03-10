import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
  
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.VITE_SERVER_DEPLOY_URL}/auth/`,
    credentials: 'include', // Correct way to set credentials for cross-origin requests
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
        method: 'GET',
      }),
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
