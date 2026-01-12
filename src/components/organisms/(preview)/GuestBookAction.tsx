"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import SectionBody from "@/components/molecules/(preview)/SectionBody";
import { IGuestbook } from "@/models/guestbook.model";
import { useGuestbookModalStore } from "@/store/guestbook.modal.store";
import { BookOpen, PenLine } from "lucide-react";
import React from "react";

const GuestBookAction = ({ id, data }: { id: string; data: IGuestbook[] }) => {
  const setIsOpen = useGuestbookModalStore((state) => state.setIsOpen);

  return (
    <SectionBody title="GUESTBOOK" subTitle="방명록">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Btn
          variant="default"
          onClick={() => {
            setIsOpen({
              isOpen: true,
              type: "WRITE_GUESTBOOK",
              payload: { id },
            });
          }}
          className="w-full gap-2 px-8 py-6 sm:w-auto"
        >
          <PenLine className="h-5 w-5" />
          <span className="font-semibold">방명록 작성하기</span>
        </Btn>
        <Btn
          variant="outline"
          onClick={() =>
            setIsOpen({ isOpen: true, type: "VIEW_GUESTBOOK", payload: data })
          }
          className="w-full gap-2 px-8 py-6 sm:w-auto"
        >
          <BookOpen className="h-5 w-5" />
          <span className="font-semibold">방명록 전체보기 ({data.length})</span>
        </Btn>
      </div>
    </SectionBody>
  );
};

export default GuestBookAction;
