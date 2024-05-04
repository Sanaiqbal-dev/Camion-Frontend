import { useState, useEffect } from "react";

import { IFileType } from "@/interface/proposal";
import baseApi from "./baseApi";
import { IAPIResponse } from "@/interface/common";

interface FileType {
  extension: string;
}

const useFileTypeValidation = (props: FileType) => {
  const { extension } = props;
  const [allFileTypes, setAllFileTypes] = useState<IFileType[]>([]);

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
    console.log("Extension", extension);
  }, [extension]);
  useEffect(() => {});

  return error;
};

export const fileTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFileTypes: builder.query<IAPIResponse<IFileType[]>, void>({
      query: () => `api/FileTypes/GetFileTypes`,
      providesTags: ["FileType"],
    }),
  }),
});
export const { useGetFileTypesQuery } = fileTypeApi;
export default useFileTypeValidation;
