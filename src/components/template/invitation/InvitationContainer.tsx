"use client";

import Btn from "@/components/atoms/Btn";
import DateDisplay from "@/components/atoms/Date";
import { CloseIcon, HeartIcon, PhoneIcon } from "@/components/atoms/Icon";
import Img from "@/components/atoms/Img";
import Overlay from "@/components/atoms/Overlay";
import MusicBtn from "@/components/molecules/btns/MusicBtn";
import Schedule from "@/components/molecules/wedding/Schedule";
import { InvitationInput } from "@/models/invitationSchma";
import { useModalStore } from "@/store/modalStore";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";

const InvitationContainer = ({ data }: { data: InvitationInput }) => {
  const {
    weddingDate,
    thumbnails,
    groomName,
    groomMotherName,
    brideName,
    groomFatherName,
    brideFatherName,
    brideMotherName,
    weddingAddress,
    weddingDetailAddress,
  } = data;
  const { setModalOpen } = useModalStore();

  const groomParent = [groomFatherName, groomMotherName];

  const brideParent = [brideFatherName, brideMotherName];

  return (
    <div className="m-auto w-full max-w-[432px] bg-white p-2">
      <div>
        <div className="flex justify-end">
          <MusicBtn />
        </div>

        <Schedule date={weddingDate} />

        <div className="relative aspect-[3/4] w-full border-2 border-black">
          <Img src={thumbnails[0]} />
        </div>

        <div className="flex justify-center py-4 text-lg tracking-widest">
          <span>{groomName}</span>ㆍ<span>{groomMotherName}</span>
        </div>

        <div className="text-center text-sm text-gray-500">
          <DateDisplay date={weddingDate} type="text" className="" />
          <DateDisplay date={weddingDate} type="weekdayKr" className="ml-2" />
          <div>{weddingDetailAddress}</div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        <div className="text-center text-xs font-bold tracking-widest text-gray-500">
          INVITATION
        </div>
        <div className="p-4 text-center text-xl font-semibold">
          소중한 분들을 초대합니다
        </div>
        <div className="m-auto max-w-5/6 text-center text-sm whitespace-pre-line text-gray-500">{`저희 두 사람의의 작은 만남이 
        사랑의 결실을 이루어
        소중한 결혼식을 올리게 되었습니다.
        
        평생 서로 귀하게 여기며
        첫 마음 그대로 존중하고 배려하며 살겠습니다

        오로지 믿음과 사랑을 약속하는 날 오셔서 축복해 주시면 더없는 기쁨으로 간직하겠습니다.`}</div>
        <hr className="mx-auto my-6 w-1/5 opacity-20" />

        <div className="m-auto text-sm text-gray-500">
          <div>
            {groomParent.map((p, i) => {
              const isFirst = i === 0;
              return (
                <span key={i}>
                  {p ?? ""}
                  {isFirst && "ㆍ"}
                </span>
              );
            })}
            <span>의 아들 {groomName}</span>
          </div>
          <div>
            {brideParent.map((p, i) => {
              const isFirst = i === 0;
              return (
                <span key={i}>
                  {p ?? ""}
                  {isFirst && "ㆍ"}
                </span>
              );
            })}
            <span>의 딸 {brideName}</span>
          </div>
        </div>
        <div className="mx-auto my-6">
          <Btn
            bgColor="bg-gray-200"
            textColor="black"
            className="flex items-center gap-2 px-6 shadow-2xl"
            onClick={() =>
              setModalOpen({
                isOpen: true,
                type: "wedding-contact",
                config: { backgroundColor: "transparent" },
              })
            }
          >
            <PhoneIcon size={14} /> 연락하기
          </Btn>
          {/* <AnimatePresence>
            {isOpen && (
              <Overlay isOpen={isOpen} className="backdrop-blur-sm">
                <Btn onClick={() => setIsOpen(!isOpen)}>
                  <CloseIcon />
                </Btn>
              </Overlay>
            )}
          </AnimatePresence> */}
        </div>
      </div>
    </div>
  );
};

export default InvitationContainer;
