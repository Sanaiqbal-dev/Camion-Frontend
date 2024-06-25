import { ICreateBayan } from '@/interface/bayan';
import { IAPIResponse, IFile } from '@/interface/common';
import baseApi from './baseApi';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import { TripData } from '@/interface/bayan';

export const bayanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createBayan: builder.mutation<IAPIResponse<any>, Partial<ICreateBayan>>({
      query: (body) => ({
        url: 'api/Bayan/CreateBayaan',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Proposal', 'Order'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBayans: builder.query<IAPIResponse<TripData[]>, any>({
      query: (queryParams) => `api/Bayan/GetBayans${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
      providesTags: ['Bayan'],
    }),
    getPrintBayan: builder.mutation<IAPIResponse<IFile>, number>({
      query: (tripId) => ({
        url: `/api/Bayan/PrintBayaanBill?tripId=${tripId}`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Bayan-${tripId}`;
          a.click();
          URL.revokeObjectURL(url);
          return response;
        },
        cache: 'no-cache',
      }),
    }),
  }),
});
// Export hooks for use in the app
export const { useCreateBayanMutation, useGetBayansQuery, useGetPrintBayanMutation } = bayanApi;
