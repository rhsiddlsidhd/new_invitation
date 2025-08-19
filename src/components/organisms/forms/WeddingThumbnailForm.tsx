import { updateInvitationInfo } from "@/actions/invitation";
import WeddingThumbnail from "@/components/molecules/WeddingThumbnail";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import React, { useActionState, useEffect } from "react";

const WeddingThumbnailForm = () => {
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
      setModalOpen(false);
      clearErrors();
    }
  }, [state, setErrors, clearErrors, setModalOpen, setUser]);
  return (
    <form action={action}>
      <WeddingThumbnail readOnly={false} />
    </form>
  );
};

export default WeddingThumbnailForm;
