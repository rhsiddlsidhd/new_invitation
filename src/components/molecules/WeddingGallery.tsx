"use client";
import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "../atoms/Icon";
import Btn from "../atoms/Btn";

import OverlayCloseBtn from "./OverlayCloseBtn";
import { GalleryData } from "@/types";
import { __galleryMockData } from "@/contants";
import GalleryCard from "../organisms/GalleryCard";

const WeddingGalleryReadOnly = () => {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50">
      {/* 타입명 영역 */}
      <div className="mx-4 flex items-center justify-between border-b-1 border-gray-200 bg-transparent py-3">
        <span className="font-semibold text-gray-700">갤러리</span>
      </div>
      {/* 이미지 목록 */}
      <ul className="space-y-4 p-4">
        {__galleryMockData.map((d, i) => {
          return (
            <li
              key={i}
              className="flex items-center gap-4 rounded-lg bg-white p-2 shadow-sm"
            >
              <span className="w-6 text-center font-mono text-gray-400">
                {i + 1}
              </span>
              <GalleryCard type={d.type} />
              <div className="flex-1 pl-2">
                <div className="font-semibold text-gray-700">카드 {i + 1}</div>
                <div className="text-xs text-gray-400">설명 또는 부가정보</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const WeddingGalleryEdit = () => {
  const [activeType, setActiveType] = useState<GalleryData["type"]>("A");
  const galleryTypes: GalleryData["type"][] = ["A", "B", "C", "D", "E"];
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);

  const deleteGalleryCard = (id: GalleryData["id"]) => {
    return setGalleryData((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50 p-3">
      {/* 타입명 영역 */}
      <div className="border-b-1 border-gray-200 bg-transparent p-3">
        <span className="font-semibold text-gray-700">갤러리</span>
      </div>
      {/* 이미지 목록 */}
      <div className="relative p-3">
        <div className="flex">
          <div className="flex flex-1/4 flex-col justify-between">
            {galleryTypes.map((w, i) => {
              return (
                <Btn
                  key={i}
                  bgColor="bg-blue-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveType(w);
                  }}
                >{`${w}버튼`}</Btn>
              );
            })}
          </div>
          <ul className="relative flex min-h-80 flex-3/4 items-center space-y-4 p-4">
            <AnimatePresence mode="wait">
              <motion.li
                key={activeType}
                className="round-lg absolute left-1/2 h-fit w-fit -translate-x-1/2 bg-white p-2 shadow-sm"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", duration: 0.3 }}
              >
                <GalleryCard type={activeType} />
              </motion.li>
            </AnimatePresence>
          </ul>
        </div>
        <Btn
          className="mt-4 bg-blue-300"
          onClick={(e) => {
            e.preventDefault();
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
        >
          <PlusIcon className="m-auto" />
        </Btn>
      </div>
      <ul className="space-y-4">
        {galleryData.map((d, cardIdx) => {
          const { type, id, urls } = d;

          return (
            <li
              key={cardIdx}
              className="relative flex items-center justify-between rounded-lg border-2 border-gray-200 px-10 py-2 shadow-sm"
            >
              <span className="w-6 text-center font-mono text-gray-400">
                {cardIdx + 1}
              </span>
              <OverlayCloseBtn
                size="lg"
                onClick={() => deleteGalleryCard(d.id)}
              />
              <motion.div className="round-lg h-fit w-fit bg-white p-2 shadow-sm">
                <GalleryCard
                  type={type}
                  mode="edit"
                  id={id}
                  urls={urls}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;
                    const lastIndex = e.target.name.lastIndexOf("-");
                    const idx = Number(e.target.name.slice(lastIndex + 1));

                    const url = URL.createObjectURL(files[0]);

                    setGalleryData((prev) => {
                      const next = [...prev];
                      next[cardIdx].urls[idx] = url;
                      return next;
                    });
                  }}
                  onRemove={(idx) => {
                    setGalleryData((prev) => {
                      const next = [...prev];
                      next[cardIdx].urls[idx] = null;
                      return next;
                    });
                  }}
                />
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const WeddingGallery = ({ readOnly }: { readOnly?: boolean }) => {
  return readOnly ? <WeddingGalleryReadOnly /> : <WeddingGalleryEdit />;
};

export default WeddingGallery;
