import { AspNetUserLoginRequest, AspNetUserLoginResponse, IAspNetUser, ILoginResponse } from '@/interface/aspNetUser';
import baseApi from './baseApi';
import { IEmail } from '@/interface/common';

export const aspNetUserAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    aspNetUserLogin: builder.mutation<ILoginResponse, AspNetUserLoginRequest>({
      query: (body) => ({
        url: '/Account/Login',
        method: 'POST',
        body,
      }),
    }),
    aspNetUserRegister: builder.mutation<AspNetUserLoginResponse, Partial<IAspNetUser>>({
      query: (body) => ({
        url: '/Account/Register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AspNetUser'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aspNetUserResetPassword: builder.mutation<AspNetUserLoginResponse, any>({
      query: (body) => ({
        url: '/Account/ResetUserPassword',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AspNetUser'],
    }),

    resetPasswordByEmail: builder.mutation<AspNetUserLoginResponse, IEmail>({
      query: ({ email }) => ({
        url: `/Account/ResetPasswordByEmail?email=${encodeURIComponent(email)}`,
        method: 'POST',
      }),
      invalidatesTags: ['AspNetUser'],
    }),
  }),
});

export const { useAspNetUserLoginMutation, useAspNetUserRegisterMutation, useAspNetUserResetPasswordMutation, useResetPasswordByEmailMutation } = aspNetUserAuthApi;
