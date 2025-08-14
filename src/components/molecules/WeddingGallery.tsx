"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Img from "../atoms/Img";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "../atoms/Icon";
import Btn from "../atoms/Btn";
import GalleryGridCard from "../organisms/GalleryGridCard";
import GalleryGridCardCell from "./GalleryGridCardCell";
import OverlayCloseBtn from "./OverlayCloseBtn";

export interface GalleryData {
  id: string;
  type: "A" | "B" | "C" | "D" | "E";
  urls: string[] | null[];
}

const getGridCardOfType = ({
  type,
  urls,
  id = "",
  mode = "get",
  onChange,
  inputRefs,
  cardIdx = 0,
  onRemove,
}: {
  type: GalleryData["type"];
  urls?: GalleryData["urls"];
  mode?: "get" | "edit";
  id?: string;
  inputRefs?: React.RefObject<(HTMLInputElement | null)[][]>;
  cardIdx?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (idx: number) => void;
}) => {
  const defaultUrls = "/marriage.jpg";

  const __d = {
    A: {
      count: 2,
      cardStyle:
        "grid aspect-[5/8] w-34 grid-rows-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100",
    },
    B: {
      count: 3,
      cardStyle:
        "grid aspect-[5/8] w-34 grid-cols-2 grid-rows-4 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100",
    },
    C: {
      count: 4,
      cardStyle:
        "grid aspect-[5/8] w-34 grid-cols-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100",
    },
    D: {
      count: 5,
      cardStyle:
        "grid aspect-[5/8] w-34 grid-cols-2 grid-rows-6 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100",
    },
    E: {
      count: 6,
      cardStyle:
        "grid aspect-[5/8] w-34 grid-cols-2 grid-rows-3 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100",
    },
  }[type];

  switch (type) {
    // 2열

    case "A":
      return (
        <GalleryGridCard className={__d.cardStyle}>
          {Array.from({ length: __d.count }, (_, idx) => {
            return (
              <div className={`relative`} key={idx}>
                {mode === "get" ? (
                  <Img src={defaultUrls} />
                ) : (
                  <GalleryGridCardCell
                    key={idx}
                    idx={idx}
                    id={id}
                    urls={urls}
                    cardIdx={cardIdx}
                    inputRefs={inputRefs}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                )}
              </div>
            );
          })}
        </GalleryGridCard>
      );
    case "B":
      // 2행 4열
      return (
        <GalleryGridCard className={__d.cardStyle}>
          {Array.from({ length: __d.count }, (_, idx) => {
            const last = (idx + 1) % __d.count === 0;
            return (
              <div
                className={`relative ${last ? "col-span-2 row-span-2" : "row-span-2"}`}
                key={idx}
              >
                {mode === "get" ? (
                  <Img src={defaultUrls} />
                ) : (
                  <GalleryGridCardCell
                    key={idx}
                    idx={idx}
                    urls={urls}
                    cardIdx={cardIdx}
                    id={id}
                    inputRefs={inputRefs}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                )}
              </div>
            );
          })}
        </GalleryGridCard>
      );

    case "C":
      return (
        <GalleryGridCard className={__d.cardStyle}>
          {Array.from({ length: __d.count }, (_, idx) => {
            return (
              <div className={`relative`} key={idx}>
                {mode === "get" ? (
                  <Img src={defaultUrls} />
                ) : (
                  <GalleryGridCardCell
                    key={idx}
                    idx={idx}
                    urls={urls}
                    id={id}
                    cardIdx={cardIdx}
                    inputRefs={inputRefs}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                )}
              </div>
            );
          })}
        </GalleryGridCard>
      );

    case "D":
      return (
        <GalleryGridCard className={__d.cardStyle}>
          {Array.from({ length: __d.count }, (_, idx) => {
            const even = (idx + 1) % 2 === 0;
            return (
              <div
                className={`relative ${even ? "row-span-3" : "row-span-2"}`}
                key={idx}
              >
                {mode === "get" ? (
                  <Img src={defaultUrls} />
                ) : (
                  <GalleryGridCardCell
                    key={idx}
                    idx={idx}
                    urls={urls}
                    cardIdx={cardIdx}
                    id={id}
                    inputRefs={inputRefs}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                )}
              </div>
            );
          })}
        </GalleryGridCard>
      );

    case "E":
      return (
        <GalleryGridCard className={__d.cardStyle}>
          {Array.from({ length: __d.count }, (_, idx) => {
            return (
              <div className={`relative`} key={idx}>
                {mode === "get" ? (
                  <Img src={defaultUrls} />
                ) : (
                  <GalleryGridCardCell
                    key={idx}
                    idx={idx}
                    urls={urls}
                    id={id}
                    cardIdx={cardIdx}
                    inputRefs={inputRefs}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                )}
              </div>
            );
          })}
        </GalleryGridCard>
      );

    default:
      return null;
  }
};

const WeddingGalleryReadOnly = () => {
  const data: GalleryData[] = [
    {
      id: "2",
      type: "A",
      urls: ["/marriage.jpg", "/marriage.jpg"],
    },
    {
      id: "3",
      type: "B",
      urls: ["/marriage.jpg", "/marriage.jpg", "/marriage.jpg"],
    },
    {
      id: "4",
      type: "C",
      urls: [
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
        "/marriage.jpg",
      ],
    },
    {
      id: "5",
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
      id: "6",
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
              <span className="w-6 text-center font-mono text-gray-400">
                {i + 1}
              </span>
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
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    console.log("Gallery component mounted", galleryData);
  }, [galleryData]);

  const deleteGalleryCard = (id: GalleryData["id"]) => {
    console.log("deleteGalleryCard", id);
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
                {getGridCardOfType({ type: activeType })}
              </motion.li>
            </AnimatePresence>
          </ul>
        </div>
        <Btn
          // bgColor=""
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
        {galleryData.map((d, i) => {
          return (
            <li
              key={i}
              className="relative flex items-center justify-between rounded-lg border-2 border-gray-200 px-10 py-2 shadow-sm"
            >
              <span className="w-6 text-center font-mono text-gray-400">
                {i + 1}
              </span>
              <OverlayCloseBtn
                size="lg"
                onClick={() => deleteGalleryCard(d.id)}
              />
              <motion.div className="round-lg h-fit w-fit bg-white p-2 shadow-sm">
                {getGridCardOfType({
                  type: d.type,
                  urls: d.urls,
                  id: d.id,
                  mode: "edit",
                  inputRefs,
                  cardIdx: i,
                  onChange: (e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;
                    const idx = Number(e.target.name.split("-")[2]);
                    const url = URL.createObjectURL(files[0]);

                    setGalleryData((prev) => {
                      const next = [...prev];
                      next[i].urls[idx] = url;
                      return next;
                    });
                  },
                  onRemove: (idx) => {
                    setGalleryData((prev) => {
                      const next = [...prev];
                      next[i].urls[idx] = null;
                      return next;
                    });
                  },
                })}
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
