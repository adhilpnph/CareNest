import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { careNestApi } from "./careNestApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [careNestApi.reducerPath]: careNestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(careNestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
