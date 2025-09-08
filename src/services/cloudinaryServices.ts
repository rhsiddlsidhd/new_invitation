const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file: File, folder: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${UPLOAD_PRESET}`);
  formData.append("folder", folder);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  const data = await res.json();
  return data;
};

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
