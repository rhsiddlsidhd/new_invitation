import { GalleryData } from "@/types";
import React, { ChangeEvent } from "react";

import GalleryCardCell from "../molecules/GalleryCardCell";

const GalleryCard = ({
  type,
  mode = "get",
  urls,
  id,
  cardIdx,
  inputRefs,
  onChange,
  onRemove,
}: {
  type: GalleryData["type"];
  mode?: "get" | "edit";
  urls?: GalleryData["urls"];
  id?: string;
  inputRefs?: React.RefObject<(HTMLInputElement | null)[][]>;
  cardIdx?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (idx: number) => void;
}) => {
  switch (type) {
    case "A":
      return (
        <div className="grid aspect-[5/8] w-34 grid-rows-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 2 }, (_, i) => {
            return (
              <GalleryCardCell
                idx={i}
                urls={urls}
                id={id}
                inputRefs={inputRefs}
                onChange={onChange}
                onRemove={onRemove}
                cardIdx={cardIdx}
                key={i}
                mode={mode}
              />
            );
          })}
        </div>
      );
    case "B":
      return (
        <div className="grid aspect-[5/8] w-34 grid-cols-2 grid-rows-4 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 3 }, (_, i) => {
            const last = (i + 1) % 3 === 0;
            return (
              <GalleryCardCell
                idx={i}
                urls={urls}
                id={id}
                inputRefs={inputRefs}
                onChange={onChange}
                onRemove={onRemove}
                cardIdx={cardIdx}
                key={i}
                mode={mode}
                className={`${last ? "col-span-2 row-span-2" : "row-span-2"}`}
              />
            );
          })}
        </div>
      );
    case "C":
      return (
        <div className="grid aspect-[5/8] w-34 grid-cols-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 4 }, (_, i) => {
            return (
              <GalleryCardCell
                idx={i}
                urls={urls}
                id={id}
                inputRefs={inputRefs}
                onChange={onChange}
                onRemove={onRemove}
                cardIdx={cardIdx}
                key={i}
                mode={mode}
              />
            );
          })}
        </div>
      );
    case "D":
      return (
        <div className="grid aspect-[5/8] w-34 grid-cols-2 grid-rows-6 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 5 }, (_, i) => {
            const even = (i + 1) % 2 === 0;
            return (
              <GalleryCardCell
                idx={i}
                urls={urls}
                id={id}
                inputRefs={inputRefs}
                onChange={onChange}
                onRemove={onRemove}
                cardIdx={cardIdx}
                key={i}
                mode={mode}
                className={`${even ? "row-span-3" : "row-span-2"}`}
              />
            );
          })}
        </div>
      );
    case "E":
      return (
        <div className="grid aspect-[5/8] w-34 grid-cols-2 grid-rows-3 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 6 }, (_, i) => {
            return (
              <GalleryCardCell
                idx={i}
                urls={urls}
                id={id}
                inputRefs={inputRefs}
                onChange={onChange}
                onRemove={onRemove}
                cardIdx={cardIdx}
                key={i}
                mode={mode}
              />
            );
          })}
        </div>
      );
  }
};

export default GalleryCard;
