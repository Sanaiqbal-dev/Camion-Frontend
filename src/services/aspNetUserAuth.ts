import { AspNetUserLoginRequest, AspNetUserLoginResponse, IAspNetUser } from '@/interface/aspNetUser';
import baseApi from './baseApi';

export const aspNetUserAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    aspNetUserLogin: builder.mutation<AspNetUserLoginResponse, AspNetUserLoginRequest>({
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
    aspNetUserResetPassword: builder.mutation<AspNetUserLoginResponse, Partial<IAspNetUser>>({
      query: (body) => ({
        url: '/Account/ResetPassword',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AspNetUser'],
    }),
  }),
});

export const { useAspNetUserLoginMutation, useAspNetUserRegisterMutation, useAspNetUserResetPasswordMutation } = aspNetUserAuthApi;
