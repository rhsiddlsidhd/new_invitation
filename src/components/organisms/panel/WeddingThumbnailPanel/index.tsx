"use client";
import React, { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import Btn from "@/components/atoms/Btn";
import ThumbnailCard from "@/components/molecules/cards/ThumbnailCard";
import { useClearUserErrors, useUserStore } from "@/store/userStore";

const WeddingThumbnailPanel = ({ readOnly }: { readOnly?: boolean }) => {
  const { isOpen, setModalOpen } = useModalStore();
  const { thumbnails, isUser } = useUserStore();
  const clearErrors = useClearUserErrors();
  const [thumbnailPreviews, setThumbnailPreviews] = useState<(string | null)[]>(
    [null, null],
  );

  const viewData = readOnly ? thumbnails : thumbnailPreviews;

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-center gap-4 p-4">
          {viewData.map((url, i) => {
            return (
              <ThumbnailCard
                key={`thumbnail-${i}`}
                idx={i}
                url={url}
                readOnly={readOnly}
                upload={(idx: number, url: string) => {
                  setThumbnailPreviews((prev) => {
                    const next = [...prev];
                    next[idx] = url;
                    return next;
                  });

                  clearErrors();
                }}
                remove={(idx: number) => {
                  setThumbnailPreviews((prev) => {
                    const next = [...prev];
                    next[idx] = null;
                    return next;
                  });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-xs break-keep">
        <span className="text-sm text-gray-500">현재 등록된 썸네일</span>
      </div>
      {isUser && (
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
      )}
    </div>
  );
};

export default WeddingThumbnailPanel;
