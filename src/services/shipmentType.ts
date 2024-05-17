import { IAPIResponse } from '@/interface/common';

import baseApi from './baseApi';
import { IShipmentType } from '@/interface/proposal';

export const shipmentTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShipmentTypes: builder.query<IAPIResponse<IShipmentType[]>, void>({
      query: () => `api/ShipmentTypes/GetShipmentTypes`,
      providesTags: ['ShipmentType'],
    }),
    getTruckTypes: builder.query<any, void>({
      query: () => `api/TruckTypes/GetTruckTypes`,
      providesTags: ['TruckType'],
    }),
  }),
});
// Export hooks for use in the app
export const { useGetShipmentTypesQuery, useGetTruckTypesQuery } = shipmentTypeApi;
