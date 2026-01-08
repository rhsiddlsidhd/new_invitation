"use client";

import { deleteGuestbookAction } from "@/actions/deleteGuestBookAction";
import Alert from "@/components/atoms/Alert/Alert";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/Dialog/Dialog";

import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import { useGuestbookModalStore } from "@/store/guestbook.modal.store";

import { X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";

const PREVIEW_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;
if (!PREVIEW_ID) throw new Error("PREVIEW_ID is not define");

const ActionConfirmationDialog = ({ id }: { id: string }) => {
  const params = useParams();
  const closeModal = useGuestbookModalStore((state) => state.closeModal);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, action, pending] = useActionState(deleteGuestbookAction, null);
  useEffect(() => {
    if (state && state.success) {
      alert(state.data.message);
      setIsOpen(false);
      closeModal();
    } else if (state && state.error) {
      console.error(state.error);
    }
  }, [state, closeModal]);

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* 이 X 버튼이 트리거가 됩니다. */}
        <X className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action} className="space-y-4">
          <DialogHeader>
            <input name={"guestbookId"} defaultValue={id} hidden />
            <input name={"coupleInfoId"} defaultValue={PREVIEW_ID} hidden />
            <input name={"productId"} defaultValue={params.id} hidden />
            <DialogTitle>비밀번호 확인 </DialogTitle>

            <DialogDescription>
              계속 진행하려면 비밀번호를 입력해주세요.
            </DialogDescription>
            {state && !state.success && state.error && (
              <Alert type="error">{state.error.message}</Alert>
            )}
          </DialogHeader>

          <LabeledInput id="password" name="password" type="password">
            비밀번호
          </LabeledInput>

          <DialogFooter>
            <DialogClose asChild>
              <Btn type="button" variant="secondary">
                취소
              </Btn>
            </DialogClose>
            <Btn type="submit">{pending ? "삭제 중..." : "전송"}</Btn>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ActionConfirmationDialog;
