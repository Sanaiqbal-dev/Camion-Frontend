import baseApi from './baseApi';

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderTrackings: builder.query<any, any>({
      query: () => '/api/Vehicles/CarrierTrackVehicles',
    }),
    getShipperOrderTrackings: builder.query<any, any>({
      query: () => 'api/Vehicles/ShipperTrackVehicles',
    }),
  }),
});

// Export hooks for use in the app
export const { useGetOrderTrackingsQuery, useGetShipperOrderTrackingsQuery } = proposalApi;
