"use client";
import { useActionState, useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { postInvitationInfo } from "@/actions/invitation/postInvitation";
import { useUserStore } from "@/store/userStore";
import { validateAndFlatten } from "@/utils/validation";
import {
  GalleryMapSchema,
  ThumbnailSchema,
} from "@/utils/validation/schema.client";
import { parseInvitationForm } from "@/utils/transform";
import {
  uploadThumbnails,
  uploadGalleries,
} from "@/services/cloudinaryServices";
import { InvitationInput } from "@/models/invitationSchema";

export const useInvitationSubmit = (data?: InvitationInput) => {
  const [state, action] = useActionState(postInvitationInfo, null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
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
