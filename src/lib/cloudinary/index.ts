import { HTTPError } from "@/types/error";
import { CloudinaryResource } from "./type";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;

const uploadToCloudinary = async <T>(file: File, folder: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${UPLOAD_PRESET}`);
  formData.append("folder", folder);
  const res = await fetch(`${BASE_URL}/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new HTTPError("이미지 업로드에 실패했습니다.", 500);
  }

  const data: T = await res.json();

  return data;
};

export async function uploadProductImage(
  file: File,
  type: "thumbnail" | "preview" = "thumbnail",
): Promise<string | undefined> {
  try {
    const folder =
      type === "thumbnail" ? "products/thumbnails" : "products/previews";
    const result = await uploadToCloudinary<CloudinaryResource>(file, folder);
    return result.secure_url;
  } catch (error) {
    console.error("uploadProductImage:", error);
    return undefined;
  }
}

export async function uploadMainThumbnail(
  files: File[],
): Promise<string[] | undefined> {
  try {
    const result = await Promise.all(
      files.map((file) =>
        uploadToCloudinary<CloudinaryResource>(file, "thumbnailImg"),
      ),
    );
    return result.map((res) => res.secure_url);
  } catch (error) {
    console.error("uploadMainThumbnail:", error);
    return undefined;
  }
}

export async function uploadGalleryImages(
  files: File[],
): Promise<string[] | undefined> {
  try {
    const result = await Promise.all(
      files.map((file) =>
        uploadToCloudinary<CloudinaryResource>(file, "galleryImg"),
      ),
    );
    return result.map((res) => res.secure_url);
  } catch (error) {
    console.error("uploadGalleryImages:", error);
    return undefined;
  }
}

// export async function uploadGalleries(
//   galleryMap: Map<
//     string,
//     { type: "A" | "B" | "C" | "D" | "E"; images: File[] }
//   >,
// ) {
//   return Promise.all(
//     Array.from(galleryMap.entries()).map(async ([id, gallery]) => {
//       const images = await Promise.all(
//         gallery.images.map((file) => uploadToCloudinary(file, "galleryImg")),
//       );
//       return { id, type: gallery.type, images };
//     }),
//   );
// }
