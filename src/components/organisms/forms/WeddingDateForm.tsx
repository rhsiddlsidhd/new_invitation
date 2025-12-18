import { patchText } from "@/domains/invitation";
import WeddingLocationInfoPanel from "@/components/organisms/panel/WeddingLocationInfoPanel";
import { useModalStore } from "@/shared/store";
import {
  useClearUserErrors,
  useSetUser,
  useSetUserErrors,
} from "@/domains/user";
import React, { useActionState, useEffect } from "react";

const WeddingDateForm = () => {
  const [state, action] = useActionState(patchText, null);
  const setErrors = useSetUserErrors();
  const setUser = useSetUser();
  const clearErrors = useClearUserErrors();
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
