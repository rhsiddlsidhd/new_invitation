import Btn from "@/components/atoms/Btn";
import React, { useActionState } from "react";

import Input from "@/components/atoms/Input";
import { postGuestbook } from "@/actions/guestbook/postGuestbook";
import { useModalStore } from "@/store/modalStore";
const GuestBookForm = () => {
  const [state, action, pending] = useActionState(postGuestbook, null);
  const { payload } = useModalStore();
  useEffect(()=>{
    console.log(payload)
  },[])
  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="owner" />
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
        축하 글 전달하기
      </Btn>
    </form>
  );
};

export default GuestBookForm;
