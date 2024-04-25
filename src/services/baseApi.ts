import { BASE_URL } from "../config/app";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const {
        session: { token },
      } = getState() as any;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Vehicle",
    "AspNetUser",
    "Driver",
    "Company",
    "DriverAssignment",
    "OrderDetail",
    "FileType",
    "Order",
    "OrderStatus",
    "OrderVehicleTracking",
    "ProposalQuotation",
    "Proposal",
  ],
  reducerPath: "baseApi",
  endpoints: () => ({}),
});

export default baseApi;
