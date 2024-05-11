import baseApi from "./baseApi";
import {
  IAPIResponse,
  IFile,
  IProposalForm,
  IUploadFile,
} from "@/interface/common";

export const fileHandling = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IAPIResponse<IFile>, IUploadFile>({
      query: (body) => ({
        url: "/Account/FileUpload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FileUpload"],
    }),
    addNewProposal: builder.mutation<IAPIResponse<IFile>, IProposalForm>({
      query: (body) => ({
        url: "/api/ProposalQuotations/AddNewProposalQuotation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProposalQuotation"],
    }),
  }),
});
export const { useUploadFileMutation, useAddNewProposalMutation } =
  fileHandling;
