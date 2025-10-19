import { CardType } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardApi = createApi({
    reducerPath: 'cardApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    tagTypes: ['Card'],
    endpoints: (builder) => ({
        // GET
        getCardById: builder.query<CardType, string>({
            query: (id) => `/cards/${id}`,
            providesTags: (result, error, id) => [{ type: 'Card', id }],
        }),

        // GET ALL BY BOARD ID
        getCardsByBoardId: builder.query<CardType[], string>({
            query: (boardId) => `/cards/${boardId}`,
            providesTags: (result, error, id) => [{ type: 'Card', id }],
        }),

        // CREATE
        createCard: builder.mutation<CardType, Partial<CardType>>({
            query: (body) => ({
                url: '/cards',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Card'],
        }),

        // UPDATE
        updateCard: builder.mutation<CardType, { id: string; data: Partial<CardType> }>({
            query: ({ id, data }) => ({
                url: `/cards/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Card', id }],
        }),

        // DELETE
        deleteCard: builder.mutation<CardType, string>({
            query: (id) => ({
                url: `/cards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Card', id }],
        }),
    }),
});

export const {
    
} = cardApi;