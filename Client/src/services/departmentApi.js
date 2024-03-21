import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverApiUrl } from '../Constants/urls.js';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverApiUrl}/api/departments`,
    credentials: 'include',
  }),
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => '/',
      providesTags: ['Department'],
    }),
    getDepartmentsByFactoryId: builder.query({
      query: (factoryId) => `/byFactory/${factoryId}`,
      providesTags: ['Department'],
    }),
    
    getDepartmentById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Department'],
    }),
    createDepartment: builder.mutation({
      query: (newDepartment) => ({
        url: '/',
        method: 'POST',
        body: newDepartment,
      }),
      invalidatesTags: ['Department'],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Department'],
    }),
    updateDepartments: builder.mutation({
      query: ({ factoryId, departments }) => ({
        url: `/updateByFactory/${factoryId}`, // Note: Adjust the URL as necessary
        method: 'PUT',
        body: { departments },
      }),
      invalidatesTags: ['Department'],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useGetDepartmentsByFactoryIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useUpdateDepartmentsMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
