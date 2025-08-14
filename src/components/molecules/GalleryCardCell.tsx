import React from "react";
import Img from "../atoms/Img";
import { defaultUrls } from "@/contants";
import Label from "../atoms/Label";
import { GalleryData } from "@/types";
import OverlayCloseBtn from "./OverlayCloseBtn";
import { DocArrowUpIcon } from "../atoms/Icon";

interface GalleryCardCellProps {
  idx: number;
  mode?: "get" | "edit";
  urls?: GalleryData["urls"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRefs?: React.RefObject<(HTMLInputElement | null)[][]>;
  cardIdx?: number;
  onRemove?: (idx: number) => void;
  id?: string;
  className?: string;
}

const GalleryCardCell = ({
  mode = "get",
  cardIdx,
  id,
  idx,
  inputRefs,
  onChange,
  onRemove,
  urls,
  className,
}: GalleryCardCellProps) => {
  if (mode === "get") {
    return (
      <div className={`relative ${className}`}>
        <Img src={defaultUrls} />
      </div>
    );
  }

  const hasImage = urls?.[idx];

  return (
    <Label
      className={`relative flex h-full w-full items-center justify-center border-2 border-gray-300 ${className}`}
    >
      <input
        name={`gallery-${id}-${idx}`}
        type="file"
        className="absolute h-full w-full opacity-0"
        ref={(el) => {
          if (inputRefs && cardIdx) {
            if (!inputRefs.current[cardIdx]) inputRefs.current[cardIdx] = [];
            inputRefs.current[cardIdx][idx] = el;
          }
        }}
        onChange={onChange}
      />
      {hasImage ? (
        <div className="relative h-full w-full">
          <Img src={hasImage} />
          <OverlayCloseBtn
            size="sm"
            onClick={(e) => {
              console.log(e);
              e.preventDefault();
              if (onRemove) onRemove(idx);
              if (
                inputRefs &&
                cardIdx &&
                inputRefs.current[cardIdx] &&
                inputRefs.current[cardIdx][idx]
              ) {
                inputRefs.current[cardIdx][idx].value = "";
              }
            }}
          />
        </div>
      ) : (
        <DocArrowUpIcon />
      )}
    </Label>
  );
};

export default GalleryCardCell;
