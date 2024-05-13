import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@/services/baseApi";

import { thunk } from "redux-thunk";

import { ENVIRONMENT, PERSIST_STORE_NAME } from "@/config/app";
import reducer from "./reducer";

const middlewares = [thunk, baseApi.middleware];

const persistConfig = {
  key: PERSIST_STORE_NAME,
  keyPrefix: "",
  storage,
  whitelist: ["session", "tableConfiguration"],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: ENVIRONMENT === "development",
});

setupListeners(store.dispatch);

const persistor = persistStore(store);
export default { persistor, store };
