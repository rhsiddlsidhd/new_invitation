import { patchText } from "@/domains/invitation";
import WeddingCoupleInfoPanel from "@/components/organisms/panel/WeddingCoupleInfoPanel";
import { useModalStore } from "@/shared/store";
import {
  useClearUserErrors,
  useSetUser,
  useSetUserErrors,
} from "@/domains/user";
import React, { useActionState, useEffect } from "react";

const WeddingPartyInfoForm = () => {
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
      <WeddingCoupleInfoPanel readOnly={false} />
    </form>
  );
};

export default WeddingPartyInfoForm;
