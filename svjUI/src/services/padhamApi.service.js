import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const padhamApi = createApi({
  reducerPath: 'padhamApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    calculatePadham: builder.mutation({
      query: (dimensions) => ({
        url: '/padham',
        method: 'POST',
        body: dimensions,
      }),
    }),
  }),
});

export const { useCalculatePadhamMutation } = padhamApi;
