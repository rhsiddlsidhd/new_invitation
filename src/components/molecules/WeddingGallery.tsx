"use client";
import React, { useEffect, useState } from "react";
import Img from "../atoms/Img";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, DocArrowUpIcon, PlusIcon } from "../atoms/Icon";
import Label from "./../atoms/Label";

interface GalleryData {
  type: "A" | "B" | "C" | "D" | "E";
  urls: string[];
}

const getGridCardOfType = ({
  type,
  urls,
  mode = "get",
  onChange,
  inputRefs,
  cardIdx = 0,
  onRemove,
}: {
  type: GalleryData["type"];
  urls?: GalleryData["urls"];
  mode?: "get" | "edit";
  onChange?: (idx: number, url: string) => void;
  inputRefs?: React.MutableRefObject<(HTMLInputElement | null)[][]>;
  cardIdx?: number;
  onRemove?: (idx: number) => void;
}) => {
  const defaultUrls = "/marriage.jpg";

  const handleModeDisplay = ({
    mode,
    idx,
  }: {
    mode: "get" | "edit";
    idx: number;
  }) => {
    if (mode === "get") {
      return <Img src={defaultUrls} />;
    } else {
      return (
        <Label
          htmlFor={`gallery-${type}-${idx}`}
          className="relative flex h-full w-full items-center justify-center border-4"
        >
          <input
            name={`gallery-${type}-${idx}`}
            type="file"
            className="absolute w-full opacity-0"
            ref={(el) => {
              if (inputRefs) {
                if (!inputRefs.current[cardIdx])
                  inputRefs.current[cardIdx] = [];
                inputRefs.current[cardIdx][idx] = el;
              }
            }}
            onChange={(e) => {
              if (onChange) {
                const files = e.target.files;
                if (!files || files.length === 0) return;
                const idx = Number(e.target.name.split("-")[2]);
                const url = URL.createObjectURL(files[0]);
                onChange(idx, url);
              }
            }}
          />

          {urls && urls[idx] ? (
            <>
              <Img src={urls[idx] ?? "/marriage.jpg"} />
              <button
                type="button"
                className="absolute top-1 right-1 z-10 rounded-full bg-white/80 p-1 hover:bg-red-100"
                onClick={(e) => {
                  e.preventDefault();
                  if (onRemove) onRemove(idx);
                  if (inputRefs && inputRefs.current[cardIdx]?.[idx]) {
                    inputRefs.current[cardIdx][idx]!.value = "";
                  }
                }}
              >
                <CloseIcon className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
            </>
          ) : (
            <DocArrowUpIcon />
          )}
        </Label>
      );
    }
  };

  switch (type) {
    // 2열
    case "A":
      return (
        <ul className="grid aspect-[5/8] w-34 grid-rows-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
          {Array.from({ length: 2 }, (_, i) => {
            return (
              <li key={i} className="relative border-2 border-gray-200">
                {handleModeDisplay({ mode, idx: i })}
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
                className={`relative flex items-center justify-center border-2 border-gray-200 ${last ? "col-span-2 row-span-2" : "row-span-2"}`}
              >
                {handleModeDisplay({ mode, idx: i })}
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
              <li
                key={i}
                className="relative flex items-center justify-center border-2 border-gray-200"
              >
                {handleModeDisplay({ mode, idx: i })}
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
                className={`relative flex items-center justify-center border-2 border-gray-200 ${even ? "row-span-3" : "row-span-2"}`}
              >
                {handleModeDisplay({ mode, idx: i })}
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
              <li
                key={i}
                className={`relative flex items-center justify-center border-2 border-gray-200`}
              >
                {handleModeDisplay({ mode, idx: i })}
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
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    console.log("Gallery component mounted", galleryData);
  }, [galleryData]);

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
                <motion.button
                  key={i}
                  className="w-full rounded-xl border-2 px-1 py-2 text-xs"
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveType(w);
                  }}
                >{`${w}버튼`}</motion.button>
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
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            const id = crypto.randomUUID();
            console.log(id);
            const count = { A: 2, B: 3, C: 4, D: 5, E: 6 }[activeType];
            console.log(count);

            setGalleryData((prev) => [
              ...prev,
              { type: activeType, urls: new Array(count).fill(null) },
            ]);
          }}
          className="mt-4 block w-full rounded-xl border-2 py-2 text-xs"
        >
          <PlusIcon className="m-auto" />
        </motion.button>
      </div>
      <ul className="space-y-4">
        {galleryData.map((d, i) => {
          return (
            <li
              key={i}
              className="rounded-lg border-2 border-gray-200 p-3 shadow-sm"
            >
              <motion.div className="round-lg h-fit w-fit bg-white p-2 shadow-sm">
                {getGridCardOfType({
                  type: d.type,
                  urls: d.urls,
                  mode: "edit",
                  onChange: (idx, url) => {
                    setGalleryData((prev) => {
                      const next = [...prev];
                      next[i].urls[idx] = url;
                      return next;
                    });
                  },
                  inputRefs,
                  cardIdx: i,
                  onRemove: (idx) => {
                    setGalleryData((prev) => {
                      const next = [...prev];
                      next[i].urls[idx] = "";
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
