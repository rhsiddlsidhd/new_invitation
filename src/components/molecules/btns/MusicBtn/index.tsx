"use client";
import Btn from "@/components/atoms/Btn";
import { SpeakerOffIcon, SpeakerOnIcon } from "@/components/atoms/Icon";
import React, { useState } from "react";

const MusicBtn = () => {
  const [isMusic, setIsMusic] = useState(true);
  return (
    <Btn
      bgColor="bg-transparnet"
      textColor="text-black"
      onClick={() => setIsMusic(!isMusic)}
    >
      {isMusic ? <SpeakerOnIcon size={14} /> : <SpeakerOffIcon size={14} />}
    </Btn>
  );
};

export default MusicBtn;
