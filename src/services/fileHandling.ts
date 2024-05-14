import baseApi from './baseApi';
import { IAPIResponse, IFile, IProposalForm, IUploadFile } from '@/interface/common';

export const fileHandling = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IAPIResponse<any>, FormData|IUploadFile>({
      query: (body) => ({
        url: '/Account/FileUpload',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FileUpload'],
    }),
    addNewProposal: builder.mutation<IAPIResponse<IFile>, IProposalForm>({
      query: (body) => ({
        url: '/api/ProposalQuotations/AddNewProposalQuotation',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ProposalQuotation'],
    }),
    downloadFile: builder.mutation<IAPIResponse<IFile>, string>({
    downloadFile: builder.query<IAPIResponse<IFile>, string>({
      query: (filename) => ({
        url: `/Account/FileDownload?filename=${filename}`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename.toLowerCase();
          a.click();
          URL.revokeObjectURL(url);
          return response;
        },
        cache: 'no-cache',
      }),
      invalidatesTags: ['FileDownload'],
      providesTags: ['FileDownload'],
    }),
  }),
});
export const { useUploadFileMutation, useAddNewProposalMutation, useLazyDownloadFileQuery } = fileHandling;

//
