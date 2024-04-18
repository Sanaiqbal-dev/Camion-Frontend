import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, ILoginResponse, IUser } from "../interface/Session";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://b89cf619-9148-4bf4-b8d3-4061b9d8566b.mock.pstmn.io/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "users",
    }),
    loginUser: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useLoginUserMutation } = userApi;
