import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./user/userApi"; 
import userReducer from "./user/userslice";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     userData: apiSlice.reducer, 
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

// setupListeners(store.dispatch);

// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './path-to-your-api-slice';
// import userReducer from './path-to-your-user-slice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
