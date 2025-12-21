"use server";

import { cloudinary } from "@/shared/lib/cloudinary/config";
import { decrypt } from "@/shared/lib/token";
import { getAuthToken } from "@/domains/auth";
import { patchInvitation } from "@/domains/invitation";

import { Thumbnail } from "@/shared/types";

import { validateAndFlatten, thumbnailSchema } from "@/shared/lib/validation";

export const patchThumbnail = async (
  prev: unknown,
  payload: { data: Thumbnail[] },
) => {
  const token = await getAuthToken();
  const result = await decrypt({ token, type: 'REFRESH' });
  const userId = result.payload?.userId;

  const validation = validateAndFlatten(thumbnailSchema, payload.data);

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
