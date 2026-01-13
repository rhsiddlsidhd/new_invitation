"use client";
import { patchText } from "@/__domains/invitation";
import WeddingParentInfoPanel from "@/components/organisms/panel/WeddingParnetInfoPanel";
import { useModalStore } from "@/shared/store";
import {
  useClearUserErrors,
  useSetUser,
  useSetUserErrors,
} from "@/__domains/user";
import React, { useActionState, useEffect } from "react";

const WeddingParentForm = () => {
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
      <WeddingParentInfoPanel readOnly={false} />
    </form>
  );
};

export default WeddingParentForm;
