import Btn from "@/components/atoms/Btn";
import React from "react";

import Input from "@/components/atoms/Input";

const GuestBookForm = () => {
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
      }}
      className="flex flex-col gap-2"
    >
      <Input
        type="text"
        autoComplete="username"
        name="guestName"
        placeholder="이름을 입력하세요"
        required
      />

      <Input
        type="password"
        autoComplete="current-password"
        name="guestPassword"
        placeholder="비밀번호를 입력하세요"
        required
      />

      <textarea
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
