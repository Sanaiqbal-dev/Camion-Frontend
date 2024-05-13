import { CreateQueryParams } from "@/util/PrepareQueryParams";
import baseApi from "./baseApi";
import { IAPIResponse, ICompanyProfile, IFile } from "@/interface/common";

export const companyProfile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompanyProfile: builder.mutation<
      IAPIResponse<IFile>,
      ICompanyProfile
    >({
      query: (body) => ({
        url: "/Account/VerifyUserForCompanyAccount",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CreateProfile"],
    }),
    getCompanyProfilesList: builder.query<IAPIResponse<ICompanyProfile[]>, any>(
      {
        query: (queryParams) =>
          `/Account/GetCompanyVerificationUsers${
            queryParams !== null ? "?" + CreateQueryParams(queryParams) : ""
          }`,
        providesTags: ["Company"],
      }
    ),
  }),
});
export const {
  useCreateCompanyProfileMutation,
  useGetCompanyProfilesListQuery,
} = companyProfile;
