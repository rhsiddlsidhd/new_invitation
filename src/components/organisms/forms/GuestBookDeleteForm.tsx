import React, { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Btn from "@/components/atoms/Btn";
import { deleteGuestBook } from "@/domains/guestbook";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/shared/store";

const GuestBookDeleteForm = ({
  isDelete,
  id,
  onCancel,
}: {
  isDelete: Record<string, boolean>;
  id: string;
  onCancel: () => void;
}) => {
  const [state, action, pending] = useActionState(deleteGuestBook, null);
  const router = useRouter();
  const { setModalOpen } = useModalStore();
  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      alert(state.error);
    } else {
      alert(state.message);
      setModalOpen({ isOpen: false });
      router.refresh();
    }
  }, [state, router, setModalOpen]);

  return (
    <motion.form
      initial={{ opacity: 0, y: -10, pointerEvents: "none" }}
      animate={{
        opacity: !isDelete[id] ? 0 : 1,
        y: !isDelete[id] ? -10 : 0,
        pointerEvents: !isDelete[id] ? "none" : "auto",
      }}
      className="absolute inset-0 flex h-full items-center justify-between gap-1 rounded-md p-2 text-xs"
      action={action}
    >
      <input
        type="text"
        name="username"
        autoComplete="username"
        style={{ display: "none" }}
        disabled
      />
      <Input type="password" name="password" autoComplete="new-password" />
      <input type="hidden" name="id" value={id} />
      <div className="flex gap-2">
        <Btn type="submit" className="h-fit">
          {pending ? "확인 중..." : "확인"}
        </Btn>
        <Btn type="button" className="h-fit" onClick={onCancel}>
          취소
        </Btn>
      </div>
    </motion.form>
  );
};

export default GuestBookDeleteForm;
