// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    storeTodo: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ['Post'],
    }),
    deleteTodo: builder.mutation({
      query: (body) => ({
        url: "",
        method: "DELETE",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ['Post'],
    }),
    patchDone: builder.mutation({
      query: (body) => ({
        url: "",
        method: "PATCH",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ['Post'],
    }),
    edit: builder.mutation({
      query: (body) => ({
        url: "",
        method: "PUT",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ['Post'],
    }),
    getTodo: builder.query({
      query: ({ order, sort, offset }) => '?order=' + order + '&sort=' + sort + '&offset=' + offset,
      providesTags: ['Post']
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useStoreTodoMutation, useEditMutation, useGetTodoQuery, useDeleteTodoMutation, usePatchDoneMutation } = api;
