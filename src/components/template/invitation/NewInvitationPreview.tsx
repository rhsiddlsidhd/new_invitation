"use client";

import Btn from "@/components/atoms/Btn";
import DateDisplay from "@/components/atoms/Date/Date";
import { PhoneIcon } from "@/components/atoms/Icon";
import Img from "@/components/atoms/Thumbnail";
import MusicBtn from "@/components/molecules/btns/MusicBtn";
import Account from "@/components/molecules/wedding/Account";
import Calender from "@/components/molecules/wedding/Calender";
import Navigation from "@/components/molecules/wedding/Navigation";
import Schedule from "@/components/molecules/wedding/Schedule";
import Subway from "@/components/molecules/wedding/Subway";
import React from "react";
import AnimateViewBox from "../Box/AnimateViewBox";
import DigitalWatch from "@/components/molecules/wedding/DigitalWatch";
import KakaoMap from "../../molecules/wedding/KakaoMap/index";
import NewGallery from "@/components/molecules/wedding/NewGallery";
import { ICoupleInfo } from "@/models/coupleInfo.model";
import useInvitationData from "@/hooks/useInvitationData";
import { GuestBookView } from "@/types/invitation";

const NewInvitationPreview = ({
  userInfo,
  guestBook,
}: {
  userInfo: ICoupleInfo;
  guestBook: GuestBookView[];
}) => {
  const {
    weddingDate,
    thumbnailImages,
    groom,
    bride,
    address,
    addressDetail,
    galleryImages,
    message,
    guestbookEnabled,
    subwayStation,
    venue,
    partyRows,
    phonePayload,
    accountPayload,
    guestBookBtns,
    setModalOpen,
  } = useInvitationData(userInfo, guestBook);

  return (
    <section className="w-full bg-gray-100">
      <div
        className={`bg-akwmrlawz m-auto w-full max-w-[432px] bg-white p-4`}
      >
        <AnimateViewBox triggerOnce>
          <div className="flex justify-end">
            <MusicBtn />
          </div>

          <Schedule date={weddingDate} />

          {thumbnailImages && thumbnailImages.length > 0 && (
            <div className="relative aspect-[3/4] w-full">
              <Img src={thumbnailImages[0]} />
            </div>
          )}

          <div className="flex justify-center py-4 text-lg tracking-widest">
            <span>{groom.name}</span>ㆍ<span>{bride.name}</span>
          </div>

          <div className="text-center text-sm text-gray-500">
            <DateDisplay date={weddingDate} type="text" className="" />
            <DateDisplay date={weddingDate} type="weekdayKr" className="ml-2" />
            <div>{venue}</div>
          </div>
        </AnimateViewBox>

        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <div className="text-center text-xs font-bold tracking-widest text-gray-500">
            INVITATION
          </div>
          <div className="p-4 text-center text-xl font-semibold">
            소중한 분들을 초대합니다
          </div>
          <div className="m-auto max-w-5/6 text-center text-sm whitespace-pre-line text-gray-400">
            {message}
          </div>
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
          <NewGallery galleryImages={galleryImages} />
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
            {address}
          </p>
          <p className="p-2 text-center text-sm font-semibold text-gray-500">
            {addressDetail}
          </p>
          <KakaoMap address={address} />
        </AnimateViewBox>
        <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
          <Navigation address={address} />
          {subwayStation && <Subway station={subwayStation} />}
        </AnimateViewBox>
        {guestbookEnabled && (
          <>
            <AnimateViewBox triggerOnce className="mt-10 flex flex-col gap-2">
              {thumbnailImages && thumbnailImages.length > 1 && (
                <div className="relative mb-3 aspect-[3/4] w-full">
                  <div
                    className={`absolute -top-2 z-10 h-15 w-full border-0 bg-[linear-gradient(to_top,transparent_0%,white_70%,white_100%)]`}
                  />
                  <Img src={thumbnailImages[1]} />
                  <div className="absolute -bottom-2 z-10 h-15 w-full bg-[linear-gradient(to_bottom,transparent_0%,white_70%,white_100%)]" />
                </div>
              )}
              <div className="text-center text-xs font-bold tracking-widest text-gray-500 uppercase">
                Guestbook
              </div>
              <p className="p-4 text-center text-xl font-semibold">방명록</p>
              <p className="text-center text-sm font-semibold text-gray-500">
                신랑 신부의 <br />
                결혼을 축하해주세요.
              </p>
              {guestBookBtns.map((btn, i) => {
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
          </>
        )}
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

export default NewInvitationPreview;