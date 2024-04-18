import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Session/sessionSlice";
import { userApi } from "../services/UserApi";
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
