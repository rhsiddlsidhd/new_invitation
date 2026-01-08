"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { IGuestbook } from "@/models/guestbook.model";
import { useGuestbookModalStore } from "@/store/guestbook.modal.store";
import { BookOpen, PenLine } from "lucide-react";
import React from "react";

const GuestBookAction = ({ id, data }: { id: string; data: IGuestbook[] }) => {
  const setIsOpen = useGuestbookModalStore((state) => state.setIsOpen);

  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <BookOpen className="text-primary mx-auto mb-4 h-8 w-8" />
          <h2 className="text-foreground mb-3 font-serif text-3xl">방명록</h2>
          <p className="text-muted-foreground text-sm">
            소중한 분들의 축하 메시지를 남겨주세요
          </p>
        </div>

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
            className="w-full sm:w-auto gap-2 px-8 py-6"
          >
            <PenLine className="h-5 w-5" />
            <span className="font-semibold">방명록 작성하기</span>
          </Btn>
          <Btn
            variant="outline"
            onClick={() =>
              setIsOpen({ isOpen: true, type: "VIEW_GUESTBOOK", payload: data })
            }
            className="w-full sm:w-auto gap-2 px-8 py-6"
          >
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">방명록 전체보기 ({data.length})</span>
          </Btn>
        </div>
      </div>
    </section>
  );
};

export default GuestBookAction;
