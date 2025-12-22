"use server";
import { cloudinary } from "@/lib/cloudinary/config";
import { decrypt } from "@/lib/token";
import { getAuthToken } from "@/domains/auth";
import { patchInvitation } from "@/domains/invitation";

import { GalleryEntry, GalleryPayload } from "@/shared/types";
import { validateAndFlatten, gallerySchema } from "@/lib/validation";

export const patchGallery = async (
  prev: unknown,
  payload: { data: GalleryPayload[] },
) => {
  try {
    const token = await getAuthToken();
    const result = await decrypt({ token, type: "REFRESH" });
    const userId = result.payload?.userId;

    const validation = validateAndFlatten(gallerySchema, payload.data);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const galleryEntries: GalleryEntry[] = payload.data.map((item) => {
      const imageUrls = item.images.map((img) =>
        cloudinary.url(img.public_id, {
          version: img.version,
          format: img.format,
          secure: true,
        }),
      );

      return {
        id: item.id,
        type: item.type,
        images: imageUrls,
      };
    });

    const data = await patchInvitation({
      data: { galleries: galleryEntries },
      id: userId,
    });

    return {
      success: true,
      message: "프로필 수정 성공",
      data: data.galleries,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
    console.error(message);
    return {
      success: false,
      error: { server: [message] },
    };
  }
};
