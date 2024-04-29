import { CommonSelect, IAPIResponse } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';		
import { IOrderStatus, IOrderStatusIndex,IOrderStatusSingle } from '@/interface/orderStatus';
import baseApi from './baseApi';

export const orderStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStatuses: builder.query<IAPIResponse<IOrderStatusIndex[]>, any>({
      query: (queryParams) => `orderStatus/list${(queryParams !== null ? '?' + CreateQueryParams(queryParams): '')}`,
      providesTags: ['OrderStatus'],
    }),
    
		getSelectOrderStatuses: builder.query<IAPIResponse<CommonSelect[]>, any>({
			query: (queryParams) => `orderStatus/select${(queryParams !== null ? '?' + CreateQueryParams(queryParams): '')}`,
			providesTags: ['OrderStatus'],
		}),

    getOrderStatus: builder.query<IAPIResponse<IOrderStatusSingle>, Partial<IOrderStatus> >({
      query: ({id}) => `/orderStatus/detail/${id}`,
      providesTags: (result, error, arg) => {
        const { id } = arg || {};
        if (id) {
          return [{ type: "OrderStatus", id, result: result, error: error }];
        }
        return [{ type: "OrderStatus", result: result, error: error }];
      },
    }), 
    
		addOrderStatus: builder.mutation<IAPIResponse<IOrderStatus>, Partial<IOrderStatus>>({
			query: (body) => ({
				url: 'orderStatus/add',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['OrderStatus', 'Order'],
		}),
	
		updateOrderStatus: builder.mutation<IAPIResponse<IOrderStatus>, Partial<IOrderStatus>>({
			query: ({ id, ...rest }) => ({
				url: `orderStatus/${id}`,
				method: 'PUT',
				body: { id, ...rest },
			}),
			invalidatesTags: ['OrderStatus', 'Order'],
		}),
	
		deleteOrderStatus: builder.mutation<IAPIResponse<void>, Partial<IOrderStatus>>({
			query: ({id}) => ({
				url: `orderStatus/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['OrderStatus', 'Order'],
		}),
	}),
});

// Export hooks for use in the app
	 export const { useGetOrderStatusesQuery, useGetOrderStatusQuery, useGetSelectOrderStatusesQuery, 
	 								useAddOrderStatusMutation, useUpdateOrderStatusMutation, useDeleteOrderStatusMutation} = orderStatusApi;