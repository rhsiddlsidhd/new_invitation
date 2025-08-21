"use client";
import React, { useRef, useState } from "react";
import Img from "../atoms/Img";
import { DocArrowUpIcon } from "../atoms/Icon";
import Label from "../atoms/Label";
import OverlayCloseBtn from "./OverlayCloseBtn";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import Btn from "../atoms/Btn";
import { useModalStore } from "@/store/modalStore";

const WeddingThumbnail = ({ readOnly }: { readOnly?: boolean }) => {
  const { isOpen, setModalOpen } = useModalStore();
  const thumbnails = useUserStore((state) => state.thumbnails);
  const errors = useUserStore((state) => state.errors);
  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const id = e.target.id;

    const idx = Number(id.split("-")[1]);

    const url = URL.createObjectURL(files[0]);
    setThumbnailPreviews((prev) => {
      const next = [...prev];
      next[idx] = url;
      return next;
    });
  };
  const [thumbnailPreviews, setThumbnailPreviews] = useState<(string | null)[]>(
    [null, null],
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null]);

  const viewData = readOnly ? thumbnails : thumbnailPreviews;

  return (
    <div>
      <div className="flex justify-center gap-4 p-4">
        {viewData.map((url, i) => {
          return (
            <Label
              className={`relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50`}
              key={i}
            >
              {url ? (
                <div className="relative h-full w-full">
                  <Img src={url} />
                  {!readOnly && (
                    <OverlayCloseBtn
                      size="md"
                      onClick={(e) => {
                        e.preventDefault();
                        setThumbnailPreviews((prev) => {
                          const next = [...prev];
                          next[i] = null;
                          return next;
                        });
                        if (inputRefs.current[i])
                          inputRefs.current[i].value = "";
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
                  id={`thumbnail-${i}`}
                  name={`thumbnail`}
                  onChange={handleUploadFiles}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className="absolute h-full w-full cursor-pointer opacity-0"
                />
              )}
              {!readOnly && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: errors["thumbnail"] ? 1 : 0 }}
                  className="absolute inset-0 h-full w-full rounded-lg border-1 border-red-300"
                />
              )}
            </Label>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center text-xs break-keep">
        {!readOnly && (
          <span className="mx-2 text-red-300">{errors["thumbnail"]?.[0]}</span>
        )}
        <span className="text-sm text-gray-500">현재 등록된 썸네일</span>
      </div>
      <Btn
        type={isOpen ? "submit" : "button"}
        onClick={(e) => {
          if (!isOpen) {
            e.preventDefault();
            setModalOpen({ isOpen: true, type: "wedding-thumbnail" });
          }
        }}
        className="mt-4 ml-auto block"
      >
        수정하기
      </Btn>
    </div>
  );
};

export default WeddingThumbnail;

/**
 *  <input
                type="file"
                id={`thumbnail-${i}`}
                name={`thumbnail`}
                className="absolute h-full w-full cursor-pointer opacity-0"
                onChange={handleUploadFiles}
                accept="image/*"
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
              />
 */
