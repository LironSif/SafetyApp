import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverApiUrl } from '../Constants/urls.js';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverApiUrl}/api/employees`,
    credentials: 'include',
  }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/',
      providesTags: ['Employee'],
    }),
    getEmployeeById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Employee'],
    }),
    createEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: '/',
        method: 'POST',
        body: newEmployee,
      }),
      invalidatesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Employee'],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
