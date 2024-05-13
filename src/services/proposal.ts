import { CommonSelect, IAPIResponse } from "@/interface/common";
import { CreateQueryParams } from "@/util/PrepareQueryParams";
import {
  IPlacesResponseObject,
  IProposal,
  IProposalDetailResponse,
  IProposalResponseObject,
} from "@/interface/proposal";
import baseApi from "./baseApi";

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
      IAPIResponse<IProposalDetailResponse>,
      any
    >({
      query: ({ id }) => `api/Proposals/GetProposal?id=${id}`,
      providesTags: (result, error, arg) => {
        const { id } = arg || {};
        if (id) {
          return [{ type: "Proposal", id }];
        }
        return [{ type: "Proposal" }];
      },
    }),

    createNewProposal: builder.mutation<
      IAPIResponse<IProposalResponseObject>,
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
      IAPIResponse<IProposalResponseObject>,
      Partial<IProposal>
    >({
      query: ({ id, ...rest }) => ({
        url: `api/Proposals/UpdateProposal`,
        method: "PUT",
        body: { id, ...rest },
      }),
      invalidatesTags: ["Proposal", "Order", "ProposalQuotation"],
    }),

    deleteProposal: builder.mutation<IAPIResponse<void>, Partial<IProposal>>({
      query: ({ id }) => ({
        url: `api/Proposals/DeleteProposal?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Proposal", "Order", "ProposalQuotation"],
    }),

    getCityList: builder.query<IAPIResponse<IPlacesResponseObject[]>, any>({
      query: () => `api/Proposals/GetNationalityList`,
      providesTags: ["Proposal"],
    }),

    getDistrictList: builder.query<
      IAPIResponse<IProposalResponseObject[]>,
      any
    >({
      query: () => `api/Proposals/GetDistrictList`,
      providesTags: ["Proposal"],
    }),
  }),
});

// Export hooks for use in the app
export const {
  useGetProposalsQuery,
  useGetProposalQuery,
  useGetSelectProposalsQuery,
  useCreateNewProposalMutation,
  useUpdateProposalMutation,
  useDeleteProposalMutation,
  useGetCityListQuery,
  useGetDistrictListQuery,
} = proposalApi;
