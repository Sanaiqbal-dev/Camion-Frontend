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
  }),
});
export const { useCreateCompanyProfileMutation } = companyProfile;
