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

const PREVIEW_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;
if (!PREVIEW_ID) throw new Error("PREVIEW_ID is not define");

const getErrorMessageFromState = (
  state: APIResponse<{ message: string }>,
): string => {
  let errorMessage = "";

  if (
    state &&
    state.success === false &&
    state.error &&
    "errors" in state.error
  ) {
    errorMessage = state.error.errors["password"][0];
  } else if (
    state &&
    state.success === false &&
    state.error &&
    "message" in state.error
  ) {
    errorMessage = state.error.message;
  }

  return errorMessage;
};

const DeleteGuestbookForm = ({ payload }: { payload: string }) => {
  const params = useParams();

  const [state, action, pending] = useActionState<
    APIResponse<{ message: string }>,
    FormData
  >(deleteGuestbookAction, null);

  useEffect(() => {
    if (state && state.success) {
      alert(state.data.message);
    }
  }, [state]);

  const errorMessage = getErrorMessageFromState(state);

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
        {errorMessage && <Alert type="error">{errorMessage}</Alert>}
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
  );
};

export default DeleteGuestbookForm;
