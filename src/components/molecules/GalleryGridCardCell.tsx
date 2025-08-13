import React from "react";
import Label from "../atoms/Label";
import Img from "../atoms/Img";
import OverlayCloseBtn from "./OverlayCloseBtn";
import { DocArrowUpIcon } from "../atoms/Icon";
import { GalleryData } from "./WeddingGallery";
interface GalleryGridCardCellProps {
  className?: string;
  type: string;
  idx: number;
  urls?: GalleryData["urls"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRefs?: React.MutableRefObject<(HTMLInputElement | null)[][]>;
  cardIdx: number;
  onRemove?: (idx: number) => void;
}

const GalleryGridCardCell = ({
  idx,
  urls,
  type,
  cardIdx,
  inputRefs,
  onChange,
  onRemove,
}: GalleryGridCardCellProps) => {
  return (
    <Label
      key={idx}
      htmlFor={`gallery-${type}-${idx}`}
      className={`flex h-full w-full items-center justify-center border-2 border-gray-300`}
    >
      {/* hidden 요소 */}
      <input
        name={`gallery-${type}-${idx}`}
        type="file"
        className="absolute h-full w-full opacity-0"
        ref={(el) => {
          if (inputRefs) {
            if (!inputRefs.current[cardIdx]) inputRefs.current[cardIdx] = [];
            inputRefs.current[cardIdx][idx] = el;
          }
        }}
        onChange={onChange}
      />

      {/* View : Url 이 있으면 Url 그렇지 않으면 <DocArrowUpIcon /> */}
      {urls && urls[idx] ? (
        <div className="relative h-full w-full">
          <Img src={urls[idx]} />
          <OverlayCloseBtn
            size="sm"
            onClick={(e) => {
              console.log(e);
              e.preventDefault();
              if (onRemove) onRemove(idx);
              if (
                inputRefs &&
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

export default GalleryGridCardCell;
