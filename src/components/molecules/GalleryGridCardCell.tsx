import React from "react";
import Label from "../atoms/Label";
import Img from "../atoms/Img";
import OverlayCloseBtn from "./OverlayCloseBtn";
import { DocArrowUpIcon } from "../atoms/Icon";
import { GalleryData } from "./WeddingGallery";
interface GalleryGridCardCellProps {
  type: string;
  idx: number;
  urls?: GalleryData["urls"];
  onChange?: (idx: number, url: string) => void;
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
      className="relative flex h-full border-2 border-gray-300"
    >
      <input
        name={`gallery-${type}-${idx}`}
        type="file"
        className="absolute w-full opacity-0"
        ref={(el) => {
          if (inputRefs) {
            if (!inputRefs.current[cardIdx]) inputRefs.current[cardIdx] = [];
            inputRefs.current[cardIdx][idx] = el;
          }
        }}
        onChange={(e) => {
          if (onChange) {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            const idx = Number(e.target.name.split("-")[2]);
            const url = URL.createObjectURL(files[0]);
            onChange(idx, url);
          }
        }}
      />

      {urls && urls[idx] ? (
        <div>
          <Img src={urls[idx]} />
          <OverlayCloseBtn
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              if (onRemove) onRemove(idx);
              if (inputRefs && inputRefs.current[cardIdx]?.[idx]) {
                inputRefs.current[cardIdx][idx]!.value = "";
              }
            }}
          />
        </div>
      ) : (
        <DocArrowUpIcon className="m-auto" />
      )}
    </Label>
  );
};

export default GalleryGridCardCell;
