"use client";
import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/atoms/Input/Input";
import { Btn } from "@/components/atoms/Btn/Btn";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import { postGuestbook } from "@/domains/guestbook/actions";
import LabeledSwitch from "@/components/molecules/(input-group)/LabeledSwitch";
import { createGuestbook } from "@/actions/createGuestbook";
import { useGuestbookModalStore } from "@/store/guestbook.modal.store";

interface Payload {
  id: string;
}

const isPayload = (payload: unknown): payload is Payload => {
  if (!payload) return false;
  if (
    typeof payload === "object" &&
    "id" in payload &&
    typeof payload.id === "string"
  )
    return true;
  return false;
};

const GuestbookForm = ({ payload }: { payload: unknown }) => {
  const [state, action, pending] = useActionState(createGuestbook, null);
  const closeModal = useGuestbookModalStore((state) => state.closeModal);
  const router = useRouter();
  const id = isPayload(payload) ? payload.id : null;
  if (!id) throw new Error("GuestBookForm payload is required");

  useEffect(() => {
    if (state && !state.success && state.error) {
      alert("잠시 후에 다시 시도해주세요.");
    } else if (state && state.success) {
      alert(state.data.message);
      closeModal();

      router.refresh();
    }
  }, [state, router, closeModal]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="coupleInfoId" value={id} />

      <LabeledInput
        name="author"
        placeholder="이름을 입력하세요"
        id="author"
        type="text"
        required
      >
        이름
      </LabeledInput>

      <LabeledInput
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호를 입력하세요."
      >
        비밀번호
      </LabeledInput>

      <textarea
        name="message"
        placeholder="메시지를 입력하세요"
        className="w-full rounded-lg border border-gray-300 p-2"
      />

      <LabeledSwitch id="isPrivate" name="isPrivate">
        비밀글
      </LabeledSwitch>
      <Btn>{pending ? "전송 중..." : "축하 글 전달하기"}</Btn>
    </form>
  );
};

export default GuestbookForm;
