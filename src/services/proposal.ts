import { CommonSelect, IAPIResponse } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';		
import { IProposal, IProposalIndex,IProposalResponseObject,IProposalSingle } from '@/interface/proposal';
import baseApi from './baseApi';

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProposals: builder.query<IAPIResponse<IProposalResponseObject[]>, any>({
      query: (queryParams) =>
        `api/Proposals/GetAllProposals${
          queryParams !== null ? "?" + CreateQueryParams(queryParams) : ""
        }`,
      providesTags: ["Proposal"],
    }),

    getSelectProposals: builder.query<IAPIResponse<CommonSelect[]>, any>({
      query: (queryParams) =>
        `proposal/select${
          queryParams !== null ? "?" + CreateQueryParams(queryParams) : ""
        }`,
      providesTags: ["Proposal"],
    }),

    getProposal: builder.query<
      IAPIResponse<IProposalSingle>,
      Partial<IProposal>
    >({
      query: ({ id }) => `/proposal/detail/${id}`,
      providesTags: (result, error, arg) => {
        const { id } = arg || {};
        if (id) {
          return [{ type: "Proposal", id }];
        }
        return [{ type: "Proposal" }];
      },
    }),

    createNewProposal: builder.mutation<
      IAPIResponse<IProposal>,
      Partial<IProposal>
    >({
      query: (body) => ({
        url: "api/Proposals/CreateNewProposal",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Proposal", "Order", "ProposalQuotation"],
    }),

    updateProposal: builder.mutation<
      IAPIResponse<IProposal>,
      Partial<IProposal>
    >({
      query: ({ id, ...rest }) => ({
        url: `proposal/${id}`,
        method: "PUT",
        body: { id, ...rest },
      }),
      invalidatesTags: ["Proposal", "Order", "ProposalQuotation"],
    }),

    deleteProposal: builder.mutation<IAPIResponse<void>, Partial<IProposal>>({
      query: ({ id }) => ({
        url: `proposal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Proposal", "Order", "ProposalQuotation"],
    }),
  }),
});

// Export hooks for use in the app
	 export const { useGetProposalsQuery, useGetProposalQuery, useGetSelectProposalsQuery, 
	 								useCreateNewProposalMutation, useUpdateProposalMutation, useDeleteProposalMutation} = proposalApi;
