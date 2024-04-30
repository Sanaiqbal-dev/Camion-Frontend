import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISessionUser, ILanguage } from '@/interface/common';
import {AVAILABLE_LANGUAGES} from "@/config/app"


// export type Languages = AVAILABLE_LANGUAGES;
export interface SessionState {
  user:ISessionUser | null,
  token: string | null,
	lang: string,
	dir: 'rtl' | 'ltr',
  isLoggedIn: boolean
}

const initialState: SessionState = {
  user: null,
  token: null,
	lang: 'en',
	dir: 'ltr',
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionState>) {   
     // console.log(state)  
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.token !== null
      return state;
    },
    setLanguage(state, action: PayloadAction<ILanguage>) {   
			 state.lang = action.payload.code;
			 state.dir = action.payload.dir;
			 return state;
		 },	
    setLogout(state) {
     // console.log(state) 
      return initialState;
    },
  },
});

export const { setSession, setLanguage, setLogout} = sessionSlice.actions;

export default sessionSlice.reducer;
