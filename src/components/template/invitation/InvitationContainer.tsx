"use client";

import Btn from "@/components/atoms/Btn";
import DateDisplay from "@/components/atoms/Date/Date";
import { PhoneIcon } from "@/components/atoms/Icon";
import Img from "@/components/atoms/Thumbnail";
import MusicBtn from "@/components/molecules/btns/MusicBtn";
import Account from "@/components/molecules/wedding/Account";
import Calender from "@/components/molecules/wedding/Calender";
import Gallery from "@/components/molecules/wedding/Gallery";
import Navigation from "@/components/molecules/wedding/Navigation";
import Schedule from "@/components/molecules/wedding/Schedule";
import Subway from "@/components/molecules/wedding/Subway";
import { InvitationInput } from "@/domains/invitation";
import { useModalStore } from "@/shared/store/modalStore";
import { GuestBook } from "@/shared/types";
import React from "react";
import AnimateViewBox from "../Box/AnimateViewBox";
import DigitalWatch from "@/components/molecules/wedding/DigitalWatch";

import { useGetProductfont } from "@/domains/product";
import KakaoMap from "../../molecules/wedding/KakaoMap/index";

type PersonPayloadId =
  | "groom"
  | "groomFather"
  | "groomMother"
  | "bride"
  | "brideFather"
  | "brideMother";

type PersonPayloadType =
  | "신랑"
  | "신랑 아버지"
  | "신랑 어머니"
  | "신부"
  | "신부 아버지"
  | "신부 어머니";
interface PersonPayload {
  id: PersonPayloadId;
  role: PersonPayloadType;
  name: string;
}

export interface PhonePayload extends PersonPayload {
  phone: string;
}

export interface AccountPayload extends PersonPayload {
  account: string;
}

interface GuestBookBtn {
  label: string;
  onClick: () => void;
}

export type GuestBookView = Omit<GuestBook, "userId" | "password"> & {
  _id: string;
};

