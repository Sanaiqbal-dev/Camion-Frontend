import { CreateQueryParams } from '@/util/PrepareQueryParams';
import baseApi from './baseApi';
import { ICustomAPIRes, TVehicleTypeList } from '@/interface/vehicle';

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<any, any>({
      query: (queryParams) => `/api/Vehicles/GetVehicleList${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
      providesTags: ['VehicleList'],
    }),
    getVehicleTypes: builder.query<any, any>({
      query: () => `/api/Vehicles/GetVehicleTypes`,
    }),
    assignDriver: builder.mutation<any, any>({
      query: (body) => ({
        url: '/api/Vehicles/AssignDriverToVehicle',
        method: 'PUT',
        body,
      }),
    }),
    deleteVehicle: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: '/api/Vehicles/DeleteVehicle?id=' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['VehicleList'],
    }),
    createVehicle: builder.mutation<any, any>({
      query: (body) => ({
        url: '/api/Vehicles/AddNewVehicle',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VehicleList'],
    }),
    editVehicle: builder.mutation<any, any>({
      query: (body) => ({
        url: '/api/Vehicles/UpdateVehicle',
        method: 'PUT',
        body,
      }),
    }),
    getPlateType: builder.query<ICustomAPIRes<TVehicleTypeList>, void>({
      query: () => '/api/Vehicles/GetPlateTypes',
      providesTags: ['PlateType'],
      keepUnusedDataFor: 5,
    }),
  }),
});

// Export hooks for use in the app
export const {
  useGetVehicleTypesQuery,
  useGetVehiclesQuery,
  useAssignDriverMutation,
  useDeleteVehicleMutation,
  useCreateVehicleMutation,
  useEditVehicleMutation,
  useGetPlateTypeQuery,
} = proposalApi;
