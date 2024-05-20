import { CreateQueryParams } from '@/util/PrepareQueryParams';
import baseApi from './baseApi';
import { IAPIResponse, IDriver } from '@/interface/common';

export const Drivers = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewDriver: builder.mutation<IAPIResponse<IDriver[]>, any>({
      query: (body) => ({
        url: '/api/Drivers/AddNewDriver',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Driver'],
    }),
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
    updateDriver: builder.mutation<IAPIResponse<IDriver>, any>({
      query: ({ id, ...rest }) => ({
        url: `/api/Drivers/UpdateDriver`,
        method: 'PUT',
        body: { id, ...rest },
      }),
      invalidatesTags: ['Driver'],
    }),
  }),
});
export const { useAddNewDriverMutation, useGetDriversListQuery, useGetNationalityListQuery, useDeleteDriverMutation, useUpdateDriverMutation } = Drivers;
