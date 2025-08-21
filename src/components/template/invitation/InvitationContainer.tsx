"use client";

import DateDisplay from "@/components/atoms/Date";
import { HeartIcon } from "@/components/atoms/Icon";
import Img from "@/components/atoms/Img";
import MusicBtn from "@/components/molecules/btns/MusicBtn";
import Schedule from "@/components/molecules/wedding/Schedule";
import { InvitationInput } from "@/models/invitationSchma";
import React from "react";

const InvitationContainer = ({ data }: { data: InvitationInput }) => {
  const {
    weddingDate,
    thumbnails,
    groomName,
    groomMotherName,
    weddingAddress,
    weddingDetailAddress,
  } = data;

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
      <div className="mt-10">
        <div className="text-center text-xs font-bold tracking-widest text-gray-500">
          INVITATION
        </div>
        <div className="p-4 text-center text-xl font-semibold">
          소중한 분들을 초대합니다
        </div>
      </div>
    </div>
  );
};

export default InvitationContainer;
