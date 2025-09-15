"use client";
import { DocArrowUpIcon } from "@/components/atoms/Icon";
import Img from "@/components/atoms/Img";
import OverlayCloseBtn from "../../btns/OverlayCloseBtn";

import { motion } from "framer-motion";
import Label from "@/components/atoms/Label";
import Card from "@/components/atoms/Card";
import { useCallback, useRef } from "react";
import { getUserState } from "@/store/userStore";

const ThumbnailCard = ({
  url,
  readOnly,
  upload,
  remove,
  idx,
}: {
  url: string | null;
  readOnly: boolean | undefined;
  upload: (idx: number, url: string) => void;
  remove: (idx: number) => void;
  idx: number;
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null]);
  const { errors } = getUserState();
  const handleUploadFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const id = e.target.id;

      const idx = Number(id.split("-")[1]);

      const url = URL.createObjectURL(files[0]);

      upload(idx, url);
    },
    [upload],
  );
  return (
    <Card className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
      <Label className={`flex h-full items-center justify-center`}>
        {url ? (
          <div className="relative h-full w-full">
            <Img src={url} />
            {!readOnly && (
              <OverlayCloseBtn
                size="md"
                onClick={(e) => {
                  e.preventDefault();
                  remove(idx);
                  if (inputRefs.current[idx]) inputRefs.current[idx].value = "";
                }}
              />
            )}
          </div>
        ) : (
          <DocArrowUpIcon />
        )}

        {!readOnly && (
          <input
            type="file"
            id={`thumbnail-${idx}`}
            name={`thumbnail`}
            onChange={handleUploadFiles}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
        )}
        {!readOnly && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: errors[idx] ? 1 : 0 }}
            className="absolute inset-0 h-full w-full rounded-lg border-1 border-red-300 p-2 text-xs text-red-300"
          >
            {errors[idx] && errors[idx][0]}
          </motion.div>
        )}
      </Label>
    </Card>
  );
};

export default ThumbnailCard;
