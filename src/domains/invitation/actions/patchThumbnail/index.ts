"use server";

import { cloudinary } from "@/shared/lib/cloudinary/config";
import { decrypt } from "@/shared/lib/jose";
import { getAuthToken } from "@/domains/auth";
import { patchInvitation } from "@/domains/invitation";

import { Thumbnail } from "@/shared/types";

import { validateAndFlatten } from "@/shared/utils/validation";
import { ThumbnailSchema } from "@/shared/utils/validation/schema.server";

export const patchThumbnail = async (
  prev: unknown,
  payload: { data: Thumbnail[] },
) => {
  const token = await getAuthToken();
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
