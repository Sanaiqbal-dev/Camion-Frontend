import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISessionState } from "../../interface/Session";


const initialState: ISessionState = {
  username: null,
  role: null,
  token: null,
  status: "expired",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSession: (state, action:PayloadAction<ISessionState>) => {
      const { username, role, token, status } = action.payload;
      state.username = username;
      state.role = role;
      state.token = token;
      state.status = status;
    },
    clearAuthSession: (state) => {
      state.username = null;
      state.role = null;
      state.token = null;
      state.status = "expired";
    },
  },
});

export const { setAuthSession, clearAuthSession } = authSlice.actions;
export default authSlice.reducer;
