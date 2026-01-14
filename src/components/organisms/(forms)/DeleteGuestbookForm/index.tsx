"use client";

import { deleteGuestbookAction } from "@/actions/deleteGuestBookAction";
import Alert from "@/components/atoms/Alert/Alert";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/Dialog/Dialog";

import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import { APIResponse } from "@/types/error";

import { useParams } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { getFieldError, hasFieldErrors } from "@/utils/error";
import { toast } from "sonner";

const PREVIEW_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;
if (!PREVIEW_ID) throw new Error("PREVIEW_ID is not define");

const DeleteGuestbookForm = ({ payload }: { payload: string }) => {
  const params = useParams();

  const [state, action, pending] = useActionState<
    APIResponse<{ message: string }>,
    FormData
  >(deleteGuestbookAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success === true) {
      alert(state.data.message);
    } else {
      if (!hasFieldErrors(state.error)) {
        toast.error(state.error.message);
      }
    }
  }, [state]);

  const passwordError = getFieldError(state, "password");

  return (
    <form action={action} className="space-y-4">
      <DialogHeader>
        <input name={"guestbookId"} defaultValue={payload} hidden />
        <input name={"coupleInfoId"} defaultValue={PREVIEW_ID} hidden />
        <input name={"productId"} defaultValue={params.id} hidden />
        <DialogTitle>비밀번호 확인</DialogTitle>

        <DialogDescription>
          계속 진행하려면 비밀번호를 입력해주세요.
        </DialogDescription>
      </DialogHeader>

      <LabeledInput id="password" name="password" type="password">
        비밀번호
      </LabeledInput>
      {passwordError && <Alert type="error">{passwordError}</Alert>}

      <DialogFooter>
        <DialogClose asChild>
          <Btn type="button" variant="secondary">
            취소
          </Btn>
        </DialogClose>
        <Btn type="submit">{pending ? "삭제 중..." : "전송"}</Btn>
      </DialogFooter>
    </form>
  );
};

export default DeleteGuestbookForm;
