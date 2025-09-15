"use client";

import { patchGallery } from "@/actions/invitation/patchGallery";
import WeddingGalleryPanel from "@/components/organisms/panel/WeddingGalleryPanel";
import { useModalStore } from "@/store/modalStore";
import {
  useClearUserErrors,
  useSetUser,
  useSetUserErrors,
} from "@/store/userStore";

import { GalleryMapClient, GalleryPayload } from "@/types";
import { validateAndFlatten } from "@/utils/validation";
import { GalleryMapSchema } from "@/utils/validation/schema.client";

import React, { startTransition, useActionState, useEffect } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const WeddingGalleryForm = () => {
  const [state, action] = useActionState(patchGallery, null);
  const setErrors = useSetUserErrors();
  const setUser = useSetUser();
  const clearErrors = useClearUserErrors();

  const { setModalOpen } = useModalStore();
  useEffect(() => {
    if (!state) return;
    if (!state.success && state.error) {
      setErrors(state.error);
    } else {
      alert(state.message);
      setUser({ galleries: state.data });
      setModalOpen({ isOpen: false });
      clearErrors();
    }
  }, [state, setErrors, clearErrors, setModalOpen, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const galleries: GalleryMapClient = new Map();
      const payload: GalleryPayload[] = [];

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
            if (!res.ok) throw new Error("이미지 업로드에 실패했습니다.");
            const data = await res.json();

            return data;
          }),
        );

        payload.push({
          id,
          type: gallery.type,
          images: uploadImages,
        });
      }

      startTransition(() => {
        action({ data: payload });
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
      console.error(message);
    }
    // 클라이언트 > cloudinary 외부 스토리지로 Img 바로 저장
  };

  return (
    <form onSubmit={handleSubmit}>
      <WeddingGalleryPanel readOnly={false} />
    </form>
  );
};

export default WeddingGalleryForm;
