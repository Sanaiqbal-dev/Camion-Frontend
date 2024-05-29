import { CreateQueryParams } from '@/util/PrepareQueryParams';
import baseApi from './baseApi';
import { IAPIResponse, IDriver } from '@/interface/common';

export const Drivers = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addNewDriver: builder.mutation<IAPIResponse<FormData>, any>({
      query: (body) => ({
        url: '/api/Drivers/AddNewDriver',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Driver'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDriversList: builder.query<IAPIResponse<IDriver[]>, any>({
      query: (queryParams) => `/api/Drivers/GetDriverList${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
      providesTags: ['Driver'],
    }),

    getNationalityList: builder.query<IAPIResponse<IDriver[]>, void>({
      query: () => `/api/Drivers/GetNationalityList`,
      providesTags: ['Driver'],
    }),

    deleteDriver: builder.mutation<IAPIResponse<IDriver[]>, Partial<IDriver>>({
      query: ({ id }) => ({
        url: `/api/Drivers/DeleteDriver?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Driver'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateDriver: builder.mutation<IAPIResponse<FormData>, any>({
      query: (body) => ({
        url: `/api/Drivers/UpdateDriver`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Driver'],
    }),
  }),
});
export const { useAddNewDriverMutation, useGetDriversListQuery, useGetNationalityListQuery, useDeleteDriverMutation, useUpdateDriverMutation } = Drivers;
