import { CommonSelect, IAPIResponse } from "@/interface/common";
import { CreateQueryParams } from "@/util/PrepareQueryParams";
import { IOrder, IOrderIndex, IOrderSingle } from "@/interface/order";
import baseApi from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IAPIResponse<IOrderIndex[]>, any>({
      query: (queryParams) =>
        `order/list${
          queryParams !== null ? "?" + CreateQueryParams(queryParams) : ""
        }`,
      providesTags: ["Order"],
    }),

    getSelectOrders: builder.query<IAPIResponse<CommonSelect[]>, any>({
      query: (queryParams) =>
        `order/select${
          queryParams !== null ? "?" + CreateQueryParams(queryParams) : ""
        }`,
      providesTags: ["Order"],
    }),

    getOrder: builder.query<IAPIResponse<IOrderSingle>, Partial<IOrder>>({
      query: ({ id }) => `/order/detail/${id}`,
      providesTags: (result, error, arg) => {
        const { id } = arg || {};
        if (id) {
          return [{ type: "Order", id, result: result, error: error }];
        }
        return [{ type: "Order", result: result, error: error }];
      },
    }),

    addOrder: builder.mutation<IAPIResponse<IOrder>, Partial<IOrder>>({
      query: (body) => ({
        url: "order/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order", "OrderDetail", "OrderVehicleTracking"],
    }),

    updateOrder: builder.mutation<IAPIResponse<IOrder>, Partial<IOrder>>({
      query: ({ id, ...rest }) => ({
        url: `order/${id}`,
        method: "PUT",
        body: { id, ...rest },
      }),
      invalidatesTags: ["Order", "OrderDetail", "OrderVehicleTracking"],
    }),

    deleteOrder: builder.mutation<IAPIResponse<void>, Partial<IOrder>>({
      query: ({ id }) => ({
        url: `order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order", "OrderDetail", "OrderVehicleTracking"],
    }),
  }),
});

// Export hooks for use in the app
export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetSelectOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
