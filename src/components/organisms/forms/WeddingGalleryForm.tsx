"use client";

import { patchGallery } from "@/actions/invitation/patchGallery";
import WeddingGallery from "@/components/molecules/WeddingGallery";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import {
  CloudinaryUploadResponse,
  GalleryMapClient,
  GalleryMapServer,
} from "@/types";
import { validateAndFlatten } from "@/utils/validation";
import { GalleryMapSchema } from "@/utils/validation/schema.client";

import React, { startTransition, useActionState, useEffect } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const WeddingGalleryForm = () => {
  // const [state, action, pending] = useActionState(updateInvitationInfo, null);
  const [state, action, pending] = useActionState(patchGallery, null);
  const { setErrors, clearErrors, setUser } = useUserStore();
  const { setModalOpen } = useModalStore();
  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      setErrors(state.error);
    } else {
      alert(state.message);
      setUser({ galleries: state.data });
      setModalOpen({ isOpen: false });
      clearErrors();
    }
  }, [state, setErrors, clearErrors, setModalOpen, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 클라이언트 > cloudinary 외부 스토리지로 Img 바로 저장
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const galleries: GalleryMapClient = new Map();

    for (const [keys, value] of formData.entries()) {
      const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+?)(-type)?$/);
      if (!typeMatch) continue;
      const id = typeMatch && typeMatch[1];
      const isType = Boolean(typeMatch[2]);

      if (!galleries.has(id)) galleries.set(id, { type: "A", images: [] });

      const gallery = galleries.get(id);

      if (!gallery) continue;
      if (!isType && value instanceof File) {
        gallery.images.push(value);
      } else {
        gallery.type = value as "A" | "B" | "C" | "D" | "E";
      }
    }

    const galleryValidation = validateAndFlatten(GalleryMapSchema, galleries);

    if (!galleryValidation.success) {
      setErrors(galleryValidation.error);
      return;
    }

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
      const isGallery = galleryValidation.data.get(id);
      if (isGallery) {
        gallery.images = uploadImages;
      }
    }

    const serverMap: GalleryMapServer = new Map();

    galleries.forEach((item, key) => {
      const imagesOnly = item.images.filter(
        (v): v is CloudinaryUploadResponse => typeof v === "object",
      );
      serverMap.set(key, { type: item.type, images: imagesOnly });
    });

    startTransition(() => {
      action({ data: serverMap });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <WeddingGallery readOnly={false} />
    </form>
  );
};

export default WeddingGalleryForm;
