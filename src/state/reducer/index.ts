import { combineReducers } from "redux";
import sessionReducer from "../slice/authSlice";
import { baseApi } from "../../services/baseApi";

const reducers = combineReducers({
  session: sessionReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
