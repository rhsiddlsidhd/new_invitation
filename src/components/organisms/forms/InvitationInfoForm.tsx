"use client";
import React, { startTransition, useActionState, useEffect } from "react";
import WeddingPartyInfo from "../../molecules/WeddingPartyInfo";
import WeddingInfo from "../../molecules/WeddingInfo";
import WeddingParentInfo from "../../molecules/WeddingParentInfo";
import WeddingThumbnail from "../../molecules/WeddingThumbnail";
import WeddingGallery from "../../molecules/WeddingGallery";
import Btn from "../../atoms/Btn";
import { useRouter } from "next/navigation";
import { InvitationInput } from "@/models/invitationSchma";
import { useUserStore } from "@/store/userStore";
import { postInvitationInfo } from "@/actions/invitation/postInvitation";
import { CloudinaryUploadResponse, GalleryMapClient } from "@/types";
import { validateAndFlatten } from "@/utils/validation";
import {
  GalleryMapSchema,
  ThumbnailSchema,
} from "@/utils/validation/schema.client";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const InvitationInfoContent = ({ readOnly }: { readOnly: boolean }) => {
  return (
    <div className="w-full rounded-xl border border-[#ddd] bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">청첩장 정보</h3>
      <div className="flex flex-col gap-4">
        {/* Groom && Bride Info */}
        <WeddingPartyInfo readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* Wedding Info */}
        <WeddingInfo readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 부모 정보 */}
        <WeddingParentInfo readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 썸네일 (최대 2장) */}
        <WeddingThumbnail readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 갤러리 Preview */}
        <WeddingGallery readOnly={readOnly} />
      </div>
    </div>
  );
};

const InvitationInfoForm = ({
  readOnly,
  data,
}: {
  readOnly: boolean;
  data?: InvitationInput;
}) => {
  const [state, action, pending] = useActionState(postInvitationInfo, null);
  const { setUser, clearUser, setErrors, clearErrors } = useUserStore();

  const router = useRouter();
  useEffect(() => {
    if (state && !state.success && "error" in state && state.error) {
      // 여기서만 state.error 사용 가능
      setErrors(state.error);
    } else if (state && state.success) {
      alert(state.message);
      clearErrors();
      router.push("/dashboard");
    }
  }, [state, router, setErrors, clearErrors]);

  useEffect(() => {
    if (data) {
      setUser({ ...data, isUser: true });
    } else {
      clearUser();
      setUser({ isUser: false });
    }
  }, [data, setUser, clearUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const textField: Record<string, string> = {};
    const thumbnailField: File[] = [];
    const galleryField: GalleryMapClient = new Map();
    const form = e.currentTarget;
    const formData = new FormData(form);

    for (const [keys, value] of formData.entries()) {
      if (value instanceof File) {
        if (keys === "thumbnail") {
          thumbnailField.push(value);
        } else {
          const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+?)(-type)?$/);
          if (!typeMatch) continue;

          const id = typeMatch && typeMatch[1];
          if (!galleryField.has(id))
            galleryField.set(id, { type: "A", images: [] });

          const gallery = galleryField.get(id);

          gallery?.images.push(value);
        }
      } else {
        const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+?)(-type)?$/);
        if (!typeMatch) {
          textField[keys] = value;
          continue;
        }
        const id = typeMatch && typeMatch[1];
        const isType = Boolean(typeMatch && typeMatch[2]);

        if (!galleryField.has(id))
          galleryField.set(id, { type: "A", images: [] });

        const gallery = galleryField.get(id);

        if (isType && gallery) {
          gallery.type = value as "A" | "B" | "C" | "D" | "E";
        }
      }
    }
    const galleryValidation = validateAndFlatten(
      GalleryMapSchema,
      galleryField,
    );
    const thumbnailValidation = validateAndFlatten(
      ThumbnailSchema,
      thumbnailField,
    );

    if (!thumbnailValidation.success) {
      setErrors(thumbnailValidation.error);
      return;
    }

    console.log("galleryValidation", galleryValidation);

    if (!galleryValidation.success) {
      setErrors(galleryValidation.error);
      return;
    }

    const thumbnail: CloudinaryUploadResponse[] = await Promise.all(
      thumbnailValidation.data.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", `${UPLOAD_PRESET}`);
        formData.append("folder", "thumbnail");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        return data;
      }),
    );

    const galleries = [];

    for (const [id, gallery] of galleryValidation.data) {
      const uploadImages = await Promise.all(
        gallery.images.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file as File);
          formData.append("upload_preset", `${UPLOAD_PRESET}`);
          formData.append("folder", "galleryImg");
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData },
          );

          const data = await res.json();

          return data;
        }),
      );

      galleries.push({
        id,
        type: gallery.type,
        images: uploadImages,
      });
    }

    const payload = {
      textField,
      thumbnails: thumbnail,
      galleries,
    };

    console.log("payload", payload);

    startTransition(() => {
      action({ data: payload });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto mt-4 flex max-w-[1028px] flex-col sm:mb-24"
    >
      <InvitationInfoContent readOnly={readOnly} />
      {!readOnly && (
        <div className="ml-auto w-1/4">
          <Btn className="my-4 w-full bg-blue-300" type="submit">
            제출
          </Btn>
        </div>
      )}
    </form>
  );
};

export default InvitationInfoForm;
