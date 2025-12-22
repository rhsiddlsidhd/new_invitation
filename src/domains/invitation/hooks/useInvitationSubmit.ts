"use client";
import { useActionState, useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { postInvitationInfo } from "@/domains/invitation";
import {
  validateAndFlatten,
  GalleryMapSchema,
  ThumbnailSchema,
} from "@/lib/validation";
import { parseInvitationForm } from "@/shared/utils/transform";

import { InvitationInput } from "@/domains/invitation";
import { uploadGalleries, uploadThumbnails } from "@/lib/cloudinary";
import {
  useClearUser,
  useClearUserErrors,
  useSetUser,
  useSetUserErrors,
} from "@/domains/user";

export const useInvitationSubmit = (data?: InvitationInput) => {
  const [state, action] = useActionState(postInvitationInfo, null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const clearErrors = useClearUserErrors();
  const clearUser = useClearUser();
  const setUser = useSetUser();
  const setErrors = useSetUserErrors();
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

    try {
      setIsUploading(true);
      const formData = new FormData(e.currentTarget);
      const { textField, thumbnailField, galleryField } =
        parseInvitationForm(formData);

      const galleryValidation = validateAndFlatten(
        GalleryMapSchema,
        galleryField,
      );
      if (!galleryValidation.success) {
        setErrors(galleryValidation.error);
        setIsUploading(false);
        return;
      }

      const thumbnailValidation = validateAndFlatten(
        ThumbnailSchema,
        thumbnailField,
      );
      if (!thumbnailValidation.success) {
        setErrors(thumbnailValidation.error);
        setIsUploading(false);
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
        setIsUploading(false);
      });
    } catch (error) {
      console.error("Submission error:", error);
      setIsUploading(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting: isPending || isUploading,
  };
};
