import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Auth/authSlice";
import { userApi } from "../services/userApi";
export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
