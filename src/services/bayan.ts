import { ICreateBayan } from '@/interface/bayan';
import { IAPIResponse } from '@/interface/common';

import baseApi from './baseApi';

export const bayanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBayan: builder.mutation<IAPIResponse<any>, Partial<ICreateBayan>>({
      query: (body) => ({
        url: 'api/Bayan/CreateBayaan',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Proposal', 'Order'],
    }),
  }),
});
// Export hooks for use in the app
export const { useCreateBayanMutation } = bayanApi;
