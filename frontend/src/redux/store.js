// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query/react";
// import { apiSlice } from "./user/userApi";
// import { adminapiSlice } from "./admin/adminApi";
// import userReducer from "./user/userslice";

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

// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         user: userReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true,
// });

// export default store;

// import { apiSlice } from '@/redux/admin/adminApi';
// import userReducer from '@/redux/user/userSlice'; 


// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         user: userReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
// });

// export default store;

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
// import authReducer from "./user/userslice";
// import { apiSlice } from './admin/adminApi';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   [apiSlice.reducerPath]: apiSlice.reducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, apiSlice.middleware),
//   devTools: true,
// });

// export default store;







// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query/react";
// import { apiSlice } from "./user/userApi";
// import { adminapiSlice } from "./admin/adminApi"; 
// import userReducer from "./user/userslice";


// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         [adminapiSlice.reducerPath]: adminapiSlice.reducer, 
//         user: userReducer, 
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware, adminapiSlice.middleware), 
//     devTools: true,
// });

// setupListeners(store.dispatch);

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { userApiSlice } from "./user/userApi";
import { adminApiSlice } from "./admin/adminApi";
import userReducer from "./user/userslice";

const store = configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware, adminApiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export default store;

