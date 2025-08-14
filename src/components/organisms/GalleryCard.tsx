import { GalleryData } from "@/types";
import React, { ChangeEvent } from "react";

import GalleryCardCell from "../molecules/GalleryCardCell";
import { cardConfig } from "@/contants";

const GalleryCard = ({
  type,
  mode = "get",
  urls,
  id,
  onChange,
  onRemove,
}: {
  type: GalleryData["type"];
  mode?: "get" | "edit";
  urls?: GalleryData["urls"];
  id?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (idx: number) => void;
}) => {
  if (!cardConfig[type]) return;

  const config = cardConfig[type];
  return (
    <div
      className={`grid aspect-[5/8] w-34 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100 ${config.gridClass}`}
    >
      {Array.from({ length: config.length }, (_, i) => (
        <GalleryCardCell
          idx={i}
          urls={urls}
          id={id}
          onChange={onChange}
          onRemove={onRemove}
          key={i}
          mode={mode}
          className={config.getCellClass(i)}
        />
      ))}
    </div>
  );
};

export default GalleryCard;
