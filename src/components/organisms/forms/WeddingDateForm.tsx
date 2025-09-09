import { patchText } from "@/actions/invitation/patchText";
import WeddingLocationInfoPanel from "@/components/organisms/panel/WeddingLocationInfoPanel";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import React, { useActionState, useEffect } from "react";

const WeddingDateForm = () => {
  const [state, action] = useActionState(patchText, null);
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
      <WeddingLocationInfoPanel readOnly={false} />
    </form>
  );
};

export default WeddingDateForm;
