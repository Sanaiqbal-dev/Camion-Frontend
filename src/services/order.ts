import { CommonSelect, IAPIResponse } from "@/interface/common";
import { CreateQueryParams } from "@/util/PrepareQueryParams";
import { IOrder, IOrderIndex, IOrderSingle } from "@/interface/order";
import baseApi from "./baseApi";
import { IProposalResponseObject } from "@/interface/proposal";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IAPIResponse<IProposalResponseObject[]>, any>({
      query: (queryParams) =>
        `api/Orders/GetAllOrders${
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
    updateOrder: builder.mutation<IAPIResponse<IOrder>, any>({
      query: ({ orderId, ...rest }) => ({
        url: `api/Orders/UpdateOrderStatus`,
        method: "PUT",
        body: { orderId, ...rest },
      }),
      invalidatesTags: ["Order", "OrderDetail", "OrderVehicleTracking"],
    }),

    deleteOrder: builder.mutation<IAPIResponse<void>, any>({
      query: ({ id }) => ({
        url: `api/Orders/DeleteOrder?orderId=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Order", "OrderDetail", "OrderVehicleTracking"],
    }),

    assignVehicleToOrder: builder.mutation<IAPIResponse<any>, any>({
      query: ({ orderId, vehicleId }) => ({
        url: `api/Orders/AssignVehicleToOrder`,
        method: "PUT",
        body: { orderId, vehicleId },
      }),
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
  useAssignVehicleToOrderMutation,
} = orderApi;
