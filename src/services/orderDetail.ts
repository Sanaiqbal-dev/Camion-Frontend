import { CommonSelect, IAPIResponse } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';		
import { IOrderDetail, IOrderDetailIndex,IOrderDetailSingle, OrderDetailIndexQuery } from '@/interface/orderDetail';
import baseApi from './baseApi';

export const orderDetailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderDetails: builder.query<IAPIResponse<IOrderDetailIndex[]>, any>({
      query: (queryParams) => `orderDetail/list${(queryParams !== null ? '?' + CreateQueryParams(queryParams): '')}`,
      providesTags: ['OrderDetail'],
    }),
    
		getSelectOrderDetails: builder.query<IAPIResponse<CommonSelect[]>, any>({
			query: (queryParams) => `orderDetail/select${(queryParams !== null ? '?' + CreateQueryParams(queryParams): '')}`,
			providesTags: ['OrderDetail'],
		}),

    getOrderDetail: builder.query<IAPIResponse<IOrderDetailSingle>, Partial<IOrderDetail> >({
      query: ({id}) => `/orderDetail/detail/${id}`,
      providesTags: (result, error, arg) => {
        const { id } = arg || {};
        if (id) {
          return [{ type: 'OrderDetail', id }];
        }
        return [{ type: 'OrderDetail' }];
      },
    }), 
    
		addOrderDetail: builder.mutation<IAPIResponse<IOrderDetail>, Partial<IOrderDetail>>({
			query: (body) => ({
				url: 'orderDetail/add',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['OrderDetail'],
		}),
	
		updateOrderDetail: builder.mutation<IAPIResponse<IOrderDetail>, Partial<IOrderDetail>>({
			query: ({ id, ...rest }) => ({
				url: `orderDetail/${id}`,
				method: 'PUT',
				body: { id, ...rest },
			}),
			invalidatesTags: ['OrderDetail'],
		}),
	
		deleteOrderDetail: builder.mutation<IAPIResponse<void>, Partial<IOrderDetail>>({
			query: ({id}) => ({
				url: `orderDetail/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['OrderDetail'],
		}),
	}),
});

// Export hooks for use in the app
	 export const { useGetOrderDetailsQuery, useGetOrderDetailQuery, useGetSelectOrderDetailsQuery, 
	 								useAddOrderDetailMutation, useUpdateOrderDetailMutation, useDeleteOrderDetailMutation} = orderDetailApi;