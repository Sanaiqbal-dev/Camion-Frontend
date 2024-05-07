import baseApi from "./baseApi";
import { IAPIResponse, IDriver, IFile } from "@/interface/common";

export const Drivers = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewDriver: builder.mutation<IAPIResponse<IFile>, IDriver>({
      query: (body) => ({
        url: "/api/Drivers/AddNewDriver",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Driver"],
    }),
    getDriversList: builder.query<IAPIResponse<IDriver[]>, void>({
      query: () => `/api/Drivers/GetDriverList`,
      providesTags: ["Driver"],
    }),
  }),
});
export const { useAddNewDriverMutation, useGetDriversListQuery } = Drivers;
