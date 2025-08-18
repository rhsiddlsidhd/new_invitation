"use client";
import React, { useState } from "react";
import { GalleryData } from "@/types";
import GalleryItems from "../organisms/GalleryItems";
import GalleryController from "../organisms/GalleryController";

const WeddingGallery = ({ readOnly }: { readOnly: boolean }) => {
  const mockData: GalleryData[] = [
    { id: "123", type: "A", urls: ["/marriage.jpg", "/marriage.jpg"] },
  ];
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
                { type: activeType, urls: new Array(count).fill(null), id },
              ];
            });
          }}
        />
      )}
      <GalleryItems
        viewData={readOnly ? mockData : galleryData}
        readOnly={readOnly}
        onChange={(cardIdx, idx, file) => {
          const url = URL.createObjectURL(file);
          setGalleryData((prev) => {
            const next = [...prev];
            next[cardIdx].urls[idx] = url;
            return next;
          });
        }}
        onRemove={(cardIdx, idx) => {
          setGalleryData((prev) => {
            const next = [...prev];
            next[cardIdx].urls[idx] = null;
            return next;
          });
        }}
        onDeleteCard={(id) => {
          deleteGalleryCard(id);
        }}
      />
    </div>
  );
};

export default WeddingGallery;
