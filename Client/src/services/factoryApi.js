import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverApiUrl } from '../Constants/urls.js';

export const factoryApi = createApi({
  reducerPath: 'factoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverApiUrl}/api/factories`,
    credentials: 'include',
  }),
  tagTypes: ['Factory'],
  endpoints: (builder) => ({
    getFactories: builder.query({
      query: () => '/',
      providesTags: ['Factory'],
    }),
    getFactoryById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Factory'],
    }),
    createFactory: builder.mutation({
      query: (newFactory) => ({
        url: '/',
        method: 'POST',
        body: newFactory,
      }),
      invalidatesTags: ['Factory'],
    }),
    updateFactory: builder.mutation({
      query: (updateData) => ({
        url: `/update`, // Adjusted to a generalized endpoint since ID is in the body
        method: 'PUT',
        body: updateData, // ID is now part of the body, along with other update data
      }),
      invalidatesTags: ['Factory'],
    }),
    deleteFactory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Factory'],
    }),
  }),
});

export const {
  useGetFactoriesQuery,
  useGetFactoryByIdQuery,
  useCreateFactoryMutation,
  useUpdateFactoryMutation,
  useDeleteFactoryMutation,
} = factoryApi;
