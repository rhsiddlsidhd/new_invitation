"use server";

export const createCoupleInfoAction = async (
  prev: unknown,
  formData: FormData,
) => {
  const thumbnailRaw = formData.get("thumbnailSource") as string;
  const galleryRaw = formData.get("gallerySource") as string;
  const data = {
    groomName: formData.get("groom.name") as string,
    date: formData.get("wedding-date") as string,
    thumbnail: thumbnailRaw ? JSON.parse(thumbnailRaw) : [],
    gallery: galleryRaw ? JSON.parse(galleryRaw) : [],
  };

  console.log({ data });
};
