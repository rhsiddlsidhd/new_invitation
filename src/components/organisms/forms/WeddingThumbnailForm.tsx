import { patchThumbnail } from "@/actions/invitation/patchThumbnail";
import WeddingThumbnail from "@/components/molecules/WeddingThumbnail";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import { validateAndFlatten } from "@/utils/validation";
import { ThumbnailSchema } from "@/utils/validation/schema.client";
import React, { startTransition, useActionState, useEffect } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const WeddingThumbnailForm = () => {
  // const [state, action, pending] = useActionState(updateInvitationInfo, null);
  const [state, action] = useActionState(patchThumbnail, null);
  const { setErrors, clearErrors, setUser } = useUserStore();
  const { setModalOpen } = useModalStore();
  useEffect(() => {
    if (!state) return;
    console.log(state);
    if (!state.success && state.error) {
      setErrors(state.error);
    } else {
      alert(state.message);
      setUser({ thumbnails: state.data });
      setModalOpen({ isOpen: false });
      clearErrors();
    }
  }, [state, setErrors, clearErrors, setModalOpen, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const thumbnailFiles = formData
      .getAll("thumbnail")
      .filter((f): f is File => f instanceof File);

    const validation = validateAndFlatten(ThumbnailSchema, thumbnailFiles);
    console.log("validation", validation);
    if (!validation.success) {
      setErrors(validation.error);
      return;
    }

    // validation을 통과한 데이터는 cloudinary로 저장
    // console.log(validation);
    const thumbnails = await Promise.all(
      validation.data.map(async (file) => {
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

    startTransition(() => {
      action({ data: thumbnails });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <WeddingThumbnail readOnly={false} />
    </form>
  );
};

export default WeddingThumbnailForm;
