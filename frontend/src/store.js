import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
// import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;