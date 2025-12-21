"use server";

import { cloudinary } from "@/shared/lib/cloudinary/config";
import { decrypt } from "@/shared/lib/token";
import { InvitationInput } from "@/domains/invitation";
import { getAuthToken } from "@/domains/auth";
import { createInvitation } from "@/domains/invitation";
import { CloudinaryUploadResponse, GalleryEntry } from "@/shared/types";
import { validateAndFlatten, WeddingInfoSchema } from "@/shared/lib/validation";
import { redirect } from "next/navigation";

interface Payload {
  thumbnails: CloudinaryUploadResponse[];
  galleries: {
    id: string;
    type: "A" | "B" | "C" | "D" | "E";
    images: CloudinaryUploadResponse[];
  }[];
  textField: Record<string, string>;
}

export const postInvitationInfo = async (
  prev: unknown,
  payload: { data: Payload },
) => {
  try {
    const token = await getAuthToken();
    const result = await decrypt({ token, type: 'REFRESH' });
    const userId = result.payload?.userId;
    const { thumbnails, galleries, textField } = payload.data;

    const textValidation = validateAndFlatten(WeddingInfoSchema, textField);

    if (!textValidation.success) {
      return {
        success: false,
        error: textValidation.error,
      };
    }

    const thumbnailEntries: string[] = thumbnails.map((img) =>
      cloudinary.url(img.public_id, {
        version: img.version,
        format: img.format,
        secure: true,
      }),
    );

    const galleryEntries: GalleryEntry[] = galleries.map((gallery) => ({
      id: gallery.id,
      type: gallery.type,
      images: gallery.images.map((img) =>
        cloudinary.url(img.public_id, {
          version: img.version,
          format: img.format,
          secure: true,
        }),
      ),
    }));

    const saveData = {
      ...textValidation.data,
      thumbnails: thumbnailEntries,
      galleries: galleryEntries,
    } as InvitationInput;

    await createInvitation({ id: userId, data: saveData });

    return {
      success: true,
      message: "초대장이 성공적으로 생성되었습니다.",
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    console.error(message);
    redirect("/auth/login");
  }
};
