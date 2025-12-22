"use server";

import { cloudinary } from "@/lib/cloudinary/config";
import { decrypt } from "@/lib/jose";
import { InvitationInput } from "@/models/invitationSchema";
import { getAuthToken } from "@/lib/token";
import { createInvitation } from "@/services/invitation";
import { CloudinaryUploadResponse, GalleryEntry } from "@/shared/types";
import { validateAndFlatten } from "@/utils/validation";
import { WeddingInfoSchema } from "@/utils/validation/schema.server";
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
    const { userId } = await decrypt(token);
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
