import { IAPIResponse } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import baseApi from './baseApi';
import { IReportResponseObject } from '@/interface/reports';

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<IAPIResponse<IReportResponseObject[]>, any>({
      query: (queryParams) => `api/ReportManager/GetUserReportList${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`,
      providesTags: ['Order'],
    }),
    downloadReport: builder.query<IAPIResponse<IReportResponseObject>, string>({
      query: (userId) => ({
        url: `/api/ReportManager/ReportDownload?userId=${userId}`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `report_${userId}.xlsx`;
          a.click();
          URL.revokeObjectURL(url);
          return response;
        },
        cache: 'no-cache',
      }),

      providesTags: ['FileDownload'],
    }),
  }),
});

export const { useGetReportsQuery, useLazyDownloadReportQuery } = reportsApi;
