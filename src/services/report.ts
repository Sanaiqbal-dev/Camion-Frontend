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
  }),
});

// Export hooks for use in the app
export const { useGetReportsQuery } = reportsApi;
