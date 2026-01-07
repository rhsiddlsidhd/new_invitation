"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { IGuestbook } from "@/models/guestbook.model";
import { useGuestbookModalStore } from "@/store/guestbook.modal.store";
import React from "react";

const GuestBookAction = ({ id, data }: { id: string; data: IGuestbook[] }) => {
  const setIsOpen = useGuestbookModalStore((state) => state.setIsOpen);

  return (
    <div>
      <Btn
        className="m-auto w-fit px-6 py-2 text-sm font-semibold shadow-2xl"
        onClick={() => {
          console.log("오픈더도어");
          setIsOpen({ isOpen: true, type: "WRITE_GUESTBOOK", payload: { id } });
        }}
      >
        방명록 작성하기
      </Btn>
      <Btn
        className="m-auto w-fit px-6 py-2 text-sm font-semibold shadow-2xl"
        onClick={() =>
          setIsOpen({ isOpen: true, type: "VIEW_GUESTBOOK", payload: data })
        }
      >
        방명록 전체보기
      </Btn>
    </div>
  );
};

export default GuestBookAction;
