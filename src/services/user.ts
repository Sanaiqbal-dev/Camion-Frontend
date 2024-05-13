/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateQueryParams } from "@/util/PrepareQueryParams";
import baseApi from "./baseApi";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyUsers: builder.query<any, any>({
      query: (queryParams) =>
        `/Account/GetCompanySubUsers${
          queryParams !== null ? "?" + CreateQueryParams(queryParams) : ""
        }`,
    }),
    createSubUser: builder.mutation<any, any>({
      query: (body) => ({
        url: "/Account/RegisterSubUser",
        method: "POST",
        body,
      }),
    }),
    updateSubUser: builder.mutation<any, any>({
      query: (body) => ({
        url: "/Account/UpdateCompanySubUsers",
        method: "POST",
        body,
      }),
    }),
    updateSubUserPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: "/Account/ResetPassword",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for use in the app
export const {
  useUpdateSubUserMutation,
  useGetCompanyUsersQuery,
  useCreateSubUserMutation,
  useUpdateSubUserPasswordMutation,
} = proposalApi;
