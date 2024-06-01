import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4001';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    endpoints: (builder) => ({
        adminlogin: builder.mutation({
            query: (userData) => ({
                url: '/api/admin/adminlogin',
                method: 'POST',
                body: userData,
            }),
        }),
        getUserData: builder.mutation({
            query: () => ({
              url: "/api/admin/getUser",
              method: "GET",
            }),
          }),
          editUser: builder.mutation({
            query: (userData) => ({
              url: '/api/admin/updateuser',
              method: 'POST',
              body: userData,
            }),
          }),
    })
})  

export const { useAdminloginMutation,useGetUserDataMutation,useEditUserMutation} = apiSlice;