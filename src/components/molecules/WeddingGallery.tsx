"use client";
import React, { useState } from "react";
import Img from "../atoms/Img";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryData {
  type: "A" | "B" | "C" | "D" | "E";
  urls: string[];
}

const getGridCardOfType = ({
  type,
  urls,
}: {
  type: GalleryData["type"];
  urls?: GalleryData["urls"];
}) => {
  switch (type) {
    // 2열
    case "A":
      return (
        <ul className="grid aspect-[5/8] w-34 grid-rows-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 2 }, (_, i) => {
            return (
              <li key={i} className="relative border-2 border-gray-200">
                <Img src={urls ? urls[i] : "/marriage.jpg"} />
              </li>
            );
          })}
        </ul>
      );
    case "B":
      return (
        // 2행 4열
        <ul className="grid aspect-[5/8] w-34 grid-cols-2 grid-rows-4 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 3 }, (_, i) => {
            const last = (i + 1) % 3 === 0;
            return (
              <li
                key={i}
                className={`relative border-2 border-gray-200 ${last ? "col-span-2 row-span-2" : "row-span-2"}`}
              >
                <Img src={urls ? urls[i] : "/marriage.jpg"} />
              </li>
            );
          })}
        </ul>
      );
    case "C":
      return (
        // 2행 2열
        <ul className="grid aspect-[5/8] w-34 grid-cols-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 4 }, (_, i) => {
            return (
              <li key={i} className="relative border-2 border-gray-200">
                <Img src={urls ? urls[i] : "/marriage.jpg"} />
              </li>
            );
          })}
        </ul>
      );
    case "D":
      return (
        //2행 6열
        <ul className="grid aspect-[5/8] w-34 grid-cols-2 grid-rows-6 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 5 }, (_, i) => {
            const even = (i + 1) % 2 === 0;

            return (
              <li
                key={i}
                className={`relative border-2 border-gray-200 ${even ? "row-span-3" : "row-span-2"}`}
              >
                <Img src={urls ? urls[i] : "/marriage.jpg"} />
              </li>
            );
          })}
        </ul>
      );
    case "E":
      return (
        //2행 3열
        <ul className="grid aspect-[5/8] w-34 grid-cols-2 grid-rows-3 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 6 }, (_, i) => {
            return (
              <li key={i} className={`relative border-2 border-gray-200`}>
                <Img src={urls ? urls[i] : "/marriage.jpg"} />
              </li>
            );
          })}
        </ul>
      );
    default:
      return null;
  }
};

const WeddingGalleryReadOnly = () => {
  const data: GalleryData[] = [
    {
      type: "A",
      urls: ["/marriage.jpg", "/marriage.jpg"],
    },
    {
      type: "B",
      urls: ["/marriage.jpg", "/marriage.jpg", "/marriage.jpg"],
    },
    {
      type: "C",
      urls: [
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
      ],
    },
    {
      type: "D",
      urls: [
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
      ],
    },
    {
      type: "E",
      urls: [
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
      ],
    },
  ];
  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50">
      {/* 타입명 영역 */}
      <div className="mx-4 flex items-center justify-between border-b-1 border-gray-200 bg-transparent py-3">
        <span className="font-semibold text-gray-700">갤러리</span>
      </div>
      {/* 이미지 목록 */}
      <ul className="space-y-4 p-4">
        {data.map((d, i) => {
          return (
            <li
              key={i}
              className="flex items-center gap-4 rounded-lg bg-white p-2 shadow-sm"
            >
              <div className="w-6 text-center font-mono text-gray-400">
                {i + 1}
              </div>
              {getGridCardOfType(d)}
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

  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50">
      {/* 타입명 영역 */}
      <div className="mx-4 border-b-1 border-gray-200 bg-transparent py-3">
        <span className="font-semibold text-gray-700">갤러리</span>
        <div className="flex gap-2">
          {galleryTypes.map((w, i) => {
            return (
              <motion.button
                key={i}
                className="h-fit rounded-xl border-2 px-1 py-2 text-xs"
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveType(w)}
              >{`${w}버튼`}</motion.button>
            );
          })}
        </div>
      </div>
      {/* 이미지 목록 */}
      <ul className="relative flex min-h-80 items-center space-y-4 p-4">
        <AnimatePresence mode="wait">
          <motion.li
            key={activeType}
            className="round-lg absolute left-1/2 h-fit w-fit -translate-x-1/2 bg-white p-2 shadow-sm"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {getGridCardOfType({ type: activeType })}
          </motion.li>
        </AnimatePresence>
      </ul>
      <button className="w-full rounded-sm border-2">선택</button>
    </div>
  );
};

const WeddingGallery = ({ readOnly }: { readOnly?: boolean }) => {
  return readOnly ? <WeddingGalleryReadOnly /> : <WeddingGalleryEdit />;
};

export default WeddingGallery;
