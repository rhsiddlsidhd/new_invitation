"use client";
"use client";

import { updateInvitationInfo } from "@/actions/invitation";
import WeddingGallery from "@/components/molecules/WeddingGallery";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import React, { useActionState, useEffect } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

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
    const galleries = new Map<string, { type: string; urls: File[] }>();

    for (const [keys, value] of formData.entries()) {
      if (typeof value === "string") {
        const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+)-type$/);
        const id = typeMatch && typeMatch[1];
        if (id) {
          const gallery = galleries.has(id)
            ? galleries.get(id)
            : galleries.set(id, { type: "", urls: [] }).get(id);
          gallery!.type = value;
        }
      } else {
        const typeMatch = keys.match(/^gallery-([a-zA-Z0-9-]+)/);
        const id = typeMatch && typeMatch[1];
        if (id) {
          const gallery = galleries.get(id);
          console.log("value.name", value.name, value);
          const res = await fetch(
            `https://api.cloudinary.com/v2/${CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: value,
            },
          );
          console.log("res===============>:", res);
        }
      }
    }

    /**
     * galleries = {
     *   id: string;
     *   type:string;
     *   urls: [...url,url];
     * }[]
     */
  };

  return (
    <form onSubmit={handleSubmit}>
      <WeddingGallery readOnly={false} />
    </form>
  );
};

export default WeddingGalleryForm;
