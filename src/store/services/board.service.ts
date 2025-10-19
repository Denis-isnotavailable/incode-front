import { BoardType } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const boardApi = createApi({
    reducerPath: 'boardApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    tagTypes: ['Board'],
    endpoints: (builder) => ({
        // GET
        getBoardById: builder.query<BoardType, string>({
            query: (id) => `/boards/${id}`,
            providesTags: (result, error, id) => [{ type: 'Board', id }],
        }),

        // CREATE
        createBoard: builder.mutation<BoardType, Partial<BoardType>>({
            query: (body) => ({
                url: '/boards',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Board'],
        }),

        // UPDATE
        updateBoard: builder.mutation<BoardType, { id: string; data: Partial<BoardType> }>({
            query: ({ id, data }) => ({
                url: `/boards/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Board', id }],
        }),

        // DELETE
        deleteBoard: builder.mutation<BoardType, string>({
            query: (id) => ({
                url: `/boards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Board', id }],
        }),
    }),
});

export const {
  useGetBoardByIdQuery,
  useLazyGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;

