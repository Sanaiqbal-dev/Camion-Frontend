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
    getCompanyProfilesList: builder.query<
      IAPIResponse<ICompanyProfile[]>,
      void
    >({
      query: () => `/Account/GetCompanyVerificationUsers`,
      providesTags: ["Company"],
    }),

    updateCompanyAccount: builder.mutation<
      IAPIResponse<ICompanyProfile>,
      Partial<ICompanyProfile>
    >({
      query: (body) => ({
        url: "/Account/UpdateCompanyAccount",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});
export const {
  useCreateCompanyProfileMutation,
  useGetCompanyProfilesListQuery,
  useUpdateCompanyAccountMutation,
} = companyProfile;
