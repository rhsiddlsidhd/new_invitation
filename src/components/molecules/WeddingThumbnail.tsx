import React, { useState } from "react";
// 간단한 X 아이콘 컴포넌트

import Img from "../atoms/Img";
import { CloseIcon, DocArrowUpIcon } from "../atoms/Icon";
import Label from "../atoms/Label";

const WeddingThumbnail = ({ readOnly }: { readOnly?: boolean }) => {
  const [thumbnailPreviews, setThumbnailPreviews] = useState<(string | null)[]>(
    [null, null],
  );

  const thumbnails = ["/marriage.jpg", null];
  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    // 현재 썸네일 상태 복사
    const current = [...thumbnailPreviews];
    // 현재 등록된 썸네일 개수
    const filledCount = current.filter(Boolean).length;
    if (filledCount + filesArray.length > 2) {
      alert("최대 2개 파일만 업로드 가능합니다.");
      return;
    }
    // 빈 칸(null)에 새 파일을 순서대로 채움
    let idx = 0;
    for (let i = 0; i < current.length; i++) {
      if (current[i] === null && idx < filesArray.length) {
        current[i] = URL.createObjectURL(filesArray[idx]);
        idx++;
      }
    }
    setThumbnailPreviews(current);
  };
  return (
    <>
      {readOnly ? (
        <div>
          <div className="flex justify-center gap-4 p-4">
            {thumbnails.map((url, idx) => {
              return (
                <div
                  key={idx}
                  className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  {url ? (
                    <Img src={url} />
                  ) : (
                    <span className="p-4 text-sm text-gray-400">
                      썸네일이 없습니다
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <span className="flex justify-center text-xs break-keep text-gray-500">
            현재 등록된 썸네일
          </span>
        </div>
      ) : (
        <div>
          <div className="flex justify-center gap-4 p-4">
            {[0, 1].map((i) => (
              <Label
                key={i}
                htmlFor={`thumbnail-${i}`}
                className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
              >
                <input
                  type="file"
                  className="absolute h-full w-full opacity-0"
                  name="thumbnail"
                  multiple
                  tabIndex={-1}
                  onChange={handleUploadFiles}
                />
                {thumbnailPreviews[i] ? (
                  <>
                    <Img src={thumbnailPreviews[i]!} />
                    <button
                      type="button"
                      className="absolute top-1 right-1 z-10 rounded-full bg-white/80 p-1 hover:bg-red-100"
                      onClick={() => {
                        setThumbnailPreviews((prev) => {
                          const next = [...prev];
                          next[i] = null;
                          return next;
                        });
                      }}
                      aria-label="썸네일 삭제"
                    >
                      <CloseIcon className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">
                    현재 등록된 썸네일
                    <input
                      type="file"
                      className="absolute h-full w-full opacity-0"
                      name="thumbnail"
                      multiple
                      tabIndex={-1}
                      onChange={handleUploadFiles}
                    />
                  </span>
                )}
              </Label>
            ))}
          </div>

          {/* <label className="flex cursor-pointer flex-col items-center gap-1">
            <DocArrowUpIcon className="h-6 w-6 text-gray-400 transition-colors hover:text-blue-500" />
            <span className="text-xs text-gray-400">썸네일 업로드</span>
            <input
              type="file"
              className="hidden"
              name="thumbnail"
              multiple
              tabIndex={-1}
              disabled={thumbnailPreviews.filter(Boolean).length >= 2}
              onChange={handleUploadFiles}
            />
          </label> */}
        </div>
      )}
    </>
  );
};

export default WeddingThumbnail;
