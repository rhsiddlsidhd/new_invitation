// your config path
import { NextRequest } from "next/server";
import { cloudinary } from "./config";

type Result<T, E> = { success: true; data: T } | { success: false; error: E };

type UploadResponse = Result<UploadApiResponse, UploadApiErrorResponse>;

export const uploadToCloudinary = (
  fileUri: string,
  fileName: string,
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "product-images", // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};
