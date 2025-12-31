"use server";

export const createCoupleInfoAction = async (
  prev: unknown,
  formData: FormData,
) => {
  const data = {
    groomName: formData.get("groom.name") as string,
    date: formData.get("wedding-date") as string,
    thumbnail: formData.get("thumbnail") as File,
  };

  console.log({ data });
};
