"use client";

import React, { useState } from "react";
import { GalleryData } from "@/types";
import { useUserStore } from "@/store/userStore";
import { useModalStore } from "@/store/modalStore";
import GalleryController from "@/components/organisms/GalleryController";
import GalleryItems from "@/components/organisms/GalleryItems";
import Btn from "@/components/atoms/Btn";

const WeddingGalleryPanel = ({ readOnly }: { readOnly: boolean }) => {
  const { galleries, isUser, clearErrors } = useUserStore();
  const { isOpen, setModalOpen } = useModalStore();
  const [activeType, setActiveType] = useState<GalleryData["type"]>("A");
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const deleteGalleryCard = (id: GalleryData["id"]) =>
    setGalleryData((prev) => prev.filter((d) => d.id !== id));

  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50 p-3">
      <div className="border-b-1 border-gray-200 bg-transparent p-3">
        <span className="font-semibold text-gray-700">갤러리</span>
      </div>
      {!readOnly && (
        <GalleryController
          activeType={activeType}
          onActiveType={(w) => setActiveType(w)}
          onAddGallery={() => {
            const id = crypto.randomUUID();
            const count = { A: 2, B: 3, C: 4, D: 5, E: 6 }[activeType];
            setGalleryData((prev) => {
              if (prev.length === 5) {
                alert("갤러리는 최대 5개까지 추가할 수 있습니다.");
                return prev;
              }
              return [
                ...prev,
                { type: activeType, images: new Array(count).fill(null), id },
              ];
            });
          }}
        />
      )}

      <GalleryItems
        viewData={readOnly ? galleries : galleryData}
        readOnly={readOnly}
        onChange={(cardIdx, idx, file) => {
          const url = URL.createObjectURL(file);
          setGalleryData((prev) => {
            const next = [...prev];
            next[cardIdx].images[idx] = url;
            return next;
          });
          clearErrors();
        }}
        onRemove={(cardIdx, idx) => {
          setGalleryData((prev) => {
            const next = [...prev];
            next[cardIdx].images[idx] = null;
            return next;
          });
        }}
        onDeleteCard={(id) => {
          deleteGalleryCard(id);
        }}
      />
      {isUser && (
        <Btn
          type={isOpen ? "submit" : "button"}
          onClick={(e) => {
            if (!isOpen) {
              e.preventDefault();
              setModalOpen({ isOpen: true, type: "wedding-gallery" });
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

export default WeddingGalleryPanel;
