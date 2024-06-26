import { CreateQueryParams } from '@/util/PrepareQueryParams';
import { IProposalQuotationUpdateBody } from '@/interface/proposalQuotation';
import baseApi from './baseApi';
import { IAPIResponse } from '@/interface/common';

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetProposalQuotations: builder.query<any, any>({
      query: (queryParams) => `api/ProposalQuotations/GetAllProposalQuotations${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
    }),
    GetProposalQuotationsById: builder.query<any, { orderRequestId: number }>({
      query: ({ orderRequestId }) => `api/ProposalQuotations/GetProposalQuotationByRequestId?orderRequestId=${orderRequestId}`,
      providesTags: ['Order'],
    }),

    updateQuotation: builder.mutation<any, IProposalQuotationUpdateBody>({
      query: (body) => ({
        url: '/api/ProposalQuotations/UpdateProposalQuotation',
        method: 'PUT',
        body,
      }),
    }),
    updateQuotationStatus: builder.mutation<IAPIResponse<unknown>, { id: number; status?: string; proposalQuotationStatusId: number }>({
      query: (body) => ({
        url: '/api/ProposalQuotations/UpdateProposalQuotationStatus',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

// Export hooks for use in the app
export const { useGetProposalQuotationsQuery, useGetProposalQuotationsByIdQuery, useUpdateQuotationMutation, useUpdateQuotationStatusMutation } = proposalApi;
