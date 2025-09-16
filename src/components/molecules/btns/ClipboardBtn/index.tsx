"use client";
import { ClipboardIcon } from "@/components/atoms/Icon";
import React from "react";

const ClipboardBtn = ({ value }: { value: string }) => {
  const handleClipboard = () => {
    navigator.clipboard.writeText(value);
    alert("복사되었습니다!");
  };

  return (
    <button
      onClick={handleClipboard}
      className="flex w-4 cursor-pointer items-center"
    >
      <ClipboardIcon />
    </button>
  );
};

export default ClipboardBtn;
