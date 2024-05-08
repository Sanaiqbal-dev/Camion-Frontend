import { useState, useEffect } from "react";

import baseApi from "./baseApi";
import {
  IAPIResponse,
  IFile,
  IProposalForm,
  IUploadFile,
} from "@/interface/common";

interface FileType {
  extension: string;
}

const useFileTypeValidation = (props: FileType) => {
  const { extension } = props;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const acceptedFileTypes = [
      ".jpg",
      ".png",
      ".jpeg",
      ".pdf",
      ".doc",
      ".docx",
      ".txt",
      ".xlsx",
      ".gif",
      ".svg",
    ];
    if (!acceptedFileTypes.includes(extension)) {
      setError("Unsupported file type.");
    } else {
      setError(null);
    }
  }, [extension]);
  useEffect(() => {});

  return error;
};

export const fileTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFileTypes: builder.query<IAPIResponse<IFile[]>, void>({
      query: () => `api/FileTypes/GetFileTypes`,
      providesTags: ["FileType"],
    }),
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
export const {
  useGetFileTypesQuery,
  useUploadFileMutation,
  useAddNewProposalMutation,
} = fileTypeApi;
export default useFileTypeValidation;
