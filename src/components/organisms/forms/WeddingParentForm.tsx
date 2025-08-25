import { patchText } from "@/actions/invitation/patchText";
import WeddingParentInfo from "@/components/molecules/WeddingParentInfo";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import React, { useActionState, useEffect } from "react";

const WeddingParentForm = () => {
  const [state, action, pending] = useActionState(patchText, null);
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
      <WeddingParentInfo readOnly={false} />
    </form>
  );
};

export default WeddingParentForm;
