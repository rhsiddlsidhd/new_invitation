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
        // name={`gallery-${id}-${idx}`}
        name={`gallery-${id}`}
        type="file"
        className="absolute h-full w-full opacity-0"
        ref={inputRef}
        onChange={onChange}
        accept="image/*"
        /**
         * input에 media 파일을 넣었더니 Error를 던지기 전에 터져버림
         *
         * input에 들어올 파일 타입을 accept 속성을 통해서 제한으로 해결
         *
         * 백엔드에서는 Image 파일 타입중에서도 일부 타입만 허용하도록 설정
         *
         * 이외에는 전부 Error : 지원하지 않는 이미지 형식입니다. 를 던져주며 해결
         */
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
