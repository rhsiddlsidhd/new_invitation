"use client";
"use client";

import { updateInvitationInfo } from "@/actions/invitation";
import WeddingGallery from "@/components/molecules/WeddingGallery";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import React, { useActionState, useEffect } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const WeddingGalleryForm = () => {
  const [state, action, pending] = useActionState(updateInvitationInfo, null);
  const { setErrors, clearErrors, setUser } = useUserStore();
  const { setModalOpen } = useModalStore();
  useEffect(() => {
    if (!state) return;
    if (state.error) {
      setErrors(state.error);
    } else {
      alert(state.message);
      setUser({ ...state.data });
      setModalOpen({ isOpen: false });
      clearErrors();
    }
  }, [state, setErrors, clearErrors, setModalOpen, setUser]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 클라이언트 > cloudinary 외부 스토리지로 Img 바로 저장
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const galleries = new Map<
      string,
      { type: string; urls: (File | string)[] }
    >();

    for (const [keys, value] of formData.entries()) {
      const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+?)(-type)?$/);
      if (!typeMatch) continue;
      const id = typeMatch && typeMatch[1];
      const isType = Boolean(typeMatch[2]);

      if (!galleries.has(id)) galleries.set(id, { type: "", urls: [] });

      const gallery = galleries.get(id);

      if (!gallery) continue;
      if (!isType && value instanceof File) {
        gallery.urls.push(value);
      } else {
        gallery.type = value as string;
      }
    }

    for (const [id, gallery] of galleries) {
      const uploadUrls: string[] = await Promise.all(
        gallery.urls.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", `${UPLOAD_PRESET}`);
          formData.append("folder", "galleryImg");
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData },
          );
          const { url } = await res.json();
          return url;
        }),
      );
      const isGallery = galleries.get(id);
      if (isGallery) {
        gallery.urls = uploadUrls;
      }
    }

    await action(new FormData(galleries));
  };

  return (
    <form onSubmit={handleSubmit}>
      <WeddingGallery readOnly={false} />
    </form>
  );
};

export default WeddingGalleryForm;
