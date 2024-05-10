import baseApi from "./baseApi";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDrivers: builder.query<any, any>({
      query: () => `/api/Drivers/GetDriverList`,
    }),
  }),
});

// Export hooks for use in the app
export const { useGetDriversQuery } = proposalApi;
