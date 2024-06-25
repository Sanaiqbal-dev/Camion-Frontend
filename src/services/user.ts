/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import baseApi from './baseApi';
import { ICreateSubUserResponse, ISubUser } from '@/interface/admin';
import { IAPIResponse } from '@/interface/common';
import { IGetProfileResponse } from '@/interface/aspNetUser';

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IGetProfileResponse, void>({
      query: () => '/Account/GetProfile',
    }),
    getCompanyUsers: builder.query<IAPIResponse<ISubUser>, any>({
      query: (queryParams) => `/Account/GetCompanySubUsers${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
    }),
    createSubUser: builder.mutation<ICreateSubUserResponse, any>({
      query: (body) => ({
        url: '/Account/RegisterSubUser',
        method: 'POST',
        body,
      }),
    }),
    updateSubUser: builder.mutation<any, any>({
      query: (body) => ({
        url: '/Account/UpdateCompanySubUsers',
        method: 'POST',
        body,
      }),
    }),
    deleteSubUser: builder.mutation<any, any>({
      query: (body) => ({
        url: 'Account/DeleteCompanySubUsers',
        method: 'POST',
        body,
      }),
    }),
    updateSubUserPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: '/Account/ResetPassword',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for use in the app
export const { useUpdateSubUserMutation, useGetCompanyUsersQuery, useCreateSubUserMutation, useUpdateSubUserPasswordMutation, useDeleteSubUserMutation, useGetProfileQuery } =
  proposalApi;
