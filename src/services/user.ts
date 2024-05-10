/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "./baseApi";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyUsers: builder.query<any, any>({
      query: () => `/Account/GetCompanySubUsers`,
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
