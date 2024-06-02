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
      query: ({search}) => {
        console.log(`Searching for: ${search}`); 
        return {
          url: `/api/admin/getUser?search=${search}`,
          method: "GET",
        };
      },
    }),
    
    editUser: builder.mutation({
      query: (userData) => ({
        url: '/api/admin/updateuser',
        method: 'POST',
        body: userData,
      }),
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: `/api/admin/adminadduser`,
        method: "POST",
        body: userData
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/admin/adminlogout',
        method: 'POST',
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: '/api/admin/deleteuser',
        method: 'POST',
        body: { userId },
      }),
    }),
  }),
})

export const { useAdminloginMutation, useGetUserDataMutation, useEditUserMutation,  useAddUserMutation,  useLogoutMutation,useDeleteUserMutation } = apiSlice;