import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISessionState } from "../../interface/Session";


const initialState: ISessionState = {
  username: null,
  role: null,
  token: null,
  status: "expired",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action:PayloadAction<ISessionState>) => {
      const { username, role, token, status } = action.payload;
      state.username = username;
      state.role = role;
      state.token = token;
      state.status = status;
    },
    clearSession: (state) => {
      state.username = null;
      state.role = null;
      state.token = null;
      state.status = "expired";
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
