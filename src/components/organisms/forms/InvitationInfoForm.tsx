"use client";
import React, { startTransition, useActionState, useEffect } from "react";
import WeddingPartyInfo from "../../molecules/WeddingPartyInfo";
import WeddingInfo from "../../molecules/WeddingInfo";
import WeddingParentInfo from "../../molecules/WeddingParentInfo";
import WeddingThumbnail from "../../molecules/WeddingThumbnail";
import WeddingGallery from "../../molecules/WeddingGallery";
import Btn from "../../atoms/Btn";
import { useRouter } from "next/navigation";
import { InvitationInput } from "@/models/invitationSchema";
import { useUserStore } from "@/store/userStore";
import { postInvitationInfo } from "@/actions/invitation/postInvitation";
import { CloudinaryUploadResponse, GalleryMapClient } from "@/types";
import { validateAndFlatten } from "@/utils/validation";
import {
  GalleryMapSchema,
  ThumbnailSchema,
} from "@/utils/validation/schema.client";
import { parseInvitationForm } from "@/utils/transform";
import {
  uploadGalleries,
  uploadThumbnails,
  uploadToCloudinary,
} from "@/services/cloudinaryServices";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const InvitationInfoContent = ({ readOnly }: { readOnly: boolean }) => {
  return (
    <div>
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
  const [state, action] = useActionState(postInvitationInfo, null);
  const { setUser, clearUser, setErrors, clearErrors } = useUserStore();

  const router = useRouter();
  useEffect(() => {
    if (state && !state.success && "error" in state && state.error) {
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

    const formData = new FormData(e.currentTarget);
    const { textField, thumbnailField, galleryField } =
      parseInvitationForm(formData);

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

    if (!galleryValidation.success) {
      setErrors(galleryValidation.error);
      return;
    }

    const thumbnail = await uploadThumbnails(thumbnailValidation.data);
    const galleries = await uploadGalleries(galleryValidation.data);

    const payload = {
      textField,
      thumbnails: thumbnail,
      galleries,
    };

    startTransition(() => {
      action({ data: payload });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex max-w-[1028px] flex-col p-2 sm:mb-24"
    >
      <InvitationInfoContent readOnly={readOnly} />
      {!readOnly && (
        <Btn className="my-4 ml-auto w-1/4 bg-blue-300" type="submit">
          제출
        </Btn>
      )}
    </form>
  );
};

export default InvitationInfoForm;
