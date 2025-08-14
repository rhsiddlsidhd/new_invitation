import React, { useRef } from "react";
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
  onRemove?: (idx: number) => void;
  id?: string;
  className?: string;
}

const GalleryCardCell = ({
  mode = "get",
  id,
  idx,
  onChange,
  onRemove,
  urls,
  className,
}: GalleryCardCellProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
        ref={inputRef}
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
              if (!inputRef.current) return;
              inputRef.current.value = "";
              if (onRemove) onRemove(idx);
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
