"use client";

import Img from "@/components/atoms/Img";
import Schedule from "@/components/molecules/wedding/Schedule";
import { InvitationInput } from "@/models/invitationSchma";
import React from "react";

const InvitationContainer = ({ data }: { data: InvitationInput }) => {
  const { weddingDate, thumbnails } = data;

  return (
    <div className="w-full max-w-[432px]">
      <div className="relative">
        <Img src={thumbnails[0]} />
        <Schedule date={weddingDate} />
      </div>
    </div>
  );
};

export default InvitationContainer;