const InvitationContainer = ({
  productId,
  userInfo,
  guestBook,
}: {
  productId: string;
  userInfo: InvitationInput;
  guestBook: GuestBookView[];
}) => {
  const font = useGetProductfont();

  const {
    userId,
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
    brideAccount,
    brideFatherAccount,
    brideMotherAccount,
    groomAccount,
    groomMotherAccount,
    groomFatherAccount,
  } = userInfo;

  const { setModalOpen } = useModalStore();

  type PartyRow = {
    parentNames: string[];
    childName: string;
    childSuffix: "아들" | "딸";
  };

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

  const accountPayload: AccountPayload[] = [
    { id: "groom", account: groomAccount, name: groomName, role: "신랑" },
    {
      id: "groomFather",
      account: groomFatherAccount,
      name: groomFatherName,
      role: "신랑 아버지",
    },
    {
      id: "groomMother",
      account: groomMotherAccount,
      name: groomMotherName,
      role: "신랑 어머니",
    },
    { id: "bride", account: brideAccount, name: brideName, role: "신부" },
    {
      id: "brideFather",
      account: brideFatherAccount,
      name: brideFatherName,
      role: "신부 아버지",
    },
    {
      id: "brideMother",
      account: brideMotherAccount,
      name: brideMotherName,
      role: "신부 어머니",
    },
  ];

  const btns: GuestBookBtn[] = [
    {
      label: "방명록 작성하기",
      onClick: () => {
        setModalOpen({
          isOpen: true,
          type: "guest-book-write",
          payload: { userId },
        });
      },
    },
    {
      label: "방명록 전체보기",
      onClick: () => {
        setModalOpen({
          isOpen: true,
          type: "guest-book-view",
          config: { backgroundColor: "transparent" },
          payload: guestBook,
        });
      },
    },
  ];

  return (
    <section
      style={{
        backgroundColor: `var(--bg-color-${productId})`,
      }}
      className="w-full"
    >
      <div
        style={{
          backgroundColor: `var(--bg-card-color-${productId})`,
        }}
        className={`bg-akwmrlawz m-auto w-full max-w-[432px] bg-[#f0f0f0] p-4`}
      >
        <AnimateViewBox triggerOnce>
          <div className="flex justify-end">
            <MusicBtn />
          </div>

          <Schedule date={weddingDate} />

          <div className="relative aspect-[3/4] w-full">
            <Img src={thumbnails[0]} />
          </div>

          <div className="flex justify-center py-4 text-lg tracking-widest">
            <span>{groomName}</span>ㆍ<span>{brideName}</span>
          </div>

          <div className="text-center text-sm text-gray-500">
            <DateDisplay date={weddingDate} type="text" className="" />
            <DateDisplay date={weddingDate} type="weekdayKr" className="ml-2" />
            <div>{weddingAddress}</div>
          </div>
        </AnimateViewBox>

        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
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
              className="flex items-center gap-2 px-6"
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
        </AnimateViewBox>
        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <div className="text-center text-xs font-bold tracking-widest text-gray-500">
            Gallery
          </div>
          <div className="p-4 text-center text-xl font-semibold">
            웨딩 갤러리
          </div>
          <Gallery data={galleries} />
        </AnimateViewBox>
        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <p className="text-center text-lg font-bold tracking-widest text-gray-500">
            <DateDisplay date={weddingDate} type="dot" />
          </p>
          <p className="text-center font-bold text-gray-500">
            <DateDisplay date={weddingDate} type="weekdayKr" />
          </p>
          <Calender date={weddingDate} />
          <DigitalWatch date={weddingDate} />
        </AnimateViewBox>
        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <div className="text-center text-xs font-bold tracking-widest text-gray-500 uppercase">
            Location
          </div>
          <p className="p-4 text-center text-xl font-semibold">오시는 길</p>
          <p className="p-4 text-center text-sm font-semibold text-gray-500">
            {weddingAddress}
          </p>
          <p className="p-2 text-center text-sm font-semibold text-gray-500">
            {weddingDetailAddress}
          </p>
          <KakaoMap address={weddingAddress} />
        </AnimateViewBox>
        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <Navigation address={weddingAddress} />
          <Subway />
        </AnimateViewBox>
        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <div className="relative mb-3 aspect-[3/4] w-full">
            <div
              style={{
                background: `linear-gradient(to top, transparent 0%, var(--bg-card-color-${productId}) 70%,  var(--bg-card-color-${productId}) 100%)`,
              }}
              className={`absolute -top-2 z-10 h-15 w-full border-0`}
            />
            <Img src={thumbnails[1]} />
            <div
              style={{
                background: `linear-gradient(to bottom, transparent 0%, var(--bg-card-color-${productId}) 70%,  var(--bg-card-color-${productId}) 100%)`,
              }}
              className="absolute -bottom-2 z-10 h-15 w-full"
            />
          </div>
          <div className="text-center text-xs font-bold tracking-widest text-gray-500 uppercase">
            Guestbook
          </div>
          <p className="p-4 text-center text-xl font-semibold">방명록</p>
          <p className="text-center text-sm font-semibold text-gray-500">
            신랑 신부의 <br />
            결혼을 축하해주세요.
          </p>
          {btns.map((btn, i) => {
            return (
              <Btn
                onClick={btn.onClick}
                key={i}
                bgColor="bg-gray-200"
                textColor="black"
                className="m-auto w-fit px-6 py-2 text-sm font-semibold shadow-2xl"
              >
                {btn.label}
              </Btn>
            );
          })}
        </AnimateViewBox>
        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <div className="text-center text-xs font-bold tracking-widest text-gray-500 uppercase">
            ACCOUNT
          </div>
          <p className="p-4 text-center text-xl font-semibold">
            마음 전하실 곳
          </p>
          <p className="text-center text-sm font-semibold text-gray-500">
            참석이 어려우신 분들을 위해 <br /> 계좌번호를 기재하였습니다.
            <br />
            너그라운 마음으로 양해 부탁드립니다.
          </p>
          <Account data={accountPayload} />
        </AnimateViewBox>
      </div>
    </section>
  );
};

export default InvitationContainer;
