"use server";
import { cloudinary } from "@/lib/cloudinary/config";
import { decrypt, getSession } from "@/lib/session";
import { patchInvitation } from "@/services/invitationServices";
import { ActionState, GalleryEntry, GalleryMapServer } from "@/types";
import { validateAndFlatten } from "@/utils/validation";
import { gallerySchema } from "@/utils/validation/schema.server";

export const patchGallery = async (
  prev: unknown,
  payload: { data: GalleryMapServer },
): Promise<ActionState<GalleryEntry[]>> => {
  const token = await getSession();
  const { userId } = await decrypt(token);
  const validation = validateAndFlatten(gallerySchema, payload.data);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error,
    };
  }

  // 여기서 validation.data.images 가지고

  const galleryEntries: GalleryEntry[] = Array.from(payload.data.entries()).map(
    ([id, item]) => {
      const imageUrls = item.images.map((img) =>
        cloudinary.url(img.public_id, {
          version: img.version,
          format: img.format,
          secure: true,
        }),
      );

      return {
        id,
        type: item.type,
        images: imageUrls, // string[] 형태로 URL만 넣기
      };
    },
  );

  const data = await patchInvitation({
    data: { galleries: galleryEntries },
    id: userId,
  });

  return {
    success: true,
    message: "프로필 수정 성공",
    data: data.galleries,
  };
};
