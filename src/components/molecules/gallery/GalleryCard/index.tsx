"use client";
import { GalleryData } from "@/shared/types";
import React, { ChangeEvent } from "react";

import GalleryCardCell from "../GalleryCardCell";
import { cardConfig } from "@/shared/constants";
import Label from "../../../atoms/Label";

const GalleryCard = ({
  type,
  images,
  id,
  size = "md",
  readOnly,
  onChange,
  onRemove,
}: {
  type: GalleryData["type"];
  readOnly: boolean;
  images?: GalleryData["images"];
  size?: "sm" | "md" | "lg" | "full";
  id?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>, idx: number) => void;
  onRemove?: (idx: number) => void;
}) => {
  if (!cardConfig[type]) return;
  const sizeClass = {
    sm: "w-24",
    md: "w-34",
    lg: "w-44",
    full: "w-full",
  };
  const config = cardConfig[type];
  return (
    <Label
      className={`grid aspect-[5/8] ${sizeClass[size]} gap-1 overflow-hidden rounded border-2 border-gray-200 bg-gray-100 p-1 ${config.gridClass}`}
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
          image={images && images[i]}
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
