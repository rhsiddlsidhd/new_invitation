"use server";

import { cloudinary } from "@/lib/cloudinary/config";
import { decrypt, getSession } from "@/lib/session";
import { patchInvitation } from "@/services/invitationServices";
import { Thumbnail } from "@/types";

import { validateAndFlatten } from "@/utils/validation";
import { ThumbnailSchema } from "@/utils/validation/schema.server";

export const patchThumbnail = async (
  prev: unknown,
  payload: { data: Thumbnail[] },
) => {
  console.log("data", payload.data);
  const token = await getSession();
  const { userId } = await decrypt(token);

  const validation = validateAndFlatten(ThumbnailSchema, payload.data);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error,
    };
  }

  const thumbnailEntry: string[] = validation.data.map((thumbnail) =>
    cloudinary.url(thumbnail.public_id, {
      version: thumbnail.version,
      format: thumbnail.format,
      secure: true,
    }),
  );

  const data = await patchInvitation({
    id: userId,
    data: { thumbnails: thumbnailEntry },
  });
  return {
    success: true,
    message: "프로필 수정 완료",
    data: data.thumbnails,
  };
};
