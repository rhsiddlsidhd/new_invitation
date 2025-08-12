"use client";
import React from "react";
import Img from "../atoms/Img";

interface GalleryData {
  type: "A" | "B" | "C" | "D" | "E";
  urls: string[];
}

const WeddingGallery = ({ readOnly }: { readOnly?: boolean }) => {
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

  const getGridCardOfType = (d: GalleryData) => {
    switch (d.type) {
      // 2열
      case "A":
        return (
          <ul className="grid aspect-[5/8] w-26 grid-rows-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
            {Array.from({ length: d.urls.length }, (_, i) => {
              return (
                <li key={i} className="relative border-2 border-gray-200">
                  <Img src={d.urls[0]} />
                </li>
              );
            })}
          </ul>
        );
      case "B":
        return (
          // 2행 4열
          <ul className="grid aspect-[5/8] w-26 grid-cols-2 grid-rows-4 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
            {Array.from({ length: d.urls.length }, (_, i) => {
              const even = (i + 1) % 2 === 0;
              return (
                <li
                  key={i}
                  className={`relative border-2 border-gray-200 ${even ? "row-span-4" : "row-span-2"}`}
                >
                  <Img src={d.urls[i]} />
                </li>
              );
            })}
          </ul>
        );
      case "C":
        return (
          // 2행 2열
          <ul className="grid aspect-[5/8] w-26 grid-cols-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
            {Array.from({ length: d.urls.length }, (_, i) => {
              return (
                <li key={i} className="relative border-2 border-gray-200">
                  <Img src={d.urls[0]} />
                </li>
              );
            })}
          </ul>
        );
      case "D":
        return (
          //2행 6열
          <ul className="grid aspect-[5/8] w-26 grid-cols-2 grid-rows-6 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
            {Array.from({ length: d.urls.length }, (_, i) => {
              const even = (i + 1) % 2 === 0;

              return (
                <li
                  key={i}
                  className={`relative border-2 border-gray-200 ${even ? "row-span-3" : "row-span-2"}`}
                >
                  <Img src={d.urls[i]} />
                </li>
              );
            })}
          </ul>
        );
      case "E":
        return (
          //2행 3열
          <ul className="grid aspect-[5/8] w-26 grid-cols-2 grid-rows-3 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
            {Array.from({ length: d.urls.length }, (_, i) => {
              return (
                <li key={i} className={`relative border-2 border-gray-200`}>
                  <Img src={d.urls[i]} />
                </li>
              );
            })}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50">
      {/* 타입명 영역 */}
      <div className="mx-4 flex items-center justify-between border-b border-gray-200 bg-transparent py-3">
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

export default WeddingGallery;
