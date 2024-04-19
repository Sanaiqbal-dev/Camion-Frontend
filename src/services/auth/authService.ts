import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../state/store";
import { ILoginResponse, ILoginRequest } from "../../interface/Session";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://b89cf619-9148-4bf4-b8d3-4061b9d8566b.mock.pstmn.io/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).session.token;
      if (token) {
        headers.set("authorization", "Bearer ${token}");
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});


export const { useLoginUserMutation } = authApi;
