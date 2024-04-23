import storage from "redux-persist/lib/storage";
import { ENVIRONMENT, PERSIST_STORE_NAME } from "../config/app";
import reducer from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import baseApi from "../services/baseApi";

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
export { persistor, store };
