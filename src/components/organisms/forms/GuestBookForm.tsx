import Btn from "@/components/atoms/Btn";
import React, { useActionState, useEffect } from "react";

import Input from "@/components/atoms/Input/Input";
import { postGuestbook } from "@/domains/guestbook";
import { useModalStore } from "@/shared/store";
import { useRouter } from "next/navigation";

interface Payload {
  userId: string;
}

const isPayload = (payload: unknown): payload is Payload => {
  if (!payload) return false;
  if (
    typeof payload === "object" &&
    "userId" in payload &&
    typeof payload.userId === "string"
  )
    return true;
  return false;
};

const GuestBookForm = () => {
  const [state, action, pending] = useActionState(postGuestbook, null);
  const { payload, setModalOpen } = useModalStore();
  const router = useRouter();

  useEffect(() => {
    if (state && !state.success && state.error) {
      alert("잠시 후에 다시 시도해주세요.");
      setModalOpen({ isOpen: false });
    } else if (state && state.success && state.message) {
      alert(state.message);
      setModalOpen({ isOpen: false });
      router.refresh();
    }
  }, [state, setModalOpen, router]);

  return (
    <form action={action} className="flex flex-col gap-2">
      {isPayload(payload) && (
        <input type="hidden" name="userId" value={payload.userId} />
      )}
      <Input
        type="text"
        autoComplete="username"
        name="name"
        placeholder="이름을 입력하세요"
        required
      />

      <Input
        type="password"
        autoComplete="current-password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        required
      />

      <textarea
        name="message"
        placeholder="메시지를 입력하세요"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      <Btn
        bgColor="bg-[#f0f0f0]"
        textColor="text-black"
        type="submit"
        className="w-full font-bold"
      >
        {pending ? "전송 중..." : "축하 글 전달하기"}
      </Btn>
    </form>
  );
};

export default GuestBookForm;
