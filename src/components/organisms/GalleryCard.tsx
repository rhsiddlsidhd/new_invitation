"use client";
import { GalleryData } from "@/types";
import React, { ChangeEvent, useEffect } from "react";

import GalleryCardCell from "../molecules/GalleryCardCell";
import { cardConfig } from "@/contants";
import Label from "../atoms/Label";

const GalleryCard = ({
  type,
  urls,
  id,
  readOnly,
  onChange,
  onRemove,
}: {
  type: GalleryData["type"];
  readOnly: boolean;
  urls?: GalleryData["urls"];
  id?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>, idx: number) => void;
  onRemove?: (idx: number) => void;
}) => {
  useEffect(() => {
    console.log("Card", readOnly);
  }, [readOnly]);

  if (!cardConfig[type]) return;

  const config = cardConfig[type];
  return (
    <Label
      className={`grid aspect-[5/8] w-34 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100 ${config.gridClass}`}
    >
      {!readOnly && (
        <input
          className="pointer-events-none hidden"
          name={`gallery-${id}-type`}
          value={type}
          readOnly
        />
      )}
      {Array.from({ length: config.length }, (_, i) => (
        <GalleryCardCell
          idx={i}
          urls={urls}
          id={id}
          onChange={onChange}
          onRemove={onRemove}
          key={i}
          readOnly={readOnly}
          className={config.getCellClass(i)}
        />
      ))}
    </Label>
  );
};

export default GalleryCard;
