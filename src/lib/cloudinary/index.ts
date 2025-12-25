const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const BASE_URL = process.env.CLOUDINARY_BASE_URL;

const uploadToCloudinary = async (file: File, folder: string) => {
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

  const data = await res.json();

  if (data.error) {
    throw new HTTPError(`Cloudinary 오류: ${data.error.message}`, 500);
  }
  
  return data;
};

export async function uploadProductImage(file: File, type: "thumbnail" | "preview" = "thumbnail") {
  const folder = type === "thumbnail" ? "products/thumbnails" : "products/previews";
  const result = await uploadToCloudinary(file, folder);
  return result.secure_url;
}

export async function uploadThumbnails(files: File[]) {
  return Promise.all(
    files.map((file) => uploadToCloudinary(file, "thumbnailImg")),
  );
}

export async function uploadGalleries(
  galleryMap: Map<
    string,
    { type: "A" | "B" | "C" | "D" | "E"; images: File[] }
  >,
) {
  return Promise.all(
    Array.from(galleryMap.entries()).map(async ([id, gallery]) => {
      const images = await Promise.all(
        gallery.images.map((file) => uploadToCloudinary(file, "galleryImg")),
      );
      return { id, type: gallery.type, images };
    }),
  );
}
