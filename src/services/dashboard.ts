// /api/Orders/GetDashboardOrdersDetailShipper

import { CreateQueryParams } from '@/util/PrepareQueryParams';
import baseApi from './baseApi';
import { IAPIResponse, IDriver } from '@/interface/common';

export const DashboardOrders = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShipperDashboardOrderList: builder.query<IAPIResponse<IDriver[]>, any>({
      query: (queryParams) => `/api/Orders/GetDashboardOrdersDetailShipper${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
      providesTags: ['Order'],
    }),
    getCarrierDashboardOrderList: builder.query<IAPIResponse<IDriver[]>, any>({
      query: (queryParams) => `/api/Orders/GetDashboardOrdersDetailCarrier${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
      providesTags: ['Order'],
    }),
  }),
});
export const { useGetShipperDashboardOrderListQuery, useGetCarrierDashboardOrderListQuery } = DashboardOrders;
