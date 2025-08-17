import React, { useRef } from "react";
import Img from "../atoms/Img";
import { defaultUrls } from "@/contants";
import Label from "../atoms/Label";
import { GalleryData } from "@/types";
import OverlayCloseBtn from "./OverlayCloseBtn";
import { DocArrowUpIcon } from "../atoms/Icon";

interface GalleryCardCellProps {
  idx: number;
  readOnly: boolean;
  urls?: GalleryData["urls"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  onRemove?: (idx: number) => void;
  id?: string;
  className?: string;
}

const GalleryCardCell = ({
  id,
  readOnly,
  idx,
  onChange,
  onRemove,
  urls,
  className,
}: GalleryCardCellProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasImage = urls?.[idx];

  if (readOnly) {
    return (
      <Label
        className={`relative flex h-full w-full items-center justify-center border-2 border-gray-300 ${className}`}
      >
        <Img src={defaultUrls} />
      </Label>
    );
  }

  return (
    <Label
      className={`relative flex h-full w-full items-center justify-center border-2 border-gray-300 ${className}`}
    >
      <input
        name={`gallery-${id}`}
        type="file"
        className="absolute h-full w-full opacity-0"
        data-idx={idx}
        ref={inputRef}
        onChange={(e) => {
          if (onChange) onChange(e, idx);
        }}
        accept="image/*"
      />
      {hasImage ? (
        <div className="relative h-full w-full">
          <Img src={hasImage} />
          <OverlayCloseBtn
            size="sm"
            onClick={(e) => {
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
