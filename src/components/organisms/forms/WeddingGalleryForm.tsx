import { updateInvitationInfo } from "@/actions/invitation";
import WeddingGallery from "@/components/molecules/WeddingGallery";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import React, { useActionState, useEffect } from "react";

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
  return (
    <form action={action}>
      <WeddingGallery readOnly={false} />
    </form>
  );
};

export default WeddingGalleryForm;
