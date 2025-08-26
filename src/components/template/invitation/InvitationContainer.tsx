"use client";

import Btn from "@/components/atoms/Btn";
import DateDisplay from "@/components/atoms/Date";
import { PhoneIcon } from "@/components/atoms/Icon";
import Img from "@/components/atoms/Img";

import MusicBtn from "@/components/molecules/btns/MusicBtn";
import Calender from "@/components/molecules/wedding/Calender";
import DigitalWatch from "@/components/molecules/wedding/DigitalWatch";
import Gallery from "@/components/molecules/wedding/Gallery";
import KakaoMap from "@/components/molecules/wedding/KakaoMap";
import Schedule from "@/components/molecules/wedding/Schedule";
import GalleryCard from "@/components/organisms/GalleryCard";
import { InvitationInput } from "@/models/invitationSchma";
import { useModalStore } from "@/store/modalStore";

import React from "react";

type PhonePayloadId =
  | "groom"
  | "groomFather"
  | "groomMother"
  | "bride"
  | "brideFather"
  | "brideMother";
export interface PhonePayload {
  id: PhonePayloadId;
  role:
    | "신랑"
    | "신랑 아버지"
    | "신랑 어머니"
    | "신부"
    | "신부 아버지"
    | "신부 어머니";
  name: string;
  phone: string;
}

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
    bridePhone,
    groomPhone,
    brideFatherPhone,
    brideMotherPhone,
    groomMotherPhone,
    groomFatherPhone,
    galleries,
  } = data;
  const { setModalOpen } = useModalStore();

  type PartyRow = {
    parentNames: string[];
    childName: string;
    childSuffix: "아들" | "딸";
  };

  console.log(galleries);
  const partyRows: PartyRow[] = [
    {
      parentNames: [groomFatherName, groomMotherName].filter(
        Boolean,
      ) as string[],
      childName: groomName,
      childSuffix: "아들",
    },
    {
      parentNames: [brideFatherName, brideMotherName].filter(
        Boolean,
      ) as string[],
      childName: brideName,
      childSuffix: "딸",
    },
  ];

  const phonePayload: PhonePayload[] = [
    { id: "groom", name: groomName, phone: groomPhone, role: "신랑" },
    {
      id: "groomFather",
      name: groomFatherName,
      phone: groomFatherPhone,
      role: "신랑 아버지",
    },
    {
      id: "groomMother",
      name: groomMotherName,
      phone: groomMotherPhone,
      role: "신랑 어머니",
    },
    { id: "bride", name: brideName, phone: bridePhone, role: "신부" },
    {
      id: "brideFather",
      name: brideFatherName,
      phone: brideFatherPhone,
      role: "신부 아버지",
    },
    {
      id: "brideMother",
      name: brideMotherName,
      phone: brideMotherPhone,
      role: "신부 어머니",
    },
  ];

  return (
    <div className="m-auto w-full max-w-[432px] bg-white p-4">
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
        <div className="m-auto max-w-5/6 text-center text-sm whitespace-pre-line text-gray-400">{`저희 두 사람의의 작은 만남이 
        사랑의 결실을 이루어
        소중한 결혼식을 올리게 되었습니다.
        
        평생 서로 귀하게 여기며
        첫 마음 그대로 존중하고 배려하며 살겠습니다

        오로지 믿음과 사랑을 약속하는 날 오셔서 축복해 주시면 더없는 기쁨으로 간직하겠습니다.`}</div>
        <hr className="mx-auto my-6 w-1/5 opacity-20" />

        <div className="m-auto text-sm text-gray-500">
          {partyRows
            .filter((r) => r.parentNames.length > 0)
            .map((row, i) => {
              const parents = row.parentNames.join("ㆍ");
              return (
                <p
                  key={i}
                  className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 text-xs text-gray-500"
                >
                  <span className="justify-self-end truncate font-bold opacity-50">
                    {parents}
                  </span>
                  <span className="truncate opacity-50">
                    의 {row.childSuffix}
                  </span>
                  <span className="text-sm font-bold">{row.childName}</span>
                </p>
              );
            })}
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
                payload: phonePayload,
              })
            }
          >
            <PhoneIcon size={14} /> 연락하기
          </Btn>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <div className="text-center text-xs font-bold tracking-widest text-gray-500">
            Gallery
          </div>
          <div className="p-4 text-center text-xl font-semibold">
            웨딩 갤러리
          </div>
          <Gallery data={galleries} />
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <p className="text-center text-lg font-bold tracking-widest text-gray-500">
            <DateDisplay date={weddingDate} type="dot" />
          </p>
          <p className="text-center font-bold text-gray-500">
            <DateDisplay date={weddingDate} type="weekdayKr" />
          </p>
          <Calender date={weddingDate} />
          <DigitalWatch date={weddingDate} />
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <div className="text-center text-xs font-bold tracking-widest text-gray-500 uppercase">
            Location
          </div>
          <div className="p-4 text-center text-xl font-semibold">오시는 길</div>
          <KakaoMap address={weddingAddress} />
        </div>
      </div>
    </div>
  );
};

export default InvitationContainer;
