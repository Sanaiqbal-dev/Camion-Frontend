import baseApi from "./baseApi";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<any, any>({
      query: () => `/api/Vehicles/GetVehicleList`,
    }),
    assignDriver: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/Vehicles/AssignDriverToVehicle",
        method: "PUT",
        body,
      }),
    }),
    deleteVehicle: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: "/api/Vehicles/DeleteVehicle?id=" + id,
        method: "DELETE",
      }),
    }),
    createVehicle: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/Vehicles/AddNewVehicle",
        method: "POST",
        body,
      }),
    }),
    editVehicle: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/Vehicles/UpdateVehicle",
        method: "PUT",
        body,
      }),
    }),
  }),
});

// Export hooks for use in the app
export const {
  useGetVehiclesQuery,
  useAssignDriverMutation,
  useDeleteVehicleMutation,
  useCreateVehicleMutation,
  useEditVehicleMutation,
} = proposalApi;