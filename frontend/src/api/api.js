import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4001';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl:BASE_URL,credentials: "include" }),
  endpoints: (builder) => ({
    authenticate: builder.query({
      query: () => '/api/users/register',
    }),
  }),
});

export default api;
