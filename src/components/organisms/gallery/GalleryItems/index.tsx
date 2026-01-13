import React, { ChangeEvent } from "react";
import { motion } from "framer-motion";
import GalleryCard from "../../../molecules/gallery/GalleryCard";
import { GalleryData } from "@/shared/types";

import OverlayCloseBtn from "@/components/molecules/btns/OverlayCloseBtn/index";
import { getUserState } from "@/__domains/user";

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
  const { errors } = getUserState();

  return (
    <ul className="space-y-4">
      {viewData.map((d, cardIdx) => {
        const { type, id, images } = d;
        return (
          <li
            key={cardIdx}
            className="relative flex items-center justify-between rounded-lg border border-gray-200 px-10 py-4 shadow-sm"
          >
            <span className="font-mono text-gray-400">
              {cardIdx + 1} {type}타입
            </span>

            <motion.div className="round-lg h-fit w-fit bg-white p-2 shadow-sm">
              <GalleryCard
                type={type}
                readOnly={readOnly}
                id={id}
                images={images}
                onChange={(e: ChangeEvent<HTMLInputElement>, idx: number) => {
                  const files = e.target.files;
                  if (!files?.length) return;
                  if (onChange) onChange(cardIdx, idx, files[0]);
                }}
                onRemove={(idx) => onRemove && onRemove(cardIdx, idx)}
              />
              {!readOnly && (
                <span className="mx-2 text-xs text-red-300">
                  {errors[id]?.[0]}
                </span>
              )}
            </motion.div>

            {!readOnly && (
              <OverlayCloseBtn
                size="lg"
                onClick={() => onDeleteCard && onDeleteCard(d.id)}
              />
            )}

            {!readOnly && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: errors[id] ? 1 : 0 }}
                className="pointer-events-none absolute inset-0 h-full w-full rounded-lg border-1 border-red-300"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default GalleryItems;
