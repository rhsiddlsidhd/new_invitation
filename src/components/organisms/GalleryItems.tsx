import React, { ChangeEvent } from "react";
import { motion } from "framer-motion";
import GalleryCard from "./GalleryCard";
import { GalleryData } from "@/types";
import OverlayCloseBtn from "../molecules/OverlayCloseBtn";

interface GalleryItemsProps {
  viewData: GalleryData[];
  readOnly: boolean;
  onChange?: (cardIdx: number, imgIdx: number, file: File) => void;
  onRemove?: (cardIdx: number, imgIdx: number) => void;
  onDeleteCard?: (id: string) => void;
}

const GalleryItems = ({
  viewData,
  readOnly,
  onChange,
  onDeleteCard,
  onRemove,
}: GalleryItemsProps) => {
  return (
    <ul className="my-4">
      {viewData.map((d, cardIdx) => {
        const { type, id, urls } = d;
        console.log("map", readOnly);
        return (
          <li
            key={cardIdx}
            className="relative flex items-center justify-between rounded-lg border-2 border-gray-200 px-10 py-2 shadow-sm"
          >
            <span className="w-6 text-center font-mono text-gray-400">
              {cardIdx + 1}
            </span>

            <motion.div className="round-lg h-fit w-fit bg-white p-2 shadow-sm">
              <GalleryCard
                type={type}
                readOnly={readOnly}
                id={id}
                urls={urls}
                onChange={(e: ChangeEvent<HTMLInputElement>, idx: number) => {
                  const files = e.target.files;
                  if (!files?.length) return;
                  if (onChange) onChange(cardIdx, idx, files[0]);
                }}
                onRemove={(idx) => onRemove && onRemove(cardIdx, idx)}
              />
            </motion.div>

            {!readOnly && (
              <OverlayCloseBtn
                size="lg"
                onClick={() => onDeleteCard && onDeleteCard(d.id)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default GalleryItems;
