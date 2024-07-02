import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverApiUrl } from '../Constants/urls.js';

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverApiUrl}/api/files`,
    credentials: 'include',
  }),
  tagTypes: ['File'],
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: (type) => `?type=${type}`,
      providesTags: ['File'],
    }),
    uploadFile: builder.mutation({
      query: (fileData) => ({
        url: '/upload',
        method: 'POST',
        body: fileData,
      }),
      invalidatesTags: ['File'],
    }),
    downloadFile: builder.query({
      query: (fileName) => ({
        url: `/download/${fileName}`,
        responseType: 'blob',
      }),
    }),
  }),
});

export const {
  useGetFilesQuery,
  useUploadFileMutation,
  useDownloadFileQuery,
} = fileApi;
