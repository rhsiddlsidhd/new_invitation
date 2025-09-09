import { CloseIcon } from "@/components/atoms/Icon";
import React from "react";

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 h-8",
} as const;

const OverlayCloseBtn = ({
  onClick,
  size = "sm",
}: {
  onClick?: (e: React.MouseEvent) => void;
  size?: keyof typeof sizeMap;
}) => {
  return (
    <button
      type="button"
      className={`${sizeMap[size]} absolute top-1 right-1 z-10 rounded-full bg-white/80 p-1 hover:bg-red-100`}
      onClick={onClick}
    >
      <CloseIcon className="h-full w-full text-gray-500 hover:text-red-500" />
    </button>
  );
};

export default OverlayCloseBtn;
